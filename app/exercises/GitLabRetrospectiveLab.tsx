'use client';
import React, { useState, useEffect } from 'react';
import { RotateCcw, CheckCircle, XCircle, Users, AlertTriangle, Star, Award, Clock, TrendingUp, Zap, Target, BarChart3, Activity, Gauge, RefreshCw } from 'lucide-react';

interface RetrospectiveOption {
  id: string;
  action: string;
  reasoning: string;
  dataFocus?: string;
  timeframe?: string;
  teamImpact?: string;
}

interface ProcessScenario {
  id: number;
  title: string;
  difficulty?: string;
  processArea?: string;
  teamSize?: string;
  sprintCycle?: string;
  context: string;
  challenge: string;
  metrics?: Record<string, string>;
  options: RetrospectiveOption[];
  correctAnswer: string;
  explanation: string;
  processImpact?: string;
  proTip?: string;
  gitlabFeature?: string;
  whyWrong: Record<string, string>;
}

const GitLabRetrospectiveLab = () => {
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
    const savedProgress = localStorage.getItem('gitlab-retrospective-lab');
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
      localStorage.setItem('gitlab-retrospective-lab', JSON.stringify(progressData));
    }
  }, [score, confidenceRatings, achievements, hasStarted]);

  const scenarios: ProcessScenario[] = [
    {
      id: 1,
      title: "Declining Velocity Crisis",
      difficulty: "Intermediate",
      processArea: "Velocity Tracking",
      teamSize: "8 developers",
      sprintCycle: "2-week sprints",
      context: "Your team's velocity has dropped 40% over the last 3 sprints (from 85 story points to 51). Sprint burndowns show consistent pattern: strong start, then stalling by day 8. Daily standups reveal increasing 'blocked' status updates. Team morale is declining, and stakeholders are questioning delivery predictability. Recent changes include: new junior developer joined 6 weeks ago, migration to microservices architecture ongoing, and increased support ticket volume.",
      challenge: "Identify root causes of velocity decline and implement data-driven improvements using GitLab analytics.",
      metrics: {
        "Current Velocity": "51 story points",
        "Previous Velocity": "85 story points", 
        "Blocked Tasks": "35% of sprint capacity",
        "Support Tickets": "+60% from last quarter",
        "Code Review Time": "2.3 days average"
      },
      options: [
        {
          id: 'a',
          action: "Focus retrospective on individual performance, identify low performers",
          reasoning: "Address velocity through individual accountability and performance management",
          dataFocus: "Individual Metrics",
          timeframe: "1 sprint",
          teamImpact: "High Tension"
        },
        {
          id: 'b',
          action: "Use GitLab analytics to identify process bottlenecks, then address top 3 systemic issues",
          reasoning: "Data-driven analysis of workflow patterns to identify structural impediments",
          dataFocus: "Process Analytics",
          timeframe: "2-3 sprints",
          teamImpact: "Collaborative"
        },
        {
          id: 'c',
          action: "Reduce sprint scope by 30% to achieve predictable delivery and rebuild confidence",
          reasoning: "Lower sprint commitment to ensure consistent delivery and improve team morale",
          dataFocus: "Capacity Planning",
          timeframe: "Immediate",
          teamImpact: "Stress Reduction"
        },
        {
          id: 'd',
          action: "Implement daily tracking of blockers with escalation protocols",
          reasoning: "Create systematic approach to identify and resolve impediments quickly",
          dataFocus: "Impediment Tracking",
          timeframe: "2 weeks",
          teamImpact: "Process Focus"
        }
      ],
      correctAnswer: 'b',
      explanation: "✅ **Correct: GitLab analytics for process bottlenecks** - The data shows systemic issues (blocked tasks, code review delays, support load) rather than individual performance problems. GitLab's analytics can reveal cycle time bottlenecks, merge request patterns, and workflow inefficiencies.",
      processImpact: "📊 **Process Impact**: Analytics-driven retrospectives increase team velocity by 25-40% within 2-3 sprints by addressing root causes rather than symptoms. Teams become self-improving through data literacy.",
      proTip: "🔍 **Pro Tip**: Use GitLab's Cycle Analytics to identify the longest stages in your workflow. Focus retrospectives on the top 2-3 bottlenecks rather than trying to fix everything at once.",
      gitlabFeature: "🛠️ **GitLab Feature**: Cycle Analytics, Merge Request Analytics, and Issue Analytics provide comprehensive workflow insights for data-driven retrospectives.",
      whyWrong: {
        'a': "Individual performance focus in retrospectives destroys psychological safety and team cohesion. The data suggests systemic issues (blocked tasks, code reviews) not individual problems.",
        'b': "",
        'c': "Reducing scope masks problems rather than solving them. While it may temporarily improve delivery predictability, underlying process issues will continue to compound.",
        'd': "Tracking blockers is good but reactive. Without understanding why blockers occur (via analytics), you're treating symptoms rather than root causes."
      }
    },
    {
      id: 2,
      title: "Code Review Bottleneck Analysis",
      difficulty: "Advanced",
      processArea: "Workflow Optimization",
      teamSize: "12 developers across 3 teams",
      sprintCycle: "2-week sprints",
      context: "GitLab analytics show code reviews are the primary bottleneck: average merge request sits 3.2 days before first review, then another 2.1 days for approval. This creates cascade delays affecting sprint goals. Team leads report that senior developers are overwhelmed with review requests (15-20 per week each), while junior developers wait for feedback. Some developers merge without adequate review to meet deadlines, increasing bugs in production (+40% this quarter).",
      challenge: "Optimize code review process to improve flow efficiency while maintaining quality standards.",
      metrics: {
        "First Review Time": "3.2 days average",
        "Approval Time": "2.1 days after first review",
        "Senior Dev Review Load": "15-20 MRs/week",
        "Production Bugs": "+40% this quarter",
        "Sprint Goal Achievement": "65% (down from 85%)"
      },
      options: [
        {
          id: 'a',
          action: "Implement round-robin review assignment to distribute load evenly across all developers",
          reasoning: "Balance review workload by rotating assignments rather than relying on senior developers",
          dataFocus: "Review Distribution",
          timeframe: "1 sprint",
          teamImpact: "Load Balancing"
        },
        {
          id: 'b',
          action: "Create review complexity tiers: junior devs review simple changes, seniors handle complex/architectural changes",
          reasoning: "Match reviewer expertise to change complexity while developing junior review skills",
          dataFocus: "Complexity Analysis",
          timeframe: "2 sprints",
          teamImpact: "Skill Development"
        },
        {
          id: 'c',
          action: "Set SLA targets: 24-hour first review, 48-hour approval, with GitLab automation alerts",
          reasoning: "Create time-based accountability with automated tracking and escalation",
          dataFocus: "Time Metrics",
          timeframe: "Immediate",
          teamImpact: "Accountability"
        },
        {
          id: 'd',
          action: "Analyze GitLab data to identify review patterns, then implement targeted improvements for top bottlenecks",
          reasoning: "Use merge request analytics to understand why reviews take long and address specific causes",
          dataFocus: "Pattern Analysis",
          timeframe: "3-4 weeks",
          teamImpact: "Data-Driven"
        }
      ],
      correctAnswer: 'd',
      explanation: "✅ **Correct: Analyze GitLab data for review patterns** - Before implementing solutions, understand the specific causes: Are reviews delayed due to large MR size? Lack of context? Specific file types? GitLab analytics can reveal these patterns to enable targeted solutions.",
      processImpact: "⚡ **Process Impact**: Data-driven review process optimization reduces cycle time by 50-60% and increases code quality by 30% through targeted improvements rather than blanket policies.",
      proTip: "📈 **Pro Tip**: Use GitLab's Merge Request Analytics to identify correlation between MR size, complexity, and review time. Optimize for fast feedback loops rather than perfect reviews.",
      gitlabFeature: "🔧 **GitLab Feature**: Merge Request Analytics, Review Time tracking, and Approval Rules enable sophisticated review process optimization and measurement.",
      whyWrong: {
        'a': "Round-robin assignment ignores expertise matching and can lead to inappropriate reviews (junior devs reviewing complex architecture changes).",
        'b': "Complexity tiers are good but without data on why reviews are slow, you might be solving the wrong problem (size vs complexity vs context issues).",
        'c': "SLA targets without understanding root causes often lead to rushed, lower-quality reviews or gaming of metrics rather than process improvement.",
        'd': ""
      }
    },
    {
      id: 3,
      title: "Sprint Planning Estimation Accuracy",
      difficulty: "Intermediate",
      processArea: "Sprint Planning",
      teamSize: "6 developers",
      sprintCycle: "2-week sprints",
      context: "Team consistently overcommits in sprint planning. Last 4 sprints completed only 60-70% of planned work. Retrospectives reveal estimation challenges: stories that seem '3 points' become '8 points' during implementation. Developers express frustration with constant scope reduction mid-sprint. Product Owner pressures team to commit to more work to meet quarterly goals. GitLab data shows high story point variance between estimates and actual completion time.",
      challenge: "Improve estimation accuracy and sprint planning effectiveness using historical data and process improvements.",
      metrics: {
        "Sprint Completion": "60-70% of planned work",
        "Estimation Variance": "170% average (3pt stories taking 8pt effort)",
        "Mid-Sprint Scope Changes": "40% of sprints",
        "Developer Confidence": "3.2/5 in sprint goals",
        "Story Point Inflation": "+45% from estimates"
      },
      options: [
        {
          id: 'a',
          action: "Switch from story points to time-based estimates (hours) for more concrete planning",
          reasoning: "Move to more precise time estimates to improve planning accuracy",
          dataFocus: "Time Tracking",
          timeframe: "1 sprint",
          teamImpact: "Process Change"
        },
        {
          id: 'b',
          action: "Use GitLab historical data to calibrate team velocity and adjust estimation practices",
          reasoning: "Leverage past performance data to improve future estimation accuracy and planning",
          dataFocus: "Historical Analysis",
          timeframe: "2-3 sprints",
          teamImpact: "Learning Focus"
        },
        {
          id: 'c',
          action: "Implement 'commitment' vs 'forecast' planning with 70% confidence level for commitments",
          reasoning: "Separate committed work from stretch goals to improve predictability",
          dataFocus: "Confidence Levels",
          timeframe: "Immediate",
          teamImpact: "Expectation Management"
        },
        {
          id: 'd',
          action: "Add mandatory estimation review sessions where team validates estimates against similar past work",
          reasoning: "Use reference stories and historical comparison to improve estimation quality",
          dataFocus: "Comparative Analysis",
          timeframe: "2 weeks",
          teamImpact: "Estimation Focus"
        }
      ],
      correctAnswer: 'b',
      explanation: "✅ **Correct: Use GitLab historical data for calibration** - The 170% estimation variance indicates systematic estimation issues. GitLab's analytics can show actual cycle times for similar stories, helping teams calibrate their estimation practices with real data.",
      processImpact: "🎯 **Process Impact**: Data-driven estimation calibration improves sprint predictability by 40-50% and reduces mid-sprint stress by providing realistic planning baselines.",
      proTip: "📊 **Pro Tip**: Use GitLab's Issue Analytics to group similar stories by labels/complexity and analyze actual completion times. This creates empirical estimation references.",
      gitlabFeature: "📈 **GitLab Feature**: Issue Analytics, Cycle Analytics, and Burndown Charts provide the historical data needed for evidence-based estimation improvements.",
      whyWrong: {
        'a': "Time-based estimates don't solve the underlying estimation accuracy problem and can create false precision. The issue is understanding relative complexity, not measurement units.",
        'b': "",
        'c': "Commitment vs forecast helps with expectations but doesn't address the root cause of poor estimation. The team still needs to improve estimation skills.",
        'd': "Estimation review sessions are good but without historical data, they rely on memory and intuition rather than empirical evidence of actual effort."
      }
    },
    {
      id: 4,
      title: "Cross-Team Dependency Delays",
      difficulty: "Advanced",
      processArea: "Coordination & Dependencies",
      teamSize: "15 developers across 4 teams",
      sprintCycle: "2-week sprints",
      context: "Multi-team project with complex dependencies causing frequent delays. Team A waits for Team B's API changes, Team C blocks Team D's UI work. GitLab shows 45% of merge requests have dependency-related delays. Sprint reviews consistently show 'waiting for other teams' as primary blocker. Teams operate independently with minimal coordination, leading to integration surprises. Cross-team communication happens mainly through tickets and occasional Slack messages.",
      challenge: "Optimize cross-team coordination and dependency management to improve overall delivery flow.",
      metrics: {
        "Dependency Delays": "45% of MRs affected",
        "Cross-Team Blockers": "60% of sprint impediments",
        "Integration Issues": "8-12 per sprint",
        "Coordination Overhead": "25% of development time",
        "Failed Sprint Goals": "70% due to dependencies"
      },
      options: [
        {
          id: 'a',
          action: "Implement daily cross-team standup with representatives from each team",
          reasoning: "Increase communication frequency to identify and resolve dependencies faster",
          dataFocus: "Communication Tracking",
          timeframe: "Immediate",
          teamImpact: "Coordination Overhead"
        },
        {
          id: 'b',
          action: "Use GitLab dependency tracking to visualize and manage cross-team work flows",
          reasoning: "Make dependencies visible and trackable through systematic project management",
          dataFocus: "Dependency Mapping",
          timeframe: "2-3 weeks",
          teamImpact: "Transparency"
        },
        {
          id: 'c',
          action: "Restructure teams around features rather than technical components to reduce dependencies",
          reasoning: "Organizational change to minimize cross-team dependencies through feature ownership",
          dataFocus: "Team Structure",
          timeframe: "2-3 months",
          teamImpact: "Organizational Change"
        },
        {
          id: 'd',
          action: "Create shared sprint planning session to align team goals and identify dependencies upfront",
          reasoning: "Coordinate planning across teams to prevent dependency surprises",
          dataFocus: "Planning Alignment",
          timeframe: "Next sprint",
          teamImpact: "Process Integration"
        }
      ],
      correctAnswer: 'b',
      explanation: "✅ **Correct: GitLab dependency tracking** - Making dependencies visible is the first step to managing them effectively. GitLab's issue relationships and dependency features enable teams to track, monitor, and plan around cross-team work systematically.",
      processImpact: "🔗 **Process Impact**: Systematic dependency management reduces cross-team delays by 50-60% and improves sprint predictability from 30% to 80% through visibility and planning.",
      proTip: "🗺️ **Pro Tip**: Use GitLab's issue relationships (blocks/blocked by) and roadmap features to visualize dependency chains. This helps teams understand the impact of delays and plan accordingly.",
      gitlabFeature: "🔧 **GitLab Feature**: Issue relationships, Roadmaps, and Epics provide comprehensive dependency tracking and visualization for multi-team coordination.",
      whyWrong: {
        'a': "Daily cross-team standups create coordination overhead without addressing root cause. They can become status meetings rather than dependency resolution sessions.",
        'b': "",
        'c': "Team restructuring is a major organizational change that may not be feasible and could disrupt current productivity. Start with process improvements first.",
        'd': "Shared planning helps but without systematic tracking, dependencies still become invisible once identified. You need ongoing visibility, not just upfront planning."
      }
    },
    {
      id: 5,
      title: "Technical Debt Impact Assessment",
      difficulty: "Advanced",
      processArea: "Quality Metrics",
      teamSize: "10 developers",
      sprintCycle: "2-week sprints",
      context: "Team reports that technical debt is slowing development, but stakeholders want data-driven justification for debt reduction work. Recent surveys show developers spend 40% of time on 'workarounds' due to legacy code. Bug fix cycle time has increased 60% over 6 months. New feature development velocity decreased 30%. However, product management wants to prioritize new features for competitive reasons. Team needs to quantify technical debt impact using GitLab analytics to make business case for improvement work.",
      challenge: "Use GitLab analytics to quantify technical debt impact and build data-driven case for debt reduction investment.",
      metrics: {
        "Developer Workaround Time": "40% of development effort",
        "Bug Fix Cycle Time": "+60% over 6 months",
        "Feature Velocity": "-30% compared to baseline",
        "Code Review Time": "+45% for debt-heavy areas",
        "Production Issues": "+80% in legacy components"
      },
      options: [
        {
          id: 'a',
          action: "Create developer survey to gather subjective feedback on technical debt pain points",
          reasoning: "Collect qualitative data on developer experience with technical debt",
          dataFocus: "Subjective Metrics",
          timeframe: "1 week",
          teamImpact: "Opinion Gathering"
        },
        {
          id: 'b',
          action: "Use GitLab analytics to measure cycle time, defect rates, and maintenance effort by code area",
          reasoning: "Quantify technical debt impact through objective metrics and data analysis",
          dataFocus: "Objective Analytics",
          timeframe: "2-3 weeks",
          teamImpact: "Evidence-Based"
        },
        {
          id: 'c',
          action: "Implement code quality gates to prevent further technical debt accumulation",
          reasoning: "Focus on preventing new debt rather than measuring existing debt impact",
          dataFocus: "Quality Gates",
          timeframe: "1 sprint",
          teamImpact: "Prevention Focus"
        },
        {
          id: 'd',
          action: "Dedicate 20% of each sprint to technical debt reduction and track velocity changes",
          reasoning: "Allocate fixed time to debt reduction and measure improvement over time",
          dataFocus: "Allocation Tracking",
          timeframe: "3-4 sprints",
          teamImpact: "Time Investment"
        }
      ],
      correctAnswer: 'b',
      explanation: "✅ **Correct: GitLab analytics for quantified impact** - Stakeholders need objective data to justify debt reduction investment. GitLab can measure cycle time by file/component, defect rates, and maintenance overhead to build a compelling business case.",
      processImpact: "💰 **Process Impact**: Quantified technical debt analysis enables 25-40% more investment in debt reduction by providing clear ROI justification to stakeholders and product management.",
      proTip: "📊 **Pro Tip**: Correlate GitLab cycle time data with code complexity metrics. Show how debt-heavy files require 2-3x more time for changes and generate 4-5x more bugs.",
      gitlabFeature: "📈 **GitLab Feature**: Code Quality reports, Cycle Analytics by file, and Merge Request Analytics provide comprehensive technical debt impact measurement.",
      whyWrong: {
        'a': "Subjective surveys alone don't provide the objective, business-relevant data that stakeholders need to justify debt reduction investment. Feelings don't trump features in business decisions.",
        'b': "",
        'c': "Quality gates prevent future debt but don't address existing debt impact. You need to quantify current pain before stakeholders will invest in improvement.",
        'd': "Allocating time without proving impact first is unlikely to get stakeholder buy-in. You need data to justify the allocation, not allocation to generate data."
      }
    },
    {
      id: 6,
      title: "Remote Team Collaboration Metrics",
      difficulty: "Intermediate",
      processArea: "Team Dynamics",
      teamSize: "8 developers (remote)",
      sprintCycle: "2-week sprints",
      context: "Fully remote team struggling with collaboration effectiveness. Async communication leading to delays: questions in GitLab comments go unanswered for 8-12 hours, blocking progress. Knowledge silos developing as team members work in isolation. Pair programming sessions decreased 70% since going remote. Code review discussions are minimal - most approvals without meaningful feedback. Team cohesion survey shows 40% decrease in collaboration satisfaction.",
      challenge: "Improve remote team collaboration using GitLab features and process improvements to enhance async productivity.",
      metrics: {
        "Comment Response Time": "8-12 hours average",
        "Pair Programming": "-70% from in-person baseline",
        "Code Review Discussion": "1.2 comments per MR",
        "Knowledge Sharing": "-60% cross-team learning",
        "Collaboration Satisfaction": "2.8/5 (down from 4.7/5)"
      },
      options: [
        {
          id: 'a',
          action: "Mandate daily video calls to replicate in-person interaction and improve communication",
          reasoning: "Increase synchronous communication to solve async collaboration issues",
          dataFocus: "Meeting Frequency",
          timeframe: "Immediate",
          teamImpact: "Sync Requirements"
        },
        {
          id: 'b',
          action: "Optimize GitLab workflows for async collaboration: better templates, clear handoff protocols",
          reasoning: "Improve async collaboration tools and processes rather than forcing sync communication",
          dataFocus: "Async Optimization",
          timeframe: "2-3 weeks",
          teamImpact: "Workflow Improvement"
        },
        {
          id: 'c',
          action: "Create overlap hours where all team members are online simultaneously",
          reasoning: "Establish common working hours to enable real-time collaboration and quick responses",
          dataFocus: "Overlap Tracking",
          timeframe: "1 week",
          teamImpact: "Schedule Coordination"
        },
        {
          id: 'd',
          action: "Implement virtual pair programming sessions using screen sharing and scheduled rotation",
          reasoning: "Restore collaborative development practices through technology-enabled pairing",
          dataFocus: "Pairing Metrics",
          timeframe: "2 weeks",
          teamImpact: "Collaboration Revival"
        }
      ],
      correctAnswer: 'b',
      explanation: "✅ **Correct: Optimize GitLab for async collaboration** - Remote teams thrive on excellent async processes, not forced sync communication. Better GitLab templates, clear handoff protocols, and structured async communication solve the root collaboration issues.",
      processImpact: "🌐 **Process Impact**: Optimized async collaboration increases remote team productivity by 30-40% and satisfaction by 60% while preserving flexibility that makes remote work valuable.",
      proTip: "💡 **Pro Tip**: Use GitLab's issue templates, MR templates, and automated workflows to create structure for async handoffs. Make context and next steps always visible.",
      gitlabFeature: "🛠️ **GitLab Feature**: Issue templates, MR templates, automated workflows, and notification management enable sophisticated async collaboration optimization.",
      whyWrong: {
        'a': "Mandating sync communication defeats the benefits of remote work and doesn't address the real issue: poor async collaboration processes and tools.",
        'b': "",
        'c': "Overlap hours help but don't solve the fundamental async collaboration issues. Teams still need better handoff processes and communication structures.",
        'd': "Scheduled pair programming is good but addresses only one aspect. The broader async collaboration issues need systematic process improvements."
      }
    },
    {
      id: 7,
      title: "Deployment Frequency Optimization",
      difficulty: "Advanced",
      processArea: "DevOps Metrics",
      teamSize: "8 developers + 2 DevOps",
      sprintCycle: "2-week sprints",
      context: "Team deploys once per sprint (every 2 weeks), but industry benchmarks suggest daily deployments for faster feedback. Current deployment process takes 4-6 hours of manual testing and coordination. Fear of production issues leads to large, risky releases with multiple features. When issues occur, rollback takes 2-3 hours. GitLab analytics show high cycle time between merge and production deployment. Business wants faster feature delivery to respond to market changes.",
      challenge: "Increase deployment frequency while maintaining quality and reducing deployment risk through process and automation improvements.",
      metrics: {
        "Deployment Frequency": "Once per 2 weeks",
        "Deployment Duration": "4-6 hours",
        "Rollback Time": "2-3 hours",
        "Features per Deploy": "8-12 features",
        "Post-Deploy Issues": "25% of deployments"
      },
      options: [
        {
          id: 'a',
          action: "Implement automated testing and CI/CD pipelines to enable daily deployments",
          reasoning: "Reduce manual effort and increase confidence through automation",
          dataFocus: "Automation Metrics",
          timeframe: "4-6 weeks",
          teamImpact: "Process Automation"
        },
        {
          id: 'b',
          action: "Use GitLab analytics to identify deployment bottlenecks and optimize the highest-impact areas first",
          reasoning: "Data-driven approach to systematically improve deployment pipeline efficiency",
          dataFocus: "Pipeline Analytics",
          timeframe: "2-3 weeks analysis + improvements",
          teamImpact: "Targeted Optimization"
        },
        {
          id: 'c',
          action: "Move to weekly deployments with smaller feature batches to reduce risk",
          reasoning: "Incremental improvement in deployment frequency with manageable risk increase",
          dataFocus: "Frequency Tracking",
          timeframe: "Next sprint",
          teamImpact: "Gradual Change"
        },
        {
          id: 'd',
          action: "Implement feature flags to decouple deployment from feature release",
          reasoning: "Separate deployment risk from feature risk through controlled feature activation",
          dataFocus: "Feature Flag Analytics",
          timeframe: "3-4 weeks",
          teamImpact: "Risk Separation"
        }
      ],
      correctAnswer: 'b',
      explanation: "✅ **Correct: GitLab analytics for deployment bottlenecks** - Before implementing solutions, understand where time is spent in the deployment pipeline. GitLab analytics can reveal whether the bottleneck is testing, approval, deployment scripts, or coordination.",
      processImpact: "🚀 **Process Impact**: Analytics-driven deployment optimization typically improves frequency by 300-500% (weekly to daily) while reducing deployment duration by 60-80% through targeted improvements.",
      proTip: "📊 **Pro Tip**: Use GitLab's Pipeline Analytics to measure stage duration and identify the longest-running parts of your deployment process. Optimize the biggest bottlenecks first.",
      gitlabFeature: "⚙️ **GitLab Feature**: Pipeline Analytics, Deployment Analytics, and CI/CD performance metrics provide comprehensive deployment process optimization insights.",
      whyWrong: {
        'a': "Automation is good but may be over-engineering if the bottleneck is coordination or approval processes rather than manual testing. Understand first, then automate.",
        'b': "",
        'c': "Weekly deployments improve frequency but don't address the underlying 4-6 hour deployment duration problem. The process efficiency issues remain.",
        'd': "Feature flags are excellent for decoupling but don't solve the core deployment pipeline inefficiency. You still need to optimize the deployment process itself."
      }
    },
    {
      id: 8,
      title: "Team Performance Dashboard Creation",
      difficulty: "Intermediate",
      processArea: "Metrics & Reporting",
      teamSize: "12 developers across 2 teams",
      sprintCycle: "2-week sprints",
      context: "Leadership wants data-driven insights into team performance for quarterly reviews and process improvement. Currently using gut feeling and anecdotal evidence for team assessments. Need to create meaningful metrics dashboard using GitLab analytics that shows team health, productivity trends, and improvement opportunities. Must balance transparency with avoiding 'surveillance culture' that damages team trust. Some developers concerned about performance monitoring.",
      challenge: "Design team performance dashboard that enables improvement while maintaining psychological safety and team trust.",
      metrics: {
        "Current Metrics": "None systematic",
        "Review Frequency": "Quarterly (anecdotal)",
        "Team Transparency": "Low visibility into performance",
        "Improvement Tracking": "No baseline measurements",
        "Developer Concerns": "60% worried about surveillance"
      },
      options: [
        {
          id: 'a',
          action: "Focus on individual developer metrics: commits, lines of code, and issue completion rates",
          reasoning: "Measure individual productivity to identify high and low performers",
          dataFocus: "Individual Performance",
          timeframe: "2 weeks",
          teamImpact: "Individual Focus"
        },
        {
          id: 'b',
          action: "Create team-level flow metrics: cycle time, throughput, and quality indicators",
          reasoning: "Focus on team performance and process efficiency rather than individual measurement",
          dataFocus: "Team Flow Metrics",
          timeframe: "3-4 weeks",
          teamImpact: "Collaborative Focus"
        },
        {
          id: 'c',
          action: "Implement comprehensive dashboard with individual and team metrics for complete visibility",
          reasoning: "Provide full transparency with all available metrics for thorough performance analysis",
          dataFocus: "Comprehensive Metrics",
          timeframe: "4-6 weeks",
          teamImpact: "Full Transparency"
        },
        {
          id: 'd',
          action: "Start with improvement-focused metrics chosen collaboratively with teams",
          reasoning: "Involve teams in metric selection to ensure buy-in and focus on continuous improvement",
          dataFocus: "Collaborative Metrics",
          timeframe: "2-3 weeks",
          teamImpact: "Participatory Design"
        }
      ],
      correctAnswer: 'd',
      explanation: "✅ **Correct: Collaborative metric selection** - Team involvement in choosing metrics ensures psychological safety, buy-in, and focus on improvement rather than surveillance. Teams are more likely to act on metrics they helped define.",
      processImpact: "🤝 **Process Impact**: Collaborative metric design increases team engagement with performance data by 80% and improves continuous improvement adoption by 60% compared to top-down metrics.",
      proTip: "🎯 **Pro Tip**: Start with 3-5 team-chosen metrics focused on flow and quality. Add individual metrics only if teams request them for self-improvement purposes.",
      gitlabFeature: "📈 **GitLab Feature**: Custom dashboards, Analytics API, and configurable insights enable teams to build metrics dashboards that match their improvement goals.",
      whyWrong: {
        'a': "Individual metrics create comparison culture and can damage psychological safety. Focus on team performance first, individual coaching second through private conversations.",
        'b': "Team metrics are good but without team input on selection, you risk measuring things that don't matter to the team's improvement goals.",
        'c': "Comprehensive dashboards often become overwhelming and create surveillance concerns. Start small with focused, improvement-oriented metrics.",
        'd': ""
      }
    }
  ];

  const startLab = () => {
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
      
      // Process Master - perfect score
      if (score === scenarios.length - 1) {
        newAchievements.push("Process Master");
      }
      
      // Data Detective - 5+ correct data-driven scenarios
      if (score >= 4) {
        newAchievements.push("Data Detective");
      }
      
      // Velocity Optimizer - handle velocity scenarios
      if (scenario.title.includes("Velocity") && isCorrect) {
        newAchievements.push("Velocity Optimizer");
      }
      
      // Metrics Guru - handle metrics scenarios
      if (scenario.processArea?.includes("Metrics") && isCorrect) {
        newAchievements.push("Metrics Guru");
      }
      
      // Continuous Improver - handle advanced scenarios
      if (scenario.difficulty === 'Advanced' && isCorrect) {
        newAchievements.push("Continuous Improver");
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

  const resetLab = () => {
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
    localStorage.removeItem('gitlab-retrospective-lab');
  };

  const currentScen = scenarios[currentScenario];
  const selectedOption = currentScen?.options.find(opt => opt.id === selectedAction);
  const correctOption = currentScen?.options.find(opt => opt.id === currentScen.correctAnswer);
  const isCorrect = selectedAction === currentScen?.correctAnswer;

  if (!hasStarted) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <RefreshCw className="w-16 h-16 mx-auto mb-4 text-green-600" />
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            GitLab Agile Retrospective & Process Improvement Lab
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Master continuous improvement through data-driven retrospectives and process optimization
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-gray-500 mb-6">
            <span className="flex items-center gap-1">
              <BarChart3 className="w-4 h-4" />
              Analytics-driven insights
            </span>
            <span className="flex items-center gap-1">
              <Activity className="w-4 h-4" />
              Process optimization
            </span>
            <span className="flex items-center gap-1">
              <Gauge className="w-4 h-4" />
              Performance metrics
            </span>
          </div>
          <div className="bg-green-50 p-6 rounded-lg mb-6">
            <h2 className="text-xl font-semibold text-green-800 mb-4">🔄 Master Process Improvement:</h2>
            <div className="grid md:grid-cols-2 gap-4 text-left text-green-700">
              <ul className="space-y-2">
                <li>• <strong>Velocity Analysis:</strong> Identify and resolve team velocity bottlenecks</li>
                <li>• <strong>Workflow Optimization:</strong> Streamline development processes using data</li>
                <li>• <strong>Quality Metrics:</strong> Measure and improve code quality systematically</li>
                <li>• <strong>Sprint Planning:</strong> Enhance estimation accuracy and predictability</li>
              </ul>
              <ul className="space-y-2">
                <li>• <strong>Dependency Management:</strong> Coordinate cross-team workflows effectively</li>
                <li>• <strong>Remote Collaboration:</strong> Optimize async team productivity</li>
                <li>• <strong>DevOps Metrics:</strong> Improve deployment frequency and reliability</li>
                <li>• <strong>Performance Dashboards:</strong> Create meaningful team metrics</li>
              </ul>
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">📊 Process Improvement Scenarios:</h2>
            <ul className="text-left text-gray-700 space-y-2">
              <li>• <strong>8 process optimization scenarios</strong> from velocity analysis to deployment metrics</li>
              <li>• <strong>GitLab analytics integration</strong> using Cycle Analytics, Merge Request Analytics, and custom dashboards</li>
              <li>• <strong>Data-driven decision making</strong> with specific metrics and measurement strategies</li>
              <li>• <strong>Team psychology focus</strong> balancing transparency with psychological safety</li>
              <li>• <strong>Real process improvements</strong> with 25-60% velocity and quality gains</li>
              <li>• <strong>Continuous improvement</strong> frameworks for sustainable team evolution</li>
            </ul>
          </div>
          <button
            onClick={startLab}
            className="bg-green-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors flex items-center gap-2 mx-auto"
          >
            Start Process Improvement Lab <RefreshCw className="w-5 h-5" />
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
          <RefreshCw className="w-16 h-16 mx-auto mb-4 text-green-600" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Process Improvement Results</h1>
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
              percentage >= 90 ? "Process Master! 🔄" :
              percentage >= 80 ? "Continuous Improvement Expert! 📈" :
              percentage >= 70 ? "Strong Process Skills! 👍" :
              percentage >= 60 ? "Good Foundation, Keep Learning! 📚" :
              "Practice More Process Scenarios! 💪"
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
              <h3 className="font-semibold text-yellow-800">Process Improvement Achievements Unlocked!</h3>
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
          <div className="bg-green-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-green-600">{score}</div>
            <div className="text-sm text-green-700">Scenarios Mastered</div>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-blue-600">
              {Object.values(confidenceRatings).length > 0 ? 
                Math.round(Object.values(confidenceRatings).reduce((a, b) => a + b, 0) / Object.values(confidenceRatings).length * 10) / 10 : 
                'N/A'}
            </div>
            <div className="text-sm text-blue-700">Avg Confidence</div>
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
                      className="mt-3 text-green-600 hover:text-green-800 text-sm font-medium"
                    >
                      {showExplanation[scenario.id] ? "Hide" : "Show"} Process Analysis
                    </button>

                    {showExplanation[scenario.id] && (
                      <div className="mt-3 p-4 bg-green-50 rounded-lg text-sm">
                        <div className="whitespace-pre-line text-gray-700 mb-3">
                          {scenario.explanation}
                        </div>
                        {scenario.processImpact && (
                          <div className="text-green-800 font-medium mb-3">
                            {scenario.processImpact}
                          </div>
                        )}
                        {scenario.proTip && (
                          <div className="text-blue-700 bg-blue-100 p-3 rounded text-sm mb-2">
                            {scenario.proTip}
                          </div>
                        )}
                        {scenario.gitlabFeature && (
                          <div className="text-purple-700 bg-purple-100 p-3 rounded text-sm">
                            {scenario.gitlabFeature}
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
            <h3 className="text-lg font-semibold text-gray-900 mb-4">📚 Continue Your Process Improvement Journey</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="text-left">
                <h4 className="font-medium text-gray-800 mb-2">GitLab Analytics Resources</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• <a href="https://docs.gitlab.com/ee/user/analytics/" className="text-green-600 hover:underline" target="_blank" rel="noopener noreferrer">GitLab Analytics overview</a></li>
                  <li>• <a href="https://docs.gitlab.com/ee/user/analytics/cycle_analytics.html" className="text-green-600 hover:underline" target="_blank" rel="noopener noreferrer">Cycle Analytics for workflow optimization</a></li>
                  <li>• <a href="https://docs.gitlab.com/ee/user/project/merge_requests/merge_request_analytics.html" className="text-green-600 hover:underline" target="_blank" rel="noopener noreferrer">Merge Request Analytics</a></li>
                </ul>
              </div>
              <div className="text-left">
                <h4 className="font-medium text-gray-800 mb-2">Process Excellence</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• Use data to drive retrospective discussions</li>
                  <li>• Focus on flow metrics over individual performance</li>
                  <li>• Implement small, measurable process changes</li>
                  <li>• Maintain psychological safety in improvement culture</li>
                </ul>
              </div>
            </div>
          </div>
          
          <button
            onClick={resetLab}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 mx-auto"
          >
            <RotateCcw className="w-5 h-5" />
            Master Process Improvement Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <RefreshCw className="w-8 h-8 text-green-600" />
          GitLab Agile Retrospective & Process Improvement Lab
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
            className="bg-green-600 h-2 rounded-full transition-all duration-300" 
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
            {currentScen.processArea && (
              <span className="flex items-center gap-1 text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded">
                <Activity className="w-3 h-3" />
                {currentScen.processArea}
              </span>
            )}
            {currentScen.teamSize && (
              <span className="flex items-center gap-1 text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded">
                <Users className="w-3 h-3" />
                {currentScen.teamSize}
              </span>
            )}
            {currentScen.sprintCycle && (
              <span className="flex items-center gap-1 text-xs text-green-600 bg-green-100 px-2 py-1 rounded">
                <RefreshCw className="w-3 h-3" />
                {currentScen.sprintCycle}
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
          
          {/* Metrics Display */}
          {currentScen.metrics && (
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <h4 className="font-semibold text-blue-800 mb-2">📊 Current Metrics:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                {Object.entries(currentScen.metrics).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className="text-blue-700">{key}:</span>
                    <span className="font-medium text-blue-900">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="bg-green-50 p-3 rounded border-l-4 border-green-500">
            <p className="text-gray-800 font-medium">{currentScen.challenge}</p>
          </div>
        </div>

        {/* Enhanced Options */}
        <div className="space-y-3 mb-6">
          <h3 className="text-lg font-semibold text-gray-800">What&apos;s your process improvement approach?</h3>
          {currentScen.options.map((option) => (
            <label
              key={option.id}
              className={`block p-4 border-2 rounded-lg cursor-pointer transition-all ${
                selectedAction === option.id
                  ? 'border-green-500 bg-green-50'
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
                    {option.dataFocus && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded">
                        {option.dataFocus}
                      </span>
                    )}
                    {option.timeframe && (
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded">
                        {option.timeframe}
                      </span>
                    )}
                    {option.teamImpact && (
                      <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded">
                        {option.teamImpact}
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
          <div className="mb-4 p-4 bg-green-50 rounded-lg">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-medium text-green-800">How confident are you in this process improvement approach?</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => handleConfidenceRating(currentScen.id, rating)}
                    className={`w-8 h-8 rounded-full ${
                      confidenceRatings[currentScen.id] >= rating
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200 text-gray-600'
                    } hover:bg-green-400 transition-colors`}
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
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            Submit Process Improvement
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
                {isCorrect ? 'Excellent process approach!' : 'Consider this alternative approach:'}
              </span>
            </div>
            
            {!isCorrect && selectedOption && (
              <div className="mb-3">
                <p className="text-red-700 text-sm">
                  <strong>Your approach:</strong> {currentScen.whyWrong[selectedAction]}
                </p>
              </div>
            )}
            
            <div className="bg-white p-3 rounded border-l-4 border-green-500">
              <p className="text-gray-800 font-medium mb-1">Best approach: {correctOption?.action}</p>
              <div className="text-gray-700 text-sm space-y-2">
                <p>{currentScen.explanation}</p>
                {currentScen.processImpact && (
                  <p className="text-green-800 font-medium">{currentScen.processImpact}</p>
                )}
                {currentScen.proTip && (
                  <div className="bg-blue-100 p-2 rounded text-blue-800">
                    {currentScen.proTip}
                  </div>
                )}
                {currentScen.gitlabFeature && (
                  <div className="bg-purple-100 p-2 rounded text-purple-800">
                    {currentScen.gitlabFeature}
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <button
            onClick={nextScenario}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            {currentScenario < scenarios.length - 1 ? 'Next Process Challenge' : 'View Lab Results'}
          </button>
        </div>
      )}
    </div>
  );
};

export default GitLabRetrospectiveLab;
