"use client"

import { Star } from "lucide-react"

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Alex Chen",
      role: "Senior DevOps Engineer",
      company: "TechCorp",
      content: "CodeSentinel has transformed how we handle security. What used to take hours now happens in minutes.",
      rating: 5,
    },
    {
      name: "Jordan Martinez",
      role: "Security Lead",
      company: "SecureScale",
      content: "The policy enforcement features are exactly what we needed. Compliance is no longer a headache.",
      rating: 5,
    },
    {
      name: "Sarah Johnson",
      role: "Engineering Manager",
      company: "CloudFirst",
      content: "Our team loves how CodeSentinel integrates with our existing workflow. Zero friction, maximum value.",
      rating: 5,
    },
  ]

  return (
    <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">Trusted by Development Teams</h2>
          <p className="text-lg text-muted-foreground">See what leading companies have to say about CodeSentinel.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="p-8 rounded-lg border border-border/50 bg-card hover:border-accent/50 hover:shadow-lg transition-all"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                ))}
              </div>
              <p className="text-base leading-relaxed mb-6 italic">{`"${testimonial.content}"`}</p>
              <div>
                <p className="font-semibold text-foreground">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                <p className="text-sm text-accent font-medium">{testimonial.company}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
