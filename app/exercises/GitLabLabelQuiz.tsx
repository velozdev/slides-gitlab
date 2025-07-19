'use client';
import React, { useState } from 'react';
import { Tag, CheckCircle, XCircle, Lightbulb, RotateCcw, AlertCircle } from 'lucide-react';

type Label = {
  name: string;
  color: string;
  category: string;
};

type Question = {
  id: number;
  title: string;
  description: string;
  reporter: string;
  expectedLabels: string[];
  explanation: string;
  reasoning: Record<string, string>;
};

const GitLabLabelQuiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [completed, setCompleted] = useState<boolean>(false);

  // Realistic label taxonomy based on common GitLab practices
  const availableLabels: Label[] = [
    // Type
    { name: 'bug', color: 'bg-red-100 text-red-800', category: 'Type' },
    { name: 'feature', color: 'bg-blue-100 text-blue-800', category: 'Type' },
    { name: 'enhancement', color: 'bg-purple-100 text-purple-800', category: 'Type' },
    { name: 'documentation', color: 'bg-gray-100 text-gray-800', category: 'Type' },
    { name: 'security', color: 'bg-red-100 text-red-800', category: 'Type' },
    { name: 'performance', color: 'bg-yellow-100 text-yellow-800', category: 'Type' },
    
    // Priority
    { name: 'priority::low', color: 'bg-green-100 text-green-800', category: 'Priority' },
    { name: 'priority::medium', color: 'bg-yellow-100 text-yellow-800', category: 'Priority' },
    { name: 'priority::high', color: 'bg-orange-100 text-orange-800', category: 'Priority' },
    { name: 'priority::critical', color: 'bg-red-100 text-red-800', category: 'Priority' },
    
    // Team
    { name: 'team::frontend', color: 'bg-cyan-100 text-cyan-800', category: 'Team' },
    { name: 'team::backend', color: 'bg-indigo-100 text-indigo-800', category: 'Team' },
    { name: 'team::design', color: 'bg-pink-100 text-pink-800', category: 'Team' },
    { name: 'team::devops', color: 'bg-green-100 text-green-800', category: 'Team' },
    { name: 'team::qa', color: 'bg-purple-100 text-purple-800', category: 'Team' },
    
    // Status/Workflow
    { name: 'needs-investigation', color: 'bg-amber-100 text-amber-800', category: 'Status' },
    { name: 'ready-for-dev', color: 'bg-green-100 text-green-800', category: 'Status' },
    { name: 'blocked', color: 'bg-red-100 text-red-800', category: 'Status' },
    { name: 'needs-review', color: 'bg-blue-100 text-blue-800', category: 'Status' },
    { name: 'waiting-for-customer', color: 'bg-gray-100 text-gray-800', category: 'Status' },
    
    // Effort/Size
    { name: 'effort::small', color: 'bg-green-100 text-green-800', category: 'Effort' },
    { name: 'effort::medium', color: 'bg-yellow-100 text-yellow-800', category: 'Effort' },
    { name: 'effort::large', color: 'bg-orange-100 text-orange-800', category: 'Effort' },
    { name: 'effort::xl', color: 'bg-red-100 text-red-800', category: 'Effort' },
    
    // Special
    { name: 'good-first-issue', color: 'bg-green-100 text-green-800', category: 'Special' },
    { name: 'breaking-change', color: 'bg-red-100 text-red-800', category: 'Special' },
    { name: 'customer-reported', color: 'bg-blue-100 text-blue-800', category: 'Special' },
    { name: 'technical-debt', color: 'bg-gray-100 text-gray-800', category: 'Special' }
  ];

  const questions: Question[] = [
    {
      id: 1,
      title: "Login page completely broken on mobile devices",
      description: "Users on mobile devices (iOS Safari, Android Chrome) cannot log in. The login form appears corrupted and buttons don't respond to touch. This is blocking all mobile users from accessing the application. Multiple customer support tickets have been filed.",
      reporter: "Customer Support Team",
      expectedLabels: ['bug', 'priority::critical', 'team::frontend', 'customer-reported'],
      explanation: "This is a critical bug affecting all mobile users. It needs immediate frontend attention and was reported by customers, making it high business impact.",
      reasoning: {
        'bug': 'The login functionality is broken - this is clearly a bug',
        'priority::critical': 'Blocking all mobile users is a critical business impact',
        'team::frontend': 'UI/login form issues are frontend responsibility',
        'customer-reported': 'Multiple customer support tickets were filed'
      }
    },
    {
      id: 2,
      title: "Add dark mode theme option",
      description: "As a user, I want to enable dark mode for better viewing in low-light conditions. This should include a toggle in user preferences and persist across sessions. The design team has provided mockups and the feature is planned for the next major release.",
      reporter: "Product Manager",
      expectedLabels: ['feature', 'priority::medium', 'team::frontend', 'team::design', 'effort::medium'],
      explanation: "This is a planned feature enhancement with moderate priority. It involves both frontend implementation and design work, requiring coordination between teams.",
      reasoning: {
        'feature': 'Adding new functionality (dark mode) is a feature request',
        'priority::medium': 'Nice-to-have feature, not urgent but planned for next release',
        'team::frontend': 'UI theme implementation requires frontend development',
        'team::design': 'Design team involvement mentioned in description',
        'effort::medium': 'Theme implementation across the app requires moderate effort'
      }
    },
    {
      id: 3,
      title: "API response time degradation on user search endpoint",
      description: "The /api/users/search endpoint has been responding slowly (3-5 seconds) since last week's deployment. Database queries show N+1 query problems. This affects the user picker component across multiple features. Need to investigate and optimize the query performance.",
      reporter: "DevOps Team",
      expectedLabels: ['performance', 'priority::high', 'team::backend', 'needs-investigation', 'technical-debt'],
      explanation: "This is a performance issue requiring backend investigation. High priority because it affects multiple features, and represents technical debt from inefficient queries.",
      reasoning: {
        'performance': 'Response time degradation is a performance issue',
        'priority::high': 'Affects multiple features and user experience significantly',
        'team::backend': 'API endpoint and database query optimization is backend work',
        'needs-investigation': 'Root cause analysis needed for the N+1 query problem',
        'technical-debt': 'Inefficient queries represent technical debt that needs addressing'
      }
    },
    {
      id: 4,
      title: "Update API documentation for new authentication endpoints",
      description: "The recent OAuth 2.0 implementation added new endpoints that aren't documented. Developers are having trouble integrating with our API. We need to update the OpenAPI spec and add code examples for the new authentication flow.",
      reporter: "API Team Lead",
      expectedLabels: ['documentation', 'priority::medium', 'team::backend', 'ready-for-dev', 'effort::small'],
      explanation: "This is a documentation task that's well-defined and ready for development. Medium priority as it helps external developers but isn't blocking core functionality.",
      reasoning: {
        'documentation': 'Updating API docs is clearly documentation work',
        'priority::medium': 'Important for developer experience but not urgent',
        'team::backend': 'API documentation typically handled by backend team',
        'ready-for-dev': 'Requirements are clear - update docs and add examples',
        'effort::small': 'Documentation update is relatively straightforward'
      }
    },
    {
      id: 5,
      title: "Implement two-factor authentication for admin accounts",
      description: "For security compliance, we need to enforce 2FA for all admin users. This should include SMS and authenticator app options. The security team has flagged this as a requirement for our SOC 2 certification. Implementation should be completed before the next security audit.",
      reporter: "Security Team",
      expectedLabels: ['security', 'feature', 'priority::high', 'team::backend', 'team::frontend', 'effort::large'],
      explanation: "This is a security feature with high priority due to compliance requirements. Requires both backend (2FA logic) and frontend (UI) work, and is a substantial effort.",
      reasoning: {
        'security': 'Two-factor authentication is explicitly a security feature',
        'feature': 'Adding new 2FA functionality is a feature addition',
        'priority::high': 'Required for SOC 2 compliance with upcoming audit deadline',
        'team::backend': 'Authentication logic and SMS/app integration is backend work',
        'team::frontend': 'UI for 2FA setup and verification needs frontend work',
        'effort::large': 'Full 2FA implementation with multiple options is substantial work'
      }
    },
    {
      id: 6,
      title: "User profile page shows outdated information after updates",
      description: "When users update their profile information, the changes don't reflect immediately on their profile page. Users need to refresh the browser or log out/in to see updates. This started happening after the recent caching improvements were deployed.",
      reporter: "QA Team",
      expectedLabels: ['bug', 'priority::medium', 'team::frontend', 'team::backend', 'needs-investigation'],
      explanation: "This is a bug related to caching that affects user experience. Needs investigation to determine if it's a frontend caching issue or backend cache invalidation problem.",
      reasoning: {
        'bug': 'Profile updates not displaying correctly is a bug',
        'priority::medium': 'Affects user experience but has workaround (refresh)',
        'team::frontend': 'May be frontend caching or state management issue',
        'team::backend': 'Could be backend cache invalidation problem',
        'needs-investigation': 'Root cause unclear - could be frontend or backend caching'
      }
    },
    {
      id: 7,
      title: "Create beginner-friendly contribution guide",
      description: "We want to encourage new contributors to our open-source project. Need to create a comprehensive guide covering setup, coding standards, and the contribution process. This should be beginner-friendly and include step-by-step instructions.",
      reporter: "Community Manager",
      expectedLabels: ['documentation', 'priority::low', 'good-first-issue', 'effort::medium'],
      explanation: "This is documentation work that would be perfect for a new contributor. Low priority as it's a community enhancement, but good investment for future contributions.",
      reasoning: {
        'documentation': 'Creating a contribution guide is documentation work',
        'priority::low': 'Community enhancement, not urgent business need',
        'good-first-issue': 'Writing documentation is often suitable for new contributors',
        'effort::medium': 'Comprehensive guide requires moderate effort to research and write'
      }
    },
    {
      id: 8,
      title: "Payment processing fails with international credit cards",
      description: "Several customers from Europe and Asia report that their credit card payments are being declined, even though their cards work elsewhere. Payment processor logs show validation errors. This is causing lost sales and customer frustration. Need immediate investigation.",
      reporter: "Customer Success",
      expectedLabels: ['bug', 'priority::critical', 'team::backend', 'customer-reported', 'needs-investigation'],
      explanation: "This is a critical bug affecting revenue and customer experience. Needs immediate backend investigation as it involves payment processing logic.",
      reasoning: {
        'bug': 'Payment processing failures are bugs in the system',
        'priority::critical': 'Affecting revenue and customer experience significantly',
        'team::backend': 'Payment processing logic is backend responsibility',
        'customer-reported': 'Multiple customers have reported this issue',
        'needs-investigation': 'Root cause in payment validation needs investigation'
      }
    }
  ];

  const toggleLabel = (label: Label) => {
    setSelectedLabels(prev => 
      prev.includes(label.name) 
        ? prev.filter(l => l !== label.name)
        : [...prev, label.name]
    );
  };

  const calculateScore = () => {
    const currentQ = questions[currentQuestion];
    const expected = currentQ.expectedLabels;
    const selected = selectedLabels;
    
    // Calculate precision and recall
    const correctlySelected: string[] = selected.filter(label => expected.includes(label));
    const precision: number = correctlySelected.length / Math.max(selected.length, 1);
    const recall: number = correctlySelected.length / expected.length;
    
    // F1 score (harmonic mean of precision and recall)
    const f1: number = precision + recall > 0 ? 2 * (precision * recall) / (precision + recall) : 0;
    
    return {
      score: Math.round(f1 * 100),
      correctlySelected,
      missed: expected.filter(label => !selected.includes(label)),
      unnecessary: selected.filter(label => !expected.includes(label))
    };
  };

  const checkAnswer = () => {
    const result = calculateScore();
    setScore(score + result.score);
    setShowFeedback(true);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedLabels([]);
      setShowFeedback(false);
    } else {
      setCompleted(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedLabels([]);
    setShowFeedback(false);
    setScore(0);
    setCompleted(false);
  };

  const groupedLabels: Record<string, Label[]> = availableLabels.reduce((acc: Record<string, Label[]>, label: Label) => {
    if (!acc[label.category]) acc[label.category] = [];
    acc[label.category].push(label);
    return acc;
  }, {});

  if (completed) {
    const maxScore = questions.length * 100;
    const percentage = Math.round((score / maxScore) * 100);
    
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <div className="text-6xl mb-4">🏷️</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Quiz Complete!</h2>
          <div className="text-xl text-gray-600 mb-6">
            Your Score: {score}/{maxScore} ({percentage}&#37;)
          </div>
          <div className="bg-blue-50 p-6 rounded-lg mb-6">
            <h3 className="text-lg font-semibold text-blue-800 mb-3">🎯 Label Strategy Tips</h3>
            <div className="text-blue-700 space-y-2 text-left">
              <p>&bull; <strong>Always include a type:</strong> bug, feature, enhancement, documentation, security</p>
              <p>&bull; <strong>Set priority thoughtfully:</strong> Critical for revenue/security, High for user impact</p>
              <p>&bull; <strong>Tag responsible teams:</strong> Help with routing and workload planning</p>
              <p>&bull; <strong>Use status labels:</strong> Track workflow and blockers effectively</p>
              <p>&bull; <strong>Estimate effort:</strong> Helps with sprint planning and capacity</p>
              <p>&bull; <strong>Mark special cases:</strong> good-first-issue, breaking-change, customer-reported</p>
            </div>
          </div>
          <button
            onClick={resetQuiz}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 mx-auto"
          >
            <RotateCcw className="w-5 h-5" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];
  const result = showFeedback ? calculateScore() : null;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Tag className="w-8 h-8 text-blue-600" />
          GitLab Label Strategy Quiz
        </h1>
          <div className="text-sm text-gray-600">
            Question {currentQuestion + 1} of {questions.length} &bull; Avg Score: {Math.round(score/(currentQuestion + (showFeedback ? 1 : 0)))}&#37;
          </div>
      </div>

      <div className="mb-6">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
            style={{ width: `${((currentQuestion + (showFeedback ? 1 : 0)) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Issue Details */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="flex items-start gap-3 mb-4">
            <AlertCircle className="w-5 h-5 text-orange-500 mt-0.5" />
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">{currentQ.title}</h2>
              <p className="text-sm text-gray-600 mb-2">Reported by: {currentQ.reporter}</p>
            </div>
          </div>
          <p className="text-gray-700 leading-relaxed">{currentQ.description}</p>
        </div>

        {/* Label Selection */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Select appropriate labels:</h3>
          
          {Object.entries(groupedLabels).map(([category, labels]) => (
            <div key={category} className="space-y-2">
              <h4 className="text-sm font-medium text-gray-600">{category}</h4>
              <div className="flex flex-wrap gap-2">
                {(labels as Label[]).map((label: Label) => (
                  <button
                    key={label.name}
                    onClick={() => toggleLabel(label)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                      selectedLabels.includes(label.name)
                        ? `${label.color} ring-2 ring-blue-500`
                        : `${label.color} hover:opacity-80`
                    }`}
                  >
                    {label.name}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Selected Labels Display */}
      {selectedLabels.length > 0 && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="text-sm font-medium text-blue-800 mb-2">Selected Labels:</h4>
          <div className="flex flex-wrap gap-2">
            {selectedLabels.map(labelName => {
              const label = availableLabels.find(l => l.name === labelName);
              return (
                <span key={labelName} className={`px-3 py-1 rounded-full text-sm font-medium ${label?.color ?? ''}`}>
                  {labelName}
                </span>
              );
            })}
          </div>
        </div>
      )}

      {/* Actions */}
      {!showFeedback ? (
        <div className="mt-6 flex gap-4">
          <button
            onClick={checkAnswer}
            disabled={selectedLabels.length === 0}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            Check My Labels
          </button>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              {result && result.score >= 80 ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : result && result.score >= 60 ? (
                <Lightbulb className="w-5 h-5 text-yellow-500" />
              ) : (
                <XCircle className="w-5 h-5 text-red-500" />
              )}
                <span className="font-semibold">
                  Score: {result ? result.score : 0}&#37; 
                  {result ? (result.score >= 80 ? ' - Excellent!' : result.score >= 60 ? ' - Good effort!' : ' - Keep learning!') : ''}
                </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-green-50 p-3 rounded">
                <div className="font-medium text-green-800">Correct ({result ? result.correctlySelected.length : 0})</div>
                <div className="text-green-700">
                  {result ? result.correctlySelected.join(', ') : 'None'}
                </div>
              </div>
              <div className="bg-yellow-50 p-3 rounded">
                <div className="font-medium text-yellow-800">Missed ({result ? result.missed.length : 0})</div>
                <div className="text-yellow-700">
                  {result ? result.missed.join(', ') : 'None'}
                </div>
              </div>
              <div className="bg-red-50 p-3 rounded">
                <div className="font-medium text-red-800">Unnecessary ({result ? result.unnecessary.length : 0})</div>
                <div className="text-red-700">
                  {result ? result.unnecessary.join(', ') : 'None'}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-800 mb-2">Explanation:</h4>
            <p className="text-blue-700 mb-3">{currentQ.explanation}</p>
            <div className="text-sm text-blue-700">
              <div className="font-medium mb-1">Why these labels work:</div>
              <ul className="space-y-1">
                {Object.entries(currentQ.reasoning).map(([label, reason]) => (
                  <li key={label}><strong>{label}:</strong> {reason}</li>
                ))}
              </ul>
            </div>
          </div>
          
          <button
            onClick={nextQuestion}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {currentQuestion < questions.length - 1 ? 'Next Question' : 'View Results'}
          </button>
        </div>
      )}
    </div>
  );
};

export default GitLabLabelQuiz;