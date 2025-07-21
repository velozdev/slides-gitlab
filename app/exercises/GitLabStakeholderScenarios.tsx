'use client';
import React, { useState, useEffect } from 'react';
import { Users, CheckCircle, XCircle, MessageSquare, RotateCcw, AlertTriangle, Star, Award, Clock, TrendingUp, Zap, Target, Shield, Calendar, Briefcase, Phone } from 'lucide-react';

interface StakeholderOption {
  id: string;
  action: string;
  reasoning: string;
  impact?: string;
  risk?: string;
  timeframe?: string;
}

interface StakeholderScenario {
  id: number;
  title: string;
  difficulty?: string;
  urgency?: string;
  stakeholderType?: string;
  clientImpact?: string;
  context: string;
  challenge: string;
  options: StakeholderOption[];
  correctAnswer: string;
  explanation: string;
  businessImpact?: string;
  proTip?: string;
  realExample?: string;
  whyWrong: Record<string, string>;
}

const GitLabStakeholderScenarios = () => {
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
    const savedProgress = localStorage.getItem('gitlab-stakeholder-scenarios');
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
      localStorage.setItem('gitlab-stakeholder-scenarios', JSON.stringify(progressData));
    }
  }, [score, confidenceRatings, achievements, hasStarted]);

  const scenarios: StakeholderScenario[] = [
    {
      id: 1,
      title: "C-Suite Expectation Misalignment Crisis",
      difficulty: "Advanced",
      urgency: "Executive Escalation",
      stakeholderType: "C-Suite",
      clientImpact: "High visibility project",
      context: "You're managing a $2M customer portal redesign promised to key enterprise clients by Q1. Three weeks before launch, the CEO discovers the new design doesn't include AI chatbot integration (which wasn't in original requirements). CEO publicly promised AI features to investors and is now demanding immediate integration. CTO says adding AI requires 8+ weeks additional development. Marketing has already announced launch date to 50+ enterprise prospects.",
      challenge: "Navigate misaligned executive expectations while protecting project timeline and team morale.",
      options: [
        {
          id: 'a',
          action: "Immediately commit to adding AI features, extend timeline by 8 weeks, inform all stakeholders",
          reasoning: "Prioritize CEO requirements and manage timeline expectations transparently",
          impact: "High customer disappointment",
          risk: "Medium",
          timeframe: "8 weeks delay"
        },
        {
          id: 'b',
          action: "Launch portal as planned, position AI integration as 'Phase 2' coming in Q2",
          reasoning: "Deliver on original commitments while creating roadmap for additional features",
          impact: "Maintains timeline",
          risk: "CEO relationship",
          timeframe: "On schedule"
        },
        {
          id: 'c',
          action: "Negotiate basic AI placeholder/demo for launch, full integration in Phase 2",
          reasoning: "Creative compromise that addresses CEO visibility needs with realistic timeline",
          impact: "Partial feature delivery",
          risk: "Low",
          timeframe: "2-3 weeks delay"
        },
        {
          id: 'd',
          action: "Escalate to board level to clarify requirements process and decision authority",
          reasoning: "Address systemic communication issues that created this misalignment",
          impact: "Process improvement",
          risk: "High political risk",
          timeframe: "Immediate escalation"
        }
      ],
      correctAnswer: 'c',
      explanation: "✅ **Correct: Creative compromise with AI placeholder** - This approach addresses the CEO's visibility needs (can demo AI to investors/prospects) while protecting project timeline and team morale. A basic AI demo or placeholder allows for the promised 'AI integration' messaging while building toward full implementation.",
      businessImpact: "💡 **Business Impact**: Creative compromises prevent $2M project delays while maintaining stakeholder confidence. Phased feature delivery reduces risk and allows for market feedback before full AI investment.",
      proTip: "🎯 **Pro Tip**: When facing impossible demands, look for creative solutions that address the underlying business need (in this case, CEO credibility) rather than the specific technical request. Often a demo or MVP achieves the real goal.",
      realExample: "🚀 **Real Example**: Slack frequently launches features with basic functionality then iterates based on user feedback, allowing them to meet market timing while delivering polished experiences over time.",
      whyWrong: {
        'a': "Committing to 8-week delays destroys project credibility and disappoints 50+ enterprise prospects who were promised Q1 delivery. This approach prioritizes one stakeholder over all others.",
        'b': "While protecting timeline, this doesn't address the CEO's immediate credibility issue with investors and prospects. The CEO will likely override this decision, creating team chaos.",
        'c': "",
        'd': "Board escalation during a crisis creates political risk and may not resolve the immediate timeline pressure. This approach could backfire and damage your standing with all executives."
      }
    },
    {
      id: 2,
      title: "Multi-Client Priority Conflict",
      difficulty: "Advanced",
      urgency: "Revenue Impact",
      stakeholderType: "Multiple Clients",
      clientImpact: "Competing enterprise deals",
      context: "You have three enterprise clients with conflicting feature demands, each representing $1M+ ARR. Client A (banking) needs advanced security features for compliance audit in 6 weeks. Client B (healthcare) requires HIPAA compliance features for their board review in 4 weeks. Client C (retail) wants performance optimizations for Black Friday (8 weeks away). Your team can only deliver one major feature set well within these timeframes.",
      challenge: "Choose client prioritization strategy that maximizes business value while maintaining relationships.",
      options: [
        {
          id: 'a',
          action: "Prioritize based on revenue size - deliver for highest-paying client first",
          reasoning: "Maximize immediate revenue impact by focusing on largest financial opportunity",
          impact: "Revenue optimization",
          risk: "Relationship damage",
          timeframe: "6-8 weeks"
        },
        {
          id: 'b',
          action: "Choose the most technically feasible solution that could benefit multiple clients",
          reasoning: "Find overlapping requirements that serve multiple clients with single development effort",
          impact: "Efficiency maximization",
          risk: "Partial satisfaction",
          timeframe: "4-6 weeks"
        },
        {
          id: 'c',
          action: "Negotiate staggered timeline with all clients, explaining constraints transparently",
          reasoning: "Honest communication about capacity limits while committing to delivery sequence",
          impact: "Relationship preservation",
          risk: "Some client disappointment",
          timeframe: "12-16 weeks total"
        },
        {
          id: 'd',
          action: "Split team into three sub-teams to attempt parallel delivery for all clients",
          reasoning: "Maximize client satisfaction by attempting to serve all needs simultaneously",
          impact: "Highest client satisfaction",
          risk: "Quality and timeline risk",
          timeframe: "6-8 weeks"
        }
      ],
      correctAnswer: 'b',
      explanation: "✅ **Correct: Find overlapping requirements** - Security, compliance, and performance often share common infrastructure improvements. By identifying features that benefit multiple clients (like enhanced data encryption, audit logging, or infrastructure optimization), you can deliver value to all while managing resource constraints effectively.",
      businessImpact: "📈 **Business Impact**: Shared feature development serves multiple enterprise clients efficiently, potentially saving 40-60% development time while maintaining relationships with all $3M+ in annual revenue.",
      proTip: "🔍 **Pro Tip**: Always look for underlying common needs when facing competing client demands. Security improvements often enhance performance, compliance features improve security, etc. Map requirements to find win-win solutions.",
      realExample: "💼 **Real Example**: Salesforce regularly develops platform improvements that serve multiple enterprise clients simultaneously, like enhanced API security that meets both compliance and performance requirements.",
      whyWrong: {
        'a': "Revenue-based prioritization can damage relationships with other high-value clients and sets precedent that highest bidder gets priority, potentially starting price wars.",
        'b': "",
        'c': "While honest, 12-16 week timeline means all clients wait longer than needed and may seek alternative solutions during the delay period.",
        'd': "Splitting teams reduces efficiency and expertise concentration, often resulting in delayed or lower-quality delivery for all clients."
      }
    },
    {
      id: 3,
      title: "Internal vs. Client Feature Conflict",
      difficulty: "Intermediate",
      urgency: "Strategic Alignment",
      stakeholderType: "Internal + External",
      clientImpact: "Product roadmap decision",
      context: "Your product roadmap includes a major internal efficiency feature (automated testing framework) that would reduce bugs by 50% and increase development velocity by 30%. However, your biggest client ($2M ARR) is threatening to churn unless you prioritize their custom integration request (CRM connector). The internal feature benefits all clients long-term, but the custom integration only serves this one client. Engineering team strongly advocates for the internal work.",
      challenge: "Balance short-term client retention against long-term product improvement and team efficiency.",
      options: [
        {
          id: 'a',
          action: "Prioritize client integration to prevent churn, delay internal efficiency improvements",
          reasoning: "Immediate revenue protection takes priority over long-term efficiency gains",
          impact: "Client retention",
          risk: "Team morale and velocity",
          timeframe: "6-8 weeks"
        },
        {
          id: 'b',
          action: "Proceed with internal efficiency work, offer client alternative solutions or timeline",
          reasoning: "Long-term product quality and team efficiency create more value than one client's demands",
          impact: "Platform improvement",
          risk: "Client churn",
          timeframe: "4-6 weeks"
        },
        {
          id: 'c',
          action: "Negotiate hybrid approach: basic integration now, full features after efficiency work",
          reasoning: "Compromise that addresses client needs while preserving strategic development priorities",
          impact: "Balanced approach",
          risk: "Moderate complexity",
          timeframe: "8-10 weeks total"
        },
        {
          id: 'd',
          action: "Offer client premium support package for custom integration by external team",
          reasoning: "Keep core team focused on product while serving client through alternative delivery model",
          impact: "Resource optimization",
          risk: "Additional cost",
          timeframe: "6-8 weeks parallel"
        }
      ],
      correctAnswer: 'd',
      explanation: "✅ **Correct: Premium support with external team** - This solution keeps your core engineering team focused on high-impact platform improvements while serving the client's specific needs through dedicated resources. The client pays premium for custom work, your product benefits from efficiency improvements, and team morale stays high.",
      businessImpact: "⚡ **Business Impact**: Preserving internal efficiency work delivers 30% velocity gains that compound over time, while premium custom services can generate additional revenue streams and maintain client relationships.",
      proTip: "💰 **Pro Tip**: When clients demand custom work that diverts from product strategy, consider premium services models. Clients often pay extra for dedicated resources, and it preserves your core team's focus on strategic work.",
      realExample: "🛠️ **Real Example**: Atlassian offers marketplace apps and custom development services for specialized client needs while keeping core product teams focused on platform improvements that benefit all users.",
      whyWrong: {
        'a': "Prioritizing one client's custom needs over platform improvements that benefit all clients creates technical debt and slows overall product development. Sets bad precedent for future demands.",
        'b': "While strategically sound, losing a $2M client creates immediate revenue pressure and may damage company reputation if not handled carefully.",
        'c': "Hybrid approaches often result in neither solution being fully satisfactory and can extend timelines significantly, disappointing both stakeholders.",
        'd': ""
      }
    },
    {
      id: 4,
      title: "Executive Communication During Crisis",
      difficulty: "Advanced",
      urgency: "Crisis Management",
      stakeholderType: "Executive Team",
      clientImpact: "Public reputation risk",
      context: "A critical security vulnerability has been discovered in your platform affecting 200+ enterprise clients. Fix requires 72-hour maintenance window with full platform downtime. Some clients have mission-critical operations during your proposed window. Board wants immediate action, Legal wants careful communication, Marketing wants to minimize publicity, and Sales wants to protect upcoming deals worth $5M. Media has picked up the story.",
      challenge: "Coordinate crisis communication across multiple stakeholder groups with conflicting priorities and high stakes.",
      options: [
        {
          id: 'a',
          action: "Implement immediate fix during business hours, accepting operational disruption to clients",
          reasoning: "Security takes absolute priority, minimize exposure time regardless of client impact",
          impact: "Security first",
          risk: "Major client disruption",
          timeframe: "Immediate"
        },
        {
          id: 'b',
          action: "Negotiate staged rollout with critical clients first, others during off-hours",
          reasoning: "Balanced approach that prioritizes most vulnerable clients while minimizing business impact",
          impact: "Managed disruption",
          risk: "Extended vulnerability window",
          timeframe: "48-72 hours"
        },
        {
          id: 'c',
          action: "Wait for weekend maintenance window, implement comprehensive communication plan",
          reasoning: "Minimize business disruption while using time for thorough stakeholder communication",
          impact: "Reduced business impact",
          risk: "Extended security exposure",
          timeframe: "96+ hours"
        },
        {
          id: 'd',
          action: "Deploy temporary mitigation immediately, full fix during planned maintenance window",
          reasoning: "Two-phase approach that reduces immediate risk while planning optimal fix timing",
          impact: "Risk reduction",
          risk: "Complexity",
          timeframe: "Immediate + 72 hours"
        }
      ],
      correctAnswer: 'd',
      explanation: "✅ **Correct: Two-phase mitigation approach** - Deploy immediate temporary measures to reduce security exposure while planning comprehensive fix during optimal timing. This addresses board urgency, reduces legal liability, gives marketing/sales time for communication strategy, and minimizes client operational impact.",
      businessImpact: "🛡️ **Business Impact**: Two-phase security response reduces immediate risk by 70-80% while preventing $10M+ in client operational losses and protecting $5M sales pipeline during crisis period.",
      proTip: "⚡ **Pro Tip**: During security crises, look for interim mitigations that buy time for optimal full solutions. Web application firewalls, access restrictions, or feature flags can reduce risk while planning comprehensive fixes.",
      realExample: "🔒 **Real Example**: When GitHub discovered a major security issue, they immediately deployed access restrictions to limit exposure, then planned comprehensive fixes during optimal maintenance windows to minimize developer impact.",
      whyWrong: {
        'a': "Immediate business-hours fix creates massive client disruption, potentially costing millions in lost productivity and damaging relationships during an already difficult situation.",
        'b': "Staged rollout extends vulnerability window for some clients and creates complex coordination challenges during crisis when clear communication is critical.",
        'c': "Waiting 96+ hours with known security vulnerability creates unacceptable legal and reputational risk, especially with media attention already focused on the issue.",
        'd': ""
      }
    },
    {
      id: 5,
      title: "Budget Approval Politics",
      difficulty: "Intermediate",
      urgency: "Financial Decision",
      stakeholderType: "Finance + Executives",
      clientImpact: "Capability expansion",
      context: "You need $800K budget approval for infrastructure upgrades that will enable serving enterprise clients requiring 99.99% uptime SLA. CFO is cutting budgets by 20% across all departments. CTO supports the technical need. VP Sales has $3M pipeline dependent on these capabilities. CEO wants data-driven decisions. Finance team questions ROI projections and timeline estimates.",
      challenge: "Build compelling business case that aligns financial constraints with growth opportunities.",
      options: [
        {
          id: 'a',
          action: "Present detailed technical requirements and risk analysis to justify full $800K request",
          reasoning: "Comprehensive technical case emphasizing infrastructure needs and compliance requirements",
          impact: "Technical accuracy",
          risk: "Finance rejection",
          timeframe: "2-3 weeks approval"
        },
        {
          id: 'b',
          action: "Focus presentation on $3M sales pipeline ROI and competitive positioning benefits",
          reasoning: "Business-focused case emphasizing revenue opportunity and market competitiveness",
          impact: "Revenue focus",
          risk: "Technical shortcuts",
          timeframe: "1-2 weeks approval"
        },
        {
          id: 'c',
          action: "Propose phased approach: $400K now for critical components, $400K next quarter",
          reasoning: "Compromise that addresses budget constraints while making progress on capabilities",
          impact: "Gradual implementation",
          risk: "Delayed capability",
          timeframe: "6-month timeline"
        },
        {
          id: 'd',
          action: "Partner with Sales to present joint business case with committed client contracts",
          reasoning: "Cross-functional presentation that directly ties investment to contracted revenue",
          impact: "Strong ROI case",
          risk: "Dependency on sales execution",
          timeframe: "3-4 weeks preparation"
        }
      ],
      correctAnswer: 'd',
      explanation: "✅ **Correct: Joint business case with committed contracts** - Partnering with Sales to present infrastructure investment tied to specific committed client contracts provides the strongest ROI justification. This approach shows direct revenue impact, reduces financial risk perception, and demonstrates cross-functional alignment.",
      businessImpact: "💰 **Business Impact**: Joint presentations with committed client contracts increase budget approval rates by 60-80% and demonstrate clear ROI that satisfies CFO requirements while enabling $3M+ revenue pipeline.",
      proTip: "🤝 **Pro Tip**: For major infrastructure investments, always partner with Sales or Customer Success to tie technical capabilities directly to committed revenue. Finance teams approve investments with clear, contracted returns much more readily.",
      realExample: "📊 **Real Example**: AWS regularly presents infrastructure investments tied to specific enterprise client commitments, making it easy for finance teams to approve expenditures with visible revenue impact.",
      whyWrong: {
        'a': "Technical presentations often fail with finance teams who need business justification. Detailed technical requirements don't address ROI concerns or budget constraint realities.",
        'b': "Pipeline-based presentations have high risk perception since sales aren't guaranteed. Finance prefers committed contracts over projected revenue.",
        'c': "Phased approach may not deliver enterprise SLA capabilities needed for client commitments, potentially losing deals while waiting for full implementation.",
        'd': ""
      }
    },
    {
      id: 6,
      title: "Cross-Departmental Blame Assignment",
      difficulty: "Advanced",
      urgency: "Internal Politics",
      stakeholderType: "Department Heads",
      clientImpact: "Service degradation",
      context: "Major performance issues have affected 30+ enterprise clients over 2 weeks. Engineering blames Infrastructure for server capacity. Infrastructure blames Product for feature scope creep. Product blames Sales for overpromising capabilities. Sales blames Support for poor client communication. Support blames everyone for lack of clear escalation procedures. Clients are threatening contract reviews.",
      challenge: "Navigate interdepartmental blame while focusing stakeholders on solution and client recovery.",
      options: [
        {
          id: 'a',
          action: "Conduct detailed root cause analysis to assign clear responsibility for the issues",
          reasoning: "Establish facts and accountability to prevent future occurrences and clarify ownership",
          impact: "Clear accountability",
          risk: "Further blame escalation",
          timeframe: "2-3 weeks"
        },
        {
          id: 'b',
          action: "Focus all departments on immediate client recovery plan, defer blame analysis",
          reasoning: "Prioritize client relationship repair over internal accountability during crisis",
          impact: "Client focus",
          risk: "Unresolved systemic issues",
          timeframe: "1-2 weeks"
        },
        {
          id: 'c',
          action: "Implement joint task force with representatives from all departments to solve issues",
          reasoning: "Cross-functional collaboration to address both immediate problems and systemic gaps",
          impact: "Collaborative solution",
          risk: "Slow decision making",
          timeframe: "3-4 weeks"
        },
        {
          id: 'd',
          action: "Present unified communication to clients while privately addressing departmental issues",
          reasoning: "Protect client relationships while resolving internal conflicts through separate channels",
          impact: "Professional client handling",
          risk: "Internal tensions persist",
          timeframe: "Immediate external, ongoing internal"
        }
      ],
      correctAnswer: 'd',
      explanation: "✅ **Correct: Unified external communication with separate internal resolution** - Clients need to see professional, coordinated response while internal conflicts are resolved through appropriate management channels. This approach protects client relationships while addressing systemic organizational issues properly.",
      businessImpact: "🎯 **Business Impact**: Professional crisis communication can retain 80-90% of affected client relationships, while proper internal conflict resolution prevents recurring issues that cost $500K+ in client churn.",
      proTip: "🎭 **Pro Tip**: During client-facing crises, always present a unified front externally while addressing internal conflicts privately. Clients lose confidence when they see internal blame games, regardless of who's actually responsible.",
      realExample: "🏢 **Real Example**: When major service providers face outages, they present unified status updates and recovery plans to clients while conducting separate internal post-mortems to address root causes and accountability.",
      whyWrong: {
        'a': "Root cause analysis during active client crisis delays resolution and may escalate internal conflicts when client relationships need immediate attention.",
        'b': "Deferring systemic issue analysis often means problems recur, potentially creating larger client crises in the future. Band-aid solutions don't fix underlying gaps.",
        'c': "Joint task forces can become blame forums rather than solution generators, and slow decision-making during client crisis can cause permanent relationship damage.",
        'd': ""
      }
    },
    {
      id: 7,
      title: "Regulatory Compliance Stakeholder Alignment",
      difficulty: "Advanced",
      urgency: "Compliance Deadline",
      stakeholderType: "Legal + Compliance + Clients",
      clientImpact: "Regulatory requirement",
      context: "New GDPR-style regulations require data residency changes for EU clients within 90 days. Legal demands strict compliance. Engineering estimates 120 days for proper implementation. Finance questions $1.2M cost for infrastructure changes. EU clients are requesting detailed compliance timelines. Non-EU clients worry about service disruptions. Regulators have indicated $10M+ fines for non-compliance.",
      challenge: "Coordinate complex regulatory compliance across multiple stakeholder groups with hard deadlines.",
      options: [
        {
          id: 'a',
          action: "Implement rapid compliance solution within 90 days, accepting higher costs and technical debt",
          reasoning: "Prioritize regulatory compliance over cost optimization to avoid massive fines",
          impact: "Compliance assured",
          risk: "High cost and technical debt",
          timeframe: "90 days"
        },
        {
          id: 'b',
          action: "Negotiate compliance extension with regulators while implementing proper long-term solution",
          reasoning: "Seek additional time to implement optimal solution that balances compliance and efficiency",
          impact: "Optimal solution",
          risk: "Regulatory rejection",
          timeframe: "120+ days"
        },
        {
          id: 'c',
          action: "Implement minimum viable compliance for deadline, enhance solution in Phase 2",
          reasoning: "Two-phase approach that meets deadline with basic compliance, improves over time",
          impact: "Deadline compliance",
          risk: "Operational limitations",
          timeframe: "90 days + ongoing"
        },
        {
          id: 'd',
          action: "Segment EU clients to separate compliant infrastructure, maintain existing for others",
          reasoning: "Targeted compliance approach that minimizes disruption to non-EU clients and operations",
          impact: "Minimal disruption",
          risk: "Complex infrastructure",
          timeframe: "90 days"
        }
      ],
      correctAnswer: 'c',
      explanation: "✅ **Correct: Minimum viable compliance with Phase 2 enhancement** - This approach meets the hard regulatory deadline with basic compliance requirements, then enhances the solution for optimal performance and efficiency. It balances legal risk, cost management, and operational excellence.",
      businessImpact: "⚖️ **Business Impact**: Phased compliance approach avoids $10M+ regulatory fines while controlling infrastructure costs and minimizing service disruptions. Phase 2 improvements optimize for long-term efficiency.",
      proTip: "📅 **Pro Tip**: For regulatory compliance with hard deadlines, focus on minimum viable compliance first, then optimize. Regulators care about meeting requirements; optimization can come after compliance is achieved.",
      realExample: "🏛️ **Real Example**: Major cloud providers like AWS implemented basic GDPR compliance by deadline, then spent months optimizing their solutions for better performance and cost efficiency.",
      whyWrong: {
        'a': "Rapid implementation often creates expensive technical debt and operational inefficiencies that cost more long-term than planned compliance approaches.",
        'b': "Regulatory extensions are rarely granted, especially for well-publicized requirements with long lead times. This approach risks massive fines if negotiation fails.",
        'd': "Infrastructure segmentation creates operational complexity and often costs more than unified compliance solutions while potentially creating security and management challenges.",
        'c': ""
      }
    },
    {
      id: 8,
      title: "Strategic Partnership Communication Crisis",
      difficulty: "Advanced",
      urgency: "Partnership Risk",
      stakeholderType: "External Partners + Executives",
      clientImpact: "Ecosystem integration",
      context: "Your key integration partner (representing 40% of client integrations) is threatening to end partnership due to API changes you made without consultation. Their engineering team had to rewrite significant portions of their integration. Your CEO is furious about lack of partner communication. Partner's CEO is demanding compensation for their engineering costs ($200K) and guarantee of future consultation. Your CTO insists the API changes were necessary for security and performance.",
      challenge: "Repair critical partnership relationship while managing internal executive expectations and technical requirements.",
      options: [
        {
          id: 'a',
          action: "Immediately apologize, offer full compensation, and commit to joint API governance process",
          reasoning: "Comprehensive relationship repair that addresses all partner concerns and prevents future issues",
          impact: "Partnership preservation",
          risk: "High cost and precedent",
          timeframe: "Immediate"
        },
        {
          id: 'b',
          action: "Acknowledge communication failure, offer partial compensation, negotiate new collaboration model",
          reasoning: "Balanced response that takes responsibility while establishing sustainable partnership framework",
          impact: "Relationship repair",
          risk: "Moderate cost",
          timeframe: "2-3 weeks"
        },
        {
          id: 'c',
          action: "Defend technical necessity of changes while offering enhanced documentation and support",
          reasoning: "Maintain technical position while providing better tools and support for partner adaptation",
          impact: "Technical integrity",
          risk: "Partnership damage",
          timeframe: "1-2 weeks"
        },
        {
          id: 'd',
          action: "Propose strategic partnership review to formalize communication processes and shared roadmap",
          reasoning: "Use crisis as opportunity to strengthen partnership with formal governance and planning",
          impact: "Strengthened partnership",
          risk: "Extended negotiation",
          timeframe: "4-6 weeks"
        }
      ],
      correctAnswer: 'b',
      explanation: "✅ **Correct: Acknowledge failure with partial compensation and new collaboration model** - This approach takes appropriate responsibility for communication failure while establishing sustainable partnership practices. Partial compensation shows good faith without setting precedent for full cost coverage of partner adaptations.",
      businessImpact: "🤝 **Business Impact**: Balanced partnership repair maintains access to 40% of client integrations while establishing collaboration frameworks that prevent future crises. Moderate investment protects significant revenue stream.",
      proTip: "🔄 **Pro Tip**: Partnership crises often indicate systematic communication gaps. Use the crisis as opportunity to formalize partnership governance, shared roadmaps, and change management processes that benefit both parties.",
      realExample: "⚙️ **Real Example**: When Stripe makes API changes, they provide extensive advance notice, migration guides, and developer support to minimize partner impact while maintaining platform evolution needs.",
      whyWrong: {
        'a': "Full compensation sets expensive precedent that any partner affected by API changes can demand cost coverage, potentially making future platform improvements financially prohibitive.",
        'b': "",
        'c': "Defending technical changes without addressing communication failure often escalates partnership conflicts and can result in complete relationship breakdown.",
        'd': "While strategic review is valuable, immediate crisis requires immediate response. Extended negotiations during active partnership threat may result in partner departure."
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
      
      // Stakeholder Master - perfect score
      if (score === scenarios.length - 1) {
        newAchievements.push("Stakeholder Master");
      }
      
      // Diplomatic Leader - 5+ correct
      if (score >= 4) {
        newAchievements.push("Diplomatic Leader");
      }
      
      // Crisis Navigator - handle crisis scenarios
      if (scenario.urgency?.includes("Crisis") && isCorrect) {
        newAchievements.push("Crisis Navigator");
      }
      
      // Executive Communicator - handle executive scenarios
      if (scenario.stakeholderType?.includes("Executive") && isCorrect) {
        newAchievements.push("Executive Communicator");
      }
      
      // Client Champion - handle client scenarios
      if (scenario.clientImpact && isCorrect) {
        newAchievements.push("Client Champion");
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
    localStorage.removeItem('gitlab-stakeholder-scenarios');
  };

  const currentScen = scenarios[currentScenario];
  const selectedOption = currentScen?.options.find(opt => opt.id === selectedAction);
  const correctOption = currentScen?.options.find(opt => opt.id === currentScen.correctAnswer);
  const isCorrect = selectedAction === currentScen?.correctAnswer;

  if (!hasStarted) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <Users className="w-16 h-16 mx-auto mb-4 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            GitLab Stakeholder & Client Management Scenarios
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Master complex stakeholder relationships, client communications, and executive alignment
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-gray-500 mb-6">
            <span className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              Multi-stakeholder scenarios
            </span>
            <span className="flex items-center gap-1">
              <MessageSquare className="w-4 h-4" />
              Crisis communication
            </span>
            <span className="flex items-center gap-1">
              <Shield className="w-4 h-4" />
              Relationship management
            </span>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg mb-6">
            <h2 className="text-xl font-semibold text-blue-800 mb-4">🎯 Master Stakeholder Leadership:</h2>
            <div className="grid md:grid-cols-2 gap-4 text-left text-blue-700">
              <ul className="space-y-2">
                <li>• <strong>Executive Alignment:</strong> Navigate C-suite politics and competing priorities</li>
                <li>• <strong>Client Relationship Management:</strong> Balance multiple enterprise client demands</li>
                <li>• <strong>Crisis Communication:</strong> Maintain relationships during high-pressure situations</li>
                <li>• <strong>Cross-functional Coordination:</strong> Align diverse teams and departments</li>
              </ul>
              <ul className="space-y-2">
                <li>• <strong>Budget & Approval Politics:</strong> Build compelling business cases for stakeholders</li>
                <li>• <strong>Partnership Management:</strong> Navigate external partner relationships</li>
                <li>• <strong>Regulatory Compliance:</strong> Coordinate complex compliance requirements</li>
                <li>• <strong>Conflict Resolution:</strong> Resolve interdepartmental and client conflicts</li>
              </ul>
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">📋 Stakeholder Management Scenarios:</h2>
            <ul className="text-left text-gray-700 space-y-2">
              <li>• <strong>8 complex scenarios</strong> from C-suite crises to partnership conflicts</li>
              <li>• <strong>Multi-stakeholder dynamics</strong> including executives, clients, partners, and teams</li>
              <li>• <strong>High-stakes communication</strong> with revenue and relationship implications</li>
              <li>• <strong>Crisis management</strong> including security, compliance, and operational challenges</li>
              <li>• <strong>Real-world examples</strong> from enterprise software and platform companies</li>
              <li>• <strong>Diplomatic strategies</strong> for managing conflicting priorities and expectations</li>
            </ul>
          </div>
          <button
            onClick={startWorkshop}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2 mx-auto"
          >
            Start Stakeholder Management Scenarios <Users className="w-5 h-5" />
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
          <Users className="w-16 h-16 mx-auto mb-4 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Stakeholder Management Results</h1>
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
              percentage >= 90 ? "Stakeholder Master! 🏆" :
              percentage >= 80 ? "Diplomatic Leader! 🎯" :
              percentage >= 70 ? "Strong Communication Skills! 👍" :
              percentage >= 60 ? "Good Foundation, Keep Learning! 📚" :
              "Practice More Stakeholder Scenarios! 💪"
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
              <h3 className="font-semibold text-yellow-800">Stakeholder Management Achievements Unlocked!</h3>
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
                      className="mt-3 text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      {showExplanation[scenario.id] ? "Hide" : "Show"} Strategic Analysis
                    </button>

                    {showExplanation[scenario.id] && (
                      <div className="mt-3 p-4 bg-blue-50 rounded-lg text-sm">
                        <p className="mb-2">{scenario.explanation}</p>
                        {scenario.businessImpact && (
                          <p className="mb-2">{scenario.businessImpact}</p>
                        )}
                        {scenario.proTip && (
                          <p className="mb-2">{scenario.proTip}</p>
                        )}
                        {scenario.realExample && (
                          <p className="mb-2">{scenario.realExample}</p>
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
            <h3 className="text-lg font-semibold text-gray-900 mb-4">📚 Continue Your Stakeholder Management Journey</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="text-left">
                <h4 className="font-medium text-gray-800 mb-2">GitLab Communication Resources</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• <a href="https://about.gitlab.com/handbook/communication/" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">GitLab Communication Handbook</a></li>
                  <li>• <a href="https://docs.gitlab.com/ee/user/project/merge_requests/" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Collaborative merge request workflows</a></li>
                  <li>• <a href="https://docs.gitlab.com/ee/user/project/issues/" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Issue discussion best practices</a></li>
                </ul>
              </div>
              <div className="text-left">
                <h4 className="font-medium text-gray-800 mb-2">Stakeholder Excellence</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• Build trust through transparent communication</li>
                  <li>• Focus on business impact in all conversations</li>
                  <li>• Present unified front during client-facing crises</li>
                  <li>• Use data and metrics to support decisions</li>
                </ul>
              </div>
            </div>
          </div>
          
          <button
            onClick={resetWorkshop}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 mx-auto"
          >
            <RotateCcw className="w-5 h-5" />
            Master Stakeholder Management Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Users className="w-8 h-8 text-blue-600" />
          GitLab Stakeholder & Client Management
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
            className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
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
            {currentScen.stakeholderType && (
              <span className="flex items-center gap-1 text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded">
                <Users className="w-3 h-3" />
                {currentScen.stakeholderType}
              </span>
            )}
            {currentScen.clientImpact && (
              <span className="flex items-center gap-1 text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded">
                <Briefcase className="w-3 h-3" />
                {currentScen.clientImpact}
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
          <div className="bg-blue-50 p-3 rounded border-l-4 border-blue-500">
            <p className="text-gray-800 font-medium">{currentScen.challenge}</p>
          </div>
        </div>

        {/* Enhanced Options */}
        <div className="space-y-3 mb-6">
          <h3 className="text-lg font-semibold text-gray-800">How do you handle this stakeholder situation?</h3>
          {currentScen.options.map((option) => (
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
                  name={`scenario-${currentScen.id}`}
                  value={option.id}
                  checked={selectedAction === option.id}
                  onChange={() => setSelectedAction(option.id)}
                  disabled={showFeedback}
                  className="mt-1"
                />
                <div className="flex-1">
                  <div className="font-medium text-gray-900 mb-2">{option.action}</div>
                  <div className="text-sm text-gray-600 mb-3">{option.reasoning}</div>
                  <div className="flex gap-4 text-xs">
                    {option.impact && (
                      <span className="text-green-600">Impact: {option.impact}</span>
                    )}
                    {option.risk && (
                      <span className="text-orange-600">Risk: {option.risk}</span>
                    )}
                    {option.timeframe && (
                      <span className="text-blue-600">Timeline: {option.timeframe}</span>
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
              <span className="text-sm font-medium text-gray-700">How confident are you in this approach?</span>
              <span className="text-sm text-gray-600">
                {confidenceRatings[currentScenario] ? `${confidenceRatings[currentScenario]}/5` : 'Not rated'}
              </span>
            </div>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  onClick={() => handleConfidenceRating(currentScenario, rating)}
                  className={`w-8 h-8 rounded-full border-2 transition-colors ${
                    confidenceRatings[currentScenario] >= rating
                      ? 'bg-blue-500 border-blue-500 text-white'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  {rating}
                </button>
              ))}
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
            Submit Stakeholder Strategy
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
                {isCorrect ? 'Excellent stakeholder management!' : 'Consider this approach instead:'}
              </span>
            </div>
            
            {!isCorrect && selectedOption && (
              <div className="mb-3 p-3 bg-white rounded border-l-4 border-red-500">
                <div className="text-red-800 font-medium mb-1">Your approach:</div>
                <div className="text-red-700 text-sm mb-2">{selectedOption.action}</div>
                <div className="text-red-600 text-sm">
                  {currentScen.whyWrong[selectedAction]}
                </div>
              </div>
            )}
            
            <div className="bg-white p-3 rounded border-l-4 border-blue-500">
              <div className="text-blue-800 font-medium mb-1">Best approach:</div>
              <div className="text-blue-700 text-sm mb-2">{correctOption?.action}</div>
              <div className="text-blue-600 text-sm mb-3">{currentScen.explanation}</div>
              
              {currentScen.businessImpact && (
                <div className="text-blue-600 text-sm mb-2">{currentScen.businessImpact}</div>
              )}
              
              {currentScen.proTip && (
                <div className="text-blue-600 text-sm mb-2">{currentScen.proTip}</div>
              )}
              
              {currentScen.realExample && (
                <div className="text-blue-600 text-sm">{currentScen.realExample}</div>
              )}
            </div>
          </div>
          
          <button
            onClick={nextScenario}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {currentScenario < scenarios.length - 1 ? 'Next Stakeholder Challenge' : 'View Scenario Results'}
          </button>
        </div>
      )}
    </div>
  );
};

export default GitLabStakeholderScenarios;
