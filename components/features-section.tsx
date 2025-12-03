"use client"

import { Shield, Zap, GitBranch, BarChart3 } from "lucide-react"

export default function FeaturesSection() {
  const features = [
    {
      icon: Shield,
      title: "Real-time Security",
      description: "Detect vulnerabilities instantly as code is pushed to your repository.",
    },
    {
      icon: Zap,
      title: "CI/CD Integration",
      description: "Seamlessly integrates with GitHub Actions, GitLab CI, and Jenkins.",
    },
    {
      icon: GitBranch,
      title: "Policy Enforcement",
      description: "Define and enforce custom security policies across your organization.",
    },
    {
      icon: BarChart3,
      title: "Detailed Analytics",
      description: "Comprehensive dashboards showing trends and insights over time.",
    },
  ]

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">Powerful Features Built for Teams</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to secure your codebase and maintain developer velocity.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="p-6 rounded-lg border border-border/50 bg-card hover:border-accent/50 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            )
          })}
        </div>

        {/* CI/CD Integrations Showcase */}
        {/* <div className="mt-20 pt-20 border-t border-border/30">
          <h3 className="text-2xl font-bold text-center mb-12">Integrations You Love</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {["GitHub", "GitLab", "Jenkins", "Docker", "Kubernetes", "AWS", "Azure", "Vercel"].map((integration) => (
              <div
                key={integration}
                className="p-4 rounded-lg border border-border/30 flex items-center justify-center hover:border-accent/50 hover:bg-accent/5 transition-colors"
              >
                <span className="font-semibold text-sm">{integration}</span>
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </section>
  )
}
