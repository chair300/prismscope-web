const ScoreCard = ({ title, score, description, color }) => {
  const getColorClasses = (color) => {
    const colors = {
     green: 'bg-green-100 border-green-300 text-green-800',
     blue: 'bg-blue-100 border-blue-300 text-blue-800',
     yellow: 'bg-yellow-100 border-yellow-300 text-yellow-800',
     red: 'bg-red-100 border-red-300 text-red-800',
     gray: 'bg-gray-100 border-gray-300 text-gray-800'
    }
    return colors[color] || colors.gray
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
     <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
     <div className="flex items-center mb-3">
      <div className="text-3xl font-bold text-blue-600">{score}</div>
      <div className="text-gray-500 ml-1">/100</div>
     </div>
     <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
      <div 
        className="bg-blue-600 h-2 rounded-full transition-all duration-500"
        style={{ width: `${score}%` }}
      ></div>
     </div>
     <p className="text-sm text-gray-600">{description}</p>
    </div>
  )
}

const RecommendationCard = ({ recommendation }) => {
  const getColorClasses = (color) => {
    const colors = {
     green: 'bg-green-50 border-green-200 text-green-800',
     blue: 'bg-blue-50 border-blue-200 text-blue-800', 
     yellow: 'bg-yellow-50 border-yellow-200 text-yellow-800',
     red: 'bg-red-50 border-red-200 text-red-800',
     gray: 'bg-gray-50 border-gray-200 text-gray-800'
    }
    return colors[color] || colors.gray
  }

  const getActionItems = (type) => {
    const actions = {
     IDEAL_CLIENT: [
      'Schedule discovery call immediately',
      'Prepare technical solution proposal',
      'Gather detailed requirements',
      'Provide case studies and references'
     ],
     GOOD_FIT: [
      'Conduct deeper technical assessment',
      'Address potential concerns proactively', 
      'Prepare phased implementation plan',
      'Schedule stakeholder meeting'
     ],
     PROCESS_ISSUE: [
      'Refer to change management consultant',
      'Provide organizational readiness assessment',
      'Suggest process improvement first',
      'Follow up in 3-6 months'
     ],
     LOW_PRIORITY: [
      'Gather more information',
      'Qualify budget and timeline',
      'Determine decision-making process',
      'Consider nurturing for future'
     ],
     EVALUATE: [
      'Schedule detailed discovery call',
      'Request additional information',
      'Clarify technical requirements',
      'Assess organizational readiness'
     ]
    }
    return actions[type] || actions.EVALUATE
  }

  return (
    <div className={`rounded-lg border-2 p-6 ${getColorClasses(recommendation.color)}`}>
     <div className="flex items-center justify-between mb-4">
      <h2 className="text-2xl font-bold">{recommendation.title}</h2>
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
        recommendation.priority === 'high' ? 'bg-red-100 text-red-800' :
        recommendation.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
        'bg-gray-100 text-gray-800'
      }`}>
        {recommendation.priority.toUpperCase()} PRIORITY
      </span>
     </div>
     
     <p className="text-lg mb-6">{recommendation.description}</p>
     
     <div>
      <h3 className="font-semibold mb-3">Recommended Next Steps:</h3>
      <ul className="space-y-2">
        {getActionItems(recommendation.type).map((action, index) => (
          <li key={index} className="flex items-start">
            <span className="inline-block w-2 h-2 bg-current rounded-full mt-2 mr-3 flex-shrink-0"></span>
            <span>{action}</span>
          </li>
        ))}
      </ul>
     </div>
    </div>
  )
}

const ProblemAnalysis = ({ problemDescription, scores }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
     <h3 className="text-lg font-semibold text-gray-900 mb-4">Problem Analysis</h3>
     
     <div className="bg-gray-50 rounded-lg p-4 mb-4">
      <h4 className="font-medium text-gray-700 mb-2">Problem Description:</h4>
      <p className="text-gray-600 italic">"{problemDescription}"</p>
     </div>
     
     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <h4 className="font-medium text-gray-700 mb-2">Technical Indicators</h4>
        <div className="text-sm text-gray-600">
          <div className="flex justify-between">
            <span>Technical Fit Score:</span>
            <span className="font-medium">{scores.technical}/100</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
            <div 
              className="bg-blue-500 h-1 rounded-full"
              style={{ width: `${scores.technical}%` }}
            ></div>
          </div>
        </div>
      </div>
      
      <div>
        <h4 className="font-medium text-gray-700 mb-2">Process Challenges</h4>
        <div className="text-sm text-gray-600">
          <div className="flex justify-between">
            <span>Process Issues Score:</span>
            <span className="font-medium">{scores.process}/100</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
            <div 
              className="bg-red-500 h-1 rounded-full"
              style={{ width: `${scores.process}%` }}
            ></div>
          </div>
        </div>
      </div>
     </div>
    </div>
  )
}

const ResultsDashboard = ({ assessment }) => {
  const { scores, problemDescription } = assessment

  return (
    <div className="max-w-6xl mx-auto space-y-8 p-6">
     
     <RecommendationCard recommendation={scores.recommendation} />
     
     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <ScoreCard
        title="Technical Fit"
        score={scores.technical}
        description="How well the problem aligns with AI/automation solutions"
        color="blue"
      />
      <ScoreCard
        title="Process Issues"
        score={scores.process}
        description="Degree of organizational/people challenges present"
        color="red"
      />
      <ScoreCard
        title="Client Quality"
        score={scores.clientQuality}
        description="Budget, decision authority, and timeline factors"
        color="green"
      />
     </div>
     
     <ProblemAnalysis 
      problemDescription={problemDescription}
      scores={scores}
     />
     
     <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-blue-900 mb-2">Assessment Summary</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div>
          <span className="font-medium text-blue-800">Technical Fit:</span>
          <span className="ml-2 text-blue-700">
            {scores.technical >= 70 ? 'Excellent' : 
            scores.technical >= 50 ? 'Good' : 
            scores.technical >= 30 ? 'Moderate' : 'Poor'}
          </span>
        </div>
        <div>
          <span className="font-medium text-blue-800">Process Complexity:</span>
          <span className="ml-2 text-blue-700">
            {scores.process <= 30 ? 'Low' : 
            scores.process <= 50 ? 'Moderate' : 
            scores.process <= 70 ? 'High' : 'Very High'}
          </span>
        </div>
        <div>
          <span className="font-medium text-blue-800">Client Quality:</span>
          <span className="ml-2 text-blue-700">
            {scores.clientQuality >= 70 ? 'Excellent' : 
            scores.clientQuality >= 50 ? 'Good' : 
            scores.clientQuality >= 30 ? 'Fair' : 'Poor'}
          </span>
        </div>
        <div>
          <span className="font-medium text-blue-800">Overall Recommendation:</span>
          <span className="ml-2 text-blue-700">{scores.recommendation.title}</span>
        </div>
      </div>
     </div>
    </div>
  )
}

export default ResultsDashboard