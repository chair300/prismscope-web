import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { demoDataService } from '../services/demoDataService';

const PriorDiscoveries = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedIssue, setSelectedIssue] = useState(null);

  useEffect(() => {
    const loadIssues = async () => {
      try {
        const userIssues = await demoDataService.getUserIssues();
        setIssues(userIssues);
      } catch (error) {
        console.error('Failed to load issues:', error);
      } finally {
        setLoading(false);
      }
    };

    loadIssues();
  }, []);

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString([], {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getPriorityColor = (priority) => {
    const colors = {
      high: 'bg-red-100 text-red-800',
      medium: 'bg-yellow-100 text-yellow-800',
      low: 'bg-green-100 text-green-800'
    };
    return colors[priority] || 'bg-gray-100 text-gray-800';
  };

  const getCategoryIcon = (category) => {
    return category === 'technical' ? '⚙️' : '👥';
  };

  const getCategoryColor = (category) => {
    return category === 'technical' 
      ? 'bg-blue-100 text-blue-800' 
      : 'bg-purple-100 text-purple-800';
  };

  const formatBusinessImpact = (impact) => {
    if (!impact) return 'Impact being assessed';
    return `${impact.currentCost} • ${impact.frequency}`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-prism-blue mx-auto"></div>
          <p className="mt-4 text-gray-500">Loading your discoveries...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Prior Discoveries</h1>
        <p className="mt-2 text-gray-600">
          Issues identified and analyzed during your Prism consultations
        </p>
      </div>

      {issues.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">No Issues Discovered Yet</h3>
          <p className="text-gray-500 mb-6">
            Start a conversation with Prism to identify and analyze organizational challenges
          </p>
          <Link
            to="/"
            className="btn-primary"
          >
            Start New Session
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {issues.map((issue) => (
            <div
              key={issue.issueId}
              className="card hover:shadow-md transition-shadow duration-200 cursor-pointer"
              onClick={() => setSelectedIssue(selectedIssue?.issueId === issue.issueId ? null : issue)}
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{getCategoryIcon(issue.category)}</span>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(issue.category)}`}>
                      {issue.category}
                    </span>
                  </div>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(issue.priority)}`}>
                    {issue.priority}
                  </span>
                </div>

                {/* Issue Statement */}
                <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">
                  {issue.statement}
                </h3>

                {/* Metadata */}
                <div className="space-y-2 text-sm text-gray-500">
                  <div>
                    <span className="font-medium">Discovered:</span> {formatDate(issue.timestamp)}
                  </div>
                  {issue.analysis?.quantifiedBusinessImpact && (
                    <div>
                      <span className="font-medium">Impact:</span> {formatBusinessImpact(issue.analysis.quantifiedBusinessImpact)}
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      issue.status === 'analyzed' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {issue.status}
                    </span>
                    <Link
                      to={`/?session=${issue.sessionId}`}
                      className="text-prism-blue hover:text-prism-dark-blue text-xs font-medium"
                      onClick={(e) => e.stopPropagation()}
                    >
                      View Session →
                    </Link>
                  </div>
                </div>

                {/* Expanded Analysis */}
                {selectedIssue?.issueId === issue.issueId && issue.analysis && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-3">Analysis Summary</h4>
                    
                    {/* Root Cause */}
                    <div className="mb-4">
                      <h5 className="text-sm font-medium text-gray-700 mb-1">Root Cause</h5>
                      <p className="text-sm text-gray-600">{issue.analysis.rootCause}</p>
                    </div>

                    {/* Technical Classification */}
                    <div className="mb-4">
                      <h5 className="text-sm font-medium text-gray-700 mb-1">Classification</h5>
                      <p className="text-sm text-gray-600">{issue.analysis.technicalAnalysis}</p>
                    </div>

                    {/* Success Metrics */}
                    {issue.analysis.successMetrics && (
                      <div className="mb-4">
                        <h5 className="text-sm font-medium text-gray-700 mb-2">Success Metrics</h5>
                        <div className="space-y-2">
                          {issue.analysis.successMetrics.map((metric, index) => (
                            <div key={index} className="text-sm">
                              <span className="font-medium text-gray-900">{metric.metric}:</span>
                              <span className="text-gray-600 ml-1">
                                {metric.current} → {metric.target}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Implementation Roadmap */}
                    {issue.analysis.implementationRoadmap && (
                      <div>
                        <h5 className="text-sm font-medium text-gray-700 mb-2">Implementation Steps</h5>
                        <ol className="text-sm text-gray-600 space-y-1">
                          {issue.analysis.implementationRoadmap.map((step, index) => (
                            <li key={index} className="flex">
                              <span className="font-medium text-prism-blue mr-2">{index + 1}.</span>
                              <span>{step}</span>
                            </li>
                          ))}
                        </ol>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Summary Stats */}
      {issues.length > 0 && (
        <div className="mt-12 p-6 bg-white rounded-xl border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Discovery Summary</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-prism-blue">{issues.length}</div>
              <div className="text-sm text-gray-500">Total Issues</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {issues.filter(i => i.category === 'technical').length}
              </div>
              <div className="text-sm text-gray-500">Technical</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">
                {issues.filter(i => i.category === 'organizational').length}
              </div>
              <div className="text-sm text-gray-500">Organizational</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-600">
                {issues.filter(i => i.priority === 'high').length}
              </div>
              <div className="text-sm text-gray-500">High Priority</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PriorDiscoveries;