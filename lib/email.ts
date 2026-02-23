import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface WaitlistEmailProps {
  email: string;
  firstName?: string;
}

export async function sendWaitlistConfirmation({ email, firstName }: WaitlistEmailProps) {
  const name = firstName || email.split('@')[0];
  const baseUrl = 'https://code-sentinel.dev';
  const logoUrl = `${baseUrl}/logo/logo.png`;

  try {
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'CodeSentinel <onboarding@resend.dev>',
      to: [email],
      subject: 'Welcome to the CodeSentinel Waitlist',
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to CodeSentinel</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      line-height: 1.6;
      color: #e5e7eb;
      background-color: #09090b;
      margin: 0;
      padding: 0;
    }
    .wrapper {
      width: 100%;
      background-color: #09090b;
      padding: 40px 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #18181b;
      border: 1px solid #27272a;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    }
    .header {
      padding: 40px 20px;
      text-align: center;
      background: linear-gradient(135deg, #18181b 0%, #09090b 100%);
    }
    .logo {
      width: 200px;
      height: auto;
      margin-bottom: 20px;
    }
    .content {
      padding: 40px 30px;
    }
    .title {
      font-size: 24px;
      font-weight: 700;
      color: #ffffff;
      margin-bottom: 20px;
      letter-spacing: -0.025em;
    }
    .text {
      font-size: 16px;
      color: #a1a1aa;
      margin-bottom: 24px;
    }
    .cta-container {
      text-align: center;
      margin: 40px 0;
    }
    .cta-button {
      display: inline-block;
      padding: 14px 28px;
      background-color: #2dd4bf;
      color: #000000;
      text-decoration: none;
      font-weight: 600;
      border-radius: 8px;
      transition: transform 0.2s ease;
    }
    .footer {
      padding: 30px;
      text-align: center;
      border-top: 1px solid #27272a;
      background-color: #09090b;
    }
    .footer-text {
      font-size: 12px;
      color: #52525b;
    }
    .footer-link {
      color: #2dd4bf;
      text-decoration: none;
    }
    .badge {
      display: inline-block;
      padding: 4px 12px;
      background-color: rgba(45, 212, 191, 0.1);
      color: #2dd4bf;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 500;
      margin-bottom: 16px;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <div class="header">
        <img src="${logoUrl}" alt="CodeSentinel Logo" class="logo">
      </div>
      <div class="content">
        <div class="badge">Waitlist Confirmed</div>
        <h1 class="title">You're in, ${name}!</h1>
        <p class="text">
          Thank you for joining the CodeSentinel waitlist. We've secured your spot in line.
        </p>
        <p class="text">
          CodeSentinel is currently in private beta. We are admitting teams in controlled waves to ensure every user receives zero-noise, high-fidelity security protection. 
        </p>
        <p class="text">
          While beta access is not yet live for your account, we'll notify you the moment your wave is ready for onboarding.
        </p>
        <div class="cta-container">
          <a href="${baseUrl}" class="cta-button">Explore CodeSentinel</a>
        </div>
        <p class="text" style="font-size: 14px; text-align: center;">
          Stay tuned for updates on our progress and security insights.
        </p>
      </div>
      <div class="footer">
        <p class="footer-text">
          © ${new Date().getFullYear()} CodeSentinel. All rights reserved.<br>
          <a href="mailto:hello@codesentinel.dev" class="footer-link">hello@codesentinel.dev</a> • 
          <a href="${baseUrl}" class="footer-link">code-sentinel.dev</a>
        </p>
        <p class="footer-text" style="margin-top: 10px; opacity: 0.5;">
          Built for developers, by developers.
        </p>
      </div>
    </div>
  </div>
</body>
</html>
      `,
    });

    if (error) {
      console.error('Resend Error:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (err) {
    console.error('Email Service Exception:', err);
    return { success: false, error: err };
  }
}
