'use client';
import React, { useState } from 'react';
import { Target, Calendar, TrendingUp, CheckCircle, AlertCircle, Users, Clock, BarChart3, Lightbulb, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

// Data constants
const okrExamples = [
  {
    category: "Product Growth",
    objective: "Increase user engagement and product stickiness",
    keyResults: [
      "Increase DAU/MAU ratio from 25% to 35%",
      "Reduce user churn rate from 15% to 8%",
      "Achieve 4.5+ app store rating with 500+ reviews"
    ]
  },
  {
    category: "Technical Excellence",
    objective: "Improve system reliability and developer productivity",
    keyResults: [
      "Achieve 99.9% uptime across all critical services",
      "Reduce average build time from 12min to 6min",
      "Decrease critical bug count by 60%"
    ]
  },
  {
    category: "Market Expansion",
    objective: "Successfully enter the European market",
    keyResults: [
      "Launch product in 5 European countries",
      "Acquire 1000 European customers",
      "Generate €500K ARR from European market"
    ]
  }
];

const iterationTemplates = [
  {
    name: "Discovery Sprint",
    duration: "2 weeks",
    focus: "Research, validation, and planning",
    activities: ["User interviews", "Market research", "Technical feasibility", "Prototype development"]
  },
  {
    name: "Build Sprint",
    duration: "3 weeks",
    focus: "Feature development and testing",
    activities: ["Core development", "Unit testing", "Integration work", "Code review"]
  },
  {
    name: "Launch Sprint",
    duration: "2 weeks",
    focus: "Release preparation and go-to-market",
    activities: ["QA testing", "Documentation", "Marketing materials", "Rollout plan"]
  }
];

// Component for the overview step
const OverviewStep = () => (
  <div className="space-y-6">
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        <Lightbulb className="w-6 h-6 text-yellow-500" />
        Why OKRs + Iterations = Strategic Success
      </h3>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <Target className="w-5 h-5 text-blue-600" />
              <h4 className="font-semibold">OKRs Provide Direction</h4>
            </div>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Align teams around business outcomes</li>
              <li>• Create measurable success criteria</li>
              <li>• Enable transparent progress tracking</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="w-5 h-5 text-green-600" />
              <h4 className="font-semibold">Iterations Enable Execution</h4>
            </div>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Break big goals into manageable chunks</li>
              <li>• Create regular checkpoints and feedback loops</li>
              <li>• Maintain momentum with quick wins</li>
            </ul>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h4 className="font-semibold mb-3">🎯 The Magic Combination:</h4>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-2">
              <ArrowRight className="w-4 h-4 text-purple-600 mt-0.5" />
              <div>
                <strong>Strategic clarity</strong> meets <strong>tactical execution</strong>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <ArrowRight className="w-4 h-4 text-purple-600 mt-0.5" />
              <div>
                <strong>Long-term vision</strong> broken into <strong>short-term actions</strong>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <ArrowRight className="w-4 h-4 text-purple-600 mt-0.5" />
              <div>
                <strong>Business outcomes</strong> connected to <strong>daily work</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
      <div className="flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="font-semibold text-yellow-800 mb-1">Most Teams Miss This!</h4>
          <p className="text-yellow-700 text-sm">
            They use OKRs for quarterly planning but never connect them to sprint/iteration execution.
             Or they run sprints without clear connection to strategic objectives. GitLab's integrated
             approach eliminates this gap.
          </p>
        </div>
      </div>
    </div>
    <div className="grid md:grid-cols-3 gap-4">
      {okrExamples.map((example, index) => (
        <div key={index} className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-900 mb-2">{example.category}</h4>
          <div className="text-sm">
            <p className="font-medium text-blue-800 mb-2">Objective:</p>
            <p className="text-gray-700 mb-3">{example.objective}</p>
            <p className="font-medium text-green-800 mb-1">Key Results:</p>
            <ul className="text-gray-600 space-y-1">
              {example.keyResults.map((kr, krIndex) => (
                <li key={krIndex} className="flex items-start gap-1">
                  <span className="text-green-600 mt-0.5">•</span>
                  <span>{kr}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Component for objective definition step
const ObjectiveStep = ({ userInputs, updateInput, showTips, toggleTip }) => (
  <div className="space-y-6">
    <div className="bg-blue-50 p-4 rounded-lg">
      <h3 className="font-semibold text-blue-900 mb-2">Writing Great Objectives</h3>
      <p className="text-blue-800 text-sm mb-3">
        Objectives should be inspirational, qualitative, and time-bound. They answer "What do we want to achieve?"
      </p>
      <div className="grid md:grid-cols-2 gap-4 text-sm">
        <div>
          <h4 className="font-medium text-green-700 mb-1">✅ Good Examples:</h4>
          <ul className="text-green-600 space-y-1">
            <li>• "Become the go-to platform for remote teams"</li>
            <li>• "Deliver exceptional customer experience"</li>
            <li>• "Scale our infrastructure for global growth"</li>
          </ul>
        </div>
        <div>
          <h4 className="font-medium text-red-700 mb-1">❌ Avoid These:</h4>
          <ul className="text-red-600 space-y-1">
            <li>• "Increase revenue" (too generic)</li>
            <li>• "Fix all bugs" (not inspirational)</li>
            <li>• "Do better marketing" (not specific)</li>
          </ul>
        </div>
      </div>
    </div>
    <div className="space-y-4">
      <label className="block">
        <span className="text-lg font-medium text-gray-900 mb-2 block">
          Your Quarterly Objective
        </span>
        <textarea
          value={userInputs.objective}
          onChange={(e) => updateInput('objective', e.target.value)}
          placeholder="e.g., Establish our product as the preferred choice for mid-market companies seeking workflow automation..."
          className="w-full p-4 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 h-24"
        />
      </label>
      <button
        onClick={() => toggleTip('objective')}
        className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1"
      >
        <Lightbulb className="w-4 h-4" />
        {showTips.objective ? 'Hide' : 'Show'} Writing Tips
      </button>
      {showTips.objective && (
        <div className="bg-gray-50 p-4 rounded-lg text-sm">
          <h4 className="font-semibold mb-2">Objective Writing Formula:</h4>
          <div className="space-y-2">
            <p><strong>Verb + What + For Whom + Time Period</strong></p>
            <p className="text-gray-600">
              "Establish our product as the preferred choice for mid-market companies by Q2 2025"
            </p>
            <div className="mt-3">
              <h5 className="font-medium mb-1">Quick Checklist:</h5>
              <ul className="space-y-1 text-gray-600">
                <li>□ Does it inspire and motivate the team?</li>
                <li>□ Is it clear what success looks like?</li>
                <li>□ Can multiple teams contribute to it?</li>
                <li>□ Is it achievable but challenging?</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
);

// Component for key results step
const KeyResultsStep = ({ userInputs, updateKeyResult, showTips, toggleTip }) => (
  <div className="space-y-6">
    <div className="bg-green-50 p-4 rounded-lg">
      <h3 className="font-semibold text-green-900 mb-2">Defining Key Results</h3>
      <p className="text-green-800 text-sm mb-3">
        Key Results are specific, measurable outcomes that prove you've achieved your objective.
         Aim for 2-4 key results per objective.
      </p>
      <div className="text-sm">
        <p className="font-medium mb-1">Good key results are:</p>
        <ul className="text-green-700 space-y-1">
          <li>• <strong>Specific:</strong> No ambiguity about what's being measured</li>
          <li>• <strong>Measurable:</strong> Include numbers, percentages, or clear states</li>
          <li>• <strong>Achievable:</strong> Challenging but realistic with effort</li>
          <li>• <strong>Time-bound:</strong> Clear deadline or timeframe</li>
        </ul>
      </div>
    </div>
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <BarChart3 className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-medium text-gray-900">Your Key Results</h3>
      </div>
      {userInputs.keyResults.map((kr, index) => (
        <div key={index} className="space-y-2">
          <label className="block">
            <span className="text-sm font-medium text-gray-700 mb-1 block">
              Key Result {index + 1}
            </span>
            <input
              type="text"
              value={kr}
              onChange={(e) => updateKeyResult(index, e.target.value)}
              placeholder={`e.g., ${
                index === 0 ? "Increase monthly active users from 10K to 25K" :
                index === 1 ? "Achieve Net Promoter Score of 50+ with 200+ responses" :
                "Reduce customer acquisition cost from $150 to $75"
              }`}
              className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </label>
        </div>
      ))}
      <button
        onClick={() => toggleTip('keyResults')}
        className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1"
      >
        <Lightbulb className="w-4 h-4" />
        {showTips.keyResults ? 'Hide' : 'Show'} Key Result Examples
      </button>
      {showTips.keyResults && (
        <div className="bg-gray-50 p-4 rounded-lg text-sm">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-green-700 mb-2">✅ Strong Key Results:</h4>
              <ul className="text-green-600 space-y-1">
                <li>• "Launch in 3 new markets by Q2"</li>
                <li>• "Achieve 99.9% uptime for 90 days"</li>
                <li>• "Generate $1M ARR from enterprise"</li>
                <li>• "Reduce load time from 3s to 1s"</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-red-700 mb-2">❌ Weak Key Results:</h4>
              <ul className="text-red-600 space-y-1">
                <li>• "Improve user experience"</li>
                <li>• "Better team communication"</li>
                <li>• "Launch new features"</li>
                <li>• "Increase customer satisfaction"</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
);

// Component for iterations step
const IterationsStep = ({ userInputs, updateIterationGoal }) => (
  <div className="space-y-6">
    <div className="bg-purple-50 p-4 rounded-lg">
      <h3 className="font-semibold text-purple-900 mb-2">Planning Iterations</h3>
      <p className="text-purple-800 text-sm mb-3">
        Now we connect strategy to execution! Break your key results into iteration-sized goals
         that teams can complete in 2-3 weeks.
      </p>
    </div>
    <div className="grid gap-4">
      {iterationTemplates.map((template, index) => (
        <div key={index} className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-blue-600" />
              <h4 className="font-semibold text-gray-900">{template.name}</h4>
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                {template.duration}
              </span>
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-3">{template.focus}</p>
          <div className="space-y-3">
            <div>
              <span className="text-xs font-medium text-gray-500 uppercase">Typical Activities:</span>
              <div className="flex flex-wrap gap-2 mt-1">
                {template.activities.map((activity, actIndex) => (
                  <span key={actIndex} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                    {activity}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your goal for this iteration:
              </label>
              <input
                type="text"
                value={userInputs.iterationGoals[template.name] || ''}
                onChange={(e) => updateIterationGoal(template.name, e.target.value)}
                placeholder={`e.g., ${
                  index === 0 ? "Complete user research for 3 target segments" :
                  index === 1 ? "Build and test core authentication system" :
                  "Launch beta to 100 selected users"
                }`}
                className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
    <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
      <div className="flex items-start gap-3">
        <Clock className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="font-semibold text-yellow-800 mb-1">Iteration Planning Pro Tips:</h4>
          <ul className="text-yellow-700 text-sm space-y-1">
            <li>• Each iteration should contribute to at least one Key Result</li>
            <li>• Plan for 70% capacity - leave room for unplanned work</li>
            <li>• Include learning and validation activities, not just development</li>
            <li>• Consider dependencies between teams and iterations</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);

// Component for execution step
const ExecutionStep = ({ userInputs, updateInput, generatedPlan, generatePlan }) => (
  <div className="space-y-6">
    <div className="bg-green-50 p-4 rounded-lg">
      <h3 className="font-semibold text-green-900 mb-2">GitLab Configuration Strategy</h3>
      <p className="text-green-800 text-sm">
        Here's how to set up GitLab to track your OKRs and iterations effectively.
      </p>
    </div>
    <div className="space-y-4">
      <label className="block">
        <span className="text-sm font-medium text-gray-700 mb-1 block">
          Team Capacity (hours per iteration)
        </span>
        <input
          type="number"
          value={userInputs.teamCapacity}
          onChange={(e) => updateInput('teamCapacity', e.target.value)}
          placeholder="e.g., 120 (6 people × 20 hours)"
          className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
      </label>
      <div>
        <span className="text-sm font-medium text-gray-700 mb-2 block">
          Potential Risk Factors
        </span>
        <div className="space-y-2">
          {['External dependencies', 'Technical unknowns', 'Resource constraints', 'Market changes'].map((risk) => (
            <label key={risk} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={userInputs.riskFactors.includes(risk)}
                onChange={(e) => {
                  const newRisks = e.target.checked
                     ? [...userInputs.riskFactors, risk]
                    : userInputs.riskFactors.filter(r => r !== risk);
                  updateInput('riskFactors', newRisks);
                }}
                className="rounded"
              />
              <span className="text-sm text-gray-700">{risk}</span>
            </label>
          ))}
        </div>
      </div>
      <button
        onClick={generatePlan}
        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 font-medium"
      >
        Generate GitLab Setup Plan
      </button>
      {generatedPlan && (
        <div className="mt-6 space-y-4">
          <h3 className="font-semibold text-gray-900 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            Your GitLab Implementation Plan
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">🛠️ GitLab Setup</h4>
              <ul className="text-blue-800 text-sm space-y-1">
                {generatedPlan.gitlabSetup.map((item, index) => (
                  <li key={index} className="flex items-start gap-1">
                    <span className="text-blue-600 mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-medium text-green-900 mb-2">📊 Tracking Strategy</h4>
              <ul className="text-green-800 text-sm space-y-1">
                {generatedPlan.trackingStrategy.map((item, index) => (
                  <li key={index} className="flex items-start gap-1">
                    <span className="text-green-600 mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-medium text-purple-900 mb-2">🎯 Success Metrics</h4>
              <ul className="text-purple-800 text-sm space-y-1">
                {generatedPlan.successMetrics.map((item, index) => (
                  <li key={index} className="flex items-start gap-1">
                    <span className="text-purple-600 mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {userInputs.riskFactors.length > 0 && (
            <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
              <h4 className="font-medium text-yellow-900 mb-2 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                Risk Mitigation Strategy
              </h4>
              <div className="text-yellow-800 text-sm space-y-1">
                {userInputs.riskFactors.map((risk, index) => (
                  <div key={index}>
                    <strong>{risk}:</strong> {
                      risk === 'External dependencies' ? 'Create buffer iterations and fallback plans' :
                      risk === 'Technical unknowns' ? 'Include spike/research iterations early' :
                      risk === 'Resource constraints' ? 'Plan for 70% capacity utilization' :
                      'Build flexibility into iteration commitments'
                    }
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-3">🚀 Next Steps</h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <h5 className="font-medium text-blue-800 mb-2">Week 1: Setup</h5>
                <ul className="text-gray-700 space-y-1">
                  <li>• Configure GitLab groups and projects</li>
                  <li>• Set up iteration cadences</li>
                  <li>• Create OKR tracking issues</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-green-800 mb-2">Week 2: Launch</h5>
                <ul className="text-gray-700 space-y-1">
                  <li>• Train team on new processes</li>
                  <li>• Start first iteration planning</li>
                  <li>• Begin regular check-ins</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
);

// Progress indicator component
const ProgressIndicator = ({ steps, currentStep }) => (
  <div className="mb-8">
    <div className="flex items-center justify-between">
      {steps.map((step, index) => {
        const Icon = step.icon;
        const isActive = index === currentStep;
        const isCompleted = index < currentStep;
        return (
          <div key={step.id} className="flex items-center">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
              isActive
                 ? 'bg-blue-600 border-blue-600 text-white'
                 : isCompleted
                   ? 'bg-green-600 border-green-600 text-white'
                  : 'border-gray-300 text-gray-400'
            }`}>
              <Icon className="w-5 h-5" />
            </div>
            {index < steps.length - 1 && (
              <div className={`w-8 h-0.5 mx-2 ${
                isCompleted ? 'bg-green-600' : 'bg-gray-300'
              }`} />
            )}
          </div>
        );
      })}
    </div>
    <div className="mt-4 text-center">
      <h2 className="text-xl font-semibold text-gray-900">{steps[currentStep].title}</h2>
      <p className="text-gray-600 text-sm mt-1">{steps[currentStep].description}</p>
    </div>
  </div>
);

// Main component
const GitLabOKRPlanningWorkshop = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [userInputs, setUserInputs] = useState({
    objective: '',
    keyResults: ['', '', ''],
    iterationGoals: {},
    teamCapacity: '',
    riskFactors: []
  });
  const [generatedPlan, setGeneratedPlan] = useState(null);
  const [showTips, setShowTips] = useState({});

  const steps = [
    {
      id: 'overview',
      title: 'OKRs + Iterations: The Power Combo',
      icon: Target,
      description: 'Learn how GitLab\'s OKRs and Iterations work together for strategic execution'
    },
    {
      id: 'objective',
      title: 'Define Your Objective',
      icon: TrendingUp,
      description: 'Create a meaningful objective that drives business impact'
    },
    {
      id: 'key-results',
      title: 'Set Key Results',
      icon: BarChart3,
      description: 'Define measurable outcomes that prove objective success'
    },
    {
      id: 'iterations',
      title: 'Plan Iterations',
      icon: Calendar,
      description: 'Break down key results into time-boxed iterations'
    },
    {
      id: 'execution',
      title: 'Execution Strategy',
      icon: CheckCircle,
      description: 'Configure GitLab for tracking and accountability'
    }
  ];

  const updateInput = (field, value) => {
    setUserInputs(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const updateKeyResult = (index, value) => {
    const newKeyResults = [...userInputs.keyResults];
    newKeyResults[index] = value;
    updateInput('keyResults', newKeyResults);
  };

  const updateIterationGoal = (iteration, goal) => {
    setUserInputs(prev => ({
      ...prev,
      iterationGoals: {
        ...prev.iterationGoals,
        [iteration]: goal
      }
    }));
  };

  const toggleTip = (tipId) => {
    setShowTips(prev => ({
      ...prev,
      [tipId]: !prev[tipId]
    }));
  };

  const generatePlan = () => {
    const plan = {
      gitlabSetup: [
        "Create OKR hierarchy in GitLab (Group > Project level)",
        "Set up iteration cadences (2-3 week cycles recommended)",
        "Configure issue templates for consistent planning",
        "Enable iteration reports and burndown tracking"
      ],
      trackingStrategy: [
        "Weekly OKR check-ins during iteration reviews",
        "Key result progress updates every iteration",
        "Risk assessment and mitigation planning",
        "Cross-team dependency tracking"
      ],
      successMetrics: [
        "Iteration completion rate > 80%",
        "Key result confidence levels trending up",
        "Team velocity consistency across iterations",
        "OKR achievement rate at quarter end"
      ]
    };
    setGeneratedPlan(plan);
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <OverviewStep />;
      case 1:
        return <ObjectiveStep userInputs={userInputs} updateInput={updateInput} showTips={showTips} toggleTip={toggleTip} />;
      case 2:
        return <KeyResultsStep userInputs={userInputs} updateKeyResult={updateKeyResult} showTips={showTips} toggleTip={toggleTip} />;
      case 3:
        return <IterationsStep userInputs={userInputs} updateIterationGoal={updateIterationGoal} />;
      case 4:
        return <ExecutionStep userInputs={userInputs} updateInput={updateInput} generatedPlan={generatedPlan} generatePlan={generatePlan} />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-lg">
        <ProgressIndicator steps={steps} currentStep={currentStep} />

        <div className="mt-8 min-h-[300px]">
          {renderStepContent()}
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 flex justify-between items-center">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            Previous
          </button>

          {currentStep < steps.length - 1 ? (
            <button
              onClick={nextStep}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Next
              <ChevronRight className="w-5 h-5" />
            </button>
          ) : (
             <button
                onClick={() => {
                  setCurrentStep(0);
                  setGeneratedPlan(null);
                  setUserInputs({
                    objective: '',
                    keyResults: ['', '', ''],
                    iterationGoals: {},
                    teamCapacity: '',
                    riskFactors: []
                  });
                }}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
             >
                Restart Workshop
             </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default GitLabOKRPlanningWorkshop;