import { 
  Heart, 
  Users, 
  TrendingUp, 
  Clock, 
  Target,
  BarChart3,
  CheckCircle,
  ArrowRight,
  AlertTriangle,
  Zap,
  Award,
  UserCheck,
  Lightbulb,
  Shield
} from 'lucide-react'

const HRPage = () => {
  const transformations = [
    {
      title: "Marketing Team Transformation",
      issue: "Marketing analysts spending 780 hours annually on manual report generation that managers barely read",
      cost: "$46,800 in professional time + $23,400 in missed strategic opportunities = $70,200 annual impact",
      solution: "Automated dashboards and exception-based reporting",
      employeeImpact: "780 hours freed for strategic campaign development, 40% increase in job satisfaction",
      businessResult: "3 internal promotions within 6 months, zero voluntary departures (previously lost 2-3 analysts annually)",
      icon: BarChart3
    },
    {
      title: "Customer Service Revolution",
      before: "Reps spent 60% of time on data entry and status updates",
      after: "Workflow automation let them focus on complex problem-solving",
      employeeImpact: "Customer satisfaction scores improved 35%, team morale up 50%",
      careerGrowth: "5 reps promoted to senior roles, 2 moved into management",
      icon: Users
    },
    {
      title: "Operations Team Empowerment",
      before: "Managers doing \"floor checks\" because system data was unreliable",
      after: "Real-time dashboards provided accurate, instant visibility",
      employeeImpact: "Managers became coaches instead of data-gatherers",
      development: "60% of team enrolled in leadership development programs",
      icon: TrendingUp
    }
  ]

  const hrMetrics = [
    {
      category: "Employee Engagement Improvements",
      metrics: [
        { label: "Job Satisfaction", value: "25-40% increase within 6 months" },
        { label: "Meaningful Work Perception", value: "50-60% improvement in \"using my skills\" ratings" },
        { label: "Work-Life Balance", value: "30% reduction in overtime/weekend work" },
        { label: "Internal Mobility", value: "40% increase in internal promotions and lateral moves" }
      ],
      icon: Heart,
      color: "red"
    },
    {
      category: "Retention & Attraction Benefits",
      metrics: [
        { label: "Voluntary Turnover", value: "30-50% reduction in first 12 months" },
        { label: "High Performer Retention", value: "80%+ retention rate of top talent" },
        { label: "Recruitment Advantage", value: "\"Great place to work\" becomes authentic recruiting tool" },
        { label: "Time-to-Fill", value: "25% faster hiring as reputation improves" }
      ],
      icon: UserCheck,
      color: "green"
    },
    {
      category: "Development & Growth Outcomes",
      metrics: [
        { label: "Skill Utilization", value: "70% increase in employees using their core competencies daily" },
        { label: "Learning Participation", value: "45% more enrollment in development programs" },
        { label: "Innovation Metrics", value: "3x more employee-generated improvement ideas" },
        { label: "Career Progression", value: "60% increase in internal promotions within 18 months" }
      ],
      icon: Award,
      color: "blue"
    }
  ]

  const cultureAdvantages = [
    {
      title: "Meaningful Work Every Day",
      change: "Employees spend 60-80% more time on work that uses their core skills",
      experience: "Higher job satisfaction as people do work they find fulfilling",
      impact: "Better quality outcomes when people focus on what they do best"
    },
    {
      title: "Professional Growth Acceleration",
      change: "Time freed from administrative tasks can be invested in development",
      experience: "Faster skill building and career advancement opportunities",
      impact: "Stronger internal pipeline for leadership positions"
    },
    {
      title: "Innovation & Creativity Unleashed",
      change: "Mental energy redirected from mundane tasks to strategic thinking",
      experience: "More opportunities to contribute ideas and solve interesting problems",
      impact: "Employee-driven innovations and process improvements"
    },
    {
      title: "Work-Life Integration Success",
      change: "Efficient processes reduce overtime and weekend work",
      experience: "Better balance leads to higher overall life satisfaction",
      impact: "Reduced burnout, lower healthcare costs, sustained performance"
    }
  ]

  const roadmap = [
    {
      phase: "Phase 1: Employee Voice Analysis",
      timeline: "Weeks 1-2",
      happens: "Anonymous survey identifying biggest frustrations and energy drains",
      deliverable: "Report on soul-crushing tasks by department and role level",
      decision: "Prioritize which improvements will have biggest employee impact"
    },
    {
      phase: "Phase 2: Solution Design Workshop",
      timeline: "Weeks 3-4",
      happens: "Collaborative session designing employee-friendly automation solutions",
      deliverable: "Employee experience roadmap showing before/after day-in-the-life scenarios",
      decision: "Build change management strategy for smooth adoption"
    },
    {
      phase: "Phase 3: Change Champion Program",
      timeline: "Month 2",
      happens: "Train internal champions to help teams embrace new solutions",
      deliverable: "Communication plan emphasizing employee benefits over business efficiency",
      decision: "Launch pilot program with most engaged departments first"
    },
    {
      phase: "Phase 4: Culture Transformation Tracking",
      timeline: "Months 3-12",
      happens: "Monitor satisfaction, engagement, and retention improvements",
      deliverable: "Monthly dashboard showing people metrics alongside operational gains",
      decision: "Data proving that employee satisfaction drives business results"
    }
  ]

  const peopleImpact = [
    {
      group: "High Performers",
      benefits: [
        "Challenging, strategic work that utilizes their full skill set",
        "Clear path for growth as they take on more complex responsibilities",
        "Recognition for contributions beyond just completing administrative tasks",
        "Reason to stay and build their career with your organization"
      ]
    },
    {
      group: "Developing Talent",
      benefits: [
        "Mentoring time freed up as senior people aren't buried in busy work",
        "Learning opportunities as routine tasks become automated",
        "Exposure to higher-level thinking and problem-solving",
        "Accelerated development through meaningful project involvement"
      ]
    },
    {
      group: "Managers",
      benefits: [
        "Coaching time instead of data-gathering time",
        "Strategic conversations with their teams about growth and development",
        "Clear visibility into team performance without manual tracking",
        "Leadership development opportunities as operational friction decreases"
      ]
    },
    {
      group: "Organization",
      benefits: [
        "Reputation as an employer that values people's time and talents",
        "Internal referral program success as employees actively recruit friends",
        "Succession planning success as people grow into leadership roles",
        "Culture of innovation as minds are freed to think strategically"
      ]
    }
  ]

  const testimonials = [
    {
      quote: "Finally, I get to spend my time on strategy instead of spreadsheets. This is the job I thought I was taking when I got hired.",
      role: "Marketing Manager"
    },
    {
      quote: "I didn't realize how much those manual processes were draining my energy until they were gone. Now I actually look forward to Monday mornings.",
      role: "Operations Analyst"
    },
    {
      quote: "My manager has time to coach me now instead of just asking for status updates. I've learned more in the past 6 months than the previous 2 years.",
      role: "Junior Analyst"
    }
  ]

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-50 via-white to-pink-50 py-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 bg-red-100 text-red-800 rounded-full text-sm font-medium mb-6">
              <Heart className="w-4 h-4 mr-2" />
              Prismscope for HR Professionals
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Give Every Employee A Voice In
              <span className="block bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                Workplace Improvement
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Survey everyone in your organization to discover what they personally consider soul-crushing work, 
              then eliminate those inefficiencies to create an environment where people love their jobs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                className="btn-primary text-lg flex items-center justify-center"
                onClick={() => window.location.href = 'https://my.prismscope.ai'}
              >
                Start Employee Assessment
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
              <a 
                href="#transformations" 
                className="btn-secondary text-lg"
              >
                See Employee Impact
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* HR Challenge Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="bg-orange-50 border-l-4 border-orange-500 p-8 rounded-lg mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <AlertTriangle className="w-8 h-8 text-orange-500 mr-3" />
                The HR Challenge You're Managing
              </h2>
              <p className="text-lg italic text-gray-700 mb-6">
                "Our talented employees are spending too much time on administrative tasks instead of the strategic work they were hired to do. 
                I can see the frustration building, and I'm worried about retention. How do I create a workplace that actually energizes people?"
              </p>
              <div className="space-y-3">
                <p className="font-semibold text-gray-900 mb-2">You're seeing these warning signs:</p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700">High performers complaining about "boring" administrative work</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700">Exit interviews mentioning repetitive tasks and lack of meaningful work</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700">Talented candidates choosing competitors who promise more engaging roles</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700">Employee engagement scores stagnant despite other culture initiatives</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700">Teams saying they're "too busy" to participate in development programs</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 p-4 bg-white rounded-lg">
                <p className="font-semibold text-red-600">
                  The hidden issue: Your best people aren't leaving because of salary or benefits. 
                  They're leaving because their days are filled with work that doesn't utilize their talents.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How We Create Workplaces Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How We Create Workplaces People Love
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Step 1: Quantify What's Draining Your People</h3>
              <p className="text-gray-600">
                We survey everyone in your organization to identify the specific tasks that are killing employee motivation 
                and calculate exactly how many hours your talented people waste on soul-crushing work - then show you the true cost 
                in both dollars and talent retention risk.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Step 2: Design Solutions That Energize</h3>
              <p className="text-gray-600">
                We show you how to eliminate soul-crushing busy work through smart automation, 
                freeing your team to focus on strategic, creative, and high-impact activities.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Step 3: Build Your Talent Retention Roadmap</h3>
              <p className="text-gray-600">
                You receive an implementation plan that prioritizes changes based on both employee satisfaction impact and business results.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Step 4: Create Employee Satisfaction KPIs</h3>
              <p className="text-gray-600">
                We establish measurement systems that track how process improvements translate to engagement, satisfaction, and retention improvements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Employee Experience Transformations */}
      <section id="transformations" className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-6">
              <Lightbulb className="w-4 h-4 mr-2" />
              Employee Experience Transformations
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Real People, Real Results
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how we've helped teams transform from frustration to fulfillment
            </p>
          </div>
          
          <div className="space-y-8 max-w-6xl mx-auto">
            {transformations.map((transformation, index) => {
              const IconComponent = transformation.icon
              return (
                <div key={index} className="bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-xl p-8">
                  <div className="flex items-start mb-6">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <IconComponent className="w-6 h-6 text-primary-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">{transformation.title}</h3>
                  </div>
                  
                  {transformation.issue && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                      <div>
                        <p className="text-sm text-gray-500 mb-2">Organizational Issue Identified:</p>
                        <p className="text-gray-700 mb-4">{transformation.issue}</p>
                        <p className="text-sm text-gray-500 mb-2">Hidden Cost:</p>
                        <p className="text-gray-700 mb-4">{transformation.cost}</p>
                        <p className="text-sm text-gray-500 mb-2">Solution:</p>
                        <p className="text-gray-700">{transformation.solution}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-2">Employee Impact:</p>
                        <p className="text-gray-700 mb-4">{transformation.employeeImpact}</p>
                        <div className="bg-green-100 rounded-lg p-4">
                          <p className="text-sm text-green-600 font-semibold">Business Result:</p>
                          <p className="text-green-800">{transformation.businessResult}</p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {transformation.before && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <div className="mb-4">
                          <p className="text-sm text-red-500 font-semibold mb-2">Before:</p>
                          <p className="text-gray-700">{transformation.before}</p>
                        </div>
                        <div>
                          <p className="text-sm text-green-500 font-semibold mb-2">After:</p>
                          <p className="text-gray-700">{transformation.after}</p>
                        </div>
                      </div>
                      <div>
                        <div className="mb-4">
                          <p className="text-sm text-blue-500 font-semibold mb-2">Employee Impact:</p>
                          <p className="text-gray-700">{transformation.employeeImpact}</p>
                        </div>
                        <div className="bg-blue-100 rounded-lg p-4">
                          <p className="text-sm text-blue-600 font-semibold">
                            {transformation.careerGrowth ? 'Career Growth:' : 'Leadership Development:'}
                          </p>
                          <p className="text-blue-800">{transformation.careerGrowth || transformation.development}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* HR Metrics Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              The HR Metrics That Matter
            </h2>
            <p className="text-xl text-gray-600">
              Measurable improvements that matter to both people and business
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {hrMetrics.map((category, index) => {
              const IconComponent = category.icon
              const colorClasses = {
                red: 'text-red-600 bg-red-100',
                green: 'text-green-600 bg-green-100',
                blue: 'text-blue-600 bg-blue-100'
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

      {/* Why HR Teams Choose Prismscope */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why HR Teams Choose Prismscope
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-red-50 to-white border border-red-200 rounded-xl p-6">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <Heart className="w-5 h-5 text-red-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-3">Employee-First Approach</h3>
              <p className="text-sm text-gray-600">
                We don't just optimize processes - we optimize the employee experience. Every recommendation considers both business impact and how it affects your people's day-to-day satisfaction.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-white border border-blue-200 rounded-xl p-6">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-3">Culture-Conscious Implementation</h3>
              <p className="text-sm text-gray-600">
                Change management strategies that help teams embrace technology as an enabler of better work, not a threat to job security.
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-white border border-green-200 rounded-xl p-6">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-3">Measurable People Outcomes</h3>
              <p className="text-sm text-gray-600">
                Track employee satisfaction, engagement, and retention improvements alongside operational metrics. Show executives that happy employees drive business results.
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-white border border-purple-200 rounded-xl p-6">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Target className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-3">Talent Strategy Alignment</h3>
              <p className="text-sm text-gray-600">
                Solutions that support your broader talent management goals: attraction, development, retention, and succession planning.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Workplace Culture Advantages */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-accent-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Workplace Culture Advantages
            </h2>
            <p className="text-xl text-gray-600">
              Transform your workplace into an environment where people thrive
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {cultureAdvantages.map((advantage, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{advantage.title}</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-blue-600 font-semibold mb-1">What Changes:</p>
                    <p className="text-gray-700">{advantage.change}</p>
                  </div>
                  <div>
                    <p className="text-sm text-green-600 font-semibold mb-1">Employee Experience:</p>
                    <p className="text-gray-700">{advantage.experience}</p>
                  </div>
                  <div>
                    <p className="text-sm text-purple-600 font-semibold mb-1">Business Impact:</p>
                    <p className="text-gray-700">{advantage.impact}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Comparison */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              HR Investment Comparison
            </h2>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-4xl mx-auto">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Initiative Type</th>
                    <th className="text-left py-4 px-6 font-semibold text-red-600">Traditional Approach</th>
                    <th className="text-left py-4 px-6 font-semibold text-primary-600">Prismscope</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-gray-200">
                    <td className="py-4 px-6 font-medium">Employee Engagement Programs</td>
                    <td className="py-4 px-6 text-red-600">$50K-100K annually</td>
                    <td className="py-4 px-6 text-primary-600 font-semibold">Process improvements: $25K-75K</td>
                  </tr>
                  <tr className="border-t border-gray-200 bg-gray-50">
                    <td className="py-4 px-6 font-medium">Retention Initiatives</td>
                    <td className="py-4 px-6 text-red-600">10-15% annual turnover</td>
                    <td className="py-4 px-6 text-primary-600 font-semibold">5-8% annual turnover</td>
                  </tr>
                  <tr className="border-t border-gray-200">
                    <td className="py-4 px-6 font-medium">Recruitment Costs</td>
                    <td className="py-4 px-6 text-red-600">$15K per professional hire</td>
                    <td className="py-4 px-6 text-primary-600 font-semibold">25% reduction through reputation</td>
                  </tr>
                  <tr className="border-t border-gray-200 bg-gray-50">
                    <td className="py-4 px-6 font-medium">Training & Development</td>
                    <td className="py-4 px-6 text-red-600">Limited participation</td>
                    <td className="py-4 px-6 text-primary-600 font-semibold">45% increase in engagement</td>
                  </tr>
                  <tr className="border-t border-gray-200">
                    <td className="py-4 px-6 font-medium">Culture Change Timeline</td>
                    <td className="py-4 px-6 text-red-600">18-24 months</td>
                    <td className="py-4 px-6 text-primary-600 font-semibold">6-12 months with process changes</td>
                  </tr>
                  <tr className="border-t border-gray-200 bg-gray-50">
                    <td className="py-4 px-6 font-medium">Measurable ROI</td>
                    <td className="py-4 px-6 text-red-600">Difficult to quantify</td>
                    <td className="py-4 px-6 text-primary-600 font-semibold">Clear metrics on satisfaction & retention</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* HR Implementation Roadmap */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              HR Implementation Roadmap
            </h2>
            <p className="text-xl text-gray-600">
              Step-by-step approach to culture transformation
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {roadmap.map((phase, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-3">
                        <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-4">
                          <span className="text-red-600 font-bold">{index + 1}</span>
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">{phase.phase}</h3>
                          <p className="text-sm text-gray-500">{phase.timeline}</p>
                        </div>
                      </div>
                      <div className="ml-14 space-y-4">
                        <div>
                          <p className="text-sm text-gray-500 mb-1">What Happens:</p>
                          <p className="text-gray-700">{phase.happens}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">HR Deliverable:</p>
                          <p className="text-gray-700">{phase.deliverable}</p>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-500 mb-1">Next Step Decision:</p>
                          <p className="text-gray-700">{phase.decision}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* People Impact Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              The People Impact You'll Create
            </h2>
            <p className="text-xl text-gray-600">
              Transforming every level of your organization
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {peopleImpact.map((group, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">For Your {group.group}:</h3>
                <ul className="space-y-3">
                  {group.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HR Fast Track CTA */}
      <section className="py-20 bg-red-900">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              HR Fast Track Program
            </h2>
            
            <div className="bg-red-800 rounded-xl p-8 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-red-200 font-semibold mb-2">Immediate Next Step:</p>
                  <p className="text-white">Employee satisfaction assessment</p>
                </div>
                <div>
                  <p className="text-red-200 font-semibold mb-2">Timeline:</p>
                  <p className="text-white">Initial insights within 1 week, full analysis within 3 weeks</p>
                </div>
                <div>
                  <p className="text-red-200 font-semibold mb-2">Investment:</p>
                  <p className="text-white">Free individual assessment, paid organizational reports</p>
                </div>
                <div>
                  <p className="text-red-200 font-semibold mb-2">Focus:</p>
                  <p className="text-white">People outcomes, not just process efficiency</p>
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
                  <span>Anonymous employee frustration analysis</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Retention risk assessment based on current workflow issues</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Culture improvement roadmap with specific satisfaction impact projections</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Change management strategy for smooth technology adoption</span>
                </li>
              </ul>
            </div>
            
            <button 
              className="bg-white text-red-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center mx-auto"
              onClick={() => window.location.href = 'https://my.prismscope.ai'}
            >
              Start Employee Assessment
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
              "Great workplaces aren't created by perks and benefits alone. They're built by eliminating the daily frustrations 
              that prevent people from doing work they're passionate about."
            </blockquote>
            <p className="text-gray-600">
              — Christopher Harrison, PhD, Prismscope Founder
            </p>
          </div>
        </div>
      </section>

      {/* Employee Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-4">
              <UserCheck className="w-4 h-4 mr-2" />
              Employee Testimonial Program
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              What Employees Are Saying
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

      {/* HR Success Guarantee */}
      <section className="py-16 bg-green-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-4">
                <Shield className="w-4 h-4 mr-2" />
                HR Success Guarantee
              </div>
              <h2 className="text-3xl font-bold text-gray-900">
                Our Commitment to People Success
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">Employee Impact Promise</h3>
                <p className="text-gray-600">Measurable improvement in job satisfaction scores within 6 months</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">Retention Results</h3>
                <p className="text-gray-600">Reduced voluntary turnover in first year or continued support at no cost</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">Culture Metrics</h3>
                <p className="text-gray-600">Clear tracking of engagement, satisfaction, and retention improvements</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">People-First Approach</h3>
                <p className="text-gray-600">Every solution designed with employee experience as the primary consideration</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HRPage