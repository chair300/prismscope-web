import React, { useState, useEffect } from 'react';
import { demoDataService } from '../services/demo/demoDataService';

const DemoAdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const [dashboardStats, allSessions, allIssues] = await Promise.all([
          demoDataService.getDashboardStats(),
          demoDataService.getAllSessions(),
          demoDataService.getAllIssues()
        ]);

        setStats(dashboardStats);
        setSessions(allSessions.slice(0, 10)); // Recent 10 sessions
        setIssues(allIssues.slice(0, 10)); // Recent 10 issues
      } catch (error) {
        console.error('Failed to load dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString([], {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDuration = (minutes) => {
    if (minutes < 60) {
      return `${Math.round(minutes)}m`;
    }
    return `${Math.round(minutes / 60 * 10) / 10}h`;
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-prism-blue mx-auto"></div>
          <p className="mt-4 text-gray-500">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <h3 className="text-xl font-medium text-gray-900 mb-2">Dashboard Error</h3>
          <p className="text-gray-500">Failed to load dashboard data</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="mt-2 text-gray-600">
          System overview and analytics for Prism AI Consultant
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="card">
          <div className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-prism-blue rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm font-bold">S</span>
                </div>
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">{stats.sessions}</div>
                <div className="text-sm text-gray-500">Total Sessions</div>
              </div>
            </div>
            <div className="mt-4 text-xs text-gray-500">
              Avg. length: {formatDuration(stats.averageSessionLength)}
            </div>
          </div>
        </div>

        <div className="card">
          <div className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm font-bold">I</span>
                </div>
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">{stats.issues}</div>
                <div className="text-sm text-gray-500">Issues Identified</div>
              </div>
            </div>
            <div className="mt-4 text-xs text-gray-500 space-x-4">
              <span>⚙️ {stats.technicalIssues}</span>
              <span>👥 {stats.organizationalIssues}</span>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm font-bold">R</span>
                </div>
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">{stats.reports}</div>
                <div className="text-sm text-gray-500">Reports Generated</div>
              </div>
            </div>
            <div className="mt-4 text-xs text-gray-500">
              Completion rate: {Math.round(stats.completionRate * 100)}%
            </div>
          </div>
        </div>

        <div className="card">
          <div className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm font-bold">U</span>
                </div>
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">{stats.users}</div>
                <div className="text-sm text-gray-500">Active Users</div>
              </div>
            </div>
            <div className="mt-4 text-xs text-gray-500">
              Last updated: {formatDate(stats.lastUpdated)}
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Sessions */}
        <div className="card">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Sessions</h3>
            <div className="space-y-4">
              {sessions.map((session) => (
                <div key={session.sessionId} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">{getCategoryIcon(session.category)}</span>
                    <div>
                      <div className="font-medium text-gray-900 text-sm">{session.title}</div>
                      <div className="text-xs text-gray-500">
                        {session.userAuth?.name || 'Anonymous'} • {formatDate(session.startedAt)}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(session.category)}`}>
                      {session.category}
                    </span>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      session.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {session.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Issues */}
        <div className="card">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Issues</h3>
            <div className="space-y-4">
              {issues.map((issue) => (
                <div key={issue.issueId} className="py-3 border-b border-gray-100 last:border-b-0">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{getCategoryIcon(issue.category)}</span>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(issue.category)}`}>
                        {issue.category}
                      </span>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(issue.priority)}`}>
                        {issue.priority}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">{formatDate(issue.createdAt)}</span>
                  </div>
                  <p className="text-sm text-gray-900 font-medium line-clamp-2">{issue.statement}</p>
                  {issue.analysis?.quantifiedBusinessImpact && (
                    <p className="text-xs text-gray-500 mt-1">
                      Impact: {issue.analysis.quantifiedBusinessImpact.currentCost}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* System Information */}
      <div className="mt-8 card">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">System Information</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Demo Data</h4>
              <div className="text-sm text-gray-600 space-y-1">
                <div>Version: {stats.metadata.version}</div>
                <div>Created: {formatDate(stats.metadata.created)}</div>
                <div>Total Documents: {stats.metadata.totalItems}</div>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Data Sources</h4>
              <div className="text-sm text-gray-600 space-y-1">
                <div>Real organizational assessments</div>
                <div>Anonymized conversation data</div>
                <div>Authentic business problems</div>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Capabilities Demonstrated</h4>
              <div className="text-sm text-gray-600 space-y-1">
                <div>✓ Technical issue identification</div>
                <div>✓ Organizational health analysis</div>
                <div>✓ ROI quantification</div>
                <div>✓ Implementation roadmapping</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Demo Notice */}
      <div className="mt-8 bg-prism-light-blue border border-prism-blue rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <div className="w-6 h-6 bg-prism-blue rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">i</span>
            </div>
          </div>
          <div>
            <h4 className="font-medium text-prism-dark-blue mb-2">Demo Environment</h4>
            <p className="text-sm text-prism-dark-blue">
              This dashboard shows analytics for a demo environment populated with real organizational assessment data. 
              In production, this would show live user sessions, real-time issue identification, and comprehensive 
              organizational health trends across your entire user base.
            </p>
            <div className="mt-3 text-xs text-prism-dark-blue">
              <strong>Production Features:</strong> User management, domain-based analytics, issue similarity detection, 
              automated report scheduling, and integration with business intelligence tools.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoAdminDashboard;