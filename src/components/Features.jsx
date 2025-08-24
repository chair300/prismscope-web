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
      title: "Organization-Wide Intelligence Gathering",
      description: "We survey every person in your organization to identify what they personally consider time-wasted in their role, creating a comprehensive map of inefficiencies from the ground up.",
      highlights: [
        "Everyone surveyed systematically",
        "Personal time-waste identification", 
        "Comprehensive inefficiency mapping",
        "Ground-up organizational intelligence"
      ]
    },
    {
      icon: Zap,
      title: "Touchpoint & Process Mapping",
      description: "We analyze all the touchpoints and processes your people identified, connecting the dots between departments to reveal how inefficiencies cascade through your organization.",
      highlights: [
        "Cross-functional process analysis",
        "Department interconnection mapping",
        "Inefficiency cascade identification",
        "Major cost center revelation"
      ]
    },
    {
      icon: BarChart3,
      title: "KPI Framework & ROI Measurement Design",
      description: "We create specific, measurable KPIs for each identified inefficiency, establishing baseline metrics and ROI tracking systems so you can measure the business impact of any improvements.",
      highlights: [
        "Custom KPI frameworks",
        "Baseline metric establishment",
        "ROI tracking systems",
        "Measurable improvement validation"
      ]
    },
    {
      icon: Users,
      title: "Implementation Guidance & ROI Tracking",
      description: "We can connect you with specialists for implementation support. Most importantly, you'll have the KPIs and measurement framework to track ROI regardless of who implements the solutions.",
      highlights: [
        "Specialist network access",
        "Implementation roadmaps",
        "ROI measurement frameworks",
        "Success tracking regardless of implementer"
      ]
    },
    {
      icon: Target,
      title: "Identification + Measurement = Guaranteed ROI",
      description: "Without proper identification and measurement, even the best solutions fail to deliver measurable ROI. We provide the intelligence and KPIs to make any solution successful.",
      highlights: [
        "Complete organizational intelligence",
        "Precise cost calculations",
        "Data-driven prioritization",
        "Continuous improvement systems"
      ]
    },
    {
      icon: Shield,
      title: "Expert Implementation Network",
      description: "Once we've mapped your organizational inefficiencies and quantified their impact, you need experienced professionals who can actually streamline and improve those processes.",
      highlights: [
        "Process & technology specialists",
        "Organizational change experts",
        "Proven implementation track records",
        "Industry-specific expertise"
      ]
    }
  ]

  return (
    <section id="features" className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-accent-100 text-accent-800 rounded-full text-sm font-medium mb-6">
            <Lightbulb className="w-4 h-4 mr-2" />
            How We Actually Fix This
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            The Real Value: 
            <br />
            <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
              Identification + Measurement = Guaranteed ROI
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Without proper identification and measurement, even the best solutions fail to deliver measurable ROI. 
            You could have the world's best implementation team, but if they're solving the wrong problems or can't measure success, you're still wasting money.
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
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Real Results From Real Businesses</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="flex items-center justify-center mb-4">
                <Clock className="w-8 h-8 text-primary-600 mr-2" />
                <span className="text-3xl font-bold text-gray-900">2-4 weeks</span>
              </div>
              <p className="text-gray-600">Complete analysis vs. 6-12 months traditional consulting</p>
            </div>
            <div>
              <div className="flex items-center justify-center mb-4">
                <Target className="w-8 h-8 text-accent-600 mr-2" />
                <span className="text-3xl font-bold text-gray-900">$78K-$125K</span>
              </div>
              <p className="text-gray-600">Average annual savings identified per organization</p>
            </div>
            <div>
              <div className="flex items-center justify-center mb-4">
                <Zap className="w-8 h-8 text-green-600 mr-2" />
                <span className="text-3xl font-bold text-gray-900">90%+</span>
              </div>
              <p className="text-gray-600">Adoption rates vs. industry average of 30%</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features