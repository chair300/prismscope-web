import { 
  TrendingUp, 
  DollarSign, 
  Clock, 
  Shield, 
  Target,
  BarChart3,
  CheckCircle,
  ArrowRight,
  AlertCircle,
  Zap,
  Building2,
  Users
} from 'lucide-react'

const ExecutivesPage = () => {
  const roiResults = [
    {
      industry: "Manufacturing Company - $2.3M Revenue",
      issue: "Employees spending 847 hours annually copying production data between ERP and CRM systems",
      cost: "$42,350 in wasted labor + $15,200 in error correction = $57,550 annual cost",
      investment: "$45K in automation",
      savings: "$57,550 + efficiency gains = $380K total return",
      roi: "744% in first year"
    },
    {
      industry: "Professional Services - $8M Revenue",
      issue: "Project managers spending 1,240 hours annually on manual status reports that could be automated",
      cost: "$96,200 in professional time + $28,500 in opportunity cost = $124,700 annual cost",
      investment: "$65K in process automation",
      savings: "$124,700 + scalability gains = $520K total return",
      roi: "700% in first year"
    },
    {
      industry: "Distribution Business - $15M Revenue",
      issue: "Warehouse staff spending 2,080 hours annually on manual inventory tracking and customer status calls",
      cost: "$72,800 in labor costs + $45,600 in error-related costs = $118,400 annual cost",
      investment: "$85K in integrated automation",
      savings: "$118,400 + customer retention value = $750K total return",
      roi: "782% in first year"
    }
  ]

  const dashboardMetrics = [
    {
      category: "Clear Financial Metrics",
      metrics: [
        { label: "Cost Reduction", value: "$150K - $500K+ annually for mid-size businesses" },
        { label: "Productivity Gains", value: "25-40% improvement in key operational metrics" },
        { label: "Payback Period", value: "3-6 months on most automation initiatives" },
        { label: "3-Year NPV", value: "$500K - $1.5M+ depending on business size" }
      ]
    },
    {
      category: "Competitive Intelligence",
      metrics: [
        { label: "Market Positioning", value: "How your efficiency compares to industry leaders" },
        { label: "Speed Advantage", value: "Time-to-market improvements vs. competitors" },
        { label: "Cost Structure", value: "Operating leverage gains through automation" },
        { label: "Scalability", value: "Growth capacity without proportional cost increases" }
      ]
    },
    {
      category: "Risk Mitigation",
      metrics: [
        { label: "Competitive Risk", value: "Quantified cost of not acting vs. competitors" },
        { label: "Implementation Risk", value: "Phased approach with measurable milestones" },
        { label: "Technology Risk", value: "Proven solutions with verified track records" },
        { label: "ROI Risk", value: "Guaranteed measurement framework with clear success metrics" }
      ]
    }
  ]

  const actionPlan = [
    {
      phase: "Phase 1: Strategic Assessment",
      timeline: "Week 1-2",
      investment: "Free",
      deliverable: "ROI analysis showing top 3 automation opportunities",
      decision: "Clear financial case for proceeding"
    },
    {
      phase: "Phase 2: Competitive Analysis",
      timeline: "Week 3-4",
      investment: "$5K",
      deliverable: "Market positioning report vs. competitors",
      decision: "Understand competitive urgency and opportunity"
    },
    {
      phase: "Phase 3: Implementation Roadmap",
      timeline: "Month 2",
      investment: "$15K",
      deliverable: "Detailed execution plan with timelines and resource requirements",
      decision: "Board-ready business case with expected returns"
    },
    {
      phase: "Phase 4: Execution Support",
      timeline: "Month 3+",
      investment: "Variable based on scope",
      deliverable: "Hands-on implementation with measurable milestones",
      decision: "Documented ROI achievement within 6 months"
    }
  ]

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 via-white to-accent-50 py-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-800 rounded-full text-sm font-medium mb-6">
              <TrendingUp className="w-4 h-4 mr-2" />
              Prismscope for Executives
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Turn Technology Anxiety Into
              <span className="block bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent pb-2">
                Strategic Advantage
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Stop worrying about falling behind competitors. We identify exactly where automation 
              delivers measurable ROI while positioning your business ahead of others still hesitating.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/demo" 
                className="btn-primary text-lg flex items-center justify-center"
              >
                Check out the demo
                <ArrowRight className="w-5 h-5 ml-2" />
              </a>
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

      {/* Executive Challenge Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="bg-red-50 border-l-4 border-red-500 p-8 rounded-lg mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <AlertCircle className="w-8 h-8 text-red-500 mr-3" />
                The Executive Challenge You're Facing
              </h2>
              <p className="text-lg italic text-gray-700 mb-6">
                "We've invested heavily in technology, but I'm not seeing the efficiency gains I expected. 
                Meanwhile, I keep hearing about competitors using automation to cut costs and move faster. 
                Are we falling behind?"
              </p>
              <div className="space-y-3">
                <p className="font-semibold text-gray-900 mb-2">You're not alone in this concern:</p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700">Technology investments aren't delivering the promised ROI</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700">Competitors seem to be gaining advantages you can't quantify</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700">Your team talks about "digital transformation" but results feel minimal</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700">You need clear, measurable returns to justify continued technology spending</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700">The market is moving fast and you can't afford to be left behind</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 p-4 bg-white rounded-lg">
                <p className="font-semibold text-primary-600">
                  The real issue: Most businesses buy technology first, then struggle to find ways to use it effectively. 
                  We flip this approach entirely.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How We Deliver Results */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How We Deliver Executive-Level Results
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Step 1: Uncover Hidden Cost Centers</h3>
              <p className="text-gray-600">
                We survey everyone in your organization to identify the inefficiencies you don't even know exist 
                and calculate exactly how many hours your people spend on each problem - then translate that into 
                precise dollar costs.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-accent-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Step 2: Identify High-Impact Automation</h3>
              <p className="text-gray-600">
                We pinpoint which processes deliver the biggest ROI when automated, with specific cost savings 
                and timeline projections for each opportunity.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Step 3: Build Your Competitive Roadmap</h3>
              <p className="text-gray-600">
                You receive a strategic implementation plan that prioritizes changes based on business impact, 
                competitive positioning, and resource requirements.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Step 4: Create KPI Frameworks</h3>
              <p className="text-gray-600">
                We establish measurement systems that prove the business impact of improvements, 
                regardless of who implements the solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ROI Results Section */}
      <section id="roi-results" className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-6">
              <DollarSign className="w-4 h-4 mr-2" />
              Executive ROI Results
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Real Returns from Real Businesses
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See exactly how we've helped companies like yours achieve 700%+ ROI in the first year
            </p>
          </div>
          
          <div className="space-y-8 max-w-6xl mx-auto">
            {roiResults.map((result, index) => (
              <div key={index} className="bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{result.industry}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Hidden Issue Discovered:</p>
                    <p className="text-gray-700 mb-4">{result.issue}</p>
                    <p className="text-sm text-gray-500 mb-2">Cost Calculation:</p>
                    <p className="text-gray-700">{result.cost}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Solution Investment:</p>
                    <p className="text-gray-700 mb-4">{result.investment}</p>
                    <p className="text-sm text-gray-500 mb-2">Annual Savings:</p>
                    <p className="text-gray-700 mb-4">{result.savings}</p>
                    <div className="bg-green-100 rounded-lg p-4">
                      <p className="text-sm text-green-600 font-semibold">ROI:</p>
                      <p className="text-2xl font-bold text-green-800">{result.roi}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Executive Dashboard Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              The Executive Dashboard You Need
            </h2>
            <p className="text-xl text-gray-600">
              Clear metrics that matter for strategic decision-making
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {dashboardMetrics.map((category, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  {index === 0 && <DollarSign className="w-6 h-6 text-green-600 mr-2" />}
                  {index === 1 && <TrendingUp className="w-6 h-6 text-blue-600 mr-2" />}
                  {index === 2 && <Shield className="w-6 h-6 text-red-600 mr-2" />}
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
            ))}
          </div>
        </div>
      </section>

      {/* Competitive Advantages */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Competitive Advantage Opportunities
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-primary-50 to-white border border-primary-200 rounded-xl p-6">
              <h3 className="font-bold text-gray-900 mb-3">Cost Leadership</h3>
              <p className="text-2xl font-bold text-primary-600 mb-2">15-25%</p>
              <p className="text-sm text-gray-600 mb-2">reduction in operational costs</p>
              <p className="text-xs text-gray-500">Timeline: 6-12 months</p>
            </div>
            <div className="bg-gradient-to-br from-accent-50 to-white border border-accent-200 rounded-xl p-6">
              <h3 className="font-bold text-gray-900 mb-3">Speed to Market</h3>
              <p className="text-2xl font-bold text-accent-600 mb-2">30-50%</p>
              <p className="text-sm text-gray-600 mb-2">faster response times</p>
              <p className="text-xs text-gray-500">Timeline: 3-6 months</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-white border border-green-200 rounded-xl p-6">
              <h3 className="font-bold text-gray-900 mb-3">Operational Excellence</h3>
              <p className="text-2xl font-bold text-green-600 mb-2">90%+</p>
              <p className="text-sm text-gray-600 mb-2">accuracy in processes</p>
              <p className="text-xs text-gray-500">Timeline: 2-4 months</p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-white border border-blue-200 rounded-xl p-6">
              <h3 className="font-bold text-gray-900 mb-3">Scalability</h3>
              <p className="text-2xl font-bold text-blue-600 mb-2">40-60%</p>
              <p className="text-sm text-gray-600 mb-2">more volume, same headcount</p>
              <p className="text-xs text-gray-500">Timeline: 6-9 months</p>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Comparison Table */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Investment vs. Traditional Approaches
            </h2>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-5xl mx-auto">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Solution Type</th>
                    <th className="text-left py-4 px-6 font-semibold text-red-600">Traditional Consulting</th>
                    <th className="text-left py-4 px-6 font-semibold text-orange-600">Big Tech Implementation</th>
                    <th className="text-left py-4 px-6 font-semibold text-primary-600">Prismscope</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-gray-200">
                    <td className="py-4 px-6 font-medium">Upfront Investment</td>
                    <td className="py-4 px-6 text-red-600">$500K - $2M+</td>
                    <td className="py-4 px-6 text-orange-600">$300K - $1M+</td>
                    <td className="py-4 px-6 text-primary-600 font-semibold">$25K - $150K</td>
                  </tr>
                  <tr className="border-t border-gray-200 bg-gray-50">
                    <td className="py-4 px-6 font-medium">Timeline to Results</td>
                    <td className="py-4 px-6 text-red-600">12-18 months</td>
                    <td className="py-4 px-6 text-orange-600">9-12 months</td>
                    <td className="py-4 px-6 text-primary-600 font-semibold">3-6 months</td>
                  </tr>
                  <tr className="border-t border-gray-200">
                    <td className="py-4 px-6 font-medium">ROI Guarantee</td>
                    <td className="py-4 px-6 text-red-600">None</td>
                    <td className="py-4 px-6 text-orange-600">Performance targets</td>
                    <td className="py-4 px-6 text-primary-600 font-semibold">Measurable results or refund</td>
                  </tr>
                  <tr className="border-t border-gray-200 bg-gray-50">
                    <td className="py-4 px-6 font-medium">Risk Level</td>
                    <td className="py-4 px-6 text-red-600">High</td>
                    <td className="py-4 px-6 text-orange-600">Medium-High</td>
                    <td className="py-4 px-6 text-primary-600 font-semibold">Low (phased approach)</td>
                  </tr>
                  <tr className="border-t border-gray-200">
                    <td className="py-4 px-6 font-medium">Ongoing Costs</td>
                    <td className="py-4 px-6 text-red-600">$200K+ annually</td>
                    <td className="py-4 px-6 text-orange-600">$100K+ annually</td>
                    <td className="py-4 px-6 text-primary-600 font-semibold">$20-50K annually</td>
                  </tr>
                  <tr className="border-t border-gray-200 bg-gray-50">
                    <td className="py-4 px-6 font-medium">Strategic Focus</td>
                    <td className="py-4 px-6 text-red-600">Process-heavy</td>
                    <td className="py-4 px-6 text-orange-600">Technology-heavy</td>
                    <td className="py-4 px-6 text-primary-600 font-semibold">Business outcome-heavy</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Executive Action Plan */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Executive Action Plan
            </h2>
            <p className="text-xl text-gray-600">
              Phased approach with clear decision points at each stage
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {actionPlan.map((phase, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-3">
                        <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                          <span className="text-primary-600 font-bold">{index + 1}</span>
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">{phase.phase}</h3>
                          <p className="text-sm text-gray-500">{phase.timeline}</p>
                        </div>
                      </div>
                      <div className="ml-14">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-500 mb-1">Investment:</p>
                            <p className="font-semibold text-primary-600">{phase.investment}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 mb-1">Deliverable:</p>
                            <p className="text-gray-700">{phase.deliverable}</p>
                          </div>
                        </div>
                        <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-500 mb-1">Decision Point:</p>
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

      {/* Bottom Line Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-accent-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                The Bottom Line for Executives
              </h2>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0 mt-1">
                    <span className="text-red-600 font-bold">?</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-2">Question:</p>
                    <p className="text-gray-700">
                      Are you confident your business is extracting maximum value from technology investments 
                      while competitors potentially gain operational advantages?
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0 mt-1">
                    <Clock className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-2">Reality:</p>
                    <p className="text-gray-700">
                      Every month of delay means leaving money on the table while others potentially pull ahead.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0 mt-1">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-2">Solution:</p>
                    <p className="text-gray-700">
                      Clear, measurable path to competitive advantage through proven automation strategies.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0 mt-1">
                    <Shield className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-2">Risk:</p>
                    <p className="text-gray-700">
                      Minimal, with phased approach and guaranteed measurement framework.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0 mt-1">
                    <TrendingUp className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-2">Upside:</p>
                    <p className="text-gray-700">
                      Significant cost reduction, competitive positioning, and sustainable operational excellence.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Executive Fast Track CTA */}
      <section className="py-20 bg-gray-900">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              Executive Fast Track
            </h2>
            
            <div className="bg-gray-800 rounded-xl p-8 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                <div className="bg-gray-700 rounded-lg p-6">
                  <div className="flex items-center mb-3">
                    <Users className="w-6 h-6 text-primary-400 mr-2" />
                    <h3 className="text-lg font-semibold text-white">Step 1: Personal Assessment</h3>
                  </div>
                  <p className="text-gray-300">Test it out yourself with a free personal assessment</p>
                </div>
                
                <div className="bg-gray-700 rounded-lg p-6">
                  <div className="flex items-center mb-3">
                    <Building2 className="w-6 h-6 text-accent-400 mr-2" />
                    <h3 className="text-lg font-semibold text-white">Step 2: Team Onboarding</h3>
                  </div>
                  <p className="text-gray-300">Pay for seats and have your team start their assessments</p>
                </div>
                
                <div className="bg-gray-700 rounded-lg p-6">
                  <div className="flex items-center mb-3">
                    <BarChart3 className="w-6 h-6 text-green-400 mr-2" />
                    <h3 className="text-lg font-semibold text-white">Step 3: Consolidated Report</h3>
                  </div>
                  <p className="text-gray-300">Receive report identifying critical areas and highest ROI opportunities</p>
                </div>
                
                <div className="bg-gray-700 rounded-lg p-6">
                  <div className="flex items-center mb-3">
                    <Zap className="w-6 h-6 text-yellow-400 mr-2" />
                    <h3 className="text-lg font-semibold text-white">Step 4: Expert Implementation</h3>
                  </div>
                  <p className="text-gray-300">Connect with SMEs for technical and organizational implementation</p>
                </div>
              </div>
            </div>
            
            <div className="bg-primary-600 rounded-xl p-8 mb-8">
              <h3 className="text-2xl font-bold text-white mb-4">
                What You'll Get In The First Call:
              </h3>
              <ul className="text-left max-w-2xl mx-auto space-y-3 text-white">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Competitive analysis of your current position</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" />
                  <span>ROI projection for your top 3 automation opportunities</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Timeline for achieving measurable results</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Risk assessment and mitigation strategies</span>
                </li>
              </ul>
              <p className="text-white font-semibold mt-6">
                No sales pitch. Just executive-level strategic analysis you can use whether you work with us or not.
              </p>
            </div>
            
            <button 
              className="bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center mx-auto"
              onClick={() => window.location.href = 'https://my.prismscope.ai'}
            >
              Start Your Executive Assessment
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
              "The businesses that thrive over the next 5 years will be those that turn operational efficiency 
              into competitive advantage. We help executives build that advantage systematically, measurably, 
              and sustainably."
            </blockquote>
            <p className="text-gray-600">
              — Christopher Harrison, PhD, Prismscope Founder
            </p>
          </div>
        </div>
      </section>

      {/* Executive Guarantee */}
      <section className="py-16 bg-primary-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-800 rounded-full text-sm font-medium mb-4">
                <Shield className="w-4 h-4 mr-2" />
                Executive Guarantee
              </div>
              <h2 className="text-3xl font-bold text-gray-900">
                Our Commitment to Executive Success
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">Results Promise</h3>
                <p className="text-gray-600">Clear, measurable ROI within 6 months or full refund</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">Confidentiality</h3>
                <p className="text-gray-600">All strategic analysis covered by our TOS</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">Risk Mitigation</h3>
                <p className="text-gray-600">Phased investment with go/no-go decision points</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">Success Framework</h3>
                <p className="text-gray-600">Board-level reporting on competitive positioning and financial returns</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ExecutivesPage