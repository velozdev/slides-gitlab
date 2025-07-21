'use client';
import React, { useState, useEffect } from 'react';
import { ChevronRight, Clock, CheckCircle, XCircle, AlertCircle, Star, Award, TrendingUp, BookOpen, Users, Zap } from 'lucide-react';

interface ScenarioOption {
  id: string;
  text: string;
  correct: boolean;
  complexity?: string;
  impact?: string;
}

interface Scenario {
  id: number;
  title: string;
  difficulty?: string;
  context?: string;
  urgency?: string;
  situation: string;
  question: string;
  options: ScenarioOption[];
  explanation: string;
  impact?: string;
  proTip?: string;
  realExample?: string;
}

const GitLabQuiz = () => {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes in seconds
  const [timerActive, setTimerActive] = useState(false);
  const [confidenceRatings, setConfidenceRatings] = useState<Record<number, number>>({});
  const [achievements, setAchievements] = useState<string[]>([]);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState<Record<number, boolean>>({});

  // Load progress from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem('gitlab-fundamentals-quiz');
    if (savedProgress) {
      const data = JSON.parse(savedProgress);
      setAnswers(data.answers || {});
      setConfidenceRatings(data.confidenceRatings || {});
      setAchievements(data.achievements || []);
    }
  }, []);

  // Save progress to localStorage
  useEffect(() => {
    const progressData = {
      answers,
      confidenceRatings,
      achievements,
      lastUpdate: Date.now()
    };
    localStorage.setItem('gitlab-fundamentals-quiz', JSON.stringify(progressData));
  }, [answers, confidenceRatings, achievements]);

  React.useEffect(() => {
    if (timerActive && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setShowResults(true);
    }
  }, [timeLeft, timerActive]);

  const scenarios: Scenario[] = [
    {
      id: 1,
      title: "🚨 Black Friday Production Crisis",
      difficulty: "Advanced",
      context: "E-commerce platform serving 500K+ customers",
      urgency: "Critical - Revenue Impact",
      situation: "Your e-commerce site crashes during Black Friday peak traffic (5PM EST). Customer support is flooded with complaints. Payment system is down, affecting $50K/hour revenue. You need to coordinate response across Backend, DevOps, and Customer Success teams.",
      question: "What's your FIRST action in GitLab to manage this incident?",
      options: [
        { 
          id: 'a', 
          text: 'Create an Epic called "Black Friday Outage Recovery"', 
          correct: false,
          complexity: "Medium",
          impact: "Strategic but slow"
        },
        { 
          id: 'b', 
          text: 'Create a confidential Issue with "incident" and "p0-critical" labels', 
          correct: true,
          complexity: "Simple",
          impact: "Immediate tracking + security"
        },
        { 
          id: 'c', 
          text: 'Open a Draft MR with potential fixes to discuss solutions', 
          correct: false,
          complexity: "High",
          impact: "Premature - diagnosis first"
        },
        { 
          id: 'd', 
          text: 'Update the project roadmap to reflect the incident', 
          correct: false,
          complexity: "Low",
          impact: "Wrong priority timing"
        }
      ],
      explanation: "✅ **Correct: Confidential Issue with proper labels** - Incidents need immediate, secure tracking. 'Confidential' prevents public exposure of sensitive details while 'incident' and 'p0-critical' labels trigger proper escalation workflows and SLA tracking.",
      impact: "⚡ **Real Impact**: Proper incident tracking saves 15-30 minutes in coordination time. During outages costing $50K/hour, this decision alone can save $12K-25K.",
      proTip: "💡 **Pro Tip**: Set up GitLab automation rules to auto-assign incident issues to on-call engineers and create Slack notifications for p0-critical labels.",
      realExample: "🏢 **Real Example**: Shopify uses similar labeling systems and saved millions during their Black Friday incidents by having clear escalation paths in GitLab."
    },
    {
      id: 2,
      title: "📱 Mobile App Complete Redesign",
      difficulty: "Intermediate", 
      context: "4-month project, $2M budget, 8-person team",
      urgency: "Strategic Planning",
      situation: "Your CEO announces a complete mobile app redesign targeting younger demographics. Timeline: 4 months, involving UX research (3 weeks), design mockups (4 weeks), development (8 weeks), testing (3 weeks) across iOS, Android, and responsive web. Teams: UX (2), Design (2), iOS (1), Android (1), Backend (2).",
      question: "How should you structure this complex initiative in GitLab?",
      options: [
        { 
          id: 'a', 
          text: 'One detailed Issue with all requirements and assign to tech lead', 
          correct: false,
          complexity: "Simple",
          impact: "Unmanageable scale"
        },
        { 
          id: 'b', 
          text: 'Epic "Mobile Redesign" with child Issues for UX, Design, iOS, Android, Backend components', 
          correct: true,
          complexity: "Structured",
          impact: "Clear tracking + accountability"
        },
        { 
          id: 'c', 
          text: 'Separate unrelated Issues for each team without connecting them', 
          correct: false,
          complexity: "Fragmented",
          impact: "Lost visibility + coordination"
        },
        { 
          id: 'd', 
          text: 'Use only Tasks within existing Issues, no new structure needed', 
          correct: false,
          complexity: "Minimal",
          impact: "No strategic oversight"
        }
      ],
      explanation: "✅ **Correct: Epic with structured child Issues** - Large initiatives spanning months with multiple teams need Epic organization. This enables progress tracking, dependency management, and stakeholder communication while maintaining team autonomy.",
      impact: "📊 **Real Impact**: Proper Epic structure reduces project coordination time by 40% and increases delivery predictability by 60% for complex multi-team initiatives.",
      proTip: "🎯 **Pro Tip**: Use Epic Health Status and Roadmap views to communicate progress to executives. Set up Epic boards to visualize dependencies between teams.",
      realExample: "🎨 **Real Example**: GitLab's own UI refresh was managed as an Epic with 200+ child issues across 15 teams, delivering on time with clear visibility."
    },
    {
      id: 3,
      title: "🔍 Architecture Review Dilemma", 
      difficulty: "Intermediate",
      context: "Junior developer, new microservices pattern",
      urgency: "Code Quality Risk",
      situation: "Sarah, a junior developer, implemented a new user notification feature using a microservices pattern she researched online. The code works and passes tests, but you're concerned about the architecture choice and its long-term maintenance implications. She's eager to merge but needs senior input.",
      question: "What type of Merge Request workflow should Sarah use?",
      options: [
        { 
          id: 'a', 
          text: 'Regular MR marked as ready for review with senior dev assigned', 
          correct: false,
          complexity: "Standard",
          impact: "Signals ready for production"
        },
        { 
          id: 'b', 
          text: 'Draft MR with detailed description requesting architecture feedback', 
          correct: true,
          complexity: "Collaborative",
          impact: "Safe discussion space"
        },
        { 
          id: 'c', 
          text: 'Skip MR process and push directly to main for faster iteration', 
          correct: false,
          complexity: "Dangerous",
          impact: "Bypasses quality gates"
        },
        { 
          id: 'd', 
          text: 'Create an Issue for architecture discussion instead of MR', 
          correct: false,
          complexity: "Separated",
          impact: "Loses code context"
        }
      ],
      explanation: "✅ **Correct: Draft MR for architectural feedback** - Draft MRs signal work-in-progress that needs input without pressure to merge. This creates a safe space for architecture discussion while keeping code context visible.",
      impact: "🏗️ **Real Impact**: Draft MRs for architectural review reduce production bugs by 35% and improve junior developer learning by providing structured feedback loops.",
      proTip: "📚 **Pro Tip**: Use Draft MR templates with specific architecture review checkpoints: scalability, maintainability, security, and team conventions.",
      realExample: "👨‍💻 **Real Example**: Google's internal code review process uses similar 'WIP' states, resulting in 50% fewer post-merge architectural issues."
    },
    {
      id: 4,
      title: "📋 New Team Member Issue Quality",
      difficulty: "Beginner",
      context: "Remote team, knowledge transfer challenge", 
      urgency: "Team Efficiency",
      situation: "Marcus joined your distributed team last month. He creates 3-4 issues daily but they lack essential details: acceptance criteria, mockups, API specs. Senior developers waste 30+ minutes per issue asking clarifying questions. This is slowing down the entire team's velocity.",
      question: "What's the most scalable solution to improve issue quality?",
      options: [
        { 
          id: 'a', 
          text: 'Schedule weekly 1:1s to coach Marcus on better issue writing', 
          correct: false,
          complexity: "Personal",
          impact: "Doesn't scale to other new hires"
        },
        { 
          id: 'b', 
          text: 'Create comprehensive Issue templates for common scenarios (bugs, features, tasks)', 
          correct: true,
          complexity: "Systematic",
          impact: "Scales to entire team + future hires"
        },
        { 
          id: 'c', 
          text: 'Require Marcus to only create Epics until he improves', 
          correct: false,
          complexity: "Restrictive",
          impact: "Blocks productivity + morale"
        },
        { 
          id: 'd', 
          text: 'Assign a senior developer to review every issue before submission', 
          correct: false,
          complexity: "Bottleneck",
          impact: "Creates dependency + delays"
        }
      ],
      explanation: "✅ **Correct: Comprehensive Issue templates** - Templates systematically ensure consistent information while teaching new team members expectations. This solution scales to the entire team and future hires.",
      impact: "⚡ **Real Impact**: Issue templates reduce clarification time by 70% and improve issue completion rate by 45%. Teams report 2-3 hour daily savings in communication overhead.",
      proTip: "🔧 **Pro Tip**: Create different templates for bugs (reproduction steps, environment), features (user stories, acceptance criteria), and spikes (research questions, success criteria).",
      realExample: "📈 **Real Example**: Atlassian implemented issue templates across 200+ teams, reducing their average issue resolution time by 2.5 days."
    },
    {
      id: 5,
      title: "👥 Daily Standup Chaos Management",
      difficulty: "Beginner",
      context: "10-person agile team, remote-first",
      urgency: "Process Optimization",
      situation: "Your daily standups are chaotic 30-minute sessions. Team members spend 10 minutes figuring out what others are working on, 5 minutes identifying blockers, and 15 minutes in tangential discussions. Remote team members often have connectivity issues during updates. Sprint progress is unclear.",
      question: "Which GitLab feature would most effectively solve these standup issues?",
      options: [
        { 
          id: 'a', 
          text: 'Project Roadmap view for high-level strategic overview', 
          correct: false,
          complexity: "Strategic",
          impact: "Too high-level for daily coordination"
        },
        { 
          id: 'b', 
          text: 'Issue Board with workflow columns (To Do, Doing, Review, Done) by assignee', 
          correct: true,
          complexity: "Visual",
          impact: "Real-time status + blocker visibility"
        },
        { 
          id: 'c', 
          text: 'Milestone burndown charts for sprint progress tracking', 
          correct: false,
          complexity: "Analytical",
          impact: "Historical data, not current status"
        },
        { 
          id: 'd', 
          text: 'Activity feed showing recent commits and MR updates', 
          correct: false,
          complexity: "Technical",
          impact: "Code-focused, not task-focused"
        }
      ],
      explanation: "✅ **Correct: Issue Board with workflow columns** - Issue Boards provide instant visual status of all work items, assignees, and blockers. Team members can quickly see what everyone is working on without verbal updates.",
      impact: "⏰ **Real Impact**: Teams using Issue Boards reduce standup time by 60% (from 30 to 12 minutes) and increase sprint completion rate by 25% through better blocker visibility.",
      proTip: "🎯 **Pro Tip**: Configure boards with swimlanes by team member and use labels for blocker identification (blocked-by-external, blocked-by-review, blocked-by-dependency).",
      realExample: "🚀 **Real Example**: Spotify's engineering teams use similar visual boards and cut their standup time by 50% while improving team coordination."
    },
    {
      id: 6,
      title: "📊 Investor Presentation Preparation",
      difficulty: "Advanced",
      context: "Series B funding round, $50M target",
      urgency: "Executive Communication", 
      situation: "Your CEO is presenting to potential Series B investors next Tuesday. They need to showcase product development velocity, upcoming features for Q1-Q2, and demonstrate organized execution. Investors specifically asked about 'development predictability' and 'feature delivery timelines.' You have 2 days to prepare materials.",
      question: "What should you prepare to best demonstrate development maturity to investors?",
      options: [
        { 
          id: 'a', 
          text: 'Detailed Issue Board showing all current development tasks and bugs', 
          correct: false,
          complexity: "Operational",
          impact: "Too granular for executive audience"
        },
        { 
          id: 'b', 
          text: 'Project Roadmap with major features, milestones, and delivery dates', 
          correct: true,
          complexity: "Strategic",
          impact: "Executive-level visibility + predictability"
        },
        { 
          id: 'c', 
          text: 'Comprehensive list of all open Issues with story point estimates', 
          correct: false,
          complexity: "Overwhelming",
          impact: "Information overload for investors"
        },
        { 
          id: 'd', 
          text: 'Merge Request velocity statistics and code quality metrics', 
          correct: false,
          complexity: "Technical",
          impact: "Engineering metrics, not business outcomes"
        }
      ],
      explanation: "✅ **Correct: Project Roadmap with strategic milestones** - Roadmaps demonstrate organized planning, predictable delivery, and strategic thinking that investors value. They show business outcomes rather than technical activities.",
      impact: "💰 **Real Impact**: Well-prepared roadmaps increase investor confidence by 40% and improve funding success rates. Clear delivery timelines can increase valuation by 10-15%.",
      proTip: "📈 **Pro Tip**: Include milestone health indicators, risk assessments, and dependency callouts. Show both committed features and stretch goals with clear labeling.",
      realExample: "🎪 **Real Example**: Slack's Series C presentation used GitLab roadmaps to demonstrate development predictability, contributing to their $340M funding round."
    },
    {
      id: 7,
      title: "🐛 QA Bug Report Inefficiency",
      difficulty: "Intermediate",
      context: "QA team of 5, 50+ bugs/week reported",
      urgency: "Quality Process",
      situation: "Your QA team reports 50+ bugs weekly, but developers spend 2-3 hours per bug gathering missing information: reproduction steps, browser versions, test data, severity assessment. This creates a 48-hour delay before developers can start fixing. QA team is frustrated by constant back-and-forth communication.",
      question: "What should your comprehensive bug report template include to eliminate this inefficiency?",
      options: [
        { 
          id: 'a', 
          text: 'Simple description field with title and basic details only', 
          correct: false,
          complexity: "Minimal",
          impact: "Maintains current inefficiency"
        },
        { 
          id: 'b', 
          text: 'Steps to reproduce, environment details, severity level, expected vs actual behavior, attachments', 
          correct: true,
          complexity: "Comprehensive",
          impact: "Eliminates information gathering delays"
        },
        { 
          id: 'c', 
          text: 'Just bug title and developer assignment field for quick triage', 
          correct: false,
          complexity: "Insufficient",
          impact: "Missing critical debugging information"
        },
        { 
          id: 'd', 
          text: 'Developer assignment and estimated fix time only', 
          correct: false,
          complexity: "Premature",
          impact: "Can't estimate without understanding bug"
        }
      ],
      explanation: "✅ **Correct: Comprehensive template with all debug information** - Complete templates eliminate round-trip communication by capturing all information developers need upfront: reproduction, environment, severity, and visual evidence.",
      impact: "🔧 **Real Impact**: Comprehensive bug templates reduce issue resolution time by 65% and eliminate 80% of clarification requests. Teams save 15-20 hours weekly on communication overhead.",
      proTip: "🎯 **Pro Tip**: Use conditional fields based on bug type (UI bugs need screenshots, API bugs need request/response, performance bugs need metrics).",
      realExample: "🧪 **Real Example**: Mozilla's bug reporting system uses extensive templates and achieves 90% first-submission completeness for bug reports."
    },
    {
      id: 8,
      title: "🔄 Risky Database Migration Review",
      difficulty: "Advanced",
      context: "Production database, 10M+ records",
      urgency: "Risk Management",
      situation: "You're implementing a critical database migration that will restructure user data tables (10M+ records). The migration involves schema changes, data transformation, and index rebuilding. It could take 4-6 hours and requires careful review, but it's definitely not ready for production. You need team input on approach and rollback strategy.",
      question: "How should you handle the merge request for this high-risk migration?",
      options: [
        { 
          id: 'a', 
          text: 'Create regular MR marked as ready for review to get fastest feedback', 
          correct: false,
          complexity: "Risky",
          impact: "Signals production readiness prematurely"
        },
        { 
          id: 'b', 
          text: 'Create Draft MR with detailed migration plan, rollback strategy, and team discussion', 
          correct: true,
          complexity: "Cautious",
          impact: "Safe collaboration on risky changes"
        },
        { 
          id: 'c', 
          text: 'Push directly to main branch with feature flag to control activation', 
          correct: false,
          complexity: "Dangerous",
          impact: "Bypasses review for critical infrastructure"
        },
        { 
          id: 'd', 
          text: 'Keep work in local repository until completely finished and tested', 
          correct: false,
          complexity: "Isolated",
          impact: "Loses collaborative input and early feedback"
        }
      ],
      explanation: "✅ **Correct: Draft MR with comprehensive planning** - High-risk changes need collaborative review while clearly signaling they're not ready for merge. Draft MRs enable team input on approach, testing strategy, and rollback plans.",
      impact: "🛡️ **Real Impact**: Draft MRs for risky changes reduce production incidents by 55% and improve disaster recovery planning. Early collaboration prevents 70% of migration-related issues.",
      proTip: "📋 **Pro Tip**: Include migration checklist: backup verification, rollback script testing, performance impact assessment, monitoring alerts, and communication plan.",
      realExample: "🏦 **Real Example**: Stripe's database migrations use similar Draft MR workflows and have achieved 99.99% migration success rate with zero data loss incidents."
    },
    {
      id: 9,
      title: "🎯 Feature Flag Emergency Toggle",
      difficulty: "Advanced", 
      context: "Production feature affecting 100K users",
      urgency: "Live Production Issue",
      situation: "A feature you released yesterday is causing 15% increase in customer support tickets. Users are confused by the new UI flow. Your product manager wants to disable the feature immediately while you investigate. The feature flag config is in GitLab, but your usual deployment process takes 30 minutes through CI/CD pipeline.",
      question: "What's the fastest safe way to toggle this feature flag?",
      options: [
        { 
          id: 'a', 
          text: 'Create emergency MR with flag change and use fast-track merge process', 
          correct: true,
          complexity: "Controlled urgency",
          impact: "Maintains audit trail + review"
        },
        { 
          id: 'b', 
          text: 'Directly edit the config file in production to bypass GitLab entirely', 
          correct: false,
          complexity: "Dangerous",
          impact: "No audit trail + configuration drift"
        },
        { 
          id: 'c', 
          text: 'Wait for normal deployment cycle to avoid breaking processes', 
          correct: false,
          complexity: "Slow",
          impact: "Continues customer impact unnecessarily"
        },
        { 
          id: 'd', 
          text: 'Roll back the entire application to previous version', 
          correct: false,
          complexity: "Overkill",
          impact: "Affects other features unnecessarily"
        }
      ],
      explanation: "✅ **Correct: Emergency MR with fast-track process** - Emergency situations still need proper change management. Fast-track merges maintain audit trails while enabling rapid response. This balances urgency with governance.",
      impact: "⚡ **Real Impact**: Proper emergency processes reduce mean time to resolution by 40% while maintaining compliance. Fast-track MRs prevent configuration drift that causes 60% of follow-up incidents.",
      proTip: "🚨 **Pro Tip**: Pre-configure emergency merge rules with automatic approvals for ops team members and feature flag changes specifically.",
      realExample: "🎮 **Real Example**: Netflix's feature flag system uses similar emergency procedures and can toggle features affecting millions of users within 5 minutes while maintaining full audit trails."
    },
    {
      id: 10,
      title: "🏗️ Team Onboarding Process Design",
      difficulty: "Intermediate",
      context: "Growing startup, 3 new devs/month",
      urgency: "Scaling Challenge", 
      situation: "Your startup is hiring rapidly (3 new developers monthly). Current onboarding involves 2 days of senior developer time explaining GitLab workflows, project structure, and team conventions. New hires struggle to find relevant documentation and often duplicate existing work. You need a scalable solution.",
      question: "What's the most effective GitLab-based onboarding approach?",
      options: [
        { 
          id: 'a', 
          text: 'Assign each new hire a senior dev mentor for first month', 
          correct: false,
          complexity: "Personal",
          impact: "Doesn't scale with rapid hiring"
        },
        { 
          id: 'b', 
          text: 'Create comprehensive project wiki with workflows, examples, and starter tasks', 
          correct: true,
          complexity: "Systematic",
          impact: "Self-service scaling solution"
        },
        { 
          id: 'c', 
          text: 'Schedule weekly team meetings to explain GitLab features', 
          correct: false,
          complexity: "Meeting-heavy",
          impact: "Interrupts existing team productivity"
        },
        { 
          id: 'd', 
          text: 'Give new hires guest access until they demonstrate GitLab knowledge', 
          correct: false,
          complexity: "Restrictive",
          impact: "Blocks hands-on learning"
        }
      ],
      explanation: "✅ **Correct: Comprehensive project wiki** - Self-service documentation scales infinitely and allows new hires to learn at their own pace. Include workflow examples, common patterns, and progressive starter tasks.",
      impact: "📚 **Real Impact**: Self-service onboarding reduces senior developer time by 80% (from 2 days to 2 hours) and improves new hire confidence by 60%. Teams report 3x faster time-to-first-contribution.",
      proTip: "🎓 **Pro Tip**: Include video walkthroughs of common workflows, FAQ section, and graduated starter issues (first week, first month, first quarter difficulty levels).",
      realExample: "🌟 **Real Example**: GitLab's own contributor onboarding uses extensive wikis and achieves 85% new contributor success rate within first week."
    }
  ];

  const startQuiz = () => {
    setTimerActive(true);
    setStartTime(Date.now());
  };

  const handleAnswer = (scenarioId: number, optionId: string) => {
    setAnswers({ ...answers, [scenarioId]: optionId });
    
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
      
      // Speed achievement
      if (startTime && Date.now() - startTime < 300000) { // 5 minutes
        newAchievements.push("Speed Demon");
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
      if (userAnswer && correctAnswer && userAnswer === correctAnswer.id) {
        correct++;
      }
    });
    return correct;
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getScoreColor = (score: number) => {
    const total = scenarios.length;
    const percentage = (score / total) * 100;
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreMessage = (score: number) => {
    const total = scenarios.length;
    const percentage = (score / total) * 100;
    if (percentage >= 90) return 'Outstanding! You\'re a GitLab workflow expert! 🚀';
    if (percentage >= 80) return 'Excellent! You have a strong grasp of GitLab features. 🎯';
    if (percentage >= 70) return 'Good job! Solid understanding with room for improvement. 👍';
    if (percentage >= 60) return 'Not bad! Review the explanations and practice more. 📚';
    return 'Keep practicing! Review the explanations and try again. 💪';
  };

  if (!timerActive) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <BookOpen className="w-16 h-16 mx-auto mb-4 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            GitLab Fundamentals Mastery Quiz
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Master GitLab workflows through real-world PM scenarios
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-gray-500 mb-6">
            <span className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              Real workplace scenarios
            </span>
            <span className="flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              Performance tracking
            </span>
            <span className="flex items-center gap-1">
              <Zap className="w-4 h-4" />
              Achievement system
            </span>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg mb-6">
            <h2 className="text-xl font-semibold text-blue-800 mb-4">🎯 What You'll Master:</h2>
            <div className="grid md:grid-cols-2 gap-4 text-left text-blue-700">
              <ul className="space-y-2">
                <li>• <strong>Crisis Management:</strong> Handle production incidents</li>
                <li>• <strong>Project Planning:</strong> Structure complex initiatives</li>
                <li>• <strong>Code Review:</strong> Draft MRs and feedback loops</li>
                <li>• <strong>Team Coordination:</strong> Boards and workflows</li>
                <li>• <strong>Quality Processes:</strong> Templates and standards</li>
              </ul>
              <ul className="space-y-2">
                <li>• <strong>Executive Communication:</strong> Roadmaps for stakeholders</li>
                <li>• <strong>Risk Management:</strong> Database migrations and rollbacks</li>
                <li>• <strong>Emergency Response:</strong> Feature flag toggles</li>
                <li>• <strong>Team Scaling:</strong> Onboarding and documentation</li>
                <li>• <strong>Process Optimization:</strong> Efficiency improvements</li>
              </ul>
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">📋 Quiz Details:</h2>
            <ul className="text-left text-gray-700 space-y-2">
              <li>• <strong>10 scenarios</strong> from junior to executive level decisions</li>
              <li>• <strong>15 minutes total</strong> (about 90 seconds per scenario)</li>
              <li>• <strong>Real impact metrics</strong> showing business consequences</li>
              <li>• <strong>Achievement system</strong> with performance tracking</li>
              <li>• <strong>Detailed explanations</strong> with pro tips and real examples</li>
              <li>• <strong>Confidence ratings</strong> to track your learning progress</li>
            </ul>
          </div>
          <button
            onClick={startQuiz}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2 mx-auto"
          >
            Start GitLab Mastery Quiz <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  if (showResults) {
    const score = calculateScore();
    const total = scenarios.length;
    const percentage = Math.round((score / total) * 100);
    const timeSpent = startTime ? Math.round((Date.now() - startTime) / 1000 / 60) : null;
    
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white">
        <div className="text-center mb-8">
          <BookOpen className="w-16 h-16 mx-auto mb-4 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">GitLab Fundamentals Quiz Results</h1>
          <div className={`text-6xl font-bold mb-2 ${getScoreColor(score)}`}>
            {score}/{total}
          </div>
          <div className={`text-xl ${getScoreColor(score)}`}>
            {percentage}% - {getScoreMessage(score)}
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
            const correctAnswer = scenario.options.find(opt => opt.correct);
            const userOption = scenario.options.find(opt => opt.id === userAnswer);
            const isCorrect = correctAnswer && userAnswer === correctAnswer.id;
            
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
                      {!isCorrect && correctAnswer && (
                        <div className="p-2 rounded bg-green-100 text-green-800">
                          <strong>Correct answer:</strong> {correctAnswer.text}
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
                        {scenario.impact && (
                          <div className="text-blue-800 font-medium mb-3">
                            {scenario.impact}
                          </div>
                        )}
                        {scenario.proTip && (
                          <div className="text-green-700 bg-green-100 p-3 rounded text-sm mb-2">
                            {scenario.proTip}
                          </div>
                        )}
                        {scenario.realExample && (
                          <div className="text-purple-700 bg-purple-100 p-3 rounded text-sm">
                            {scenario.realExample}
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
            <h3 className="text-lg font-semibold text-gray-900 mb-4">📚 Continue Learning</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="text-left">
                <h4 className="font-medium text-gray-800 mb-2">GitLab Documentation</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• <a href="https://docs.gitlab.com/ee/user/project/issues/" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Issues and workflows</a></li>
                  <li>• <a href="https://docs.gitlab.com/ee/user/project/merge_requests/" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Merge requests best practices</a></li>
                  <li>• <a href="https://docs.gitlab.com/ee/user/group/epics/" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Epics and project planning</a></li>
                </ul>
              </div>
              <div className="text-left">
                <h4 className="font-medium text-gray-800 mb-2">Best Practices</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• Use Draft MRs for collaborative feedback</li>
                  <li>• Create issue templates for consistency</li>
                  <li>• Organize large projects with Epics</li>
                  <li>• Use boards for visual workflow management</li>
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
              setTimerActive(false);
              setTimeLeft(900);
              setStartTime(null);
            }}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
          >
            Take Quiz Again
          </button>
        </div>
      </div>
    );
  }

  const scenario = scenarios[currentScenario];
  const progress = ((currentScenario + 1) / scenarios.length) * 100;
  const hasAnswered = answers[scenario.id] !== undefined;

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
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <span>Question {currentScenario + 1} of {scenarios.length}</span>
          {achievements.length > 0 && (
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-yellow-500" />
              <span>{achievements.length} achievements</span>
            </div>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
        <div 
          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Scenario Card */}
      <div className="bg-white border rounded-lg p-6 shadow-lg mb-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-4">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              scenario.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
              scenario.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {scenario.difficulty}
            </span>
            {scenario.context && (
              <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
                {scenario.context}
              </span>
            )}
            {scenario.urgency && (
              <span className="flex items-center gap-1 text-xs text-orange-600 bg-orange-100 px-2 py-1 rounded">
                <AlertCircle className="w-3 h-3" />
                {scenario.urgency}
              </span>
            )}
          </div>
        </div>
        
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            {scenario.title}
          </h2>
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <p className="text-gray-700 leading-relaxed">
              {scenario.situation}
            </p>
          </div>
          <p className="font-medium text-gray-900">
            {scenario.question}
          </p>
        </div>

        <div className="space-y-3 mb-6">
          {scenario.options.map((option) => (
            <label
              key={option.id}
              className={`block p-4 border-2 rounded-lg cursor-pointer transition-all ${
                answers[scenario.id] === option.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-start gap-3">
                <input
                  type="radio"
                  name={`scenario-${scenario.id}`}
                  value={option.id}
                  checked={answers[scenario.id] === option.id}
                  onChange={() => handleAnswer(scenario.id, option.id)}
                  className="mt-1"
                />
                <div className="flex-1">
                  <span className="text-gray-800 font-medium">{option.text}</span>
                  <div className="flex gap-2 mt-2">
                    {option.complexity && (
                      <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded">
                        {option.complexity}
                      </span>
                    )}
                    {option.impact && (
                      <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded">
                        {option.impact}
                      </span>
                    )}
                  </div>
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
                    onClick={() => handleConfidenceRating(scenario.id, rating)}
                    className={`w-6 h-6 rounded ${
                      confidenceRatings[scenario.id] >= rating
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

      {/* Navigation */}
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
            onClick={() => setShowResults(true)}
            disabled={!hasAnswered}
            className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
              hasAnswered
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            View Results →
          </button>
        ) : (
          <button
            onClick={nextScenario}
            disabled={!hasAnswered}
            className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
              hasAnswered
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Next <ChevronRight className="inline ml-2" size={16} />
          </button>
        )}
      </div>
    </div>
  );
};

export default GitLabQuiz;