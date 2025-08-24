import { 
  Zap, 
  Users, 
  TrendingUp, 
  Clock, 
  Target,
  BarChart3,
  CheckCircle,
  ArrowRight,
  AlertTriangle,
  Settings,
  Activity,
  Award,
  Lightbulb,
  Shield,
  UserCheck,
  Calendar
} from 'lucide-react'
import { Link } from 'react-router-dom'

const OperationsPage = () => {
  const transformations = [
    {
      title: "Customer Service Operations Breakthrough",
      issues: [
        { task: "Data entry tasks", hours: "1,690 hours annually per team member" },
        { task: "Status update calls", hours: "520 hours annually per team member" },
        { task: "System switching/lookup", hours: "430 hours annually per team member" }
      ],
      costPerEmployee: "$105,600 in non-value-added time (65% of their capacity)",
      teamImpact: [
        "2,640 hours per person redirected to customer problem-solving",
        "Customer resolution time: 2.3 days → 4.6 hours",
        "Volume capacity: +45% without adding staff",
        "Employee satisfaction: +60% (\"We actually get to help customers now\")"
      ]
    },
    {
      title: "Manufacturing Operations Excellence",
      previousState: "Production managers doing manual \"floor walks\" for status updates",
      operationalChange: "Real-time production dashboards with automated alerts",
      teamImpact: [
        "Managers transitioned from data gatherers to performance coaches",
        "Production visibility improved from hourly to real-time",
        "35% reduction in production delays through proactive issue identification",
        "Team morale improved as managers could focus on problem-solving support"
      ]
    },
    {
      title: "Administrative Operations Streamlining",
      previousState: "Invoice processing required 15 manual steps across 3 departments",
      operationalChange: "Automated workflow with approval routing and exception handling",
      teamImpact: [
        "Processing time reduced from 5 days to 4 hours",
        "Error rate decreased from 8% to 0.2%",
        "Team capacity freed up to handle 80% more volume without overtime",
        "Administrative staff transitioned to vendor relationship management"
      ]
    }
  ]

  const performanceMetrics = [
    {
      category: "Team Productivity Improvements",
      metrics: [
        { label: "Capacity Utilization", value: "40-65% increase in value-added work time" },
        { label: "Throughput", value: "50-80% more output with existing team size" },
        { label: "Quality", value: "90%+ reduction in errors through automated processes" },
        { label: "Response Time", value: "60-75% faster completion of routine operations" }
      ],
      icon: TrendingUp,
      color: "blue"
    },
    {
      category: "Operational Efficiency Gains",
      metrics: [
        { label: "Manual Work Reduction", value: "70-85% decrease in administrative overhead" },
        { label: "Handoff Improvements", value: "50-70% reduction in inter-department delays" },
        { label: "Data Accuracy", value: "95%+ improvement in information quality and timeliness" },
        { label: "Process Consistency", value: "100% adherence to standard procedures through automation" }
      ],
      icon: Settings,
      color: "green"
    },
    {
      category: "Team Engagement & Satisfaction",
      metrics: [
        { label: "Job Satisfaction", value: "35-55% improvement in \"meaningful work\" ratings" },
        { label: "Skill Utilization", value: "80%+ of team time spent on core competencies" },
        { label: "Professional Growth", value: "40% increase in advancement opportunities as capacity increases" },
        { label: "Stress Reduction", value: "45% decrease in overtime and weekend work requirements" }
      ],
      icon: Users,
      color: "purple"
    }
  ]

  const operationalExcellence = [
    {
      title: "Daily Workflow Optimization",
      improves: "Elimination of repetitive data entry, manual status updates, and administrative busy work",
      experience: "More time for strategic thinking, customer interaction, and skill development",
      benefit: "Higher quality output as people focus on work that utilizes their expertise"
    },
    {
      title: "Inter-Department Flow",
      improves: "Automated handoffs, integrated communication, and shared visibility across teams",
      experience: "Less time waiting for information or coordinating with other departments",
      benefit: "Faster end-to-end completion times with fewer errors and delays"
    },
    {
      title: "Performance Visibility",
      improves: "Real-time dashboards replace manual reporting and status meetings",
      experience: "Clear understanding of performance and priorities without constant interruptions",
      benefit: "Proactive issue identification and data-driven decision making"
    },
    {
      title: "Capacity Expansion",
      improves: "Administrative overhead reduction frees capacity for growth",
      experience: "Opportunity to take on more challenging, rewarding work",
      benefit: "Handle increased volume without proportional staff increases"
    }
  ]

  const actionPlan = [
    {
      phase: "Phase 1: Team Workflow Assessment",
      timeline: "Weeks 1-2",
      deliverables: [
        "Time-and-motion analysis of your team's current workflows",
        "Identification of top 10 productivity barriers with impact quantification",
        "Quick-win opportunities that can be implemented immediately",
        "Team input on biggest frustrations and improvement priorities"
      ],
      focus: "Understanding where your people's time really goes and which changes would have the biggest impact on their effectiveness."
    },
    {
      phase: "Phase 2: Workflow Redesign",
      timeline: "Weeks 3-4",
      deliverables: [
        "Optimized workflow designs that eliminate bottlenecks and manual handoffs",
        "Technology integration plan showing exactly how automation fits into daily operations",
        "Change management strategy to ensure smooth adoption by your team",
        "Expected productivity improvements with specific metrics and timelines"
      ],
      focus: "Practical solutions your team will actually use and adopt enthusiastically."
    },
    {
      phase: "Phase 3: Implementation Support",
      timeline: "Month 2",
      deliverables: [
        "Hands-on support implementing workflow improvements",
        "Team training on new processes with focus on benefits to their daily work",
        "Real-time monitoring setup to track productivity improvements",
        "Troubleshooting support to ensure smooth transition"
      ],
      focus: "Getting results quickly while maintaining service quality and team morale."
    },
    {
      phase: "Phase 4: Performance Optimization",
      timeline: "Months 3-6",
      deliverables: [
        "Advanced analytics on team performance and workflow efficiency",
        "Continuous improvement recommendations based on actual usage data",
        "Scaling strategies to apply successful improvements to other areas",
        "Long-term operational excellence roadmap with KPI tracking"
      ],
      focus: "Building systematic capability for ongoing operational improvement and growth."
    }
  ]

  const operationsImpact = [
    {
      timeframe: "Week 1-2: Immediate Relief",
      outcomes: [
        "Quick elimination of most frustrating manual tasks",
        "Instant improvement in team morale as barriers are removed",
        "Initial productivity gains of 20-30% in targeted areas",
        "Clear visibility into workflow efficiency with baseline metrics"
      ]
    },
    {
      timeframe: "Month 1-3: Systematic Improvement",
      outcomes: [
        "Comprehensive workflow optimization delivering 50-70% productivity gains",
        "Error rates reduced to near-zero through automated quality controls",
        "Team capacity expanded by 40-60% without adding headcount",
        "Employee satisfaction improvements as work becomes more engaging"
      ]
    },
    {
      timeframe: "Month 3-12: Operational Excellence",
      outcomes: [
        "Industry-leading efficiency with sustainable competitive advantages",
        "Team operating at full potential with minimal administrative overhead",
        "Continuous improvement culture with employee-driven optimization",
        "Scalability platform supporting business growth without linear cost increases"
      ]
    },
    {
      timeframe: "Your Role Transformation",
      outcomes: [
        "From: Firefighting daily operational issues → To: Strategic leadership and team development",
        "From: Managing administrative processes → To: Optimizing performance and driving growth",
        "From: Reporting problems upward → To: Delivering consistent operational excellence"
      ]
    }
  ]

  const testimonials = [
    {
      quote: "My team went from spending 60% of their time on administrative work to less than 15%. Now they're actually doing the strategic work I hired them for.",
      role: "Manufacturing Operations Manager"
    },
    {
      quote: "The automated workflows eliminated so much friction that my people started volunteering for additional projects. Their engagement level completely transformed.",
      role: "Customer Service Operations Manager"
    },
    {
      quote: "I used to spend most of my time gathering information to report upward. Now I spend it coaching my team and planning improvements. It's the management job I thought I was taking.",
      role: "Administrative Operations Manager"
    }
  ]

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 via-white to-blue-50 py-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-6">
              <Activity className="w-4 h-4 mr-2" />
              Prismscope for Operations Managers
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Unlock Your Team's
              <span className="block bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Full Potential Every Day
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Free your people from the repetitive tasks that slow them down and watch productivity soar 
              as they focus on the high-impact work that drives real business results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/demo" 
                className="btn-primary text-lg flex items-center justify-center"
              >
                Check out the demo
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <button 
                className="btn-secondary text-lg"
                onClick={() => window.location.href = 'https://my.prismscope.ai'}
              >
                Start Free Assessment
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Operations Challenge Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="bg-orange-50 border-l-4 border-orange-500 p-8 rounded-lg mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <AlertTriangle className="w-8 h-8 text-orange-500 mr-3" />
                The Operations Challenge You're Managing
              </h2>
              <p className="text-lg italic text-gray-700 mb-6">
                "I know my team is capable of so much more, but they're constantly bogged down in manual processes, 
                system workarounds, and administrative busy work. How do I remove these barriers so they can operate at full capacity?"
              </p>
              <div className="space-y-3">
                <p className="font-semibold text-gray-900 mb-2">You're seeing these daily operational friction points:</p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700">Talented team members spending hours on data entry instead of analysis</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700">Manual handoffs between departments causing delays and errors</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700">Systems that don't talk to each other, requiring duplicate work</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700">Time wasted on status updates instead of value-creating activities</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700">Team capacity limited by administrative overhead rather than actual workload</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 p-4 bg-white rounded-lg">
                <p className="font-semibold text-green-600">
                  The operational reality: Your people want to deliver excellent results, but inefficient processes 
                  are preventing them from performing at their best.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How We Optimize Daily Operations */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How We Optimize Daily Operations
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Step 1: Organizational Issue & Time Tracking Analysis</h3>
              <p className="text-gray-600">
                We survey everyone in your organization to identify the specific problems limiting your team's effectiveness 
                and calculate exactly how many hours they're spending on each inefficient process - giving you concrete data 
                on where capacity is being wasted.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Step 2: Capacity Liberation Strategy</h3>
              <p className="text-gray-600">
                We design solutions that eliminate routine administrative tasks through smart automation, 
                freeing your team's capacity for strategic and customer-facing work.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Step 3: Operational Excellence Roadmap</h3>
              <p className="text-gray-600">
                You receive a practical implementation plan that removes barriers systematically while maintaining 
                quality and control standards.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Step 4: Performance KPI Framework</h3>
              <p className="text-gray-600">
                We create measurement systems that track how workflow improvements translate to productivity gains, 
                quality improvements, and team satisfaction increases.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Operations Team Transformations */}
      <section id="transformations" className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
              <Lightbulb className="w-4 h-4 mr-2" />
              Operations Team Transformations
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Real Team Impact Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how we've helped operations managers unlock their team's full potential
            </p>
          </div>
          
          <div className="space-y-8 max-w-6xl mx-auto">
            {transformations.map((transformation, index) => (
              <div key={index} className="bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">{transformation.title}</h3>
                
                {transformation.issues && (
                  <div className="mb-6">
                    <p className="text-sm text-blue-600 font-semibold mb-3">Organizational Issues Identified:</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      {transformation.issues.map((issue, idx) => (
                        <div key={idx} className="bg-red-50 p-4 rounded-lg">
                          <p className="font-semibold text-red-800">{issue.task}</p>
                          <p className="text-red-600 text-sm mt-1">{issue.hours}</p>
                        </div>
                      ))}
                    </div>
                    <div className="bg-red-100 p-4 rounded-lg mb-4">
                      <p className="text-sm text-red-600 font-semibold mb-1">Cost Per Employee:</p>
                      <p className="text-red-800">{transformation.costPerEmployee}</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="text-sm text-green-600 font-semibold mb-3">Team Impact After Solution:</p>
                      <ul className="space-y-2">
                        {transformation.teamImpact.map((impact, idx) => (
                          <li key={idx} className="flex items-start">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-green-800">{impact}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
                
                {transformation.previousState && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm text-red-600 font-semibold mb-2">Previous State:</p>
                      <p className="text-gray-700 mb-4">{transformation.previousState}</p>
                      <p className="text-sm text-blue-600 font-semibold mb-2">Operational Change:</p>
                      <p className="text-gray-700">{transformation.operationalChange}</p>
                    </div>
                    <div>
                      <p className="text-sm text-green-600 font-semibold mb-3">Team Impact:</p>
                      <ul className="space-y-2">
                        {transformation.teamImpact.map((impact, idx) => (
                          <li key={idx} className="flex items-start">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{impact}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Operations Performance Metrics */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Operations Performance Metrics
            </h2>
            <p className="text-xl text-gray-600">
              Measurable improvements across all operational dimensions
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {performanceMetrics.map((category, index) => {
              const IconComponent = category.icon
              const colorClasses = {
                blue: 'text-blue-600 bg-blue-100',
                green: 'text-green-600 bg-green-100',
                purple: 'text-purple-600 bg-purple-100'
              }
              
              return (
                <div key={index} className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 ${colorClasses[category.color]}`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    {category.category}
                  </h3>
                  <div className="space-y-4">
                    {category.metrics.map((metric, idx) => (
                      <div key={idx} className="border-l-2 border-primary-200 pl-4">
                        <p className="font-semibold text-gray-900 text-sm">{metric.label}</p>
                        <p className="text-gray-600 text-sm mt-1">{metric.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why Operations Managers Choose Prismscope */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Operations Managers Choose Prismscope
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-blue-50 to-white border border-blue-200 rounded-xl p-6">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Settings className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-3">Practical, Implementable Solutions</h3>
              <p className="text-sm text-gray-600">
                We focus on real workflow improvements that your team can start using immediately, not complex 
                technology projects that disrupt operations for months.
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-white border border-green-200 rounded-xl p-6">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-3">Team-Centric Approach</h3>
              <p className="text-sm text-gray-600">
                Every solution considers how changes affect your people's daily experience. Improvements that make 
                work easier get adopted quickly and sustained long-term.
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-white border border-purple-200 rounded-xl p-6">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-3">Measurable Operational Impact</h3>
              <p className="text-sm text-gray-600">
                Clear metrics showing how workflow changes translate to productivity gains, quality improvements, 
                and team satisfaction increases.
              </p>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-white border border-orange-200 rounded-xl p-6">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-5 h-5 text-orange-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-3">Scalable Implementation</h3>
              <p className="text-sm text-gray-600">
                Start with quick wins that build momentum, then scale to comprehensive operational excellence without 
                overwhelming your team or disrupting service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Operational Excellence Results */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-accent-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Operational Excellence Results
            </h2>
            <p className="text-xl text-gray-600">
              Comprehensive transformation across all operational dimensions
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {operationalExcellence.map((excellence, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{excellence.title}</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-blue-600 font-semibold mb-1">What Improves:</p>
                    <p className="text-gray-700">{excellence.improves}</p>
                  </div>
                  <div>
                    <p className="text-sm text-green-600 font-semibold mb-1">Team Experience:</p>
                    <p className="text-gray-700">{excellence.experience}</p>
                  </div>
                  <div>
                    <p className="text-sm text-purple-600 font-semibold mb-1">Operational Benefit:</p>
                    <p className="text-gray-700">{excellence.benefit}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Analysis */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Operations Investment Analysis
            </h2>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-5xl mx-auto mb-8">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Operational Need</th>
                    <th className="text-left py-4 px-6 font-semibold text-red-600">Traditional Approach</th>
                    <th className="text-left py-4 px-6 font-semibold text-primary-600">Prismscope Solution</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-gray-200">
                    <td className="py-4 px-6 font-medium">Process Improvement</td>
                    <td className="py-4 px-6 text-red-600">Hire more staff</td>
                    <td className="py-4 px-6 text-primary-600 font-semibold">Automate routine work</td>
                  </tr>
                  <tr className="border-t border-gray-200 bg-gray-50">
                    <td className="py-4 px-6 font-medium">Quality Control</td>
                    <td className="py-4 px-6 text-red-600">More inspection</td>
                    <td className="py-4 px-6 text-primary-600 font-semibold">Built-in error prevention</td>
                  </tr>
                  <tr className="border-t border-gray-200">
                    <td className="py-4 px-6 font-medium">Capacity Expansion</td>
                    <td className="py-4 px-6 text-red-600">Add headcount</td>
                    <td className="py-4 px-6 text-primary-600 font-semibold">Optimize existing team utilization</td>
                  </tr>
                  <tr className="border-t border-gray-200 bg-gray-50">
                    <td className="py-4 px-6 font-medium">Performance Monitoring</td>
                    <td className="py-4 px-6 text-red-600">Manual reporting</td>
                    <td className="py-4 px-6 text-primary-600 font-semibold">Real-time visibility dashboards</td>
                  </tr>
                  <tr className="border-t border-gray-200">
                    <td className="py-4 px-6 font-medium">Cross-Training</td>
                    <td className="py-4 px-6 text-red-600">Extensive documentation</td>
                    <td className="py-4 px-6 text-primary-600 font-semibold">Simplified, automated workflows</td>
                  </tr>
                  <tr className="border-t border-gray-200 bg-gray-50">
                    <td className="py-4 px-6 font-medium">Scalability</td>
                    <td className="py-4 px-6 text-red-600">Linear growth model</td>
                    <td className="py-4 px-6 text-primary-600 font-semibold">Leverage technology for exponential capacity</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-blue-50 p-6 rounded-lg text-center">
              <p className="text-lg font-semibold text-blue-800 mb-2">Investment</p>
              <p className="text-2xl font-bold text-blue-900">$25K-$100K</p>
              <p className="text-blue-700 text-sm">For comprehensive workflow optimization</p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg text-center">
              <p className="text-lg font-semibold text-green-800 mb-2">Payback</p>
              <p className="text-2xl font-bold text-green-900">6-12 months</p>
              <p className="text-green-700 text-sm">Through productivity gains and error reduction</p>
            </div>
            <div className="bg-purple-50 p-6 rounded-lg text-center">
              <p className="text-lg font-semibold text-purple-800 mb-2">Ongoing Value</p>
              <p className="text-2xl font-bold text-purple-900">Sustained</p>
              <p className="text-purple-700 text-sm">Operational excellence with continuous improvement</p>
            </div>
          </div>
        </div>
      </section>

      {/* Operations Manager Action Plan */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Operations Manager Action Plan
            </h2>
            <p className="text-xl text-gray-600">
              Systematic approach to team productivity optimization
            </p>
          </div>
          
          <div className="max-w-5xl mx-auto">
            <div className="space-y-8">
              {actionPlan.map((phase, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-shadow">
                  <div className="flex items-start mb-6">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <span className="text-green-600 font-bold">{index + 1}</span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{phase.phase}</h3>
                      <p className="text-gray-500 mt-1">{phase.timeline}</p>
                    </div>
                  </div>
                  <div className="ml-16">
                    <p className="text-sm text-blue-600 font-semibold mb-3">What You Get:</p>
                    <ul className="space-y-2 mb-4">
                      {phase.deliverables.map((deliverable, idx) => (
                        <li key={idx} className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{deliverable}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-green-600 font-semibold mb-1">Operational Focus:</p>
                      <p className="text-gray-700">{phase.focus}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Operations Impact Timeline */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              The Operations Impact You'll See
            </h2>
            <p className="text-xl text-gray-600">
              Progressive transformation from immediate relief to operational excellence
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {operationsImpact.map((impact, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{impact.timeframe}</h3>
                <ul className="space-y-3">
                  {impact.outcomes.map((outcome, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Operations Manager Fast Track CTA */}
      <section className="py-20 bg-green-900">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              Operations Manager Fast Track
            </h2>
            
            <div className="bg-green-800 rounded-xl p-8 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-green-200 font-semibold mb-2">Immediate Next Step:</p>
                  <p className="text-white">Team workflow analysis with productivity improvement projections</p>
                </div>
                <div>
                  <p className="text-green-200 font-semibold mb-2">Timeline:</p>
                  <p className="text-white">Initial assessment within 1 week, recommendations within 2 weeks</p>
                </div>
                <div>
                  <p className="text-green-200 font-semibold mb-2">Implementation:</p>
                  <p className="text-white">Start seeing results within 30 days</p>
                </div>
                <div>
                  <p className="text-green-200 font-semibold mb-2">Approach:</p>
                  <p className="text-white">Practical insights you can start using immediately</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-8 mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                What You'll Get In The First Call:
              </h3>
              <ul className="text-left max-w-2xl mx-auto space-y-3 text-gray-700">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Team capacity analysis showing where productivity is being lost</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Top 3 workflow improvements with immediate impact potential</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Implementation timeline that won't disrupt your current operations</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>ROI projections based on your team's current performance metrics</span>
                </li>
              </ul>
            </div>
            
            <button 
              className="bg-white text-green-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center mx-auto"
              onClick={() => window.location.href = 'https://my.prismscope.ai'}
            >
              Start Team Assessment
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <blockquote className="text-xl italic text-gray-700 mb-4">
              "The best operations managers understand that their people want to excel, but inefficient processes prevent peak performance. 
              Remove the barriers, and watch your team's capabilities multiply."
            </blockquote>
            <p className="text-gray-600">
              — Christopher Harrison, PhD, Prismscope Founder
            </p>
          </div>
        </div>
      </section>

      {/* Operations Manager Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-4">
              <UserCheck className="w-4 h-4 mr-2" />
              Real Operations Manager Feedback
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              What Operations Managers Are Saying
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
                <blockquote className="text-gray-700 mb-4 italic">
                  "{testimonial.quote}"
                </blockquote>
                <p className="text-sm text-gray-500">— {testimonial.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Operations Excellence Guarantee */}
      <section className="py-16 bg-blue-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
                <Shield className="w-4 h-4 mr-2" />
                Operations Excellence Guarantee
              </div>
              <h2 className="text-3xl font-bold text-gray-900">
                Our Commitment to Team Success
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">Team Performance Promise</h3>
                <p className="text-gray-600">Measurable productivity improvements within 30 days</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">Implementation Support</h3>
                <p className="text-gray-600">Hands-on assistance ensuring smooth workflow transitions</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">Employee Satisfaction</h3>
                <p className="text-gray-600">Solutions that make work more efficient AND more enjoyable</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">Scalability</h3>
                <p className="text-gray-600">Operational improvements that support business growth without complexity increases</p>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <p className="text-lg font-semibold text-blue-600">
                Transform your team's potential into consistent operational excellence.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default OperationsPage