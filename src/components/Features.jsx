import { 
  Brain, 
  Zap, 
  Users, 
  BarChart3, 
  MessageSquare, 
  Shield,
  Clock,
  Target,
  Lightbulb
} from 'lucide-react'

const Features = () => {
  const features = [
    {
      icon: Brain,
      title: "Patented Institution-Wide Chat Survey Methodology",
      description: "Our patented approach (patent pending) polls your entire institution through AI chat surveys, uncovering issues each individual faces in their daily work.",
      highlights: [
        "Patented chat survey technology",
        "Complete institutional coverage", 
        "Individual-level issue discovery",
        "Aggregated automation insights"
      ]
    },
    {
      icon: Zap,
      title: "Soul-Crushing Task Detection & Automation",
      description: "AI identifies repetitive, meaningless work that drains employee engagement and provides specific automation strategies.",
      highlights: [
        "Task misery analysis",
        "Automation opportunity mapping",
        "Human potential liberation",
        "Culture impact assessment"
      ]
    },
    {
      icon: MessageSquare,
      title: "Strategic Intelligence & Conversation Analytics",
      description: "Captures and analyzes diagnostic conversations to continuously improve problem identification and solution effectiveness.",
      highlights: [
        "Conversation prompt storage",
        "Issue refinement engine",
        "Optimization roadmapping",
        "STOP command functionality"
      ]
    },
    {
      icon: Users,
      title: "Expert Consultant Matching",
      description: "Connect with consultants who have deployed similar projects, matched with AI experts who can turn insights into actionable wins with cost estimates.",
      highlights: [
        "Similar project experience matching",
        "AI expert consultation",
        "Actionable implementation plans",
        "Detailed cost estimates"
      ]
    },
    {
      icon: BarChart3,
      title: "Advanced Administrative Analytics",
      description: "Analyze patterns across organizations with real-time monitoring of team morale, process maturity, and change readiness.",
      highlights: [
        "Domain-based intelligence",
        "User activity tracking",
        "Issue classification analytics",
        "AI-powered similarity reports"
      ]
    },
    {
      icon: Shield,
      title: "Enterprise-Grade Security",
      description: "Your organizational data remains confidential with end-to-end encryption, SOC 2 compliance, and granular access controls.",
      highlights: [
        "End-to-end encryption",
        "SOC 2 compliance",
        "GDPR compliant",
        "Role-based access controls"
      ]
    }
  ]

  return (
    <section id="features" className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-accent-100 text-accent-800 rounded-full text-sm font-medium mb-6">
            <Lightbulb className="w-4 h-4 mr-2" />
            AI-Powered Automation Intelligence
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Discover Hidden Automation
            <br />
            <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
              Goldmines in Your Organization
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our patented chat survey methodology uncovers automation opportunities 
            by systematically analyzing every individual's daily work frustrations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <div 
                key={index} 
                className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center mb-6">
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 mb-6">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-3"></div>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>

        <div className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-2xl p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="flex items-center justify-center mb-4">
                <Clock className="w-8 h-8 text-primary-600 mr-2" />
                <span className="text-3xl font-bold text-gray-900">2-4 hours</span>
              </div>
              <p className="text-gray-600">Complete analysis vs. 3-6 months traditional consulting</p>
            </div>
            <div>
              <div className="flex items-center justify-center mb-4">
                <Target className="w-8 h-8 text-accent-600 mr-2" />
                <span className="text-3xl font-bold text-gray-900">25-40%</span>
              </div>
              <p className="text-gray-600">Improvement in organizational health scores</p>
            </div>
            <div>
              <div className="flex items-center justify-center mb-4">
                <Zap className="w-8 h-8 text-green-600 mr-2" />
                <span className="text-3xl font-bold text-gray-900">40-60%</span>
              </div>
              <p className="text-gray-600">Reduction in soul-crushing, repetitive tasks</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features