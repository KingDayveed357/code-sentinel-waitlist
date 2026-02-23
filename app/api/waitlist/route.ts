import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { rateLimit } from "@/lib/rate-limit";
import { sendWaitlistConfirmation } from "@/lib/email";

const waitlistSchema = z.object({
  email: z.string().email("Invalid email address"),
  referral_code: z.string().nullish(),
  honeypot: z.string().max(0, "Bot detected").nullish(), // Honeypot must be empty
  turnstileToken: z.string().nullish(), // For future CF Turnstile integration
});

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "anonymous";
    const { success, remaining } = rateLimit(ip);

    if (!success) {
      return NextResponse.json(
        { error: "Too many requests. Please try again in a minute." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const result = waitlistSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.errors[0].message },
        { status: 400 }
      );
    }

    const { email, referral_code } = result.data;

    // Check if email already exists
    const { data: existingEntry } = await supabaseAdmin
      .from("waitlist_entries")
      .select("*")
      .eq("email", email)
      .single();

    if (existingEntry) {
      return NextResponse.json(
        {
          message: "Already registered",
          user: {
            position: existingEntry.position,
            referral_code: existingEntry.referral_code,
            referral_count: existingEntry.referral_count,
          },
        },
        { status: 200 }
      );
    }

    // Handle referral logic
    if (referral_code) {
      const { data: referrer } = await supabaseAdmin
        .from("waitlist_entries")
        .select("referral_count, id")
        .eq("referral_code", referral_code)
        .single();

      if (referrer) {
        await supabaseAdmin
          .from("waitlist_entries")
          .update({ referral_count: (referrer.referral_count || 0) + 1 })
          .eq("id", referrer.id);
      }
    }

    // Insert new entry
    const { data, error } = await supabaseAdmin
      .from("waitlist_entries")
      .insert([
        {
          email,
          referred_by: referral_code || null,
        },
      ])
      .select()
      .single();

    if (error) throw error;

    // Send confirmation email (async, but don't block response)
    // We trigger it without awaiting the full result to keep API responsive,
    // but we use a catch to log any errors.
    sendWaitlistConfirmation({ email }).catch((err) => {
      console.error("Delayed Email Error:", err);
    });

    return NextResponse.json(
      {
        message: "You’re officially on the CodeSentinel waitlist. Check your inbox for confirmation.",
        user: {
          position: data.position,
          referral_code: data.referral_code,
          referral_count: data.referral_count,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Waitlist API Error:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
