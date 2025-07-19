'use client';
import React, { useState } from 'react';
import { ChevronRight, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const GitLabQuiz = () => {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes in seconds
  const [timerActive, setTimerActive] = useState(false);

  React.useEffect(() => {
    if (timerActive && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setShowResults(true);
    }
  }, [timeLeft, timerActive]);

  const scenarios = [
    {
      id: 1,
      title: "🚨 Production Down!",
      situation: "Your e-commerce site is down during Black Friday. Customer support is flooded with complaints. You need to coordinate a response across 3 teams.",
      question: "What's your FIRST action in GitLab?",
      options: [
        { id: 'a', text: 'Create an Epic called "Black Friday Outage"', correct: false },
        { id: 'b', text: 'Create a confidential Issue with "incident" label', correct: true },
        { id: 'c', text: 'Open a Draft MR with potential fixes', correct: false },
        { id: 'd', text: 'Update the project roadmap', correct: false }
      ],
      explanation: "Incidents need immediate tracking. A confidential issue with incident label ensures proper visibility without exposing sensitive details publicly."
    },
    {
      id: 2,
      title: "📱 Mobile App Redesign",
      situation: "Your CEO wants a complete mobile app redesign over 4 months. It involves UX research, design mockups, development, and testing across iOS and Android.",
      question: "How should you structure this in GitLab?",
      options: [
        { id: 'a', text: 'One large Issue with detailed description', correct: false },
        { id: 'b', text: 'Epic with child Issues for each major component', correct: true },
        { id: 'c', text: 'Multiple unrelated Issues', correct: false },
        { id: 'd', text: 'Tasks only, no Issues needed', correct: false }
      ],
      explanation: "Large initiatives spanning months with multiple components need Epic structure. This allows tracking progress across related work items."
    },
    {
      id: 3,
      title: "🔍 Code Review Dilemma",
      situation: "A junior developer has implemented a new feature but you're not sure about the architecture. The code works but needs discussion before merging.",
      question: "What type of Merge Request should they create?",
      options: [
        { id: 'a', text: 'Regular MR marked as ready for review', correct: false },
        { id: 'b', text: 'Draft MR for feedback and discussion', correct: true },
        { id: 'c', text: 'No MR needed, just push to main', correct: false },
        { id: 'd', text: 'Create an Issue instead', correct: false }
      ],
      explanation: "Draft MRs are perfect for getting feedback on work-in-progress. They signal the code isn't ready for merge but needs input."
    },
    {
      id: 4,
      title: "📋 New Team Member",
      situation: "A new developer joins your team. They keep creating Issues without enough detail for others to understand the problems.",
      question: "What's the best solution?",
      options: [
        { id: 'a', text: 'Tell them to write better descriptions', correct: false },
        { id: 'b', text: 'Create Issue templates for common scenarios', correct: true },
        { id: 'c', text: 'Have them only create Epics', correct: false },
        { id: 'd', text: 'Review every Issue before they submit', correct: false }
      ],
      explanation: "Issue templates ensure consistent, detailed information while helping new team members understand expectations."
    },
    {
      id: 5,
      title: "👥 Daily Standup Chaos",
      situation: "Your daily standups are chaotic. Team members can't quickly see what others are working on or identify blockers.",
      question: "Which GitLab feature would solve this?",
      options: [
        { id: 'a', text: 'Project Roadmap', correct: false },
        { id: 'b', text: 'Issue Board with workflow columns', correct: true },
        { id: 'c', text: 'Milestone view', correct: false },
        { id: 'd', text: 'Activity feed', correct: false }
      ],
      explanation: "Issue Boards provide real-time visibility into work status and blockers, perfect for daily coordination."
    },
    {
      id: 6,
      title: "📊 Executive Presentation",
      situation: "Your CEO wants to present the product development timeline to investors next week. They need a high-level view of major features and dates.",
      question: "What should you prepare?",
      options: [
        { id: 'a', text: 'Detailed Issue Board with all tasks', correct: false },
        { id: 'b', text: 'Project Roadmap with major milestones', correct: true },
        { id: 'c', text: 'List of all open Issues', correct: false },
        { id: 'd', text: 'Merge Request statistics', correct: false }
      ],
      explanation: "Roadmaps provide the strategic, high-level view executives need for stakeholder communication."
    },
    {
      id: 7,
      title: "🐛 Bug Report Template",
      situation: "QA team reports bugs inconsistently. Developers waste time asking for reproduction steps, browser info, and severity levels.",
      question: "Your issue template should include:",
      options: [
        { id: 'a', text: 'Just a description field', correct: false },
        { id: 'b', text: 'Steps to reproduce, environment details, severity', correct: true },
        { id: 'c', text: 'Only the bug title', correct: false },
        { id: 'd', text: 'Developer assignment field', correct: false }
      ],
      explanation: "Effective bug templates capture all information developers need upfront, reducing back-and-forth communication."
    },
    {
      id: 8,
      title: "🔄 Feature Branch Strategy",
      situation: "You're experimenting with a risky database migration. You want team input but it's definitely not ready for production.",
      question: "How should you handle the merge request?",
      options: [
        { id: 'a', text: 'Create regular MR and mark as ready', correct: false },
        { id: 'b', text: 'Create Draft MR with detailed description', correct: true },
        { id: 'c', text: 'Push directly to main branch', correct: false },
        { id: 'd', text: 'Keep it in your local repository', correct: false }
      ],
      explanation: "Draft MRs are ideal for experimental work that needs team input but isn't ready for merge."
    }
  ];

  const startQuiz = () => {
    setTimerActive(true);
  };

  const handleAnswer = (scenarioId, optionId) => {
    setAnswers({ ...answers, [scenarioId]: optionId });
  };

  const nextScenario = () => {
    if (currentScenario < scenarios.length - 1) {
      setCurrentScenario(currentScenario + 1);
    } else {
      setShowResults(true);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    scenarios.forEach(scenario => {
      const userAnswer = answers[scenario.id];
      const correctAnswer = scenario.options.find(opt => opt.correct);
      if (userAnswer === correctAnswer.id) {
        correct++;
      }
    });
    return correct;
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getScoreColor = (score) => {
    if (score >= 7) return 'text-green-600';
    if (score >= 5) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreMessage = (score) => {
    if (score >= 7) return 'Excellent! You have a strong grasp of GitLab features.';
    if (score >= 5) return 'Good job! A few areas to review, but solid understanding.';
    return 'Keep practicing! Review the explanations and try again.';
  };

  if (!timerActive) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            GitLab Feature Usage Quiz
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Test your knowledge with real-world scenarios
          </p>
          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <h2 className="text-xl font-semibold text-blue-800 mb-2">Instructions:</h2>
            <ul className="text-left text-blue-700 space-y-2">
              <li>• 8 realistic scenarios to solve</li>
              <li>• 15 minutes total (about 2 minutes per scenario)</li>
              <li>• Choose the best GitLab feature for each situation</li>
              <li>• See explanations at the end</li>
            </ul>
          </div>
          <button
            onClick={startQuiz}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Start Quiz <ChevronRight className="inline ml-2" size={20} />
          </button>
        </div>
      </div>
    );
  }

  if (showResults) {
    const score = calculateScore();
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Quiz Results</h1>
          <div className={`text-6xl font-bold ${getScoreColor(score)} mb-2`}>
            {score}/8
          </div>
          <p className="text-lg text-gray-600">{getScoreMessage(score)}</p>
        </div>

        <div className="space-y-6">
          {scenarios.map((scenario) => {
            const userAnswer = answers[scenario.id];
            const correctAnswer = scenario.options.find(opt => opt.correct);
            const isCorrect = userAnswer === correctAnswer.id;
            
            return (
              <div key={scenario.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold">{scenario.title}</h3>
                  {isCorrect ? (
                    <CheckCircle className="text-green-500" size={24} />
                  ) : (
                    <XCircle className="text-red-500" size={24} />
                  )}
                </div>
                
                <p className="text-gray-700 mb-3">{scenario.situation}</p>
                
                <div className="bg-gray-50 p-3 rounded mb-3">
                  <p className="font-medium text-gray-800">{scenario.question}</p>
                </div>
                
                <div className="space-y-2 mb-3">
                  {scenario.options.map((option) => {
                    let bgColor = 'bg-gray-100';
                    let textColor = 'text-gray-700';
                    
                    if (option.correct) {
                      bgColor = 'bg-green-100';
                      textColor = 'text-green-800';
                    } else if (userAnswer === option.id) {
                      bgColor = 'bg-red-100';
                      textColor = 'text-red-800';
                    }
                    
                    return (
                      <div key={option.id} className={`p-2 rounded ${bgColor} ${textColor}`}>
                        {option.text}
                      </div>
                    );
                  })}
                </div>
                
                <div className="bg-blue-50 p-3 rounded">
                  <p className="text-sm text-blue-800">
                    <strong>Explanation:</strong> {scenario.explanation}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-8">
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Take Quiz Again
          </button>
        </div>
      </div>
    );
  }

  const scenario = scenarios[currentScenario];
  const progress = ((currentScenario + 1) / scenarios.length) * 100;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <Clock className="text-blue-600" size={24} />
          <span className="text-xl font-semibold text-gray-800">
            {formatTime(timeLeft)}
          </span>
        </div>
        <div className="text-sm text-gray-600">
          Question {currentScenario + 1} of {scenarios.length}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
        <div 
          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Scenario */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{scenario.title}</h2>
        
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
          <div className="flex items-center">
            <AlertCircle className="text-yellow-600 mr-2" size={20} />
            <span className="text-sm font-medium text-yellow-800">Scenario</span>
          </div>
          <p className="text-yellow-700 mt-1">{scenario.situation}</p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            {scenario.question}
          </h3>
        </div>

        <div className="space-y-3">
          {scenario.options.map((option) => {
            const isSelected = answers[scenario.id] === option.id;
            return (
              <button
                key={option.id}
                onClick={() => handleAnswer(scenario.id, option.id)}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                  isSelected
                    ? 'border-blue-500 bg-blue-50 text-blue-800'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <span className="font-medium">{option.id.toUpperCase()})</span> {option.text}
              </button>
            );
          })}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-600">
          {answers[scenario.id] ? '✓ Answered' : 'Select an answer'}
        </div>
        <button
          onClick={nextScenario}
          disabled={!answers[scenario.id]}
          className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
            answers[scenario.id]
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {currentScenario < scenarios.length - 1 ? 'Next' : 'Finish'}
          <ChevronRight className="inline ml-2" size={16} />
        </button>
      </div>
    </div>
  );
};

export default GitLabQuiz;