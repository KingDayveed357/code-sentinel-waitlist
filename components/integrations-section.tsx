"use client"
import React from "react"
import { Shield, GitBranch, CheckCircle2, Lock, Workflow, Plus, Zap, AlertTriangle } from "lucide-react"

export default function IntegrationsSection() {
  const [hoveredIntegration, setHoveredIntegration] = React.useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = React.useState<string>("all")
  const [activeWorkflowNode, setActiveWorkflowNode] = React.useState<number>(0)
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 })

  React.useEffect(() => {
    const interval = setInterval(() => {
      setActiveWorkflowNode((prev) => (prev + 1) % 8)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20
    setMousePosition({ x, y })
  }

  const integrations = [
    { name: "GitHub", logo: "https://cdn.simpleicons.org/github", category: "source", connected: true },
    { name: "GitLab", logo: "https://cdn.simpleicons.org/gitlab", category: "source", connected: true },
    { name: "Bitbucket", logo: "https://cdn.simpleicons.org/bitbucket", category: "source", connected: false },
    { name: "Jenkins", logo: "https://cdn.simpleicons.org/jenkins", category: "ci", connected: true },
    // { name: "CircleCI", logo: "https://cdn.simpleicons.org/circleci", category: "ci", connected: false },
    // { name: "Travis CI", logo: "https://cdn.simpleicons.org/travisci", category: "ci", connected: false },
    { name: "GitHub Actions", logo: "https://cdn.simpleicons.org/githubactions", category: "ci", connected: true },
    { name: "Docker", logo: "https://cdn.simpleicons.org/docker", category: "container", connected: true },
    { name: "Kubernetes", logo: "https://cdn.simpleicons.org/kubernetes", category: "container", connected: true },
    // { name: "AWS", logo: "https://cdn.simpleicons.org/amazonaws", category: "cloud", connected: true },
    // { name: "Azure", logo: "https://cdn.simpleicons.org/microsoftazure", category: "cloud", connected: false },
    // { name: "GCP", logo: "https://cdn.simpleicons.org/googlecloud", category: "cloud", connected: false },
    { name: "Vercel", logo: "https://cdn.simpleicons.org/vercel", category: "deploy", connected: true },
    // { name: "Netlify", logo: "https://cdn.simpleicons.org/netlify", category: "deploy", connected: false },
    { name: "Slack", logo: "https://cdn.simpleicons.org/slack", category: "notify", connected: true },
    // { name: "Jira", logo: "https://cdn.simpleicons.org/jira", category: "notify", connected: false },
    // { name: "Discord", logo: "https://cdn.simpleicons.org/discord", category: "notify", connected: false },
    { name: "Terraform", logo: "https://cdn.simpleicons.org/terraform", category: "cloud", connected: false },
  ]

  const categories = [
    { id: "all", label: "All Integrations" },
    { id: "source", label: "Source Control" },
    { id: "ci", label: "CI/CD" },
    { id: "container", label: "Containers" },
    { id: "cloud", label: "Cloud" },
    { id: "deploy", label: "Deploy" },
    { id: "notify", label: "Notifications" },
  ]

  const filteredIntegrations = selectedCategory === "all" 
    ? integrations 
    : integrations.filter(i => i.category === selectedCategory)

  const workflowNodes = [
    { id: 0, icon: GitBranch, label: "Code Push", x: 15, y: 20, color: "from-blue-500 to-cyan-500" },
    { id: 1, icon: Shield, label: "Security Scan", x: 35, y: 15, color: "from-purple-500 to-pink-500" },
    { id: 2, icon: Lock, label: "Policy Check", x: 55, y: 25, color: "from-amber-500 to-orange-500" },
    { id: 3, icon: AlertTriangle, label: "Alert Team", x: 70, y: 15, color: "from-red-500 to-rose-500" },
    { id: 4, icon: CheckCircle2, label: "Tests Pass", x: 85, y: 25, color: "from-green-500 to-emerald-500" },
    { id: 5, icon: Zap, label: "Build", x: 75, y: 45, color: "from-yellow-500 to-amber-500" },
    { id: 6, icon: Workflow, label: "Deploy", x: 60, y: 70, color: "from-indigo-500 to-blue-500" },
    { id: 7, icon: CheckCircle2, label: "Live", x: 35, y: 50, color: "from-teal-500 to-cyan-500" },
  ]

  const connections = [
    [0, 1], [1, 2], [2, 3], [2, 4], [4, 5], [5, 6], [6, 7], [7, 0]
  ]

  return (
    <section id="integrations" className="py-24 px-4 sm:px-6 lg:px-8 bg-background relative overflow-hidden">
      {/* Subtle Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-muted/30 via-background to-muted/30" />
      
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted border border-border">
            <Workflow className="w-4 h-4 text-foreground/70" />
            <span className="text-sm font-medium text-foreground/70">INTEGRATIONS</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-foreground">
            Endless possibilities.
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Enhance your experience with a wide variety of integrations.
            From everyday essentials to powerful pro add-ons.
          </p>
        </div>

        {/* 3D Interactive Workflow Hub */}
        <div className="mb-20 max-w-6xl mx-auto md:px-4">
          <h3 className="text-2xl md:text-3xl font-semibold text-center mb-8 text-foreground">
            Interactive CI/CD Workflow
          </h3>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Watch your security workflow in action. Hover over nodes to explore each stage of the automated pipeline.
          </p>
          
          <div 
            className="relative w-full aspect-square md:aspect-[16/11] bg-gradient-to-br from-background via-muted/20 to-background rounded-3xl border border-border shadow-2xl overflow-hidden"
            onMouseMove={handleMouseMove}
            style={{
              transform: window.innerWidth > 768 ? `rotateX(${mousePosition.y * 0.2}deg) rotateY(${mousePosition.x * 0.2}deg)` : 'none',
              transition: 'transform 0.1s ease-out',
              transformStyle: 'preserve-3d',
              perspective: '1000px'
            }}
          >
            {/* Animated Background Grid */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at center, transparent 0%, hsl(var(--background)) 100%),
                                 repeating-linear-gradient(0deg, hsl(var(--border)) 0px, transparent 1px, transparent 50px),
                                 repeating-linear-gradient(90deg, hsl(var(--border)) 0px, transparent 1px, transparent 50px)`,
                backgroundSize: '100% 100%, 50px 50px, 50px 50px'
              }} />
            </div>

            {/* Orbital Rings */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] md:w-[80%] aspect-square">
              <div className="absolute inset-0 rounded-full border border-border/30 animate-spin-slow" />
              <div className="absolute inset-[15%] rounded-full border border-border/20 animate-spin-reverse" style={{ animationDuration: '25s' }} />
            </div>

            {/* Center Hub - CodeSentinel */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
              <div className="relative w-24 h-24 md:w-32 md:h-32 animate-float">
                {/* Multi-layer Glow Rings */}
                <div className="absolute -inset-8 md:-inset-12 rounded-full bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-cyan-500/10 blur-3xl animate-pulse" />
                <div className="absolute -inset-4 md:-inset-6 rounded-full bg-gradient-to-br from-purple-500/20 via-blue-500/20 to-cyan-500/20 blur-2xl" />
                
                {/* Logo Container with Glass Effect */}
                <div className="relative w-full h-full  rounded-3xl bg-card/80 backdrop-blur-xl border-2 border-border shadow-2xl flex items-center justify-center overflow-hidden group cursor-pointer hover:scale-105 transition-transform duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-cyan-500/5" />
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <Shield className="w-12 h-12 md:w-16 md:h-16 text-foreground z-10 group-hover:text-accent transition-colors duration-500" />
                  
                  {/* Shine Effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="absolute top-0 -left-full w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 animate-shine" />
                  </div>
                </div>

                {/* Central Label */}
                <div className="absolute -bottom-12 md:-bottom-14 left-1/2 -translate-x-1/2 whitespace-nowrap">
                  <div className="px-4 py-2 bg-card/90 backdrop-blur-sm border border-border rounded-xl shadow-lg">
                    <p className="text-xs md:text-sm font-bold text-foreground">CodeSentinel</p>
                    <p className="text-[10px] md:text-xs text-muted-foreground">Security Hub</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Connection Lines - Curved Paths */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="hsl(var(--border))" stopOpacity="0" />
                  <stop offset="50%" stopColor="hsl(var(--accent))" stopOpacity="1" />
                  <stop offset="100%" stopColor="hsl(var(--border))" stopOpacity="0" />
                </linearGradient>
              </defs>
              {connections.map(([from, to], idx) => {
                const fromNode = workflowNodes[from]
                const toNode = workflowNodes[to]
                const isActive = activeWorkflowNode === from || activeWorkflowNode === to
                
                return (
                  <line
                    key={idx}
                    x1={`${fromNode.x}%`}
                    y1={`${fromNode.y}%`}
                    x2={`${toNode.x}%`}
                    y2={`${toNode.y}%`}
                    stroke={isActive ? "url(#lineGradient)" : "currentColor"}
                    strokeWidth={isActive ? "2" : "1"}
                    strokeDasharray="4 4"
                    className={`transition-all duration-500 ${
                      isActive ? 'opacity-100' : 'text-border opacity-50'
                    }`}
                    style={{
                      strokeDashoffset: isActive ? -20 : 0,
                      animation: isActive ? 'dash 2s linear infinite' : 'none'
                    }}
                  />
                )
              })}
            </svg>

            {/* Workflow Nodes */}
            {workflowNodes.map((node) => {
              const Icon = node.icon
              const isActive = activeWorkflowNode === node.id
              const isHovered = hoveredIntegration === node.label
              
              return (
                <div
                  key={node.id}
                  className="absolute z-10 cursor-pointer"
                  style={{
                    left: `${node.x}%`,
                    top: `${node.y}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                  onMouseEnter={() => setHoveredIntegration(node.label)}
                  onMouseLeave={() => setHoveredIntegration(null)}
                  onClick={() => setActiveWorkflowNode(node.id)}
                >
                  <div className="relative group">
                    {/* Multi-layer Glow Effect */}
                    {isActive && (
                      <>
                        <div className={`absolute -inset-8 rounded-full bg-gradient-to-br ${node.color} opacity-20 blur-2xl animate-pulse`} />
                        <div className={`absolute -inset-4 rounded-full bg-gradient-to-br ${node.color} opacity-30 blur-xl`} />
                      </>
                    )}
                    
                    {/* Node Container with Premium Design */}
                    <div
                      className={`relative w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-card/80 backdrop-blur-xl border-2 shadow-lg flex items-center justify-center transition-all duration-500 ${
                        isActive 
                          ? 'border-accent scale-110 md:scale-125 shadow-2xl' 
                          : 'border-border scale-100 hover:scale-110'
                      } ${isHovered ? 'shadow-2xl border-accent/50' : ''}`}
                      style={{
                        animation: isActive ? 'float 3s ease-in-out infinite' : 'none'
                      }}
                    >
                      {/* Gradient Background */}
                      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${node.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                      
                      <Icon className={`w-6 h-6 md:w-7 md:h-7 transition-all duration-500 ${
                        isActive ? 'text-accent scale-110' : 'text-foreground/70 group-hover:text-accent'
                      }`} />
                      
                      {/* Active Indicator with Ring */}
                      {isActive && (
                        <>
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-ping" />
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full" />
                        </>
                      )}

                      {/* Shine Effect on Hover */}
                      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 overflow-hidden">
                        <div className="absolute top-0 -left-full w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 group-hover:animate-shine" />
                      </div>
                    </div>

                    {/* Enhanced Tooltip */}
                    {(isHovered || isActive) && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 animate-fade-in z-50 pointer-events-none">
                        <div className="px-4 py-2 bg-foreground/95 backdrop-blur-sm text-background rounded-xl shadow-2xl border border-background/20">
                          <p className="text-xs md:text-sm font-bold whitespace-nowrap">{node.label}</p>
                          <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-foreground/95 rotate-45 border-l border-t border-background/20" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}

            {/* Progress Indicator */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 bg-card/80 backdrop-blur-sm border border-border rounded-full shadow-lg">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              <span className="text-xs font-medium text-foreground hidden md:inline">
                Step {activeWorkflowNode + 1} of {workflowNodes.length}
              </span>
              <span className="text-xs font-medium text-foreground md:hidden">
                {activeWorkflowNode + 1}/{workflowNodes.length}
              </span>
            </div>
          </div>
          
          <div className="mt-8 text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              <span className="hidden md:inline">Hover or tap nodes to explore • Watch the automated security workflow</span>
              <span className="md:hidden">Tap nodes to explore the workflow</span>
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span>Active</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <div className="w-2 h-2 bg-border rounded-full" />
                <span>Pending</span>
              </div>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === cat.id
                  ? "bg-foreground text-background shadow-md"
                  : "bg-muted text-foreground/70 hover:bg-muted/80 border border-border"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Integrations Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredIntegrations.map((integration, index) => (
            <div
              key={integration.name}
              className="group relative"
              onMouseEnter={() => setHoveredIntegration(integration.name)}
              onMouseLeave={() => setHoveredIntegration(null)}
              style={{ animationDelay: `${index * 30}ms` }}
            >
              <div className="relative aspect-square bg-card rounded-2xl border border-border p-6 flex flex-col items-center justify-center gap-3 hover:shadow-lg hover:border-foreground/20 transition-all duration-300 group-hover:-translate-y-1">
                {integration.connected && (
                  <div className="absolute top-2 right-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  </div>
                )}
                
                <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <img 
                    src={integration.logo} 
                    alt={integration.name}
                    className="w-8 h-8 object-contain"
                  />
                </div>
                
                <span className="text-xs font-medium text-center text-foreground/80 group-hover:text-foreground transition-colors">
                  {integration.name}
                </span>

                {hoveredIntegration === integration.name && (
                  <div className="absolute inset-0 bg-accent/5 rounded-2xl pointer-events-none" />
                )}
              </div>

              {!integration.connected && hoveredIntegration === integration.name && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="px-4 py-2 bg-foreground text-background text-xs font-semibold rounded-lg shadow-lg hover:scale-105 transition-transform">
                    Connect
                  </button>
                </div>
              )}
            </div>
          ))}

          {/* <div className="group relative aspect-square bg-muted/50 rounded-2xl border-2 border-dashed border-border p-6 flex flex-col items-center justify-center gap-3 hover:border-foreground/30 transition-all duration-300 cursor-pointer">
            <div className="w-12 h-12 rounded-xl bg-background flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Plus className="w-6 h-6 text-muted-foreground" />
            </div>
            <span className="text-xs font-medium text-center text-muted-foreground">
              Request More
            </span>
          </div> */}
        </div>

        {/* Bottom CTA */}
        {/* <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-4">
            Can't find what you're looking for?
          </p>
          <button className="px-6 py-3 bg-foreground text-background font-semibold rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105">
            Request Custom Integration
          </button>
        </div> */}
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        .perspective-1000 {
          perspective: 1000px;
          transform-style: preserve-3d;
        }
      `}</style>
    </section>
  )
}