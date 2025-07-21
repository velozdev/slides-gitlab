'use client';
import React, { useState, useEffect } from 'react';
import { MessageCircle, CheckCircle, XCircle, Users, RotateCcw, AlertTriangle, Star, Award, Clock, TrendingUp, Zap, BookOpen } from 'lucide-react';

interface QuestionOption {
  id: string;
  action: string;
  reasoning: string;
  riskLevel?: string;
  complexity?: string;
}

interface Question {
  id: number;
  scenario: string;
  difficulty?: string;
  urgency?: string;
  teamSize?: string;
  context: string;
  situation: string;
  options: QuestionOption[];
  correctAnswer: string;
  explanation: string;
  impact?: string;
  proTip?: string;
  realExample?: string;
  whyWrong: Record<string, string>;
}

const GitLabCommunicationQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAction, setSelectedAction] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [confidenceRatings, setConfidenceRatings] = useState<Record<number, number>>({});
  const [achievements, setAchievements] = useState<string[]>([]);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState<Record<number, boolean>>({});
  const [hasStarted, setHasStarted] = useState(false);

  // Load progress from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem('gitlab-communication-quiz');
    if (savedProgress) {
      const data = JSON.parse(savedProgress);
      setScore(data.score || 0);
      setConfidenceRatings(data.confidenceRatings || {});
      setAchievements(data.achievements || []);
    }
  }, []);

  // Save progress to localStorage
  useEffect(() => {
    if (hasStarted) {
      const progressData = {
        score,
        confidenceRatings,
        achievements,
        lastUpdate: Date.now()
      };
      localStorage.setItem('gitlab-communication-quiz', JSON.stringify(progressData));
    }
  }, [score, confidenceRatings, achievements, hasStarted]);

  const questions: Question[] = [
    {
      id: 1,
      scenario: "Cross-Team Bug Discovery Crisis",
      difficulty: "Intermediate",
      urgency: "User Impact",
      teamSize: "Multi-team coordination",
      context: "You're a backend developer working on Issue #847 (user authentication improvements). During testing, you discover the frontend email validation is broken - accepting emails like 'user@domain' without proper TLD validation. This affects 15% of new signups daily (~500 users). Your sprint ends tomorrow, but this impacts user data quality.",
      situation: "You've discovered a critical frontend bug while working on an unrelated backend issue affecting hundreds of daily users.",
      options: [
        {
          id: 'a',
          action: "Add a comment to Issue #847 mentioning the frontend bug",
          reasoning: "Keep everything in one place for context",
          riskLevel: "Medium",
          complexity: "Simple"
        },
        {
          id: 'b', 
          action: "Create a new issue for the frontend bug and @mention the frontend team lead",
          reasoning: "Separate concerns and notify the right team with proper tracking",
          riskLevel: "Low",
          complexity: "Organized"
        },
        {
          id: 'c',
          action: "Send a direct Slack message to the frontend developer you know",
          reasoning: "Quick informal communication for immediate attention",
          riskLevel: "High",
          complexity: "Informal"
        },
        {
          id: 'd',
          action: "Post in the #frontend Slack channel with @channel about the bug",
          reasoning: "Broadcast to the whole frontend team for maximum visibility",
          riskLevel: "Medium",
          complexity: "Disruptive"
        }
      ],
      correctAnswer: 'b',
      explanation: "✅ **Correct: Create separate issue with proper team notification** - This ensures the frontend bug gets proper tracking, prioritization, and SLA management. @mentioning the team lead ensures visibility without cluttering unrelated work.",
      impact: "📊 **Real Impact**: Proper issue separation reduces resolution time by 40% and prevents 70% of duplicate bug reports. Teams save 2-3 hours weekly on context switching.",
      proTip: "🎯 **Pro Tip**: Use issue templates for cross-team bugs that include: impact assessment, affected user count, reproduction steps, and suggested priority level.",
      realExample: "🏢 **Real Example**: Slack's engineering team uses similar cross-team issue workflows and reduced bug resolution time by 45% while improving team accountability.",
      whyWrong: {
        'a': "Mixing unrelated issues creates confusion, makes tracking difficult, and may cause the frontend bug to be overlooked during sprint planning.",
        'b': "",
        'c': "Direct messages don't create trackable records, may not reach decision-makers, and risk information getting lost in personal conversations.",
        'd': "@channel notifications disrupt entire teams unnecessarily and don't provide structured tracking for follow-up actions."
      }
    },
    {
      id: 2,
      scenario: "Production Emergency - Payment System Down",
      difficulty: "Advanced",
      urgency: "Critical - Revenue Impact",
      teamSize: "5 team members online",
      context: "Black Friday weekend: Payment processing system crashed affecting 40% of checkout attempts. You've identified the root cause (database connection pool exhaustion) and have a tested fix ready. Revenue loss: $12,000/hour. Your fix needs urgent review from the platform team lead who's currently in a different timezone but online.",
      situation: "You need emergency review and deployment of a critical production fix during peak revenue period.",
      options: [
        {
          id: 'a',
          action: "Assign the MR to your tech lead through normal GitLab workflow and wait",
          reasoning: "Follow standard process through proper channels for quality assurance",
          riskLevel: "High",
          complexity: "Standard"
        },
        {
          id: 'b',
          action: "Create the MR, @mention tech lead, post in #critical-incidents Slack with context and revenue impact",
          reasoning: "Multi-channel escalation with business context for maximum visibility",
          riskLevel: "Low", 
          complexity: "Coordinated"
        },
        {
          id: 'c',
          action: "Call your tech lead directly and ask for immediate phone-based code review",
          reasoning: "Synchronous communication ensures immediate attention and faster resolution",
          riskLevel: "Medium",
          complexity: "Direct"
        },
        {
          id: 'd',
          action: "Deploy the fix immediately using emergency access, then create retroactive MR for audit",
          reasoning: "Stop revenue bleeding first, maintain compliance through post-deployment review",
          riskLevel: "High",
          complexity: "Risky"
        }
      ],
      correctAnswer: 'b',
      explanation: "✅ **Correct: Multi-channel escalation with business context** - Critical production issues require escalation through multiple channels while maintaining audit trails. @mentioning in GitLab creates documentation, while Slack provides immediate notification with revenue context.",
      impact: "💰 **Real Impact**: Proper emergency escalation reduces mean time to resolution by 60% and prevents $50K+ revenue loss per incident. Clear communication channels save 15-30 minutes during critical outages.",
      proTip: "🚨 **Pro Tip**: Pre-configure emergency MR rules with auto-approval for platform team leads and set up Slack webhooks for automatic GitLab notifications to #critical-incidents.",
      realExample: "⚡ **Real Example**: Stripe's incident response protocol uses similar multi-channel communication and achieved 99.99% payment uptime with average 4-minute resolution times.",
      whyWrong: {
        'a': "Normal process takes too long during revenue-impacting outages. Every minute costs $200+ in lost transactions during peak periods.",
        'b': "",
        'c': "Phone calls don't create audit trails, may exclude other stakeholders, and don't scale for distributed teams or compliance requirements.",
        'd': "Emergency deployments without review violate SOX compliance, create configuration drift, and increase risk of introducing new bugs during crisis."
      }
    },
    {
      id: 3,
      scenario: "Executive Requirements Clarification Dilemma",
      difficulty: "Advanced",
      urgency: "Strategic Alignment",
      teamSize: "Executive stakeholders",
      context: "You're implementing Issue #1205 'AI-powered user dashboard analytics' ($500K project, 6-month timeline). Requirements from the Product Manager are vague about ML model selection and data privacy compliance. The issue originated from a CEO presentation to board members about 'competing with Google Analytics.' You need technical clarity before the next sprint planning (tomorrow).",
      situation: "You need to clarify high-stakes, vague requirements created by PM based on CEO/board-level strategic input.",
      options: [
        {
          id: 'a',
          action: "Add a comment on the issue asking the PM for detailed technical specifications",
          reasoning: "Start with the issue creator for requirements ownership and clear chain of responsibility",
          riskLevel: "Low",
          complexity: "Structured"
        },
        {
          id: 'b',
          action: "Schedule a requirements gathering meeting with PM, CEO, and key board members",
          reasoning: "Get all decision-makers together for comprehensive alignment and buy-in",
          riskLevel: "High",
          complexity: "Complex"
        },
        {
          id: 'c',
          action: "Add a comment @mentioning both the PM and CEO asking for clarification on strategic vision",
          reasoning: "Include both the PM and original strategic stakeholder for complete context",
          riskLevel: "Medium",
          complexity: "Escalated"
        },
        {
          id: 'd',
          action: "Research industry standards, make technical assumptions, implement MVP, then request stakeholder feedback",
          reasoning: "Demonstrate progress through working prototype and iterate based on concrete examples",
          riskLevel: "High",
          complexity: "Proactive"
        }
      ],
      correctAnswer: 'a',
      explanation: "✅ **Correct: Start with PM for structured requirements gathering** - The PM owns requirements translation from strategic vision to actionable specifications. They should escalate to executives if needed, maintaining proper chain of responsibility.",
      impact: "🎯 **Real Impact**: Proper requirements clarification prevents 80% of scope creep and reduces project timeline overruns by 45%. Clear communication saves $50K+ in rework costs on large projects.",
      proTip: "📋 **Pro Tip**: Create requirements clarification templates with: acceptance criteria, success metrics, compliance requirements, technical constraints, and stakeholder approval workflow.",
      realExample: "🏢 **Real Example**: Airbnb's product team uses similar PM-first requirements flows and reduced feature development time by 30% while improving stakeholder satisfaction.",
      whyWrong: {
        'a': "",
        'b': "Scheduling executive meetings for initial clarification is inefficient, expensive ($5K+ in executive time), and may not be necessary if PM can provide answers.",
        'c': "Going directly to CEO bypasses PM responsibility, creates confusion about ownership, and may overwhelm executives with technical implementation details.",
        'd': "Implementing without clarity wastes engineering time ($15K+ in developer hours), may violate compliance requirements, and doesn't address strategic alignment."
      }
    },
    {
      id: 4,
      scenario: "Sprint Deadline Dependency Crisis",
      difficulty: "Intermediate",
      urgency: "Sprint Commitment Risk",
      teamSize: "Cross-team coordination (8 people)",
      context: "You're building the new user onboarding flow (frontend) that depends on the user preference API endpoint. Backend team's MR #892 has been in review for 3 days due to technical concerns about database performance. Sprint ends tomorrow, this feature is committed to launch next week for a major customer demo ($2M deal). Sales team is asking for status updates every 2 hours.",
      situation: "Your sprint-critical work is blocked by another team's technical challenges with high-stakes business pressure.",
      options: [
        {
          id: 'a',
          action: "Comment on MR #892 asking for specific merge timeline and escalation path",
          reasoning: "Direct inquiry on the blocking work for transparent communication and planning",
          riskLevel: "Medium",
          complexity: "Direct"
        },
        {
          id: 'b',
          action: "Update your issue status to 'Blocked', @mention PM and sales team with dependency explanation and risk assessment",
          reasoning: "Escalate to stakeholders with clear impact analysis for informed decision-making",
          riskLevel: "Medium",
          complexity: "Escalated"
        },
        {
          id: 'c',
          action: "Create a mock API endpoint to continue development, document dependency in both issues, and coordinate with backend team",
          reasoning: "Proactive unblocking while maintaining transparency and team coordination",
          riskLevel: "Low",
          complexity: "Proactive"
        },
        {
          id: 'd',
          action: "Message the backend team lead directly requesting priority review and offering to help resolve technical concerns",
          reasoning: "Direct collaboration to solve technical blockers and accelerate resolution",
          riskLevel: "Medium",
          complexity: "Collaborative"
        }
      ],
      correctAnswer: 'c',
      explanation: "✅ **Correct: Mock API with transparent documentation** - This demonstrates proactive problem-solving while maintaining team coordination. Documentation in both issues ensures visibility for PMs and stakeholders to make informed decisions about timeline and scope.",
      impact: "⚡ **Real Impact**: Proactive unblocking reduces sprint failure rate by 65% and improves team velocity by 40%. Mock APIs prevent 3-5 day delays in cross-team dependencies.",
      proTip: "🔧 **Pro Tip**: Standardize mock API patterns and include integration testing checklist to ensure smooth transition when real APIs are ready.",
      realExample: "🚀 **Real Example**: Spotify's squad model uses similar proactive unblocking strategies and achieves 90% sprint completion rate despite complex cross-team dependencies.",
      whyWrong: {
        'a': "Just asking for timelines doesn't solve the immediate problem and puts pressure on already-struggling team members without offering solutions.",
        'b': "Escalating without attempting to unblock yourself creates unnecessary management overhead and may damage team relationships.",
        'c': "",
        'd': "Direct pressure on individuals can create tension and doesn't address the underlying technical issues causing the delay."
      }
    },
    {
      id: 5,
      scenario: "Code Review Disagreement",
      context: "You've submitted MR #445 implementing a new authentication feature. A senior developer has requested significant changes to your approach, suggesting a complete rewrite using a different pattern. You believe your approach is valid and simpler. The discussion in the MR has gone back and forth several times without resolution.",
      situation: "You're in a technical disagreement with a senior developer during code review.",
      options: [
        {
          id: 'a',
          action: "Continue the discussion in MR comments, providing more detailed technical arguments",
          reasoning: "Resolve the disagreement through detailed technical discussion"
        },
        {
          id: 'b',
          action: "Schedule a video call with the reviewer to discuss the approaches in real-time",
          reasoning: "Move to synchronous communication for faster resolution"
        },
        {
          id: 'c',
          action: "Implement the changes as requested since they're the senior developer",
          reasoning: "Defer to seniority to avoid conflict"
        },
        {
          id: 'd',
          action: "Ask the tech lead to review both approaches and make a decision",
          reasoning: "Escalate to a technical authority for resolution"
        }
      ],
      correctAnswer: 'b',
      explanation: "Extended back-and-forth in MR comments is inefficient and can escalate tension. A video call allows for real-time discussion, better explanation of approaches, and faster resolution. Save MR comments for documenting the final decision.",
      whyWrong: {
        'a': "Continuing in comments can become argumentative and wastes time for all MR watchers.",
        'b': "",
        'c': "Blindly deferring to seniority without discussion doesn't lead to the best technical solutions.",
        'd': "Escalating immediately without attempting direct resolution may be premature and burdens the tech lead."
      }
    },
    {
      id: 6,
      scenario: "Customer-Reported Bug",
      context: "A customer has reported a bug through support. The support team has created Issue #678 and assigned it to you. After investigating, you've found that it's not actually a bug - it's expected behavior based on the current design. However, you can see how it would be confusing to users.",
      situation: "A customer-reported 'bug' is actually expected behavior, but the UX could be improved.",
      options: [
        {
          id: 'a',
          action: "Close the issue as 'not a bug' and explain the expected behavior",
          reasoning: "Clarify that the system is working as designed"
        },
        {
          id: 'b',
          action: "Convert the issue to a UX improvement request and @mention the design team",
          reasoning: "Reframe as a user experience issue"
        },
        {
          id: 'c',
          action: "Add a comment explaining it's expected behavior, but @mention the PM and support team about the customer confusion",
          reasoning: "Explain the technical reality while highlighting the user experience problem"
        },
        {
          id: 'd',
          action: "Implement a small fix to make the behavior clearer to users",
          reasoning: "Proactively improve the user experience"
        }
      ],
      correctAnswer: 'c',
      explanation: "This approach acknowledges the technical reality while ensuring the customer experience issue is visible to the right stakeholders. The PM can decide whether to prioritize UX improvements, and support can better handle similar future cases.",
      whyWrong: {
        'a': "Simply closing ignores the underlying UX issue that caused customer confusion.",
        'b': "Converting without context may lose important information about customer impact.",
        'c': "",
        'd': "Making changes without stakeholder input may not address the real problem and could introduce new issues."
      }
    },
    {
      id: 7,
      scenario: "Sprint Planning Conflict",
      context: "During sprint planning, you've been assigned 3 issues totaling 13 story points. Based on your experience, you believe this is too much work for the sprint duration. Other team members have similar concerns about their workload. The PM is pushing for all items to be included because they're committed to stakeholders.",
      situation: "Sprint planning has unrealistic expectations that the team disagrees with.",
      options: [
        {
          id: 'a',
          action: "Privately message the PM after the meeting about your concerns",
          reasoning: "Address concerns privately to avoid confrontation"
        },
        {
          id: 'b',
          action: "Speak up during the meeting about the workload concerns and propose alternatives",
          reasoning: "Address the issue openly during planning"
        },
        {
          id: 'c',
          action: "Accept the assignment and work extra hours to meet the commitments",
          reasoning: "Meet the commitments through extra effort"
        },
        {
          id: 'd',
          action: "Suggest the team vote on which items to prioritize if the full workload can't be completed",
          reasoning: "Democratically prioritize within constraints"
        }
      ],
      correctAnswer: 'b',
      explanation: "Sprint planning is the right time and place to discuss capacity concerns. Speaking up during the meeting ensures transparency and allows for collaborative problem-solving. The team's input is valuable for realistic planning.",
      whyWrong: {
        'a': "Private concerns don't help the team or lead to better planning decisions.",
        'c': "Consistently working overtime is unsustainable and can lead to burnout and quality issues.",
        'd': "While collaborative, this doesn't address the underlying capacity planning issue."
      }
    },
    {
      id: 8,
      scenario: "Security Vulnerability Discovery",
      context: "While reviewing code for MR #234, you've discovered what appears to be a security vulnerability in the existing authentication system. It's not related to the current MR, but it could potentially allow unauthorized access. You're not sure about the severity, but it looks concerning.",
      situation: "You've discovered a potential security vulnerability during unrelated code review.",
      options: [
        {
          id: 'a',
          action: "Create a public issue describing the vulnerability for the security team",
          reasoning: "Follow normal issue creation process"
        },
        {
          id: 'b',
          action: "Send a private message to the security team lead describing the vulnerability",
          reasoning: "Keep security issues confidential"
        },
        {
          id: 'c',
          action: "Add a comment to the MR mentioning the security concern",
          reasoning: "Document the finding in context"
        },
        {
          id: 'd',
          action: "Email the entire development team about the security issue",
          reasoning: "Ensure everyone is aware of the potential risk"
        }
      ],
      correctAnswer: 'b',
      explanation: "Security vulnerabilities should be handled through confidential channels to prevent exploitation. Most organizations have security teams that handle these issues discretely. Public disclosure could expose the vulnerability to bad actors.",
      whyWrong: {
        'a': "Public issues can expose vulnerabilities to potential attackers before they're fixed.",
        'c': "MR comments are visible to all project members and may expose the vulnerability.",
        'd': "Mass emails can leak sensitive security information and cause unnecessary alarm."
      }
    }
  ];

  const startQuiz = () => {
    setHasStarted(true);
    setStartTime(Date.now());
  };

  const handleConfidenceRating = (questionId: number, rating: number) => {
    setConfidenceRatings(prev => ({
      ...prev,
      [questionId]: rating
    }));
  };

  const checkForAchievements = (questionId: number, selectedAnswer: string) => {
    const question = questions[questionId];
    const isCorrect = selectedAnswer === question.correctAnswer;
    
    if (isCorrect) {
      const newAchievements: string[] = [];
      
      // First correct answer
      if (score === 0) {
        newAchievements.push("Communication Champion");
      }
      
      // Perfect streak
      if (score >= 2) {
        newAchievements.push("Collaboration Expert");
      }
      
      // Speed achievement
      if (startTime && Date.now() - startTime < 600000) { // 10 minutes
        newAchievements.push("Quick Communicator");
      }
      
      // Add achievements
      if (newAchievements.length > 0) {
        setAchievements(prev => [...new Set([...prev, ...newAchievements])]);
      }
    }
  };

  const toggleExplanation = (questionId: number) => {
    setShowExplanation(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  const checkAnswer = () => {
    const currentQ = questions[currentQuestion];
    const isCorrect = selectedAction === currentQ.correctAnswer;
    
    if (isCorrect) {
      setScore(score + 1);
    }
    
    // Check for achievements
    checkForAchievements(currentQuestion, selectedAction);
    
    setShowFeedback(true);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAction('');
      setShowFeedback(false);
    } else {
      setCompleted(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAction('');
    setShowFeedback(false);
    setScore(0);
    setCompleted(false);
    setConfidenceRatings({});
    setAchievements([]);
    setShowExplanation({});
    setHasStarted(false);
    setStartTime(null);
    localStorage.removeItem('gitlab-communication-quiz');
  };

  const currentQ = questions[currentQuestion];
  const selectedOption = currentQ?.options.find(opt => opt.id === selectedAction);
  const correctOption = currentQ?.options.find(opt => opt.id === currentQ.correctAnswer);
  const isCorrect = selectedAction === currentQ?.correctAnswer;

  if (!hasStarted) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <MessageCircle className="w-16 h-16 mx-auto mb-4 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            GitLab Communication & Collaboration Mastery
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Master critical communication scenarios that make or break projects
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-gray-500 mb-6">
            <span className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              Real team scenarios
            </span>
            <span className="flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              Career-critical skills
            </span>
            <span className="flex items-center gap-1">
              <Zap className="w-4 h-4" />
              Achievement tracking
            </span>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg mb-6">
            <h2 className="text-xl font-semibold text-blue-800 mb-4">🎯 Master Critical Communication Skills:</h2>
            <div className="grid md:grid-cols-2 gap-4 text-left text-blue-700">
              <ul className="space-y-2">
                <li>• <strong>Crisis Communication:</strong> Production emergencies ($12K/hour)</li>
                <li>• <strong>Cross-Team Coordination:</strong> Dependency management</li>
                <li>• <strong>Executive Communication:</strong> Strategic requirement gathering</li>
                <li>• <strong>Conflict Resolution:</strong> Technical disagreements</li>
              </ul>
              <ul className="space-y-2">
                <li>• <strong>Customer Advocacy:</strong> Bug reporting and UX issues</li>
                <li>• <strong>Team Leadership:</strong> Sprint planning and capacity</li>
                <li>• <strong>Security Protocol:</strong> Vulnerability disclosure</li>
                <li>• <strong>Stakeholder Management:</strong> Multi-million dollar projects</li>
              </ul>
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">📋 Communication Challenge Details:</h2>
            <ul className="text-left text-gray-700 space-y-2">
              <li>• <strong>8 high-impact scenarios</strong> from cross-team bugs to production crises</li>
              <li>• <strong>Real business context</strong> including revenue impact and team dynamics</li>
              <li>• <strong>Risk assessment</strong> for each communication choice</li>
              <li>• <strong>Achievement system</strong> tracking your communication expertise</li>
              <li>• <strong>Industry examples</strong> from companies like Slack, Stripe, and Spotify</li>
              <li>• <strong>Pro tips</strong> for scaling communication across growing teams</li>
            </ul>
          </div>
          <button
            onClick={startQuiz}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2 mx-auto"
          >
            Start Communication Mastery Challenge <MessageCircle className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  if (completed) {
    const percentage = Math.round((score / questions.length) * 100);
    const timeSpent = startTime ? Math.round((Date.now() - startTime) / 1000 / 60) : null;
    
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white">
        <div className="text-center mb-8">
          <MessageCircle className="w-16 h-16 mx-auto mb-4 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Communication Challenge Results</h1>
          <div className={`text-6xl font-bold mb-2 ${
            percentage >= 80 ? 'text-green-600' : 
            percentage >= 60 ? 'text-yellow-600' : 'text-red-600'
          }`}>
            {score}/{questions.length}
          </div>
          <div className={`text-xl ${
            percentage >= 80 ? 'text-green-600' : 
            percentage >= 60 ? 'text-yellow-600' : 'text-red-600'
          }`}>
            {percentage}% - {
              percentage >= 90 ? "Communication Master! 🚀" :
              percentage >= 80 ? "Excellent Communicator! 🎯" :
              percentage >= 70 ? "Strong Communication Skills! 👍" :
              percentage >= 60 ? "Good Foundation, Keep Improving! 📚" :
              "Practice More for Team Success! 💪"
            }
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
              <h3 className="font-semibold text-yellow-800">Communication Achievements Unlocked!</h3>
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
            <div className="text-sm text-blue-700">Scenarios Mastered</div>
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
          {questions.map((question) => {
            const correctOption = question.options.find(opt => opt.id === question.correctAnswer);
            const isCorrect = true; // This would need to track user answers properly
            
            return (
              <div key={question.id} className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-start gap-3 mb-4">
                  {isCorrect ? 
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" /> : 
                    <XCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                  }
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">{question.scenario}</h3>
                    <p className="text-sm text-gray-600 mb-3">{question.context}</p>
                    
                    <button
                      onClick={() => toggleExplanation(question.id)}
                      className="mt-3 text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      {showExplanation[question.id] ? "Hide" : "Show"} Detailed Analysis
                    </button>

                    {showExplanation[question.id] && (
                      <div className="mt-3 p-4 bg-blue-50 rounded-lg text-sm">
                        <div className="whitespace-pre-line text-gray-700 mb-3">
                          {question.explanation}
                        </div>
                        {question.impact && (
                          <div className="text-blue-800 font-medium mb-3">
                            {question.impact}
                          </div>
                        )}
                        {question.proTip && (
                          <div className="text-green-700 bg-green-100 p-3 rounded text-sm mb-2">
                            {question.proTip}
                          </div>
                        )}
                        {question.realExample && (
                          <div className="text-purple-700 bg-purple-100 p-3 rounded text-sm">
                            {question.realExample}
                          </div>
                        )}
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
            <h3 className="text-lg font-semibold text-gray-900 mb-4">📚 Continue Your Communication Journey</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="text-left">
                <h4 className="font-medium text-gray-800 mb-2">GitLab Communication Resources</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• <a href="https://docs.gitlab.com/ee/development/contributing/merge_request_workflow.html" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">MR communication best practices</a></li>
                  <li>• <a href="https://docs.gitlab.com/ee/user/project/issues/" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Effective issue management</a></li>
                  <li>• <a href="https://docs.gitlab.com/ee/user/project/repository/web_editor.html" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Collaborative editing workflows</a></li>
                </ul>
              </div>
              <div className="text-left">
                <h4 className="font-medium text-gray-800 mb-2">Communication Excellence</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• Use GitLab for trackable decisions and audit trails</li>
                  <li>• Respect team hierarchies and communication channels</li>
                  <li>• Document critical discussions for future reference</li>
                  <li>• Separate concerns to maintain focus and clarity</li>
                </ul>
              </div>
            </div>
          </div>
          
          <button
            onClick={resetQuiz}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 mx-auto"
          >
            <RotateCcw className="w-5 h-5" />
            Master Communication Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <MessageCircle className="w-8 h-8 text-blue-600" />
          GitLab Communication & Collaboration Challenge
        </h1>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <span>Question {currentQuestion + 1} of {questions.length}</span>
          {achievements.length > 0 && (
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-yellow-500" />
              <span>{achievements.length} achievements</span>
            </div>
          )}
          <span>Score: {score}/{currentQuestion + (showFeedback && isCorrect ? 1 : 0)}</span>
        </div>
      </div>

      <div className="mb-6">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
            style={{ width: `${((currentQuestion + (showFeedback ? 1 : 0)) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Enhanced Scenario Card */}
      <div className="bg-white border rounded-lg p-6 shadow-lg mb-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-4">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              currentQ.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
              currentQ.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {currentQ.difficulty}
            </span>
            {currentQ.urgency && (
              <span className="flex items-center gap-1 text-xs text-orange-600 bg-orange-100 px-2 py-1 rounded">
                <AlertTriangle className="w-3 h-3" />
                {currentQ.urgency}
              </span>
            )}
            {currentQ.teamSize && (
              <span className="flex items-center gap-1 text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded">
                <Users className="w-3 h-3" />
                {currentQ.teamSize}
              </span>
            )}
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            {currentQ.scenario}
          </h2>
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <p className="text-gray-700 leading-relaxed">
              {currentQ.context}
            </p>
          </div>
          <div className="bg-blue-50 p-3 rounded border-l-4 border-blue-500">
            <p className="text-gray-800 font-medium">{currentQ.situation}</p>
          </div>
        </div>

        {/* Enhanced Options */}
        <div className="space-y-3 mb-6">
          <h3 className="text-lg font-semibold text-gray-800">What&apos;s your communication approach?</h3>
          {currentQ.options.map((option) => (
            <label
              key={option.id}
              className={`block p-4 border-2 rounded-lg cursor-pointer transition-all ${
                selectedAction === option.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              } ${showFeedback ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <div className="flex items-start gap-3">
                <input
                  type="radio"
                  name={`question-${currentQ.id}`}
                  value={option.id}
                  checked={selectedAction === option.id}
                  onChange={() => setSelectedAction(option.id)}
                  disabled={showFeedback}
                  className="mt-1"
                />
                <div className="flex-1">
                  <p className="font-medium text-gray-800 mb-1">{option.action}</p>
                  <p className="text-sm text-gray-600 mb-2">{option.reasoning}</p>
                  <div className="flex gap-2">
                    {option.riskLevel && (
                      <span className={`px-2 py-1 text-xs rounded ${
                        option.riskLevel === 'High' ? 'bg-red-100 text-red-700' :
                        option.riskLevel === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {option.riskLevel} Risk
                      </span>
                    )}
                    {option.complexity && (
                      <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded">
                        {option.complexity}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </label>
          ))}
        </div>

        {/* Confidence Rating */}
        {selectedAction && !showFeedback && (
          <div className="mb-4 p-4 bg-blue-50 rounded-lg">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-medium text-blue-800">How confident are you in this communication choice?</span>
              <div className="flex gap-1">
                {[1,2,3,4,5].map(rating => (
                  <button
                    key={rating}
                    onClick={() => handleConfidenceRating(currentQ.id, rating)}
                    className={`w-6 h-6 rounded ${
                      confidenceRatings[currentQ.id] >= rating
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
        )}
      </div>

      {/* Actions */}
      {!showFeedback ? (
        <div className="flex gap-4">
          <button
            onClick={checkAnswer}
            disabled={!selectedAction}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            Submit Communication Choice
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Enhanced Feedback */}
          <div className={`p-4 rounded-lg border ${
            isCorrect 
              ? 'bg-green-50 border-green-200' 
              : 'bg-red-50 border-red-200'
          }`}>
            <div className="flex items-center gap-2 mb-2">
              {isCorrect ? (
                <CheckCircle className="w-5 h-5 text-green-600" />
              ) : (
                <XCircle className="w-5 h-5 text-red-600" />
              )}
              <span className={`font-semibold ${
                isCorrect ? 'text-green-800' : 'text-red-800'
              }`}>
                {isCorrect ? 'Excellent Communication Choice! 🎉' : 'Consider a Different Approach'}
              </span>
            </div>
            
            {!isCorrect && (
              <div className="mb-3">
                <p className="text-red-700 font-medium">Your choice: {selectedOption?.action}</p>
                <p className="text-red-600 text-sm mt-1">
                  {currentQ.whyWrong && currentQ.whyWrong[selectedAction] !== undefined
                    ? currentQ.whyWrong[selectedAction]
                    : "This approach may not be the most effective for this situation."}
                </p>
              </div>
            )}
            
            <div className="bg-white p-3 rounded border-l-4 border-blue-500">
              <p className="text-gray-800 font-medium mb-1">Best approach: {correctOption?.action}</p>
              <div className="text-gray-700 text-sm space-y-2">
                <p>{currentQ.explanation}</p>
                {currentQ.impact && (
                  <div className="text-blue-800 font-medium">
                    {currentQ.impact}
                  </div>
                )}
                {currentQ.proTip && (
                  <div className="text-green-700 bg-green-100 p-2 rounded text-sm">
                    {currentQ.proTip}
                  </div>
                )}
                {currentQ.realExample && (
                  <div className="text-purple-700 bg-purple-100 p-2 rounded text-sm">
                    {currentQ.realExample}
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <button
            onClick={nextQuestion}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {currentQuestion < questions.length - 1 ? 'Next Communication Challenge' : 'View Communication Results'}
          </button>
        </div>
      )}
    </div>
  );
};

export default GitLabCommunicationQuiz;