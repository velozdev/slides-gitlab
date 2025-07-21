'use client';
import React, { useState, useEffect } from 'react';
import { Rocket, CheckCircle, XCircle, Users, RotateCcw, AlertTriangle, Star, Award, Clock, TrendingUp, Zap, Target, GitBranch, Shield } from 'lucide-react';

interface QuestionOption {
  id: string;
  action: string;
  reasoning: string;
  riskLevel?: string;
  complexity?: string;
  deploymentType?: string;
}

interface Question {
  id: number;
  scenario: string;
  difficulty?: string;
  urgency?: string;
  teamSize?: string;
  releaseType?: string;
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

const GitLabReleaseQuiz = () => {
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
    const savedProgress = localStorage.getItem('gitlab-release-quiz');
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
      localStorage.setItem('gitlab-release-quiz', JSON.stringify(progressData));
    }
  }, [score, confidenceRatings, achievements, hasStarted]);

  const questions: Question[] = [
    {
      id: 1,
      scenario: "Black Friday Feature Launch Crisis",
      difficulty: "Advanced",
      urgency: "Critical - Revenue Impact",
      teamSize: "Cross-functional (12 people)",
      releaseType: "Major Feature Release",
      context: "Your e-commerce platform is launching a new 'AI Shopping Assistant' feature on Black Friday morning (6 AM EST). The feature took 4 months to develop and is expected to drive 25% revenue increase ($2M additional revenue). Load testing shows it handles expected traffic, but you discover a memory leak in production that affects 5% of user sessions after 15 minutes. Black Friday starts in 8 hours.",
      situation: "Critical production issue discovered hours before major revenue-driving feature launch.",
      options: [
        {
          id: 'a',
          action: "Deploy with feature flag set to 0% rollout, monitor metrics, then gradually enable",
          reasoning: "Use feature flags for controlled rollout with immediate rollback capability",
          riskLevel: "Low",
          complexity: "Strategic",
          deploymentType: "Progressive"
        },
        {
          id: 'b',
          action: "Delay the launch 24 hours to fix the memory leak and re-test thoroughly",
          reasoning: "Prioritize stability over timeline to prevent customer experience issues",
          riskLevel: "Medium",
          complexity: "Conservative",
          deploymentType: "Delayed"
        },
        {
          id: 'c',
          action: "Deploy the feature with automatic session restart every 10 minutes as temporary fix",
          reasoning: "Launch on schedule with workaround to prevent memory leak impact",
          riskLevel: "High",
          complexity: "Workaround",
          deploymentType: "Risk Mitigation"
        },
        {
          id: 'd',
          action: "Deploy to 25% of users immediately and monitor for 2 hours before full rollout",
          reasoning: "Partial deployment to validate production behavior before full exposure",
          riskLevel: "Medium",
          complexity: "Partial",
          deploymentType: "Canary"
        }
      ],
      correctAnswer: 'a',
      explanation: "✅ **Correct: Feature flag with 0% rollout** - This provides maximum control during the critical Black Friday period. You can deploy the code safely, monitor all systems, and gradually enable the feature based on real performance data.",
      impact: "💰 **Real Impact**: Feature flag deployments reduce production incident risk by 85% and enable 5-minute rollbacks versus 30-minute traditional deployments. For Black Friday, this difference can mean $50K-100K in prevented revenue loss.",
      proTip: "🚀 **Pro Tip**: Always deploy high-impact features with feature flags 24-48 hours before activation. This separates deployment risk from feature risk and enables instant rollbacks.",
      realExample: "🛒 **Real Example**: Amazon deploys thousands of features with feature flags during Prime Day, achieving 99.99% uptime while enabling real-time feature control based on metrics.",
      whyWrong: {
        'a': "",
        'b': "Missing Black Friday window costs $2M in projected revenue and 6 months of competitive advantage. The memory leak affects only 5% of sessions and may be manageable.",
        'c': "Session restarts create poor user experience during peak shopping time, potentially losing customers to competitors and damaging brand reputation.",
        'd': "25% exposure without ability to quickly disable creates significant blast radius if issues compound under Black Friday traffic loads."
      }
    },
    {
      id: 2,
      scenario: "Database Migration Release Coordination",
      difficulty: "Advanced",
      urgency: "Infrastructure Change",
      teamSize: "Backend + DevOps (8 people)",
      releaseType: "Infrastructure Migration",
      context: "Your team is migrating from PostgreSQL 12 to PostgreSQL 15 to improve performance by 40% and unlock new JSON features for the product team. The migration affects 500GB of production data, requires 2-hour maintenance window, and must coordinate with a mobile app release that depends on the new database features. Customer support is scheduled to handle expected user questions.",
      situation: "Complex database migration requiring coordination across multiple teams and systems.",
      options: [
        {
          id: 'a',
          action: "Schedule migration during lowest traffic period (3-5 AM Sunday) with full team on standby",
          reasoning: "Minimize user impact during traditional maintenance window with complete team support",
          riskLevel: "Medium",
          complexity: "Coordinated",
          deploymentType: "Maintenance Window"
        },
        {
          id: 'b',
          action: "Use blue-green deployment with database replication to enable zero-downtime migration",
          reasoning: "Eliminate downtime through parallel infrastructure and traffic switching",
          riskLevel: "Low",
          complexity: "Advanced",
          deploymentType: "Zero-Downtime"
        },
        {
          id: 'c',
          action: "Split migration into 3 phases over consecutive weekends to reduce risk",
          reasoning: "Gradual migration reduces complexity and risk of each individual change",
          riskLevel: "Low",
          complexity: "Phased",
          deploymentType: "Incremental"
        },
        {
          id: 'd',
          action: "Migrate during business hours with rolling restarts to minimize perceived downtime",
          reasoning: "Spread impact across time to avoid concentrated user disruption",
          riskLevel: "High",
          complexity: "Disruptive",
          deploymentType: "Rolling"
        }
      ],
      correctAnswer: 'b',
      explanation: "✅ **Correct: Blue-green deployment with replication** - Database migrations are perfect candidates for blue-green deployments. This approach eliminates downtime, enables instant rollback, and provides the safest path for infrastructure changes.",
      impact: "⚡ **Real Impact**: Zero-downtime migrations prevent $10K-50K revenue loss per hour of downtime and maintain customer trust. Blue-green deployments reduce rollback time from hours to seconds.",
      proTip: "🔄 **Pro Tip**: Always test blue-green database migrations with production-size data in staging. Include data consistency verification and automated rollback triggers.",
      realExample: "🏦 **Real Example**: Netflix performs hundreds of database migrations annually using blue-green deployments, achieving 99.99% availability even during major infrastructure changes.",
      whyWrong: {
        'a': "Maintenance windows create customer disruption and revenue loss. With blue-green options available, planned downtime is increasingly unacceptable for modern applications.",
        'b': "",
        'c': "Phased migration increases overall project complexity and timeline. For database upgrades, atomic changes are often safer than prolonged transition periods.",
        'd': "Business hours migrations create maximum user impact and support burden. Rolling restarts don't address the fundamental need for database consistency during migration."
      }
    },
    {
      id: 3,
      scenario: "Mobile App Store Coordination Challenge",
      difficulty: "Intermediate",
      urgency: "Multi-Platform Release",
      teamSize: "Mobile + Backend + QA (10 people)",
      releaseType: "Coordinated Release",
      context: "Your team has a coordinated release: new mobile app version (iOS/Android) with backend API changes. The mobile app enables a new subscription tier ($99/month premium features), but the backend API must be deployed first to support the new endpoints. iOS review takes 2-7 days, Android review takes 1-2 days. Marketing campaign launches Monday targeting $500K Q1 revenue from premium subscriptions.",
      situation: "Multi-platform release requiring precise timing coordination between app stores and backend systems.",
      options: [
        {
          id: 'a',
          action: "Deploy backend APIs immediately, submit mobile apps, and enable features when apps are approved",
          reasoning: "Deploy backend first to ensure API availability when mobile apps go live",
          riskLevel: "Low",
          complexity: "Sequential",
          deploymentType: "Backend-First"
        },
        {
          id: 'b',
          action: "Submit mobile apps immediately, deploy backend with feature flags disabled until apps are approved",
          reasoning: "Start longest-lead-time process first, enable features when all components ready",
          riskLevel: "Low",
          complexity: "Coordinated",
          deploymentType: "Feature-Flag Coordination"
        },
        {
          id: 'c',
          action: "Wait until Monday to submit everything simultaneously for synchronized launch",
          reasoning: "Ensure perfect timing alignment with marketing campaign launch",
          riskLevel: "High",
          complexity: "Risky",
          deploymentType: "Synchronized"
        },
        {
          id: 'd',
          action: "Deploy backend and mobile apps independently, enable premium features gradually as apps get approved",
          reasoning: "Decouple deployments to reduce coordination complexity",
          riskLevel: "Medium",
          complexity: "Independent",
          deploymentType: "Gradual Rollout"
        }
      ],
      correctAnswer: 'b',
      explanation: "✅ **Correct: Submit apps first, deploy backend with feature flags** - App store review is the longest and most unpredictable part of mobile releases. Feature flags allow perfect timing coordination regardless of approval delays.",
      impact: "📱 **Real Impact**: Proper mobile release coordination prevents 2-7 day revenue delays worth $15K-50K for subscription launches. Feature flags eliminate the risk of deploying backend changes before mobile apps are available.",
      proTip: "📅 **Pro Tip**: Always submit mobile apps 7-10 days before planned launch. Use feature flags for new APIs so you can enable features the moment apps are approved across all platforms.",
      realExample: "🎵 **Real Example**: Spotify coordinates global feature launches across iOS, Android, and web using feature flags, ensuring simultaneous availability regardless of app store review times.",
      whyWrong: {
        'a': "Deploying backend APIs immediately exposes new endpoints before mobile apps can use them, creating potential security and versioning issues.",
        'b': "",
        'c': "Waiting until Monday creates unnecessary time pressure and reduces control over app store review timing, risking marketing campaign alignment.",
        'd': "Independent deployments without coordination can create API version mismatches and inconsistent user experiences across platforms."
      }
    },
    {
      id: 4,
      scenario: "Production Hotfix During Major Release",
      difficulty: "Advanced",
      urgency: "Emergency + Planned Release",
      teamSize: "Full engineering team (15 people)",
      releaseType: "Emergency Hotfix",
      context: "You're 2 hours into deploying a major quarterly release (Q4 feature suite) when a critical security vulnerability is discovered in the payment processing system. The vulnerability could expose credit card data and affects 20% of transactions. The quarterly release is 60% deployed across your microservices architecture. Stopping mid-deployment would leave the system in an inconsistent state.",
      situation: "Critical security hotfix needed during active deployment of major planned release.",
      options: [
        {
          id: 'a',
          action: "Halt quarterly deployment, rollback completed services, deploy security fix, then resume quarterly deployment",
          reasoning: "Prioritize security with clean rollback to known good state before applying fix",
          riskLevel: "Medium",
          complexity: "Sequential",
          deploymentType: "Full Rollback"
        },
        {
          id: 'b',
          action: "Complete quarterly deployment first, then immediately deploy security hotfix to final state",
          reasoning: "Avoid system inconsistency by finishing planned deployment before emergency fix",
          riskLevel: "High",
          complexity: "Continue-Then-Fix",
          deploymentType: "Complete-First"
        },
        {
          id: 'c',
          action: "Create emergency branch with security fix on current quarterly code, deploy hotfix to partially deployed services",
          reasoning: "Apply security fix to current mixed state without disrupting ongoing deployment",
          riskLevel: "High",
          complexity: "Emergency Branch",
          deploymentType: "Parallel Fix"
        },
        {
          id: 'd',
          action: "Immediately disable payment processing, complete quarterly deployment, then fix and re-enable payments",
          reasoning: "Eliminate security risk immediately while maintaining deployment consistency",
          riskLevel: "Medium",
          complexity: "Feature Disable",
          deploymentType: "Circuit Breaker"
        }
      ],
      correctAnswer: 'd',
      explanation: "✅ **Correct: Disable payments, complete deployment, then fix** - This immediately eliminates security risk while avoiding the complexity of mid-deployment rollbacks. Circuit breaker pattern provides instant risk mitigation.",
      impact: "🛡️ **Real Impact**: Immediate feature disabling prevents data breaches worth millions in fines and reputation damage. Clean deployment completion avoids system inconsistency that causes 60% of post-deployment incidents.",
      proTip: "⚡ **Pro Tip**: Build circuit breakers for critical features like payments. This enables instant risk mitigation without complex deployment rollbacks during emergencies.",
      realExample: "💳 **Real Example**: Stripe uses circuit breakers for payment processing and can disable payment routes in under 30 seconds globally, preventing security exposure during incidents.",
      whyWrong: {
        'a': "Mid-deployment rollbacks are complex and error-prone. The time spent rolling back extends vulnerability exposure and may introduce new inconsistencies.",
        'b': "Continuing deployment with known security vulnerability violates compliance requirements and exposes customer data unnecessarily.",
        'c': "Deploying to mixed-state services creates unpredictable interactions and makes testing the security fix nearly impossible.",
        'd': ""
      }
    },
    {
      id: 5,
      scenario: "Multi-Region Global Rollout Strategy",
      difficulty: "Advanced",
      urgency: "Global Expansion",
      teamSize: "International teams (20+ people)",
      releaseType: "Global Rollout",
      context: "Your SaaS platform is expanding globally with data residency compliance requirements. The new 'AI Content Moderator' feature must comply with GDPR (Europe), CCPA (California), and local data laws. You have regions: US-East, EU-West, APAC-Singapore. Each region has different peak hours, compliance requirements, and customer bases. The feature processes user-generated content and affects 2M+ daily active users globally.",
      situation: "Global feature rollout requiring compliance coordination across multiple regions and time zones.",
      options: [
        {
          id: 'a',
          action: "Deploy to US-East first (lowest risk), then EU-West after 24 hours, then APAC after another 24 hours",
          reasoning: "Sequential regional rollout allows validation and fixes before next region",
          riskLevel: "Low",
          complexity: "Sequential",
          deploymentType: "Region-by-Region"
        },
        {
          id: 'b',
          action: "Deploy to all regions simultaneously during their respective off-peak hours",
          reasoning: "Minimize user impact by timing deployments optimally for each region",
          riskLevel: "Medium",
          complexity: "Coordinated",
          deploymentType: "Follow-the-Sun"
        },
        {
          id: 'c',
          action: "Deploy to EU-West first for strictest compliance validation, then other regions if successful",
          reasoning: "Start with most restrictive regulatory environment to ensure global compliance",
          riskLevel: "Low",
          complexity: "Compliance-First",
          deploymentType: "Strictest-First"
        },
        {
          id: 'd',
          action: "Deploy to 10% of users in each region simultaneously, gradually increase based on metrics",
          reasoning: "Distribute risk across regions while maintaining controlled exposure",
          riskLevel: "Low",
          complexity: "Distributed",
          deploymentType: "Global Canary"
        }
      ],
      correctAnswer: 'd',
      explanation: "✅ **Correct: Global canary deployment** - This approach distributes risk across all regions while maintaining low exposure. Regional canaries allow you to validate compliance, performance, and user experience simultaneously across different regulatory environments.",
      impact: "🌍 **Real Impact**: Global canary deployments reduce region-specific issues by 70% and enable rapid rollback across all regions. This prevents compliance violations that can cost $4M+ per region in GDPR fines.",
      proTip: "📊 **Pro Tip**: Use region-specific feature flags with automated compliance monitoring. Set up alerts for data residency violations and automated rollbacks for compliance failures.",
      realExample: "☁️ **Real Example**: Microsoft Azure deploys global features using regional canaries with automated compliance checking, achieving 99.9% global availability while maintaining regulatory compliance.",
      whyWrong: {
        'a': "Sequential deployment delays global feature availability by days and creates competitive disadvantage in fast-moving regions like APAC.",
        'b': "Simultaneous full deployment across regions increases blast radius for compliance or performance issues, potentially affecting all global users.",
        'c': "EU-first approach delays feature availability in primary revenue regions and may not validate region-specific technical challenges in US/APAC infrastructure.",
        'd': ""
      }
    },
    {
      id: 6,
      scenario: "Third-Party Integration Release Risk",
      difficulty: "Intermediate",
      urgency: "External Dependency",
      teamSize: "Integration team (6 people)",
      releaseType: "Integration Release",
      context: "Your e-commerce platform is integrating with Shopify's new GraphQL API to enable real-time inventory sync for 5,000+ merchants. The integration replaces the deprecated REST API (sunset in 30 days). During final testing, you discover Shopify's API has rate limiting that's more restrictive than documented, potentially causing sync delays for large merchants (1000+ products). This affects your top 50 enterprise customers generating 60% of revenue.",
      situation: "Critical third-party integration with undocumented limitations affecting key customers.",
      options: [
        {
          id: 'a',
          action: "Deploy with intelligent batching to work within rate limits, monitor performance closely",
          reasoning: "Implement technical solution to work within discovered constraints",
          riskLevel: "Medium",
          complexity: "Adaptive",
          deploymentType: "Rate-Limited Rollout"
        },
        {
          id: 'b',
          action: "Contact Shopify for enterprise rate limit increase before deploying integration",
          reasoning: "Resolve limitation at source before affecting customer experience",
          riskLevel: "Low",
          complexity: "Partnership",
          deploymentType: "Vendor Coordination"
        },
        {
          id: 'c',
          action: "Deploy to small merchants first (under 100 products), then gradually increase merchant size",
          reasoning: "Start with merchants least affected by rate limits, scale up gradually",
          riskLevel: "Low",
          complexity: "Segmented",
          deploymentType: "Merchant-Size Rollout"
        },
        {
          id: 'd',
          action: "Build hybrid solution using both REST (for large merchants) and GraphQL (for small merchants) temporarily",
          reasoning: "Maintain performance for enterprise customers while transitioning smaller merchants",
          riskLevel: "High",
          complexity: "Dual-System",
          deploymentType: "Hybrid Integration"
        }
      ],
      correctAnswer: 'c',
      explanation: "✅ **Correct: Merchant-size segmented rollout** - This protects your most valuable customers (large merchants) while proving the integration works for smaller merchants first. You can gather data on actual rate limit impact before affecting enterprise revenue.",
      impact: "💼 **Real Impact**: Segmented rollouts based on customer value protect 80% of revenue while validating integration performance. Enterprise customer churn costs 10x more than small merchant acquisition.",
      proTip: "🤝 **Pro Tip**: Always segment rollouts by customer value/size for third-party integrations. Enterprise customers should be last in rollouts but first in communication about potential impacts.",
      realExample: "🛍️ **Real Example**: BigCommerce uses merchant-size segmentation for all third-party integrations, protecting enterprise customers while validating new features with smaller merchants first.",
      whyWrong: {
        'a': "Deploying with known performance issues to enterprise customers risks losing your highest-value merchants to competitors.",
        'b': "Waiting for vendor changes delays migration past the 30-day REST API sunset, potentially breaking existing functionality.",
        'c': "",
        'd': "Maintaining dual systems increases complexity and technical debt. The REST API sunset in 30 days makes this solution temporary and expensive."
      }
    },
    {
      id: 7,
      scenario: "Regulatory Compliance Deadline Pressure",
      difficulty: "Advanced",
      urgency: "Legal Compliance",
      teamSize: "Compliance + Engineering (12 people)",
      releaseType: "Compliance Release",
      context: "New financial regulations require additional user identity verification for transactions over $1,000. The deadline is in 5 days, with $50K daily fines for non-compliance. Your verification system is 95% complete but lacks edge case handling for international users (15% of your user base). Full testing would take 2 more weeks, but you can deploy with basic international support and enhanced monitoring.",
      situation: "Regulatory deadline with incomplete feature that affects significant user segment.",
      options: [
        {
          id: 'a',
          action: "Deploy basic international support, monitor closely, and iterate quickly on edge cases",
          reasoning: "Meet compliance deadline with functional solution, improve rapidly based on real usage",
          riskLevel: "Medium",
          complexity: "Iterative",
          deploymentType: "Minimum Viable Compliance"
        },
        {
          id: 'b',
          action: "Temporarily restrict international users from high-value transactions until verification is complete",
          reasoning: "Ensure compliance while avoiding partially-functional features",
          riskLevel: "High",
          complexity: "Restrictive",
          deploymentType: "Feature Restriction"
        },
        {
          id: 'c',
          action: "Request regulatory extension citing technical complexity and user impact assessment",
          reasoning: "Negotiate more time to implement proper solution that serves all users",
          riskLevel: "High",
          complexity: "Legal",
          deploymentType: "Deadline Extension"
        },
        {
          id: 'd',
          action: "Deploy full verification for domestic users, manual review process for international users",
          reasoning: "Automated solution for majority, manual backup for edge cases",
          riskLevel: "Low",
          complexity: "Hybrid",
          deploymentType: "Automated + Manual"
        }
      ],
      correctAnswer: 'd',
      explanation: "✅ **Correct: Automated for domestic, manual for international** - This ensures 100% compliance coverage while maintaining good user experience for the majority. Manual review provides safety net for edge cases without blocking international users.",
      impact: "⚖️ **Real Impact**: Hybrid compliance solutions prevent $50K daily fines while maintaining customer experience. Manual review scales temporarily while automated solutions are perfected, preventing customer churn.",
      proTip: "📋 **Pro Tip**: For compliance deadlines, always have manual backup processes. Automated + manual hybrid solutions provide 100% coverage while you iterate on edge cases.",
      realExample: "🏛️ **Real Example**: Coinbase uses automated KYC for standard cases with manual review for complex international compliance, maintaining regulatory compliance while serving global customers.",
      whyWrong: {
        'a': "Deploying incomplete international support risks compliance violations for 15% of users, potentially triggering regulatory scrutiny and fines.",
        'b': "Restricting international users damages customer relationships and revenue from a significant user segment (15% of base).",
        'c': "Regulatory extensions are rarely granted close to deadlines and $50K daily fines start immediately if request is denied.",
        'd': ""
      }
    },
    {
      id: 8,
      scenario: "Performance Regression Discovery",
      difficulty: "Intermediate",
      urgency: "Performance Impact",
      teamSize: "Backend + DevOps (8 people)",
      releaseType: "Performance Fix",
      context: "Your quarterly performance optimization release is deployed to production. Initial metrics look good, but after 6 hours, you notice API response times have increased 40% for search queries (affecting 70% of user interactions). The performance regression only appears under production load patterns that weren't replicated in staging. Reverting would lose 3 months of other performance improvements.",
      situation: "Performance regression discovered post-deployment that affects majority of user interactions.",
      options: [
        {
          id: 'a',
          action: "Immediately revert the entire release to restore search performance",
          reasoning: "Prioritize user experience by eliminating performance regression quickly",
          riskLevel: "Medium",
          complexity: "Full Rollback",
          deploymentType: "Complete Revert"
        },
        {
          id: 'b',
          action: "Identify and revert only the search optimization components while keeping other improvements",
          reasoning: "Surgical rollback to fix regression while preserving other performance gains",
          riskLevel: "Low",
          complexity: "Selective",
          deploymentType: "Partial Rollback"
        },
        {
          id: 'c',
          action: "Deploy emergency hotfix to add caching layer for search queries while investigating root cause",
          reasoning: "Quick performance fix without losing optimization work",
          riskLevel: "Medium",
          complexity: "Compensating",
          deploymentType: "Performance Patch"
        },
        {
          id: 'd',
          action: "Scale up search infrastructure temporarily while developing proper fix",
          reasoning: "Infrastructure solution to handle performance regression while fixing properly",
          riskLevel: "High",
          complexity: "Infrastructure",
          deploymentType: "Scale-Up Mitigation"
        }
      ],
      correctAnswer: 'b',
      explanation: "✅ **Correct: Selective rollback of search components** - This approach fixes the user-facing performance issue while preserving 3 months of other optimization work. Surgical rollbacks minimize waste while addressing the specific problem.",
      impact: "🚀 **Real Impact**: Selective rollbacks preserve 90% of release value while fixing specific issues. Full rollbacks waste months of development work and delay performance improvements that benefit users.",
      proTip: "🔧 **Pro Tip**: Structure releases with independent deployment units so you can rollback specific components. Use feature flags to enable surgical rollbacks without full deployment reversals.",
      realExample: "⚡ **Real Example**: LinkedIn uses modular deployments with component-level rollbacks, allowing them to fix specific performance issues while preserving other platform improvements.",
      whyWrong: {
        'a': "Full rollback wastes 3 months of performance improvements that benefit users and forces you to restart the entire optimization process.",
        'b': "",
        'c': "Adding caching layers as emergency fixes can create technical debt and may not address the root cause of the performance regression.",
        'd': "Scaling infrastructure is expensive and temporary, costing thousands in compute resources while not actually fixing the underlying performance issue."
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
      
      // Release Master - perfect score
      if (score === questions.length - 1) {
        newAchievements.push("Release Master");
      }
      
      // Deployment Strategist - 3+ correct
      if (score >= 2) {
        newAchievements.push("Deployment Strategist");
      }
      
      // Risk Manager - correctly identify high-risk scenarios
      if (question.options.find(opt => opt.id === selectedAnswer)?.riskLevel === 'Low') {
        newAchievements.push("Risk Manager");
      }
      
      // Speed Demon - complete quickly
      if (startTime && Date.now() - startTime < 480000) { // 8 minutes
        newAchievements.push("Speed Demon");
      }
      
      // Crisis Handler - handle advanced scenarios
      if (question.difficulty === 'Advanced' && isCorrect) {
        newAchievements.push("Crisis Handler");
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
    localStorage.removeItem('gitlab-release-quiz');
  };

  const currentQ = questions[currentQuestion];
  const selectedOption = currentQ?.options.find(opt => opt.id === selectedAction);
  const correctOption = currentQ?.options.find(opt => opt.id === currentQ.correctAnswer);
  const isCorrect = selectedAction === currentQ?.correctAnswer;

  if (!hasStarted) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <Rocket className="w-16 h-16 mx-auto mb-4 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            GitLab Release Planning & Deployment Strategy Mastery
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Master critical release management scenarios that determine project success
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-gray-500 mb-6">
            <span className="flex items-center gap-1">
              <Target className="w-4 h-4" />
              Real deployment scenarios
            </span>
            <span className="flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              Risk management focus
            </span>
            <span className="flex items-center gap-1">
              <Zap className="w-4 h-4" />
              Achievement tracking
            </span>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg mb-6">
            <h2 className="text-xl font-semibold text-blue-800 mb-4">🎯 Master Critical Release Management:</h2>
            <div className="grid md:grid-cols-2 gap-4 text-left text-blue-700">
              <ul className="space-y-2">
                <li>• <strong>Feature Flag Strategy:</strong> Progressive rollouts with instant rollback</li>
                <li>• <strong>Database Migrations:</strong> Zero-downtime deployment techniques</li>
                <li>• <strong>Multi-Platform Coordination:</strong> Mobile app + backend synchronization</li>
                <li>• <strong>Emergency Response:</strong> Hotfixes during active deployments</li>
              </ul>
              <ul className="space-y-2">
                <li>• <strong>Global Rollouts:</strong> Regional compliance and timing</li>
                <li>• <strong>Third-Party Integration:</strong> External dependency management</li>
                <li>• <strong>Regulatory Compliance:</strong> Deadline pressure scenarios</li>
                <li>• <strong>Performance Management:</strong> Regression detection and rollback</li>
              </ul>
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">📋 Release Strategy Challenge Details:</h2>
            <ul className="text-left text-gray-700 space-y-2">
              <li>• <strong>8 high-stakes scenarios</strong> from Black Friday launches to compliance deadlines</li>
              <li>• <strong>Real business impact</strong> including revenue loss prevention and risk mitigation</li>
              <li>• <strong>Deployment strategy</strong> assessment for each release approach</li>
              <li>• <strong>Achievement system</strong> tracking your release management expertise</li>
              <li>• <strong>Industry examples</strong> from companies like Amazon, Netflix, and Stripe</li>
              <li>• <strong>Pro tips</strong> for scaling release processes across growing teams</li>
            </ul>
          </div>
          <button
            onClick={startQuiz}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2 mx-auto"
          >
            Start Release Mastery Challenge <Rocket className="w-5 h-5" />
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
          <Rocket className="w-16 h-16 mx-auto mb-4 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Release Strategy Results</h1>
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
              percentage >= 90 ? "Release Master! 🚀" :
              percentage >= 80 ? "Deployment Expert! 🎯" :
              percentage >= 70 ? "Strong Release Skills! 👍" :
              percentage >= 60 ? "Good Foundation, Keep Learning! 📚" :
              "Practice More Release Scenarios! 💪"
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
              <h3 className="font-semibold text-yellow-800">Release Management Achievements Unlocked!</h3>
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
            <h3 className="text-lg font-semibold text-gray-900 mb-4">📚 Continue Your Release Management Journey</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="text-left">
                <h4 className="font-medium text-gray-800 mb-2">GitLab Release Resources</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• <a href="https://docs.gitlab.com/ee/user/project/releases/" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Release management best practices</a></li>
                  <li>• <a href="https://docs.gitlab.com/ee/operations/feature_flags.html" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Feature flag deployment strategies</a></li>
                  <li>• <a href="https://docs.gitlab.com/ee/user/project/environments/" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Environment management and deployment</a></li>
                </ul>
              </div>
              <div className="text-left">
                <h4 className="font-medium text-gray-800 mb-2">Release Excellence</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• Use feature flags for risk-free deployments</li>
                  <li>• Plan rollback strategies before deployment</li>
                  <li>• Coordinate multi-platform releases carefully</li>
                  <li>• Monitor post-deployment metrics continuously</li>
                </ul>
              </div>
            </div>
          </div>
          
          <button
            onClick={resetQuiz}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 mx-auto"
          >
            <RotateCcw className="w-5 h-5" />
            Master Release Strategy Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Rocket className="w-8 h-8 text-blue-600" />
          GitLab Release Planning & Deployment Strategy
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
          <div className="flex items-center gap-4 flex-wrap">
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
            {currentQ.releaseType && (
              <span className="flex items-center gap-1 text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded">
                <GitBranch className="w-3 h-3" />
                {currentQ.releaseType}
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
          <h3 className="text-lg font-semibold text-gray-800">What&apos;s your deployment strategy?</h3>
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
                  <div className="flex gap-2 flex-wrap">
                    {option.riskLevel && (
                      <span className={`px-2 py-1 text-xs rounded ${
                        option.riskLevel === 'High' ? 'bg-red-100 text-red-700' :
                        option.riskLevel === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        <Shield className="w-3 h-3 inline mr-1" />
                        {option.riskLevel} Risk
                      </span>
                    )}
                    {option.complexity && (
                      <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded">
                        {option.complexity}
                      </span>
                    )}
                    {option.deploymentType && (
                      <span className="px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded">
                        {option.deploymentType}
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
              <span className="text-sm font-medium text-blue-800">How confident are you in this deployment strategy?</span>
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
            Submit Deployment Strategy
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
                {isCorrect ? 'Excellent Deployment Strategy! 🚀' : 'Consider a Different Approach'}
              </span>
            </div>
            
            {!isCorrect && (
              <div className="mb-3">
                <p className="text-red-700 font-medium">Your choice: {selectedOption?.action}</p>
                <p className="text-red-600 text-sm mt-1">
                  {currentQ.whyWrong && currentQ.whyWrong[selectedAction] !== undefined
                    ? currentQ.whyWrong[selectedAction]
                    : "This approach may not be the most effective for this deployment scenario."}
                </p>
              </div>
            )}
            
            <div className="bg-white p-3 rounded border-l-4 border-blue-500">
              <p className="text-gray-800 font-medium mb-1">Best strategy: {correctOption?.action}</p>
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
            {currentQuestion < questions.length - 1 ? 'Next Release Challenge' : 'View Release Results'}
          </button>
        </div>
      )}
    </div>
  );
};

export default GitLabReleaseQuiz;
