import { 
  Zap, 
  TrendingUp, 
  BarChart3, 
  Target,
  Clock,
  CheckCircle,
  ArrowRight,
  AlertTriangle,
  Settings,
  Award,
  Layers,
  Activity,
  DollarSign,
  PieChart,
  Lightbulb,
  Shield
} from 'lucide-react'
import { Link } from 'react-router-dom'

const ContinuousImprovementsPage = () => {


  const processExcellence = [
    {
      title: "Systematic Waste Elimination",
      identify: "The 7 wastes of Lean + digital waste categories (redundant data entry, manual reporting, approval delays)",
      measurement: "Time, cost, and quality impact quantification for each waste source",
      strategy: "Automation-first solutions that prevent waste from recurring"
    },
    {
      title: "Flow Optimization",
      identify: "Information flow, material flow, and decision flow across entire value streams",
      measurement: "Data-driven identification of constraint points with capacity analysis",
      strategy: "Redesigned processes that maintain continuous flow with minimal handoffs"
    },
    {
      title: "Quality by Design",
      identify: "Build quality controls into automated processes rather than inspection-based detection",
      measurement: "Poka-yoke principles integrated into digital workflows and system designs",
      strategy: "Real-time quality metrics with automated alerting for exception management"
    },
    {
      title: "Standard Work Excellence",
      identify: "Digital standard work procedures that update automatically with process changes",
      measurement: "Built-in guidance and training materials within automated workflows",
      strategy: "Automatic adherence to standard procedures through system-enforced workflows"
    }
  ]

  const actionPlan = [
    {
      phase: "Phase 1: Process Discovery & Quantification",
      timeline: "Weeks 1-3",
      deliverables: [
        "Complete process map with cycle times, handoffs, and waste identification",
        "Cost-benefit analysis for top 15 improvement opportunities",
        "Impact vs. effort matrix with prioritization recommendations",
        "Baseline metrics establishment for future measurement"
      ]
    },
    {
      phase: "Phase 2: Solution Architecture",
      timeline: "Weeks 4-6",
      deliverables: [
        "Future-state process designs with automation integration points",
        "Implementation effort estimates with resource requirements",
        "Risk assessment and mitigation strategies for each improvement",
        "Expected performance gains with specific KPI projections"
      ]
    },
    {
      phase: "Phase 3: Pilot Implementation",
      timeline: "Months 2-3",
      deliverables: [
        "Rapid prototype implementation of highest-impact process",
        "Real-time metrics dashboard for monitoring improvement performance",
        "Change management support for smooth process adoption",
        "Lessons learned documentation for scaling to additional processes"
      ]
    },
    {
      phase: "Phase 4: Scaled Rollout",
      timeline: "Months 4-12",
      deliverables: [
        "Organization-wide implementation of prioritized improvements",
        "CI culture development with employee-driven improvement programs",
        "Advanced metrics and continuous monitoring systems",
        "Annual process excellence review with next-phase planning"
      ]
    }
  ]

  const ciImpact = [
    {
      timeframe: "Immediate Process Gains (0-3 months)",
      outcomes: [
        "Clear visibility into all organizational inefficiencies with quantified costs",
        "Quick wins delivering improvement in targeted processes",
        "Data-driven justification for larger improvement investments",
        "Stakeholder confidence in CI program through measurable results"
      ]
    },
    {
      timeframe: "Systematic Improvements (3-12 months)",
      outcomes: [
        "Cycle time improvements across core value streams",
        "Error reduction in processes touched by automation",
        "Annual savings depending on organization size",
        "Self-sustaining improvement culture with employee engagement"
      ]
    },
    {
      timeframe: "Strategic CI Capability (12+ months)",
      outcomes: [
        "Organization-wide process excellence with consistent methodologies",
        "Advanced analytics and predictive process performance monitoring",
        "Industry-leading operational efficiency with competitive advantage",
        "Internal CI expertise capable of continuous optimization without external support"
      ]
    },
    {
      timeframe: "Professional Development Impact",
      outcomes: [
        "Enhanced credibility through data-driven improvement results",
        "Advanced skills in automation-integrated process design",
        "Strategic business impact rather than just operational efficiency",
        "Internal recognition as a driver of competitive advantage"
      ]
    }
  ]

  const methodologyIntegration = [
    { framework: "Lean Manufacturing", description: "Waste identification and elimination with automation enhancement" },
    { framework: "Six Sigma", description: "DMAIC methodology with advanced data collection and analysis" },
    { framework: "Kaizen", description: "Rapid improvement events supported by automation implementation" },
    { framework: "Theory of Constraints", description: "Bottleneck identification and systematic constraint elimination" },
    { framework: "Value Stream Mapping", description: "Current and future state mapping with automation integration points" }
  ]

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-green-50 py-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
              <Settings className="w-4 h-4 mr-2" />
              Prismscope for Continuous Improvement Professionals
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              From Hidden Inefficiencies To
              <span className="block bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                Revealed Performance Breakthroughs
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Reveal the soul-crushing tasks buried beneath your processes that are killing employee motivation while competitors have already identified and eliminated them. 
              Transform hidden inefficiencies into competitive advantages through targeted elimination that energizes your team and optimizes performance.
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
                Reveal Hidden Inefficiencies
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CI Challenge Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-8 rounded-lg mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <AlertTriangle className="w-8 h-8 text-yellow-500 mr-3" />
                The CI Challenge You're Solving
              </h2>
              <p className="text-lg italic text-gray-700 mb-6">
                "I can see surface-level inefficiencies everywhere - manual data entry, redundant approvals, information silos - 
                but what soul-crushing tasks are hidden beneath that are killing my team's motivation? Which buried inefficiencies should I reveal and eliminate first to energize employees while delivering maximum operational impact?"
              </p>
              <div className="space-y-3">
                <p className="font-semibold text-gray-900 mb-2">You're dealing with these common CI obstacles:</p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700">Hidden soul-crushing tasks buried beneath surface operations that you can't identify</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700">Competitors revealing and eliminating inefficiencies you don't even know exist</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700">Stakeholders asking "what's the ROI?" before approving improvement initiatives</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700">Organic growth has layered complexity beneath operations, making problems invisible</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700">Operating partially blind while competitors have full visibility into hidden waste</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 p-4 bg-white rounded-lg">
                <p className="font-semibold text-blue-600">
                  The lens you need: Prismscope reveals hidden soul-crushing tasks buried beneath surface operations, 
                  quantifying the invisible waste that competitors have already eliminated.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Systematic Process Improvement Methodology */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Systematic Process Improvement Methodology
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Step 1: Hidden Soul-Crushing Task Discovery</h3>
              <p className="text-gray-600">
                We look where others don't—through employee perspectives at every level—to reveal soul-crushing tasks 
                invisible to surface analysis that are killing team motivation. We expose work disguised as necessary and quantify both hidden cost impact and employee satisfaction drain.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <PieChart className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Step 2: Impact vs. Effort Analysis</h3>
              <p className="text-gray-600">
                Each improvement opportunity gets scored on business impact, implementation complexity, 
                and resource requirements - giving you clear prioritization data.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Step 3: Automation-First Solutions Design</h3>
              <p className="text-gray-600">
                We design optimal future-state processes that leverage automation where it delivers the highest ROI, 
                while preserving necessary human decision points.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Step 4: Implementation Roadmap with KPI Framework</h3>
              <p className="text-gray-600">
                You receive a phased improvement plan with specific KPIs, measurement frameworks, 
                and expected performance gains for each initiative.
              </p>
            </div>
          </div>
        </div>
      </section>



      {/* Why CI Professionals Choose Prismscope */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why CI Professionals Choose Prismscope
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-blue-50 to-white border border-blue-200 rounded-xl p-6">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-3">Data-Driven Process Analysis</h3>
              <p className="text-sm text-gray-600">
                Every recommendation backed by quantified impact analysis, effort estimation, and ROI projections. 
                No guesswork - just systematic prioritization based on business value.
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-white border border-green-200 rounded-xl p-6">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-3">Automation-Integrated Approach</h3>
              <p className="text-sm text-gray-600">
                We don't just redesign manual processes - we identify where automation can eliminate entire categories 
                of waste while maintaining process control and quality.
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-white border border-purple-200 rounded-xl p-6">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Layers className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-3">Lean Six Sigma Compatible</h3>
              <p className="text-sm text-gray-600">
                Our methodology integrates seamlessly with existing CI frameworks, providing the data and analysis 
                foundation for traditional improvement methodologies.
              </p>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-white border border-orange-200 rounded-xl p-6">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Target className="w-5 h-5 text-orange-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-3">Scalable Implementation Framework</h3>
              <p className="text-sm text-gray-600">
                Proven roadmaps that help you implement improvements systematically while building internal 
                capability for ongoing process excellence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Excellence Advantages */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-accent-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Process Excellence Advantages
            </h2>
            <p className="text-xl text-gray-600">
              Comprehensive approach to operational excellence
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {processExcellence.map((advantage, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{advantage.title}</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-blue-600 font-semibold mb-1">What We Identify:</p>
                    <p className="text-gray-700">{advantage.identify}</p>
                  </div>
                  <div>
                    <p className="text-sm text-green-600 font-semibold mb-1">Measurement Approach:</p>
                    <p className="text-gray-700">{advantage.measurement}</p>
                  </div>
                  <div>
                    <p className="text-sm text-purple-600 font-semibold mb-1">Elimination Strategy:</p>
                    <p className="text-gray-700">{advantage.strategy}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* CI Professional Action Plan */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              CI Professional Action Plan
            </h2>
            <p className="text-xl text-gray-600">
              Systematic approach to process transformation
            </p>
          </div>
          
          <div className="max-w-5xl mx-auto">
            <div className="space-y-8">
              {actionPlan.map((phase, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-shadow">
                  <div className="flex items-start mb-6">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <span className="text-blue-600 font-bold">{index + 1}</span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{phase.phase}</h3>
                      <p className="text-gray-500 mt-1">{phase.timeline}</p>
                    </div>
                  </div>
                  <div className="ml-16">
                    <p className="text-sm text-blue-600 font-semibold mb-3">CI Deliverables:</p>
                    <ul className="space-y-2">
                      {phase.deliverables.map((deliverable, idx) => (
                        <li key={idx} className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{deliverable}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CI Impact You'll Deliver */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              The CI Impact You'll Deliver
            </h2>
            <p className="text-xl text-gray-600">
              Progressive value delivery across all time horizons
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {ciImpact.map((impact, index) => (
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

      {/* CI Fast Track CTA */}
      <section className="py-20 bg-blue-900">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              CI Professional Fast Track
            </h2>
            
            <div className="bg-blue-800 rounded-xl p-8 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-blue-200 font-semibold mb-2">Immediate Next Step:</p>
                  <p className="text-white">Process assessment with quantified improvement opportunities</p>
                </div>
                <div>
                  <p className="text-blue-200 font-semibold mb-2">Timeline:</p>
                  <p className="text-white">Initial analysis within 2 weeks, detailed recommendations within 1 month</p>
                </div>
                <div>
                  <p className="text-blue-200 font-semibold mb-2">Investment:</p>
                  <p className="text-white">Free assessment, paid engagement only after clear ROI projections</p>
                </div>
                <div>
                  <p className="text-blue-200 font-semibold mb-2">Approach:</p>
                  <p className="text-white">Data-driven insights you can use whether you work with us or not</p>
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
                  <span>Process efficiency baseline assessment</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Top 5 improvement opportunities with effort vs. impact analysis</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>ROI projections for automation-integrated solutions</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Implementation timeline with resource requirement estimates</span>
                </li>
              </ul>
            </div>
            
            <button 
              className="bg-white text-blue-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center mx-auto"
              onClick={() => window.location.href = 'https://my.prismscope.ai'}
            >
              Start Process Assessment
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
              "The best continuous improvement professionals combine traditional CI methodologies with modern automation capabilities. 
              This combination creates sustainable competitive advantages that manual process improvement alone cannot achieve."
            </blockquote>
            <p className="text-gray-600">
              — Christopher Harrison, PhD, Prismscope Founder
            </p>
          </div>
        </div>
      </section>

      {/* CI Methodology Integration */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
              <Layers className="w-4 h-4 mr-2" />
              CI Methodology Integration
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Compatible with Your Existing CI Framework
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Adding automation-powered acceleration to traditional methodologies
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {methodologyIntegration.map((method, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-2">{method.framework}</h3>
                <p className="text-gray-600 text-sm">{method.description}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <p className="text-lg font-semibold text-blue-600">
              Compatible with your existing CI framework while adding automation-powered acceleration.
            </p>
          </div>
        </div>
      </section>

      {/* CI Professional Guarantee */}
      <section className="py-16 bg-green-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-4">
                <Shield className="w-4 h-4 mr-2" />
                CI Professional Guarantee
              </div>
              <h2 className="text-3xl font-bold text-gray-900">
                Our Commitment to Process Excellence
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">Methodology Promise</h3>
                <p className="text-gray-600">Systematic, data-driven approach compatible with Lean, Six Sigma, and other CI frameworks</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">Quantification Guarantee</h3>
                <p className="text-gray-600">Precise ROI calculations for every improvement recommendation</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">Implementation Support</h3>
                <p className="text-gray-600">Complete roadmaps with metrics, timelines, and resource requirements</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">Results Tracking</h3>
                <p className="text-gray-600">Built-in measurement systems to verify improvement performance</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ContinuousImprovementsPage