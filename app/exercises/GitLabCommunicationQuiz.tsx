'use client';
import React, { useState } from 'react';
import { MessageCircle, CheckCircle, XCircle, Users, RotateCcw, AlertTriangle } from 'lucide-react';

const GitLabCommunicationQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAction, setSelectedAction] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const questions = [
    {
      id: 1,
      scenario: "Frontend Bug Discovery",
      context: "You're a backend developer working on Issue #847. While testing your API changes, you notice the frontend form validation isn't working properly - it's accepting invalid email formats. This isn't related to your current work, but it's definitely a bug that affects users.",
      situation: "You've discovered a frontend bug while working on an unrelated backend issue.",
      options: [
        {
          id: 'a',
          action: "Add a comment to Issue #847 mentioning the frontend bug",
          reasoning: "Keep everything in one place for context"
        },
        {
          id: 'b', 
          action: "Create a new issue for the frontend bug and @mention the frontend team",
          reasoning: "Separate concerns and notify the right team"
        },
        {
          id: 'c',
          action: "Send a direct message to a frontend developer you know",
          reasoning: "Quick informal communication"
        },
        {
          id: 'd',
          action: "Post in the #frontend Slack channel about the bug",
          reasoning: "Broadcast to the whole frontend team"
        }
      ],
      correctAnswer: 'b',
      explanation: "Creating a separate issue ensures the frontend bug gets proper tracking and prioritization. @mentioning the frontend team ensures visibility without cluttering the original backend issue. This follows the principle of separating concerns while maintaining good communication.",
      whyWrong: {
        'a': "Mixing unrelated issues in one thread creates confusion and may cause the frontend bug to be overlooked.",
        'c': "Direct messages don't create trackable records and may not reach the right person or team lead.",
        'd': "Slack messages can be missed and don't integrate with GitLab's tracking system."
      }
    },
    {
      id: 2,
      scenario: "Urgent Production Issue",
      context: "A critical bug is affecting 40% of users in production. You've identified the problem and have a fix ready. The issue is assigned to you, and you need to get your merge request reviewed and deployed ASAP. It's 2 PM on a Tuesday, and several team members are online.",
      situation: "You need urgent review and deployment of a critical production fix.",
      options: [
        {
          id: 'a',
          action: "Assign the MR to your tech lead and wait for review",
          reasoning: "Follow normal process through proper channels"
        },
        {
          id: 'b',
          action: "Create the MR, @mention the tech lead, and post in #urgent-issues Slack channel",
          reasoning: "Use both GitLab and Slack for maximum visibility"
        },
        {
          id: 'c',
          action: "Call your tech lead directly and ask them to review immediately",
          reasoning: "Phone call ensures immediate attention"
        },
        {
          id: 'd',
          action: "Deploy the fix first, then create the MR for retroactive review",
          reasoning: "Fix production first, review later"
        }
      ],
      correctAnswer: 'b',
      explanation: "For urgent production issues, you need to escalate through multiple channels while maintaining proper documentation. @mentioning in GitLab creates a record, while Slack provides immediate notification. This balances urgency with proper process.",
      whyWrong: {
        'a': "Normal process may be too slow for a critical production issue affecting 40% of users.",
        'c': "Phone calls don't create documentation and may not include other stakeholders who need to know.",
        'd': "Deploying without review, even in emergencies, is risky and may violate compliance requirements."
      }
    },
    {
      id: 3,
      scenario: "Requirements Clarification",
      context: "You're working on Issue #1205 'Implement user dashboard analytics'. The requirements are vague about which metrics to include. The issue was created by the Product Manager, but you see that the original request came from the CEO via a customer meeting. You need clarification before you can proceed.",
      situation: "You need to clarify vague requirements on an issue created by PM based on CEO/customer input.",
      options: [
        {
          id: 'a',
          action: "Add a comment on the issue asking the PM for clarification",
          reasoning: "Ask the issue creator for details"
        },
        {
          id: 'b',
          action: "Schedule a meeting with PM, CEO, and customer to clarify requirements",
          reasoning: "Get all stakeholders together"
        },
        {
          id: 'c',
          action: "Add a comment @mentioning both the PM and CEO asking for clarification",
          reasoning: "Include both the PM and original stakeholder"
        },
        {
          id: 'd',
          action: "Make reasonable assumptions and implement, then ask for feedback",
          reasoning: "Iterate based on working prototype"
        }
      ],
      correctAnswer: 'a',
      explanation: "Start with the PM who created the issue. They're responsible for requirements and should have the context. If they need to escalate to the CEO or customer, they can do so. This respects the chain of responsibility and avoids overwhelming executives with technical details.",
      whyWrong: {
        'b': "Scheduling meetings with executives for initial clarification is inefficient and may not be necessary.",
        'c': "Going directly to the CEO bypasses the PM and may create confusion about who owns the requirements.",
        'd': "Implementing without clarification wastes time and may not meet actual needs."
      }
    },
    {
      id: 4,
      scenario: "Cross-Team Dependency",
      context: "You're working on a frontend feature that depends on a new API endpoint. The backend team's MR #892 for this endpoint is still in review and hasn't been merged yet. Your frontend work is blocked until their API is deployed. The sprint ends in 3 days, and this feature is committed for the release.",
      situation: "Your work is blocked by another team's unfinished work with a looming sprint deadline.",
      options: [
        {
          id: 'a',
          action: "Comment on MR #892 asking when it will be merged",
          reasoning: "Ask directly on the blocking MR"
        },
        {
          id: 'b',
          action: "Update your issue status to 'Blocked' and @mention your PM explaining the dependency",
          reasoning: "Escalate to PM with clear status update"
        },
        {
          id: 'c',
          action: "Create a mock API endpoint to continue your work, then comment on both issues explaining the dependency",
          reasoning: "Work around the blocker while documenting the issue"
        },
        {
          id: 'd',
          action: "Message the backend developer directly and ask them to prioritize the review",
          reasoning: "Direct communication for urgency"
        }
      ],
      correctAnswer: 'c',
      explanation: "Creating a mock API allows you to continue working while properly documenting the dependency in both issues. This demonstrates proactive problem-solving while maintaining transparency about the blocker. The PM can then make informed decisions about the sprint.",
      whyWrong: {
        'a': "Just asking when it will be merged doesn't solve your immediate problem or help with planning.",
        'b': "Simply escalating to PM without attempting to unblock yourself may not be the most productive approach.",
        'd': "Direct pressure on individuals can create tension and doesn't address the systemic dependency issue."
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

  const checkAnswer = () => {
    const currentQ = questions[currentQuestion];
    const isCorrect = selectedAction === currentQ.correctAnswer;
    
    if (isCorrect) {
      setScore(score + 1);
    }
    
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
  };

  const currentQ = questions[currentQuestion];
  const selectedOption = currentQ?.options.find(opt => opt.id === selectedAction);
  const correctOption = currentQ?.options.find(opt => opt.id === currentQ.correctAnswer);
  const isCorrect = selectedAction === currentQ?.correctAnswer;

  if (completed) {
    const percentage = Math.round((score / questions.length) * 100);
    
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <div className="text-6xl mb-4">💬</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Quiz Complete!</h2>
          <div className="text-xl text-gray-600 mb-6">
            Your Score: {score}/{questions.length} ({percentage}%)
          </div>
          
          <div className="bg-blue-50 p-6 rounded-lg mb-6">
            <h3 className="text-lg font-semibold text-blue-800 mb-3">🎯 Communication Best Practices</h3>
            <div className="text-blue-700 space-y-2 text-left">
              <p>• <strong>Right Channel:</strong> Use GitLab for trackable decisions, Slack for urgent notifications</p>
              <p>• <strong>Respect Hierarchy:</strong> Start with immediate stakeholders before escalating</p>
              <p>• <strong>Document Decisions:</strong> Keep important discussions in GitLab for future reference</p>
              <p>• <strong>Separate Concerns:</strong> Create separate issues for unrelated problems</p>
              <p>• <strong>Be Proactive:</strong> Unblock yourself when possible, but communicate dependencies</p>
              <p>• <strong>Security First:</strong> Handle vulnerabilities through confidential channels</p>
              <p>• <strong>Synchronous for Complex:</strong> Use video calls for nuanced technical discussions</p>
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

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <MessageCircle className="w-8 h-8 text-blue-600" />
          GitLab Communication & Collaboration Quiz
        </h1>
        <div className="text-sm text-gray-600">
          Question {currentQuestion + 1} of {questions.length} • Score: {score}/{currentQuestion + (showFeedback && isCorrect ? 1 : 0)}
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

      {/* Scenario */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg mb-6">
        <div className="flex items-start gap-3">
          <Users className="w-6 h-6 text-blue-600 mt-1" />
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">{currentQ.scenario}</h2>
            <p className="text-gray-700 mb-4">{currentQ.context}</p>
            <div className="bg-white p-3 rounded border-l-4 border-blue-500">
              <p className="text-gray-800 font-medium">{currentQ.situation}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Options */}
      <div className="space-y-3 mb-6">
        <h3 className="text-lg font-semibold text-gray-800">What's your approach?</h3>
        {currentQ.options.map((option) => (
          <button
            key={option.id}
            onClick={() => setSelectedAction(option.id)}
            disabled={showFeedback}
            className={`w-full p-4 text-left rounded-lg border transition-all ${
              selectedAction === option.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            } ${showFeedback ? 'cursor-not-allowed' : 'cursor-pointer'}`}
          >
            <div className="flex items-start gap-3">
              <div className={`w-5 h-5 rounded-full border-2 mt-0.5 flex items-center justify-center ${
                selectedAction === option.id
                  ? 'border-blue-500 bg-blue-500'
                  : 'border-gray-300'
              }`}>
                {selectedAction === option.id && (
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                )}
              </div>
              <div>
                <p className="font-medium text-gray-800">{option.action}</p>
                <p className="text-sm text-gray-600 mt-1">{option.reasoning}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Actions */}
      {!showFeedback ? (
        <div className="flex gap-4">
          <button
            onClick={checkAnswer}
            disabled={!selectedAction}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            Submit Answer
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Feedback */}
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
                {isCorrect ? 'Correct! 🎉' : 'Not quite right'}
              </span>
            </div>
            
            {!isCorrect && (
              <div className="mb-3">
                <p className="text-red-700 font-medium">Your choice: {selectedOption?.action}</p>
                <p className="text-red-600 text-sm mt-1">
                  {currentQ.whyWrong[selectedAction]}
                </p>
              </div>
            )}
            
            <div className="bg-white p-3 rounded border-l-4 border-blue-500">
              <p className="text-gray-800 font-medium mb-1">Best approach: {correctOption?.action}</p>
              <p className="text-gray-700 text-sm">{currentQ.explanation}</p>
            </div>
          </div>
          
          <button
            onClick={nextQuestion}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {currentQuestion < questions.length - 1 ? 'Next Scenario' : 'View Results'}
          </button>
        </div>
      )}
    </div>
  );
};

export default GitLabCommunicationQuiz;