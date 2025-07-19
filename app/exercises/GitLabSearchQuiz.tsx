import React, { useState, useEffect } from 'react';
import { Search, CheckCircle, XCircle, Lightbulb, RotateCcw } from 'lucide-react';

const GitLabSearchQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const questions = [
    {
      id: 1,
      scenario: "Find all open merge requests assigned to user 'sarah.chen' that were created in the last 30 days",
      expectedAnswers: [
        "assignee:sarah.chen state:opened created_after:2024-06-18",
        "state:opened assignee:sarah.chen created_after:2024-06-18",
        "assignee:@sarah.chen state:opened created_after:2024-06-18"
      ],
      hint: "Use assignee:, state:, and created_after: filters",
      explanation: "GitLab search supports assignee filtering, state filtering, and date ranges. You can use @ prefix for usernames or not."
    },
    {
      id: 2,
      scenario: "Search for issues with label 'bug' AND 'frontend' that are NOT assigned to anyone",
      expectedAnswers: [
        "label:bug label:frontend assignee:none",
        "label:\"bug\" label:\"frontend\" assignee:none",
        "label:bug,frontend assignee:none"
      ],
      hint: "Use label: for each label and assignee:none for unassigned",
      explanation: "Multiple labels can be specified with separate label: filters or comma-separated. Use assignee:none for unassigned items."
    },
    {
      id: 3,
      scenario: "Find all issues in milestone 'v2.1' that contain the word 'authentication' in title or description",
      expectedAnswers: [
        "milestone:v2.1 authentication",
        "milestone:\"v2.1\" authentication",
        "milestone:v2.1 in:title,description authentication"
      ],
      hint: "Use milestone: filter and add search terms",
      explanation: "Milestone filtering combined with text search. The in: scope is optional as title/description are searched by default."
    },
    {
      id: 4,
      scenario: "Search for merge requests that were updated in the last 7 days by author 'mike.jones' with at least 5 comments",
      expectedAnswers: [
        "author:mike.jones updated_after:2024-07-11 comments:>=5",
        "updated_after:2024-07-11 author:mike.jones comments:>=5",
        "author:@mike.jones updated_after:2024-07-11 comments:>=5"
      ],
      hint: "Use author:, updated_after:, and comments: with comparison operators",
      explanation: "GitLab supports comparison operators like >=, >, <, <= for numeric fields like comment counts."
    },
    {
      id: 5,
      scenario: "Find all closed issues that have the confidential flag set and were created by users in the 'security-team' group",
      expectedAnswers: [
        "state:closed confidential:true group:security-team",
        "confidential:true state:closed group:security-team",
        "confidential:yes state:closed group:security-team"
      ],
      hint: "Use state:, confidential:, and group: filters",
      explanation: "Confidential items can be filtered with confidential:true or confidential:yes. Group filtering helps find items from specific teams."
    },
    {
      id: 6,
      scenario: "Search for issues with priority 'high' or 'critical' that don't have any labels",
      expectedAnswers: [
        "priority:high OR priority:critical label:none",
        "priority:critical OR priority:high label:none",
        "(priority:high OR priority:critical) label:none"
      ],
      hint: "Use OR operator and label:none for items without labels",
      explanation: "Boolean operators like OR can combine search terms. Use label:none to find items without any labels."
    },
    {
      id: 7,
      scenario: "Find merge requests that modify files in the 'src/components' directory and are still in draft status",
      expectedAnswers: [
        "filename:src/components draft:true",
        "draft:true filename:src/components",
        "filename:\"src/components\" draft:true",
        "draft:yes filename:src/components"
      ],
      hint: "Use filename: for file paths and draft: for draft status",
      explanation: "File path searching with filename: helps find changes to specific directories. Draft status can be searched with draft:true or draft:yes."
    },
    {
      id: 8,
      scenario: "Search for issues created between January 1, 2024 and March 31, 2024 that mention 'API' in the title",
      expectedAnswers: [
        "created_after:2024-01-01 created_before:2024-03-31 in:title API",
        "in:title API created_after:2024-01-01 created_before:2024-03-31",
        "created_after:2024-01-01 created_before:2024-04-01 in:title API"
      ],
      hint: "Use created_after:, created_before:, and in:title",
      explanation: "Date ranges can be specified with both after and before filters. Use in:title to search only in titles."
    },
    {
      id: 9,
      scenario: "Find all merge requests that have been approved by at least 2 reviewers and target the 'main' branch",
      expectedAnswers: [
        "approved_by_count:>=2 target_branch:main",
        "target_branch:main approved_by_count:>=2",
        "approved_by_count:>1 target_branch:main"
      ],
      hint: "Use approved_by_count: with comparison operators and target_branch:",
      explanation: "Approval counts can be searched with comparison operators. Target branch filtering helps find MRs going to specific branches."
    },
    {
      id: 10,
      scenario: "Search for issues that have been referenced in commit messages and have the 'needs-review' label",
      expectedAnswers: [
        "has:commit label:needs-review",
        "label:needs-review has:commit",
        "has:commit label:\"needs-review\""
      ],
      hint: "Use has:commit to find items referenced in commits",
      explanation: "The has: operator can find items that have specific relationships, like being referenced in commits."
    }
  ];

  const checkAnswer = () => {
    const currentQ = questions[currentQuestion];
    const normalizedAnswer = userAnswer.toLowerCase().trim();
    
    const isCorrect = currentQ.expectedAnswers.some(expected => 
      normalizedAnswer === expected.toLowerCase()
    );
    
    setShowFeedback(true);
    setAttempts(attempts + 1);
    
    if (isCorrect) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setUserAnswer('');
      setShowFeedback(false);
    } else {
      setCompleted(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setUserAnswer('');
    setShowFeedback(false);
    setScore(0);
    setCompleted(false);
    setAttempts(0);
  };

  const currentQ = questions[currentQuestion];
  const normalizedAnswer = userAnswer.toLowerCase().trim();
  const isCorrect = currentQ?.expectedAnswers.some(expected => 
    normalizedAnswer === expected.toLowerCase()
  );

  if (completed) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Quiz Complete!</h2>
          <div className="text-xl text-gray-600 mb-6">
            Your Score: {score}/{questions.length} ({Math.round((score/questions.length) * 100)}%)
          </div>
          
          <div className="bg-blue-50 p-6 rounded-lg mb-6">
            <h3 className="text-lg font-semibold text-blue-800 mb-3">🚀 Next Steps</h3>
            <div className="text-blue-700 space-y-2">
              <p>• Try these searches in your GitLab instance</p>
              <p>• Ask GitLab Duo: "Help me search for..." and mention what you learned</p>
              <p>• Bookmark GitLab's search documentation for reference</p>
              <p>• Share these techniques with your team!</p>
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
          <Search className="w-8 h-8 text-blue-600" />
          GitLab Advanced Search Quiz
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

      <div className="bg-gray-50 p-6 rounded-lg mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Scenario:</h2>
        <p className="text-gray-700">{currentQ.scenario}</p>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Enter your GitLab search query:
        </label>
        <input
          type="text"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          placeholder="e.g., assignee:username state:opened label:bug"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono"
          onKeyPress={(e) => e.key === 'Enter' && !showFeedback && checkAnswer()}
        />
      </div>

      {!showFeedback ? (
        <div className="flex gap-4">
          <button
            onClick={checkAnswer}
            disabled={!userAnswer.trim()}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            Check Answer
          </button>
          <button
            onClick={() => setShowFeedback(true)}
            className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors flex items-center gap-2"
          >
            <Lightbulb className="w-4 h-4" />
            Show Hint
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {isCorrect ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center gap-2 text-green-800 font-semibold mb-2">
                <CheckCircle className="w-5 h-5" />
                Correct! 🎉
              </div>
              <p className="text-green-700">{currentQ.explanation}</p>
            </div>
          ) : (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center gap-2 text-red-800 font-semibold mb-2">
                <XCircle className="w-5 h-5" />
                Not quite right
              </div>
              <p className="text-red-700 mb-3">{currentQ.hint}</p>
              <div className="text-red-700">
                <p className="font-medium">Expected answers:</p>
                <ul className="list-disc ml-4 mt-1 font-mono text-sm">
                  {currentQ.expectedAnswers.map((answer, idx) => (
                    <li key={idx}>{answer}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-blue-700">
              <strong>Explanation:</strong> {currentQ.explanation}
            </p>
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

export default GitLabSearchQuiz;