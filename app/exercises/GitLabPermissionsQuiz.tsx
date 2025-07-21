'use client';
import React, { useState, useEffect } from 'react';
import { Shield, Users, Lock, AlertTriangle, CheckCircle, XCircle, Star, Award, Clock, DollarSign } from 'lucide-react';

interface ScenarioOption {
  id: string;
  text: string;
  correct: boolean;
  riskLevel?: string;
}

interface Scenario {
  id: number;
  title: string;
  difficulty?: string;
  timeImpact?: string;
  costImpact?: string;
  situation: string;
  question: string;
  options: ScenarioOption[];
  explanation: string;
  impact: string;
  followUp?: string;
}

const GitLabPermissionsQuiz = () => {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [showExplanation, setShowExplanation] = useState<Record<number, boolean>>({});
  const [confidenceRatings, setConfidenceRatings] = useState<Record<number, number>>({});
  const [startTime, setStartTime] = useState<number | null>(null);
  const [completionTime, setCompletionTime] = useState<number | null>(null);
  const [achievements, setAchievements] = useState<string[]>([]);

  // Load progress from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem('gitlab-permissions-quiz');
    if (savedProgress) {
      const data = JSON.parse(savedProgress);
      setAnswers(data.answers || {});
      setConfidenceRatings(data.confidenceRatings || {});
      setAchievements(data.achievements || []);
    }
    setStartTime(Date.now());
  }, []);

  // Save progress to localStorage
  useEffect(() => {
    const progressData = {
      answers,
      confidenceRatings,
      achievements,
      lastUpdate: Date.now()
    };
    localStorage.setItem('gitlab-permissions-quiz', JSON.stringify(progressData));
  }, [answers, confidenceRatings, achievements]);

  // Type the scenarios array properly
  const scenarios: Scenario[] = [
    {
      id: 1,
      title: "🔥 External Contractor Access",
      difficulty: "Beginner",
      timeImpact: "2-3 hours setup",
      costImpact: "$0 - Best practice",
      situation: "Your startup is hiring a freelance developer for 2 months to help with a critical feature. They need to contribute code but shouldn't see financial reports or internal strategic documents that are in other projects.",
      question: "What's the best approach for giving this contractor access?",
      options: [
        { 
          id: 'a', 
          text: "Add them as a Developer to the main group containing all projects",
          correct: false,
          riskLevel: "High"
        },
        { 
          id: 'b', 
          text: "Add them as a Developer only to the specific project they're working on",
          correct: true,
          riskLevel: "Low"
        },
        { 
          id: 'c', 
          text: "Add them as a Guest to the main group and upgrade permissions as needed",
          correct: false,
          riskLevel: "Medium"
        },
        { 
          id: 'd', 
          text: "Create a separate GitLab instance for external contractors",
          correct: false,
          riskLevel: "Medium"
        }
      ],
      explanation: "✅ **Correct: Option B** - Project-level Developer access follows the principle of least privilege. They get exactly what they need (push code, create MRs, see issues) for that specific project only.\n\n❌ **Why others are wrong:**\n- **A**: Violates least privilege - gives access to ALL projects\n- **C**: Guests can't push code or create MRs\n- **D**: Overkill and creates maintenance overhead",
      impact: "🎯 **Real Impact**: Prevents data breaches while enabling collaboration. Many companies have exposed sensitive IP by giving contractors group-level access.",
      followUp: "💡 **Pro Tip**: Set up a project access review calendar to automatically revoke contractor access when their contract ends."
    },
    {
      id: 2,
      title: "🚨 Production Hotfix Emergency",
      difficulty: "Intermediate",
      timeImpact: "5-10 minutes",
      costImpact: "$5000+/min downtime",
      situation: "It's 2 AM, production is down, and your Senior Developer needs to push a critical hotfix directly to the main branch. Your repository currently has push rules preventing direct pushes to main.",
      question: "How do you handle this emergency while maintaining security?",
      options: [
        { 
          id: 'a', 
          text: "Temporarily disable all push rules for the main branch",
          correct: false,
          riskLevel: "High"
        },
        { 
          id: 'b', 
          text: "Give the developer Maintainer role temporarily to bypass rules",
          correct: true,
          riskLevel: "Low"
        },
        { 
          id: 'c', 
          text: "Create an emergency branch with relaxed rules",
          correct: false,
          riskLevel: "Medium"
        },
        { 
          id: 'd', 
          text: "Force them to create an MR even in emergency",
          correct: false,
          riskLevel: "High"
        }
      ],
      explanation: "✅ **Correct: Option B** - Maintainers can bypass push rules when needed. This gives controlled emergency access that can be revoked immediately after.\n\n❌ **Why others are wrong:**\n- **A**: Removes protection for everyone, not just the emergency responder\n- **C**: Adds complexity during crisis; hotfix should go to main\n- **D**: MR reviews cause dangerous delays during production outages",
      impact: "⚡ **Real Impact**: Production downtime costs can be $5,000+ per minute. Having a clear escalation path for push rules saves both time and money.",
      followUp: "🔧 **Action Item**: Document your emergency escalation procedures and train your team on them before you need them."
    },
    {
      id: 3,
      title: "👥 Cross-Team Collaboration",
      situation: "The Marketing team needs to access your project to update documentation and create issues for feature requests, but they shouldn't be able to see code, merge requests, or sensitive technical discussions.",
      question: "What role should you assign to the Marketing team?",
      options: [
        { 
          id: 'a', 
          text: "Guest - they can view and comment on issues",
          correct: false
        },
        { 
          id: 'b', 
          text: "Reporter - they can view issues and create new ones",
          correct: true
        },
        { 
          id: 'c', 
          text: "Developer - so they can contribute to documentation",
          correct: false
        },
        { 
          id: 'd', 
          text: "Create a separate documentation-only project",
          correct: false
        }
      ],
      explanation: "✅ **Correct: Option B** - Reporters can create issues, view project details, and contribute to wikis, but can't see code or sensitive MR discussions.\n\n❌ **Why others are wrong:**\n- **A**: Guests can't create issues, only comment on existing ones\n- **C**: Developers can see all code and merge requests\n- **D**: Creates maintenance overhead and splits information",
      impact: "🤝 **Real Impact**: Enables cross-functional collaboration without compromising security. Marketing gets what they need while engineering maintains privacy."
    },
    {
      id: 4,
      title: "🔒 Client Demo Repository",
      situation: "You're preparing a demo for a potential client and need to show them a specific feature branch, but your main repository contains proprietary algorithms and customer data they shouldn't see.",
      question: "What's the safest way to share this demo?",
      options: [
        { 
          id: 'a', 
          text: "Add the client as a Guest to your main project",
          correct: false
        },
        { 
          id: 'b', 
          text: "Fork the project and invite them to the fork",
          correct: false
        },
        { 
          id: 'c', 
          text: "Create a separate public demo project with only the relevant code",
          correct: true
        },
        { 
          id: 'd', 
          text: "Share your screen during a video call instead",
          correct: false
        }
      ],
      explanation: "✅ **Correct: Option C** - A separate demo repository with curated content eliminates any risk of exposing sensitive information.\n\n❌ **Why others are wrong:**\n- **A**: Even Guests can browse code and see commit history\n- **B**: Forks inherit the entire repository history and content\n- **D**: Not interactive; clients can't explore the code properly",
      impact: "🛡️ **Real Impact**: Prevents accidental IP exposure during sales processes. Many deals have been killed when clients saw competitor names in commit history."
    },
    {
      id: 5,
      title: "🎓 New Team Member Onboarding",
      situation: "A junior developer just joined your team. They need to learn by exploring the codebase and understanding workflows, but you want to prevent accidental damage while they're learning.",
      question: "What's the best permission strategy for their first month?",
      options: [
        { 
          id: 'a', 
          text: "Start as Guest, promote to Developer after training",
          correct: false
        },
        { 
          id: 'b', 
          text: "Give Developer access but enable push rules requiring approvals",
          correct: true
        },
        { 
          id: 'c', 
          text: "Give full Developer access to encourage independence",
          correct: false
        },
        { 
          id: 'd', 
          text: "Create a training branch with separate permissions",
          correct: false
        }
      ],
      explanation: "✅ **Correct: Option B** - Developer access lets them create branches and MRs (essential for learning), while approval rules provide safety nets.\n\n❌ **Why others are wrong:**\n- **A**: Guests can't create branches or MRs, limiting learning opportunities\n- **C**: Too risky; junior developers can accidentally force-push or delete branches\n- **D**: Training branches don't teach real workflow patterns",
      impact: "📚 **Real Impact**: Balances learning with safety. New developers need hands-on experience with real tools, but guardrails prevent costly mistakes."
    },
    {
      id: 6,
      title: "🔐 Sensitive Security Project",
      situation: "Your team is working on a security vulnerability fix that can't be disclosed until coordinated release. The project needs to be accessible to your security team but completely hidden from other developers in the company.",
      question: "How do you configure this project's visibility?",
      options: [
        { 
          id: 'a', 
          text: "Set project to Private and manually invite security team members",
          correct: true
        },
        { 
          id: 'b', 
          text: "Set project to Internal so company members can access if needed",
          correct: false
        },
        { 
          id: 'c', 
          text: "Create a separate GitLab group for security projects",
          correct: false
        },
        { 
          id: 'd', 
          text: "Use confidential issues in the main project instead",
          correct: false
        }
      ],
      explanation: "✅ **Correct: Option A** - Private projects are only visible to invited members, ensuring complete confidentiality for security work.\n\n❌ **Why others are wrong:**\n- **B**: Internal projects are visible to all company members\n- **C**: Group visibility doesn't solve the problem; project visibility does\n- **D**: Confidential issues still exist within a visible project",
      impact: "🛡️ **Real Impact**: Security vulnerabilities leaked early can be exploited by attackers. Private projects ensure coordinated disclosure."
    },
    {
      id: 7,
      title: "💼 Audit & Compliance Review",
      situation: "Your company is undergoing a security audit, and auditors need to review code changes and approval processes for the last 6 months, but shouldn't be able to make any changes or see current development work.",
      question: "What access should auditors receive?",
      options: [
        { 
          id: 'a', 
          text: "Guest access to see code but not modify anything",
          correct: false
        },
        { 
          id: 'b', 
          text: "Reporter access to view code and histories without push rights",
          correct: true
        },
        { 
          id: 'c', 
          text: "Export code history and share externally",
          correct: false
        },
        { 
          id: 'd', 
          text: "Create read-only project mirrors for auditors",
          correct: false
        }
      ],
      explanation: "✅ **Correct: Option B** - Reporters can view all code, commit history, and MR processes without any modification rights - perfect for audits.\n\n❌ **Why others are wrong:**\n- **A**: Guests have limited access to project history\n- **C**: Loses audit trail and context; creates security risks\n- **D**: Unnecessary complexity; GitLab permissions handle this natively",
      impact: "📋 **Real Impact**: Proper audit access ensures compliance without compromising security. Wrong permissions can lead to failed audits or exposed systems."
    },
    {
      id: 8,
      title: "⚡ Feature Flag Emergency",
      situation: "A feature flag needs to be toggled immediately in production, but your DevOps engineer is unavailable. The configuration is stored in a GitLab project that only Maintainers can modify.",
      question: "How do you handle this emergency access situation?",
      options: [
        { 
          id: 'a', 
          text: "Temporarily promote someone to Maintainer role",
          correct: true
        },
        { 
          id: 'b', 
          text: "Use the GitLab API with a service account",
          correct: false
        },
        { 
          id: 'c', 
          text: "Wait for the DevOps engineer to return",
          correct: false
        },
        { 
          id: 'd', 
          text: "Modify the feature flag directly in production",
          correct: false
        }
      ],
      explanation: "✅ **Correct: Option A** - Temporary role promotion provides immediate access while maintaining audit trails through GitLab.\n\n❌ **Why others are wrong:**\n- **B**: Service accounts need pre-configuration and may not exist\n- **C**: Production issues can't wait for availability\n- **D**: Bypasses version control and creates configuration drift",
      impact: "🚨 **Real Impact**: Feature flag emergencies can affect thousands of users. Having clear escalation procedures prevents prolonged outages.",
      followUp: "⚙️ **Best Practice**: Set up automated feature flag controls and multiple team members with emergency access."
    },
    {
      id: 9,
      title: "🎓 Open Source Contribution Setup",
      difficulty: "Beginner",
      timeImpact: "30-45 minutes",
      costImpact: "$0 - Standard process",
      situation: "Your team wants to contribute to an open source project hosted on GitLab.com. Some contributors are internal employees, others are external volunteers. You need to maintain clear separation between company IP and open source work.",
      question: "How should you structure this open source project?",
      options: [
        { 
          id: 'a', 
          text: "Use your company GitLab instance and invite external contributors",
          correct: false,
          riskLevel: "High"
        },
        { 
          id: 'b', 
          text: "Create separate public project on GitLab.com with clear contributor guidelines",
          correct: true,
          riskLevel: "Low"
        },
        { 
          id: 'c', 
          text: "Fork the project to your company instance and mirror changes",
          correct: false,
          riskLevel: "Medium"
        },
        { 
          id: 'd', 
          text: "Use the same repository but different branches for company vs OSS work",
          correct: false,
          riskLevel: "High"
        }
      ],
      explanation: "✅ **Correct: Option B** - Public projects should live on GitLab.com with clear separation from company infrastructure. Contributor agreements protect both parties.\n\n❌ **Why others are wrong:**\n- **A**: Exposes company infrastructure to external users\n- **C**: Creates maintenance overhead and delays\n- **D**: Mixes proprietary and open source code dangerously",
      impact: "🌍 **Real Impact**: Proper OSS setup encourages community contributions while protecting company IP. Many successful projects thrive with this separation.",
      followUp: "📋 **Action Item**: Create contributor license agreements (CLA) and clear guidelines for what can/cannot be included in OSS contributions."
    },
    {
      id: 10,
      title: "💼 Multi-tenant SaaS Customer Access",
      difficulty: "Advanced",
      timeImpact: "2-4 hours planning",
      costImpact: "High - Security breach risk",
      situation: "You're building a SaaS platform where customers need to see their deployment configurations stored in GitLab. Customer A should never see Customer B's configs, but your support team needs access to help troubleshoot across all customers.",
      question: "What's the most scalable permission architecture?",
      options: [
        { 
          id: 'a', 
          text: "Create separate GitLab groups per customer with isolated access",
          correct: true,
          riskLevel: "Low"
        },
        { 
          id: 'b', 
          text: "Use one project with different branches per customer",
          correct: false,
          riskLevel: "High"
        },
        { 
          id: 'c', 
          text: "Create customer-specific projects within a shared group",
          correct: false,
          riskLevel: "Medium"
        },
        { 
          id: 'd', 
          text: "Use confidential issues to separate customer data",
          correct: false,
          riskLevel: "High"
        }
      ],
      explanation: "✅ **Correct: Option A** - Separate groups provide complete isolation while allowing group-level support access. This scales well as you add customers.\n\n❌ **Why others are wrong:**\n- **B**: Branch-level permissions are complex and error-prone at scale\n- **C**: Shared groups risk accidental cross-customer access\n- **D**: Issues aren't designed for configuration management",
      impact: "🔒 **Real Impact**: Customer data breaches can end your SaaS business. Proper multi-tenancy is critical for enterprise customers.",
      followUp: "🏗️ **Architecture Note**: Consider automating group creation and customer onboarding to maintain consistency at scale."
    }
  ];

  const handleAnswerSelect = (scenarioId: number, optionId: string) => {
    setAnswers(prev => ({
      ...prev,
      [scenarioId]: optionId
    }));
    
    // Check for achievements
    checkForAchievements(scenarioId, optionId);
  };

  const handleConfidenceRating = (scenarioId: number, rating: number) => {
    setConfidenceRatings(prev => ({
      ...prev,
      [scenarioId]: rating
    }));
  };

  const checkForAchievements = (scenarioId: number, optionId: string) => {
    const scenario = scenarios.find(s => s.id === scenarioId);
    const correctOption = scenario?.options.find(opt => opt.correct);
    
    if (correctOption && optionId === correctOption.id) {
      const newAchievements: string[] = [];
      
      // First correct answer
      if (Object.keys(answers).length === 0) {
        newAchievements.push("First Success");
      }
      
      // Perfect streak
      const correctAnswers = Object.keys(answers).filter(id => {
        const s = scenarios.find(sc => sc.id === parseInt(id));
        const correct = s?.options.find(opt => opt.correct);
        return correct && answers[parseInt(id)] === correct.id;
      }).length;
      
      if (correctAnswers >= 3) {
        newAchievements.push("Streak Master");
      }
      
      // Add achievements
      if (newAchievements.length > 0) {
        setAchievements(prev => [...new Set([...prev, ...newAchievements])]);
      }
    }
  };

  const toggleExplanation = (scenarioId: number) => {
    setShowExplanation(prev => ({
      ...prev,
      [scenarioId]: !prev[scenarioId]
    }));
  };

  const getScore = () => {
    let correct = 0;
    scenarios.forEach(scenario => {
      const userAnswer = answers[scenario.id];
      const correctOption = scenario.options.find(opt => opt.correct);
      if (userAnswer && correctOption && userAnswer === correctOption.id) {
        correct++;
      }
    });
    return correct;
  };

  const getScoreColor = (score: number, total: number) => {
    const percentage = (score / total) * 100;
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getCurrentScenario = () => scenarios[currentScenario];
  const userAnswer = answers[getCurrentScenario().id];
  const hasAnswered = userAnswer !== undefined;

  if (showResults) {
    const score = getScore();
    const total = scenarios.length;
    const percentage = Math.round((score / total) * 100);
    const timeSpent = startTime && completionTime ? Math.round((completionTime - startTime) / 1000 / 60) : null;
    
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white">
        <div className="text-center mb-8">
          <Shield className="w-16 h-16 mx-auto mb-4 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">GitLab Permissions Quiz Results</h1>
          <div className={`text-6xl font-bold mb-2 ${getScoreColor(score, total)}`}>
            {score}/{total}
          </div>
          <div className={`text-xl ${getScoreColor(score, total)}`}>
            {percentage}% - {percentage >= 80 ? "Permissions Expert! 🚀" : percentage >= 60 ? "Good Knowledge 👍" : "Needs Improvement 📚"}
          </div>
          {timeSpent && (
            <div className="text-gray-600 mt-2 flex items-center justify-center gap-2">
              <Clock className="w-4 h-4" />
              Completed in {timeSpent} minutes
            </div>
          )}
        </div>

        {/* Achievements Section */}
        {achievements.length > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Award className="w-5 h-5 text-yellow-600" />
              <h3 className="font-semibold text-yellow-800">Achievements Unlocked!</h3>
            </div>
            <div className="flex gap-2 flex-wrap">
              {achievements.map(achievement => (
                <span key={achievement} className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                  {achievement}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Performance Insights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-blue-600">{score}</div>
            <div className="text-sm text-blue-700">Correct Answers</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-green-600">
              {Object.values(confidenceRatings).length > 0 ? 
                Math.round(Object.values(confidenceRatings).reduce((a, b) => a + b, 0) / Object.values(confidenceRatings).length * 10) / 10 : 
                'N/A'}
            </div>
            <div className="text-sm text-green-700">Avg Confidence</div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-purple-600">{achievements.length}</div>
            <div className="text-sm text-purple-700">Achievements</div>
          </div>
        </div>

        <div className="space-y-6">
          {scenarios.map((scenario) => {
            const userAnswer = answers[scenario.id];
            const correctOption = scenario.options.find(opt => opt.correct);
            const userOption = scenario.options.find(opt => opt.id === userAnswer);
            const isCorrect = correctOption && userAnswer === correctOption.id;

            return (
              <div key={scenario.id} className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-start gap-3 mb-4">
                  {isCorrect ? 
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" /> : 
                    <XCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                  }
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">{scenario.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{scenario.situation}</p>
                    <p className="font-medium text-gray-800 mb-2">{scenario.question}</p>
                    
                    <div className="space-y-2 text-sm">
                      <div className={`p-2 rounded ${isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        <strong>Your answer:</strong> {userOption?.text || "No answer selected"}
                      </div>
                      {!isCorrect && correctOption && (
                        <div className="p-2 rounded bg-green-100 text-green-800">
                          <strong>Correct answer:</strong> {correctOption.text}
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => toggleExplanation(scenario.id)}
                      className="mt-3 text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      {showExplanation[scenario.id] ? "Hide" : "Show"} Explanation
                    </button>

                    {showExplanation[scenario.id] && (
                      <div className="mt-3 p-4 bg-blue-50 rounded-lg text-sm">
                        <div className="whitespace-pre-line text-gray-700 mb-3">
                          {scenario.explanation}
                        </div>
                        <div className="text-blue-800 font-medium">
                          {scenario.impact}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center space-y-4">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">📚 Continue Learning</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="text-left">
                <h4 className="font-medium text-gray-800 mb-2">GitLab Documentation</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• <a href="https://docs.gitlab.com/ee/user/permissions.html" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">User permissions and access</a></li>
                  <li>• <a href="https://docs.gitlab.com/ee/user/group/index.html" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Groups and project organization</a></li>
                  <li>• <a href="https://docs.gitlab.com/ee/push_rules/push_rules.html" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Push rules and protection</a></li>
                </ul>
              </div>
              <div className="text-left">
                <h4 className="font-medium text-gray-800 mb-2">Best Practices</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• Always follow principle of least privilege</li>
                  <li>• Document emergency access procedures</li>
                  <li>• Regular permission audits and cleanup</li>
                  <li>• Use groups for scalable permission management</li>
                </ul>
              </div>
            </div>
          </div>
          
          <button
            onClick={() => {
              setShowResults(false);
              setCurrentScenario(0);
              setAnswers({});
              setShowExplanation({});
              setConfidenceRatings({});
              setAchievements([]);
              setStartTime(Date.now());
              setCompletionTime(null);
            }}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
          >
            Take Quiz Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <div className="text-center mb-8">
        <Shield className="w-16 h-16 mx-auto mb-4 text-blue-600" />
        <h1 className="text-3xl font-bold text-gray-900 mb-2">GitLab Permissions & Access Control</h1>
        <p className="text-lg text-gray-600 mb-4">Test your knowledge of GitLab permission scenarios that every PM faces</p>
        <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            Real workplace scenarios
          </span>
          <span className="flex items-center gap-1">
            <Lock className="w-4 h-4" />
            Security-focused
          </span>
          <span className="flex items-center gap-1">
            <AlertTriangle className="w-4 h-4" />
            High-impact decisions
          </span>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">
            Question {currentScenario + 1} of {scenarios.length}
          </span>
          <div className="flex gap-2">
            {scenarios.map((_, scenarioIndex) => (
              <div
                key={scenarioIndex}
                className={`w-3 h-3 rounded-full ${
                  scenarioIndex === currentScenario ? 'bg-blue-600' : 
                  answers[scenarios[scenarioIndex].id] ? 'bg-green-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
            style={{ width: `${((currentScenario + 1) / scenarios.length) * 100}%` }}
          />
        </div>
      </div>

        <div className="bg-white border rounded-lg p-6 shadow-lg mb-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-4">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              getCurrentScenario().difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
              getCurrentScenario().difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {getCurrentScenario().difficulty}
            </span>
            <span className="flex items-center gap-1 text-xs text-gray-600">
              <Clock className="w-3 h-3" />
              {getCurrentScenario().timeImpact}
            </span>
            <span className="flex items-center gap-1 text-xs text-gray-600">
              <DollarSign className="w-3 h-3" />
              {getCurrentScenario().costImpact}
            </span>
          </div>
          {achievements.length > 0 && (
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-yellow-500" />
              <span className="text-xs text-gray-600">{achievements.length} achievements</span>
            </div>
          )}
        </div>
        
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            {getCurrentScenario().title}
          </h2>
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <p className="text-gray-700 leading-relaxed">
              {getCurrentScenario().situation}
            </p>
          </div>
          <p className="font-medium text-gray-900">
            {getCurrentScenario().question}
          </p>
        </div>

        <div className="space-y-3 mb-6">
          {getCurrentScenario().options.map((option) => (
            <label
              key={option.id}
              className={`block p-4 border-2 rounded-lg cursor-pointer transition-all ${
                userAnswer === option.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-start gap-3">
                <input
                  type="radio"
                  name={`scenario-${getCurrentScenario().id}`}
                  value={option.id}
                  checked={userAnswer === option.id}
                  onChange={() => handleAnswerSelect(getCurrentScenario().id, option.id)}
                  className="mt-1"
                />
                <div className="flex-1">
                  <span className="text-gray-800">{option.text}</span>
                  {'riskLevel' in option && option.riskLevel && (
                    <span className={`ml-2 px-2 py-1 rounded text-xs font-medium ${
                      option.riskLevel === 'High' ? 'bg-red-100 text-red-700' :
                      option.riskLevel === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {option.riskLevel} Risk
                    </span>
                  )}
                </div>
              </div>
            </label>
          ))}
        </div>

        {hasAnswered && (
          <div className="mb-4 p-4 bg-blue-50 rounded-lg">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-medium text-blue-800">How confident are you in this answer?</span>
              <div className="flex gap-1">
                {[1,2,3,4,5].map(rating => (
                  <button
                    key={rating}
                    onClick={() => handleConfidenceRating(getCurrentScenario().id, rating)}
                    className={`w-6 h-6 rounded ${
                      confidenceRatings[getCurrentScenario().id] >= rating
                        ? 'text-yellow-500'
                        : 'text-gray-300'
                    }`}
                  >
                    <Star className="w-full h-full fill-current" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}        {hasAnswered && (
          <button
            onClick={() => toggleExplanation(getCurrentScenario().id)}
            className="mb-4 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm font-medium"
          >
            {showExplanation[getCurrentScenario().id] ? "Hide" : "Show"} Explanation
          </button>
        )}

        {showExplanation[getCurrentScenario().id] && (
          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <div className="whitespace-pre-line text-gray-700 mb-3">
              {getCurrentScenario().explanation}
            </div>
            <div className="text-blue-800 font-medium mb-3">
              {getCurrentScenario().impact}
            </div>
            {getCurrentScenario().followUp && (
              <div className="text-blue-700 bg-blue-100 p-3 rounded text-sm">
                {getCurrentScenario().followUp}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex justify-between items-center">
        <button
          onClick={() => setCurrentScenario(Math.max(0, currentScenario - 1))}
          disabled={currentScenario === 0}
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ← Previous
        </button>

        <div className="text-sm text-gray-500">
          {Object.keys(answers).length} of {scenarios.length} answered
        </div>

        {currentScenario === scenarios.length - 1 ? (
          <button
            onClick={() => {
              setCompletionTime(Date.now());
              setShowResults(true);
            }}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
          >
            View Results →
          </button>
        ) : (
          <button
            onClick={() => setCurrentScenario(Math.min(scenarios.length - 1, currentScenario + 1))}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Next →
          </button>
        )}
      </div>
    </div>
  );
};

export default GitLabPermissionsQuiz;
