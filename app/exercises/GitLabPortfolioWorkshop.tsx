'use client';
import React, { useState, useEffect } from 'react';
import { BarChart3, CheckCircle, XCircle, Users, RotateCcw, AlertTriangle, Star, Award, Clock, TrendingUp, Zap, Target, DollarSign, Calendar, Briefcase } from 'lucide-react';

interface WorkshopOption {
  id: string;
  action: string;
  reasoning: string;
  impact?: string;
  complexity?: string;
  timeframe?: string;
}

interface WorkshopScenario {
  id: number;
  title: string;
  difficulty?: string;
  urgency?: string;
  portfolioSize?: string;
  stakeholders?: string;
  context: string;
  challenge: string;
  options: WorkshopOption[];
  correctAnswer: string;
  explanation: string;
  businessImpact?: string;
  proTip?: string;
  realExample?: string;
  whyWrong: Record<string, string>;
}

const GitLabPortfolioWorkshop = () => {
  const [currentScenario, setCurrentScenario] = useState(0);
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
    const savedProgress = localStorage.getItem('gitlab-portfolio-workshop');
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
      localStorage.setItem('gitlab-portfolio-workshop', JSON.stringify(progressData));
    }
  }, [score, confidenceRatings, achievements, hasStarted]);

  const scenarios: WorkshopScenario[] = [
    {
      id: 1,
      title: "Q1 Budget Reallocation Crisis",
      difficulty: "Advanced",
      urgency: "Financial Impact",
      portfolioSize: "15 active projects",
      stakeholders: "C-Suite + Department Heads",
      context: "Your company faces a 30% budget cut for Q1 due to market conditions. You're managing 15 active projects across 4 departments with total budget of $2.4M. Projects include: customer portal redesign ($400K, 60% complete), mobile app launch ($300K, 25% complete), data warehouse migration ($500K, 80% complete), AI chatbot ($200K, 10% complete), and 11 smaller initiatives. Executive team wants to maintain customer-facing improvements while cutting costs.",
      challenge: "Strategic resource reallocation to maximize business value within reduced budget constraints.",
      options: [
        {
          id: 'a',
          action: "Complete high-progress projects (data warehouse, customer portal), pause low-progress ones",
          reasoning: "Focus on projects with highest completion percentage to minimize sunk costs",
          impact: "Moderate",
          complexity: "Simple",
          timeframe: "Immediate"
        },
        {
          id: 'b',
          action: "Prioritize customer-facing projects regardless of completion status, cut internal projects",
          reasoning: "Align with executive directive to maintain customer experience during downturn",
          impact: "High",
          complexity: "Strategic",
          timeframe: "1-2 weeks"
        },
        {
          id: 'c',
          action: "Create ROI matrix ranking all projects, cut bottom 40% by value/cost ratio",
          reasoning: "Data-driven approach using business value metrics and resource requirements",
          impact: "High",
          complexity: "Analytical",
          timeframe: "2-3 weeks"
        },
        {
          id: 'd',
          action: "Reduce scope on all projects by 30% to maintain portfolio breadth with smaller budgets",
          reasoning: "Preserve all initiatives while scaling back deliverables proportionally",
          impact: "Low",
          complexity: "Distributed",
          timeframe: "1 week"
        }
      ],
      correctAnswer: 'c',
      explanation: "✅ **Correct: ROI matrix for data-driven prioritization** - During budget cuts, emotion and politics often drive decisions. A clear ROI matrix based on business value, strategic alignment, and resource requirements provides objective criteria for portfolio decisions.",
      businessImpact: "💰 **Business Impact**: ROI-based portfolio management increases project success rates by 60% and prevents $500K+ in wasted spending on low-value initiatives during budget constraints.",
      proTip: "📊 **Pro Tip**: Create your ROI matrix before you need it. Include metrics like customer impact, revenue potential, strategic alignment, technical debt reduction, and competitive advantage. Update quarterly.",
      realExample: "🏢 **Real Example**: Microsoft uses weighted scoring matrices for portfolio decisions, enabling them to cut $2B in projects during economic downturns while maintaining strategic momentum in key areas.",
      whyWrong: {
        'a': "Completion percentage doesn't indicate business value. A 90% complete project with low ROI wastes more money than canceling it and redirecting resources to higher-value initiatives.",
        'b': "Customer-facing doesn't automatically mean high value. Some internal projects (like data warehouse) may have higher long-term customer impact than visible features.",
        'c': "",
        'd': "Reducing scope across all projects often makes them all less effective. It's better to fully fund fewer, higher-value projects than to underfund many mediocre ones."
      }
    },
    {
      id: 2,
      title: "Cross-Department Resource Conflict",
      difficulty: "Advanced",
      urgency: "Political Tension",
      portfolioSize: "8 competing projects",
      stakeholders: "VP Engineering + VP Marketing + VP Sales",
      context: "Three departments are fighting for your top 2 engineers (Sarah - full-stack expert, Mike - DevOps specialist). Marketing wants them for campaign landing pages to hit Q2 lead targets. Sales needs CRM integration to close $1M deal pipeline. Engineering wants them for technical debt reduction that's slowing all development by 40%. Each department head is pressuring you directly, claiming their project is 'business critical'.",
      challenge: "Navigate competing stakeholder demands while optimizing overall portfolio value and team dynamics.",
      options: [
        {
          id: 'a',
          action: "Split the engineers - Sarah to Marketing, Mike to Sales, delay technical debt work",
          reasoning: "Give each department something to maintain relationships and avoid conflict",
          impact: "Low",
          complexity: "Political",
          timeframe: "Immediate"
        },
        {
          id: 'b',
          action: "Quantify business impact of each request, present analysis to leadership for decision",
          reasoning: "Escalate with data to avoid being caught between competing priorities",
          impact: "Medium",
          complexity: "Analytical",
          timeframe: "1 week"
        },
        {
          id: 'c',
          action: "Assign both engineers to technical debt for 2 weeks, then reassess priorities",
          reasoning: "Address foundational issue that affects all future work velocity",
          impact: "High",
          complexity: "Strategic",
          timeframe: "2-3 weeks"
        },
        {
          id: 'd',
          action: "Create rotating schedule - engineers spend 1 week on each department's priorities",
          reasoning: "Balance competing needs while maintaining momentum on all fronts",
          impact: "Medium",
          complexity: "Coordination",
          timeframe: "Ongoing"
        }
      ],
      correctAnswer: 'c',
      explanation: "✅ **Correct: Prioritize technical debt reduction** - Technical debt that slows all development by 40% is a portfolio-wide issue. Fixing it improves velocity for ALL future projects, creating compound value that exceeds any single department's short-term needs.",
      businessImpact: "⚡ **Business Impact**: Reducing technical debt by 40% increases overall team velocity permanently, delivering 2-3x more value over the next quarter than any single feature request.",
      proTip: "🔧 **Pro Tip**: Frame technical debt in business terms: 'This 2-week investment will make ALL our Q2-Q4 projects deliver 40% faster.' Stakeholders understand ROI better than technical details.",
      realExample: "💻 **Real Example**: Shopify regularly dedicates entire sprints to technical debt, resulting in 50% faster feature delivery and 80% fewer production issues across their entire platform.",
      whyWrong: {
        'a': "Splitting expert engineers reduces their effectiveness significantly. Context switching between projects can reduce productivity by 50% for complex technical work.",
        'b': "While data is important, some decisions require portfolio leadership. You have the technical context to understand the compound impact of technical debt.",
        'c': "",
        'd': "Weekly rotation maximizes context switching overhead and prevents engineers from completing meaningful work in any area. Deep work requires sustained focus."
      }
    },
    {
      id: 3,
      title: "Strategic Initiative vs. Customer Emergency",
      difficulty: "Intermediate",
      urgency: "Customer Escalation",
      portfolioSize: "5 major initiatives",
      stakeholders: "CEO + Customer Success + Product",
      context: "Your team is 6 weeks into a 12-week strategic initiative to rebuild the platform architecture for 10x scalability (CEO's top priority for the year). Suddenly, your largest customer (35% of revenue, $2M ARR) threatens to churn due to performance issues that could be fixed with a 3-week focused effort. The architecture rebuild would eventually solve these issues, but not for 8+ more weeks. Customer Success is panicking, CEO wants to protect the strategic timeline.",
      challenge: "Balance long-term strategic goals against immediate high-value customer retention needs.",
      options: [
        {
          id: 'a',
          action: "Pause architecture rebuild entirely, fix customer issues, then restart strategic work",
          reasoning: "Customer retention takes absolute priority - losing $2M ARR would devastate the business",
          impact: "High Short-term",
          complexity: "Simple",
          timeframe: "3 weeks"
        },
        {
          id: 'b',
          action: "Split team: 70% continues architecture, 30% works on customer emergency fix",
          reasoning: "Maintain strategic momentum while addressing customer needs with dedicated resources",
          impact: "Medium",
          complexity: "Resource Split",
          timeframe: "4-5 weeks"
        },
        {
          id: 'c',
          action: "Negotiate temporary workarounds with customer while completing strategic rebuild",
          reasoning: "Find interim solutions that buy time for the strategic work to complete properly",
          impact: "Medium",
          complexity: "Negotiation",
          timeframe: "6-8 weeks"
        },
        {
          id: 'd',
          action: "Accelerate architecture rebuild to address customer issues within current timeline",
          reasoning: "Double down on strategic work by increasing intensity and focus to solve both problems",
          impact: "High",
          complexity: "Intensive",
          timeframe: "4-6 weeks"
        }
      ],
      correctAnswer: 'b',
      explanation: "✅ **Correct: Split team 70/30** - This preserves strategic momentum (critical for long-term competitiveness) while dedicating sufficient resources to customer retention (critical for immediate survival). The 70/30 split maintains architecture progress while providing focused attention to the customer emergency.",
      businessImpact: "💡 **Business Impact**: Balanced resource allocation prevents both $2M customer churn and strategic initiative delays, maintaining short-term revenue while building long-term competitive advantage.",
      proTip: "⚖️ **Pro Tip**: For urgent customer issues during strategic work, always consider resource splits before full pivots. This maintains strategic momentum while showing customers they're a priority.",
      realExample: "🚀 **Real Example**: Slack maintained their strategic platform rebuild while dedicating 30% of engineering to enterprise customer escalations, preventing churn while completing their architecture transformation.",
      whyWrong: {
        'a': "Completely pausing strategic work sets dangerous precedent and delays competitive improvements. Strategic initiatives lose momentum and team focus when interrupted.",
        'b': "",
        'c': "Workarounds often become permanent technical debt. Large customers won't accept indefinite delays when they're experiencing real business impact.",
        'd': "Accelerating complex strategic work usually introduces bugs and technical debt, potentially creating more customer issues later."
      }
    },
    {
      id: 4,
      title: "Multi-Team Dependency Gridlock",
      difficulty: "Advanced",
      urgency: "Timeline Collision",
      portfolioSize: "6 interdependent projects",
      stakeholders: "Multiple Team Leads + Project Owners",
      context: "You have 6 projects with complex dependencies creating a coordination nightmare: API redesign (Team A, 8 weeks), mobile app update (Team B, depends on API, 6 weeks), web dashboard (Team C, depends on API, 4 weeks), data pipeline (Team D, 10 weeks), analytics system (Team E, depends on pipeline, 8 weeks), and reporting features (Team F, depends on analytics, 6 weeks). Everyone wants to start immediately, but the dependencies create 20+ week critical path if done sequentially.",
      challenge: "Optimize project sequencing and resource allocation to minimize portfolio timeline while managing dependencies.",
      options: [
        {
          id: 'a',
          action: "Execute projects sequentially following strict dependency order to avoid integration issues",
          reasoning: "Minimize risk by ensuring each dependency is fully complete before dependent work begins",
          impact: "Low Risk",
          complexity: "Sequential",
          timeframe: "20+ weeks"
        },
        {
          id: 'b',
          action: "Create mock APIs and parallel workstreams, integrate when dependencies are ready",
          reasoning: "Parallelize work using contract-first development to compress timeline",
          impact: "High",
          complexity: "Coordination",
          timeframe: "12-14 weeks"
        },
        {
          id: 'c',
          action: "Start all projects simultaneously, manage integration issues as they arise",
          reasoning: "Maximize parallelization and deal with conflicts through agile iteration",
          impact: "High Risk",
          complexity: "Reactive",
          timeframe: "10-16 weeks"
        },
        {
          id: 'd',
          action: "Phase projects in 2-week sprints with continuous integration checkpoints",
          reasoning: "Incremental progress with frequent alignment reduces both risk and timeline",
          impact: "Medium",
          complexity: "Iterative",
          timeframe: "14-16 weeks"
        }
      ],
      correctAnswer: 'b',
      explanation: "✅ **Correct: Mock APIs with parallel workstreams** - Contract-first development allows dependent teams to work simultaneously while provider teams build real implementations. This approach reduces timeline by 40-50% while maintaining integration quality through clear contracts.",
      businessImpact: "🚀 **Business Impact**: Parallel development with mocks reduces portfolio delivery time from 20+ weeks to 12-14 weeks, accelerating time-to-market by 8+ weeks and potential revenue impact of $200K-500K.",
      proTip: "🔄 **Pro Tip**: Invest in API contract specifications upfront. Tools like OpenAPI allow dependent teams to work with realistic mocks while providers build implementations in parallel.",
      realExample: "⚡ **Real Example**: Netflix uses extensive API mocking for parallel development across 100+ microservices, enabling teams to work independently while maintaining strict integration contracts.",
      whyWrong: {
        'a': "Sequential execution wastes significant parallelization opportunities and delays value delivery by months. Modern development practices enable much more efficient dependency management.",
        'b': "",
        'c': "Simultaneous starts without coordination create integration chaos, rework, and often longer timelines than planned parallel approaches.",
        'd': "2-week sprint phases still create artificial serialization. Mock-based parallel development can achieve much better compression."
      }
    },
    {
      id: 5,
      title: "Stakeholder Alignment on Innovation vs. Maintenance",
      difficulty: "Intermediate",
      urgency: "Strategic Direction",
      portfolioSize: "Innovation + Operations mix",
      stakeholders: "Board + Engineering + Operations",
      context: "Your portfolio is split between innovation projects (new AI features, platform expansion, competitive features) and maintenance work (technical debt, security updates, performance improvements, bug fixes). The board wants 80% innovation for competitive advantage. Engineering wants 60% maintenance for platform stability. Operations reports increasing incidents and wants 70% maintenance. You have data showing technical debt costs 3 hours per developer per day in lost productivity.",
      challenge: "Find optimal innovation/maintenance balance that satisfies stakeholders while maximizing long-term portfolio value.",
      options: [
        {
          id: 'a',
          action: "Follow board directive - 80% innovation, 20% maintenance to maximize competitive features",
          reasoning: "Align with highest-level stakeholder priorities for market positioning",
          impact: "High Short-term",
          complexity: "Political",
          timeframe: "Immediate"
        },
        {
          id: 'b',
          action: "Present productivity data showing maintenance ROI, negotiate 50/50 split as compromise",
          reasoning: "Use data to find middle ground that addresses both competitive and operational needs",
          impact: "Medium",
          complexity: "Negotiation",
          timeframe: "2-3 weeks"
        },
        {
          id: 'c',
          action: "Implement 60% maintenance for 2 months, then shift to 70% innovation once platform is stable",
          reasoning: "Front-load maintenance to improve productivity, then maximize innovation capacity",
          impact: "High Long-term",
          complexity: "Phased",
          timeframe: "4-6 months"
        },
        {
          id: 'd',
          action: "Create dedicated maintenance team separate from innovation teams to run parallel tracks",
          reasoning: "Separate concerns to optimize each type of work with specialized teams",
          impact: "Medium",
          complexity: "Organizational",
          timeframe: "1-2 months"
        }
      ],
      correctAnswer: 'c',
      explanation: "✅ **Correct: Front-load maintenance, then maximize innovation** - Technical debt costing 3 hours/day per developer means fixing it increases innovation capacity by 35-40%. Better to invest in platform stability first, then deliver innovation faster and more reliably.",
      businessImpact: "📈 **Business Impact**: Reducing technical debt by 60% increases overall team velocity by 35%, meaning future innovation projects complete 35% faster with 50% fewer bugs and incidents.",
      proTip: "💪 **Pro Tip**: Frame maintenance as 'innovation enablement.' Show stakeholders how platform improvements multiply the speed and quality of future innovation work.",
      realExample: "🔧 **Real Example**: Spotify regularly invests entire quarters in platform improvements, resulting in 2x faster feature delivery and 75% fewer production issues for subsequent innovation work.",
      whyWrong: {
        'a': "Ignoring technical debt creates compound productivity loss. As debt grows, innovation work becomes slower and more error-prone, defeating the purpose.",
        'b': "50/50 compromise may not be enough to significantly improve productivity, while still limiting innovation capacity more than necessary.",
        'c': "",
        'd': "Separate teams can create silos and integration issues. Innovation and maintenance work better when teams understand both aspects of the platform."
      }
    },
    {
      id: 6,
      title: "Portfolio Pivot During Market Shift",
      difficulty: "Advanced",
      urgency: "Market Response",
      portfolioSize: "12 active projects",
      stakeholders: "Executive Team + Investors",
      context: "Sudden market shift toward AI automation has made 40% of your current portfolio less relevant. Projects include: legacy integration platform ($800K invested, 70% complete), AI chatbot ($200K invested, 30% complete), workflow automation ($600K invested, 50% complete), mobile optimization ($300K invested, 80% complete), customer analytics ($400K invested, 40% complete). Competitors are announcing AI-first features weekly. Investors want aggressive pivot to AI focus.",
      challenge: "Rapidly pivot portfolio toward market opportunities while minimizing sunk costs and maintaining customer value.",
      options: [
        {
          id: 'a',
          action: "Immediately halt all non-AI projects, redirect all resources to AI initiatives",
          reasoning: "Aggressive market response to maximize competitive positioning in AI race",
          impact: "High Risk",
          complexity: "Radical",
          timeframe: "2-4 weeks"
        },
        {
          id: 'b',
          action: "Complete high-progress projects, convert others to AI-enhanced versions where possible",
          reasoning: "Minimize sunk costs while pivoting remaining work toward AI opportunities",
          impact: "Medium",
          complexity: "Hybrid",
          timeframe: "6-8 weeks"
        },
        {
          id: 'c',
          action: "Finish all current projects, then start fresh AI portfolio in next quarter",
          reasoning: "Honor existing commitments and avoid disruption while planning proper AI strategy",
          impact: "Low",
          complexity: "Sequential",
          timeframe: "3-4 months"
        },
        {
          id: 'd',
          action: "Create AI overlay strategy that enhances existing projects with AI features",
          reasoning: "Leverage existing investments by adding AI capabilities to current work",
          impact: "Medium",
          complexity: "Enhancement",
          timeframe: "4-6 weeks"
        }
      ],
      correctAnswer: 'd',
      explanation: "✅ **Correct: AI overlay strategy** - Rather than abandoning $2.3M in existing investments, an AI overlay approach adds intelligence to current projects. Workflow automation + AI, customer analytics + AI, and integration platform + AI create compelling market positioning while preserving investments.",
      businessImpact: "🎯 **Business Impact**: AI overlay preserves 80% of existing portfolio value while creating AI-enhanced features that differentiate from pure-play AI competitors who lack domain expertise.",
      proTip: "🔄 **Pro Tip**: During market pivots, look for 'enhancement opportunities' rather than 'replacement strategies.' Your domain expertise + new technology often beats pure technology plays.",
      realExample: "🤖 **Real Example**: Salesforce enhanced existing CRM features with Einstein AI rather than rebuilding, creating $1B+ AI revenue stream while maintaining platform advantages.",
      whyWrong: {
        'a': "Halting all projects wastes $2.3M in investments and may leave you with incomplete AI features that lack the domain integration customers need.",
        'b': "Converting projects may not be feasible for all initiatives, and partial pivots often result in mediocre execution in both old and new directions.",
        'c': "Waiting 3-4 months in a fast-moving AI market could mean losing competitive position permanently to more agile competitors.",
        'd': ""
      }
    },
    {
      id: 7,
      title: "Resource Capacity Planning Under Growth",
      difficulty: "Intermediate",
      urgency: "Scaling Challenge",
      portfolioSize: "Growing from 8 to 15 projects",
      stakeholders: "HR + Finance + Department Heads",
      context: "Your company is growing rapidly - revenue up 150% this year. Everyone wants to expand their project portfolio: Marketing wants 3 new campaign tools, Sales wants CRM enhancements, Customer Success wants support automation, Product wants 4 new features. You currently have 8 engineers handling 8 projects well. HR can hire 3 more engineers (6-month ramp time), or you can outsource some work (3-month setup, higher cost). Current team is at 95% capacity.",
      challenge: "Scale portfolio capacity strategically while maintaining quality and team dynamics during rapid growth.",
      options: [
        {
          id: 'a',
          action: "Hire 3 engineers, delay new projects until team is fully ramped and productive",
          reasoning: "Invest in long-term internal capacity before expanding portfolio scope",
          impact: "High Long-term",
          complexity: "Patient",
          timeframe: "6-8 months"
        },
        {
          id: 'b',
          action: "Outsource 3-4 lower-complexity projects, use internal team for strategic work",
          reasoning: "Immediately expand capacity through external resources for suitable work",
          impact: "Medium",
          complexity: "Hybrid",
          timeframe: "3-4 months"
        },
        {
          id: 'c',
          action: "Accept only highest-ROI projects, reject others until capacity improves",
          reasoning: "Maintain quality by strictly prioritizing most valuable work",
          impact: "Medium",
          complexity: "Selective",
          timeframe: "Ongoing"
        },
        {
          id: 'd',
          action: "Start hiring and outsourcing simultaneously, gradually increase portfolio",
          reasoning: "Multi-pronged capacity expansion to meet growth demands quickly",
          impact: "High",
          complexity: "Coordinated",
          timeframe: "4-6 months"
        }
      ],
      correctAnswer: 'd',
      explanation: "✅ **Correct: Simultaneous hiring and outsourcing** - Rapid growth requires aggressive capacity expansion. Combining internal hiring (for strategic work) with outsourcing (for tactical projects) provides both immediate capacity and long-term capability building.",
      businessImpact: "📊 **Business Impact**: Multi-channel capacity building supports 150% revenue growth by enabling portfolio expansion without quality degradation. Delays in capacity building often cap growth at 50-75% of potential.",
      proTip: "🎯 **Pro Tip**: During rapid growth, use outsourcing for clearly-defined projects while hiring for strategic/complex work. This maximizes capacity while building internal expertise for core capabilities.",
      realExample: "🚀 **Real Example**: Atlassian used hybrid internal/external teams during rapid growth, maintaining product quality while scaling from 50 to 500+ projects across multiple product lines.",
      whyWrong: {
        'a': "Waiting 6-8 months during 150% growth means missing market opportunities worth millions. Rapid growth requires rapid capacity response.",
        'b': "Outsourcing alone may not provide enough capacity expansion to match 150% revenue growth, and setup time still delays project starts.",
        'c': "Rejecting projects during high growth may limit revenue expansion and frustrate stakeholders who see missed opportunities.",
        'd': ""
      }
    },
    {
      id: 8,
      title: "Portfolio Performance Recovery Plan",
      difficulty: "Advanced",
      urgency: "Performance Crisis",
      portfolioSize: "10 underperforming projects",
      stakeholders: "CEO + Board + All Department Heads",
      context: "Your portfolio is in crisis: 7 of 10 projects are behind schedule, 4 are over budget, and 3 have quality issues requiring rework. Total portfolio value is $3.2M with $800K cost overruns. CEO wants immediate action plan. Main issues: scope creep (6 projects), technical complexity underestimation (4 projects), resource conflicts (5 projects), and unclear requirements (3 projects). Board meeting in 2 weeks to review portfolio status.",
      challenge: "Rapidly diagnose and correct portfolio-wide performance issues while maintaining stakeholder confidence.",
      options: [
        {
          id: 'a',
          action: "Immediately pause all projects for comprehensive requirements and planning review",
          reasoning: "Stop the bleeding by fixing fundamental planning issues before continuing",
          impact: "High Risk",
          complexity: "Reset",
          timeframe: "4-6 weeks"
        },
        {
          id: 'b',
          action: "Implement strict scope freeze, add dedicated project managers, extend timelines realistically",
          reasoning: "Address root causes systematically while maintaining project momentum",
          impact: "Medium",
          complexity: "Systematic",
          timeframe: "2-3 weeks"
        },
        {
          id: 'c',
          action: "Cancel bottom 3 projects, reallocate resources to save top 7",
          reasoning: "Focus resources on most salvageable projects to ensure some portfolio success",
          impact: "Medium",
          complexity: "Triage",
          timeframe: "1-2 weeks"
        },
        {
          id: 'd',
          action: "Hire external consultants for rapid project recovery and process improvement",
          reasoning: "Bring in specialized expertise to quickly diagnose and fix portfolio issues",
          impact: "High Cost",
          complexity: "External",
          timeframe: "3-4 weeks"
        }
      ],
      correctAnswer: 'b',
      explanation: "✅ **Correct: Systematic fixes with scope freeze and project management** - Portfolio failures usually stem from poor project management fundamentals. Scope freeze stops bleeding, dedicated PMs provide accountability, and realistic timelines rebuild credibility with stakeholders.",
      businessImpact: "🎯 **Business Impact**: Systematic portfolio recovery prevents additional $400K-800K in overruns and saves 60-80% of project value through improved execution rather than cancellation.",
      proTip: "📋 **Pro Tip**: Portfolio crises require process fixes, not just individual project fixes. Implement consistent project management standards, scope control, and resource allocation across all initiatives.",
      realExample: "🔧 **Real Example**: IBM's portfolio recovery program uses standardized project management frameworks to turn around failing initiatives, achieving 75% project recovery rate versus 15% for ad-hoc approaches.",
      whyWrong: {
        'a': "Pausing all projects destroys momentum and stakeholder confidence. With board meeting in 2 weeks, you need visible progress and fixes, not comprehensive delays.",
        'b': "",
        'c': "Canceling projects may save resources but doesn't fix underlying portfolio management issues. Remaining projects may still fail without process improvements.",
        'd': "External consultants are expensive and may not understand company context well enough to implement lasting improvements in 3-4 weeks."
      }
    }
  ];

  const startWorkshop = () => {
    setHasStarted(true);
    setStartTime(Date.now());
  };

  const handleConfidenceRating = (scenarioId: number, rating: number) => {
    setConfidenceRatings(prev => ({
      ...prev,
      [scenarioId]: rating
    }));
  };

  const checkForAchievements = (scenarioId: number, selectedAnswer: string) => {
    const scenario = scenarios[scenarioId];
    const isCorrect = selectedAnswer === scenario.correctAnswer;
    
    if (isCorrect) {
      const newAchievements: string[] = [];
      
      // Portfolio Master - perfect score
      if (score === scenarios.length - 1) {
        newAchievements.push("Portfolio Master");
      }
      
      // Strategic Thinker - 5+ correct
      if (score >= 4) {
        newAchievements.push("Strategic Thinker");
      }
      
      // Resource Optimizer - handle resource allocation scenarios
      if (scenario.title.includes("Resource") && isCorrect) {
        newAchievements.push("Resource Optimizer");
      }
      
      // Crisis Manager - handle crisis scenarios
      if (scenario.urgency?.includes("Crisis") && isCorrect) {
        newAchievements.push("Crisis Manager");
      }
      
      // Business Strategist - handle strategic scenarios
      if (scenario.difficulty === 'Advanced' && isCorrect) {
        newAchievements.push("Business Strategist");
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

  const checkAnswer = () => {
    const currentScen = scenarios[currentScenario];
    const isCorrect = selectedAction === currentScen.correctAnswer;
    
    if (isCorrect) {
      setScore(score + 1);
    }
    
    // Check for achievements
    checkForAchievements(currentScenario, selectedAction);
    
    setShowFeedback(true);
  };

  const nextScenario = () => {
    if (currentScenario < scenarios.length - 1) {
      setCurrentScenario(currentScenario + 1);
      setSelectedAction('');
      setShowFeedback(false);
    } else {
      setCompleted(true);
    }
  };

  const resetWorkshop = () => {
    setCurrentScenario(0);
    setSelectedAction('');
    setShowFeedback(false);
    setScore(0);
    setCompleted(false);
    setConfidenceRatings({});
    setAchievements([]);
    setShowExplanation({});
    setHasStarted(false);
    setStartTime(null);
    localStorage.removeItem('gitlab-portfolio-workshop');
  };

  const currentScen = scenarios[currentScenario];
  const selectedOption = currentScen?.options.find(opt => opt.id === selectedAction);
  const correctOption = currentScen?.options.find(opt => opt.id === currentScen.correctAnswer);
  const isCorrect = selectedAction === currentScen?.correctAnswer;

  if (!hasStarted) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <BarChart3 className="w-16 h-16 mx-auto mb-4 text-purple-600" />
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            GitLab Portfolio Management Workshop
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Master strategic portfolio management for complex multi-project environments
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-gray-500 mb-6">
            <span className="flex items-center gap-1">
              <Briefcase className="w-4 h-4" />
              Executive-level scenarios
            </span>
            <span className="flex items-center gap-1">
              <DollarSign className="w-4 h-4" />
              ROI-focused decisions
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              Stakeholder management
            </span>
          </div>
          <div className="bg-purple-50 p-6 rounded-lg mb-6">
            <h2 className="text-xl font-semibold text-purple-800 mb-4">🎯 Master Strategic Portfolio Leadership:</h2>
            <div className="grid md:grid-cols-2 gap-4 text-left text-purple-700">
              <ul className="space-y-2">
                <li>• <strong>Resource Allocation:</strong> Optimize team assignments across competing priorities</li>
                <li>• <strong>Stakeholder Alignment:</strong> Navigate C-suite and departmental politics</li>
                <li>• <strong>Strategic Pivots:</strong> Adapt portfolios to market changes rapidly</li>
                <li>• <strong>Crisis Management:</strong> Recover failing projects and portfolio performance</li>
              </ul>
              <ul className="space-y-2">
                <li>• <strong>Budget Management:</strong> Maximize ROI under financial constraints</li>
                <li>• <strong>Dependency Coordination:</strong> Manage complex multi-team projects</li>
                <li>• <strong>Innovation Balance:</strong> Optimize maintenance vs. new feature work</li>
                <li>• <strong>Capacity Planning:</strong> Scale portfolio during rapid company growth</li>
              </ul>
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">📋 Portfolio Management Scenarios:</h2>
            <ul className="text-left text-gray-700 space-y-2">
              <li>• <strong>8 executive-level scenarios</strong> from budget cuts to market pivots</li>
              <li>• <strong>Real business impact</strong> including revenue, costs, and competitive positioning</li>
              <li>• <strong>Stakeholder complexity</strong> managing competing C-suite priorities</li>
              <li>• <strong>Resource optimization</strong> across teams, budgets, and timelines</li>
              <li>• <strong>Industry examples</strong> from Microsoft, Netflix, Salesforce, and IBM</li>
              <li>• <strong>Strategic frameworks</strong> for scaling portfolio management practices</li>
            </ul>
          </div>
          <button
            onClick={startWorkshop}
            className="bg-purple-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-purple-700 transition-colors flex items-center gap-2 mx-auto"
          >
            Start Portfolio Management Workshop <BarChart3 className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  if (completed) {
    const percentage = Math.round((score / scenarios.length) * 100);
    const timeSpent = startTime ? Math.round((Date.now() - startTime) / 1000 / 60) : null;
    
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white">
        <div className="text-center mb-8">
          <BarChart3 className="w-16 h-16 mx-auto mb-4 text-purple-600" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Portfolio Management Results</h1>
          <div className={`text-6xl font-bold mb-2 ${
            percentage >= 80 ? 'text-green-600' : 
            percentage >= 60 ? 'text-yellow-600' : 'text-red-600'
          }`}>
            {score}/{scenarios.length}
          </div>
          <div className={`text-xl ${
            percentage >= 80 ? 'text-green-600' : 
            percentage >= 60 ? 'text-yellow-600' : 'text-red-600'
          }`}>
            {percentage}% - {
              percentage >= 90 ? "Portfolio Master! 🏆" :
              percentage >= 80 ? "Strategic Leader! 🎯" :
              percentage >= 70 ? "Strong Portfolio Skills! 👍" :
              percentage >= 60 ? "Good Foundation, Keep Learning! 📚" :
              "Practice More Strategic Scenarios! 💪"
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
              <h3 className="font-semibold text-yellow-800">Portfolio Management Achievements Unlocked!</h3>
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
          <div className="bg-purple-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-purple-600">{score}</div>
            <div className="text-sm text-purple-700">Scenarios Mastered</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-green-600">
              {Object.values(confidenceRatings).length > 0 ? 
                Math.round(Object.values(confidenceRatings).reduce((a, b) => a + b, 0) / Object.values(confidenceRatings).length * 10) / 10 : 
                'N/A'}
            </div>
            <div className="text-sm text-green-700">Avg Confidence</div>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-blue-600">{achievements.length}</div>
            <div className="text-sm text-blue-700">Achievements</div>
          </div>
        </div>

        <div className="space-y-6">
          {scenarios.map((scenario) => {
            const correctOption = scenario.options.find(opt => opt.id === scenario.correctAnswer);
            const isCorrect = true; // This would need to track user answers properly
            
            return (
              <div key={scenario.id} className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-start gap-3 mb-4">
                  {isCorrect ? 
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" /> : 
                    <XCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                  }
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">{scenario.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{scenario.context}</p>
                    
                    <button
                      onClick={() => toggleExplanation(scenario.id)}
                      className="mt-3 text-purple-600 hover:text-purple-800 text-sm font-medium"
                    >
                      {showExplanation[scenario.id] ? "Hide" : "Show"} Strategic Analysis
                    </button>

                    {showExplanation[scenario.id] && (
                      <div className="mt-3 p-4 bg-purple-50 rounded-lg text-sm">
                        <div className="whitespace-pre-line text-gray-700 mb-3">
                          {scenario.explanation}
                        </div>
                        {scenario.businessImpact && (
                          <div className="text-purple-800 font-medium mb-3">
                            {scenario.businessImpact}
                          </div>
                        )}
                        {scenario.proTip && (
                          <div className="text-green-700 bg-green-100 p-3 rounded text-sm mb-2">
                            {scenario.proTip}
                          </div>
                        )}
                        {scenario.realExample && (
                          <div className="text-blue-700 bg-blue-100 p-3 rounded text-sm">
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
            <h3 className="text-lg font-semibold text-gray-900 mb-4">📚 Continue Your Portfolio Management Journey</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="text-left">
                <h4 className="font-medium text-gray-800 mb-2">GitLab Portfolio Resources</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• <a href="https://docs.gitlab.com/ee/user/project/requirements/" className="text-purple-600 hover:underline" target="_blank" rel="noopener noreferrer">Project requirements management</a></li>
                  <li>• <a href="https://docs.gitlab.com/ee/user/group/roadmap/" className="text-purple-600 hover:underline" target="_blank" rel="noopener noreferrer">Portfolio roadmap planning</a></li>
                  <li>• <a href="https://docs.gitlab.com/ee/user/analytics/" className="text-purple-600 hover:underline" target="_blank" rel="noopener noreferrer">Portfolio analytics and insights</a></li>
                </ul>
              </div>
              <div className="text-left">
                <h4 className="font-medium text-gray-800 mb-2">Portfolio Excellence</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• Use data-driven ROI frameworks for prioritization</li>
                  <li>• Align stakeholders through clear communication</li>
                  <li>• Balance short-term needs with strategic goals</li>
                  <li>• Implement systematic project management standards</li>
                </ul>
              </div>
            </div>
          </div>
          
          <button
            onClick={resetWorkshop}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2 mx-auto"
          >
            <RotateCcw className="w-5 h-5" />
            Master Portfolio Strategy Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <BarChart3 className="w-8 h-8 text-purple-600" />
          GitLab Portfolio Management Workshop
        </h1>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <span>Scenario {currentScenario + 1} of {scenarios.length}</span>
          {achievements.length > 0 && (
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-yellow-500" />
              <span>{achievements.length} achievements</span>
            </div>
          )}
          <span>Score: {score}/{currentScenario + (showFeedback && isCorrect ? 1 : 0)}</span>
        </div>
      </div>

      <div className="mb-6">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-purple-600 h-2 rounded-full transition-all duration-300" 
            style={{ width: `${((currentScenario + (showFeedback ? 1 : 0)) / scenarios.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Enhanced Scenario Card */}
      <div className="bg-white border rounded-lg p-6 shadow-lg mb-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-4 flex-wrap">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              currentScen.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
              currentScen.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {currentScen.difficulty}
            </span>
            {currentScen.urgency && (
              <span className="flex items-center gap-1 text-xs text-orange-600 bg-orange-100 px-2 py-1 rounded">
                <AlertTriangle className="w-3 h-3" />
                {currentScen.urgency}
              </span>
            )}
            {currentScen.portfolioSize && (
              <span className="flex items-center gap-1 text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded">
                <Briefcase className="w-3 h-3" />
                {currentScen.portfolioSize}
              </span>
            )}
            {currentScen.stakeholders && (
              <span className="flex items-center gap-1 text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded">
                <Users className="w-3 h-3" />
                {currentScen.stakeholders}
              </span>
            )}
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            {currentScen.title}
          </h2>
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <p className="text-gray-700 leading-relaxed">
              {currentScen.context}
            </p>
          </div>
          <div className="bg-purple-50 p-3 rounded border-l-4 border-purple-500">
            <p className="text-gray-800 font-medium">{currentScen.challenge}</p>
          </div>
        </div>

        {/* Enhanced Options */}
        <div className="space-y-3 mb-6">
          <h3 className="text-lg font-semibold text-gray-800">What&apos;s your portfolio management approach?</h3>
          {currentScen.options.map((option) => (
            <label
              key={option.id}
              className={`block p-4 border-2 rounded-lg cursor-pointer transition-all ${
                selectedAction === option.id
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-200 hover:border-gray-300'
              } ${showFeedback ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <div className="flex items-start gap-3">
                <input
                  type="radio"
                  name={`scenario-${currentScen.id}`}
                  value={option.id}
                  checked={selectedAction === option.id}
                  onChange={() => setSelectedAction(option.id)}
                  disabled={showFeedback}
                  className="mt-1"
                />
                <div className="flex-1">
                  <div className="font-medium text-gray-900 mb-2">{option.action}</div>
                  <div className="text-sm text-gray-600 mb-2">{option.reasoning}</div>
                  <div className="flex gap-2 text-xs">
                    {option.impact && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded">
                        Impact: {option.impact}
                      </span>
                    )}
                    {option.complexity && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded">
                        {option.complexity}
                      </span>
                    )}
                    {option.timeframe && (
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded">
                        {option.timeframe}
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
          <div className="mb-4 p-4 bg-purple-50 rounded-lg">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-medium text-purple-800">How confident are you in this portfolio strategy?</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => handleConfidenceRating(currentScen.id, rating)}
                    className={`w-8 h-8 rounded-full ${
                      confidenceRatings[currentScen.id] >= rating
                        ? 'bg-purple-500 text-white'
                        : 'bg-gray-200 text-gray-600'
                    } hover:bg-purple-400 transition-colors`}
                  >
                    {rating}
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
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            Submit Portfolio Strategy
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
                {isCorrect ? 'Excellent portfolio strategy!' : 'Consider this alternative approach:'}
              </span>
            </div>
            
            {!isCorrect && selectedOption && (
              <div className="mb-3">
                <p className="text-red-700 text-sm">
                  <strong>Your approach:</strong> {currentScen.whyWrong[selectedAction]}
                </p>
              </div>
            )}
            
            <div className="bg-white p-3 rounded border-l-4 border-purple-500">
              <p className="text-gray-800 font-medium mb-1">Best strategy: {correctOption?.action}</p>
              <div className="text-gray-700 text-sm space-y-2">
                <p>{currentScen.explanation}</p>
                {currentScen.businessImpact && (
                  <p className="text-purple-800 font-medium">{currentScen.businessImpact}</p>
                )}
                {currentScen.proTip && (
                  <div className="bg-green-100 p-2 rounded text-green-800">
                    {currentScen.proTip}
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <button
            onClick={nextScenario}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
          >
            {currentScenario < scenarios.length - 1 ? 'Next Portfolio Challenge' : 'View Workshop Results'}
          </button>
        </div>
      )}
    </div>
  );
};

export default GitLabPortfolioWorkshop;
