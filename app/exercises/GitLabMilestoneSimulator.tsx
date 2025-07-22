'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Calendar, Target, Users, CheckCircle, AlertCircle, Clock, BookOpen, Award, RotateCcw } from 'lucide-react';

interface Issue {
  id: string;
  title: string;
  storyPoints: number;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignee: string;
  type: 'feature' | 'bug' | 'content' | 'documentation' | 'testing';
  status: 'open' | 'assigned';
}

interface Milestone {
  name: string;
  description: string;
  dueDate: string;
  issues: Issue[];
}

interface SimulatorStep {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  validationErrors: string[];
}

const GitLabMilestoneSimulator = () => {
  const [currentMode, setCurrentMode] = useState<'learn' | 'simulate' | 'completed'>('learn');
  const [currentStep, setCurrentStep] = useState(1);
  const [milestone, setMilestone] = useState<Milestone>({
    name: '',
    description: '',
    dueDate: '',
    issues: []
  });

  const [teamCapacity, setTeamCapacity] = useState({
    teamSize: 4,
    sprintDuration: 10,
    availability: 80,
    velocity: 2.5
  });

  const [availableIssues] = useState<Issue[]>([
    {
      id: '1',
      title: 'Update GitLab CI/CD slides with latest features',
      storyPoints: 8,
      priority: 'high',
      assignee: '',
      type: 'content',
      status: 'open'
    },
    {
      id: '2', 
      title: 'Create interactive merge request exercise',
      storyPoints: 5,
      priority: 'medium',
      assignee: '',
      type: 'feature',
      status: 'open'
    },
    {
      id: '3',
      title: 'Fix responsive design issues in slide viewer',
      storyPoints: 3,
      priority: 'high',
      assignee: '',
      type: 'bug',
      status: 'open'
    },
    {
      id: '4',
      title: 'Add accessibility compliance checks',
      storyPoints: 5,
      priority: 'medium',
      assignee: '',
      type: 'testing',
      status: 'open'
    },
    {
      id: '5',
      title: 'Update trainer documentation',
      storyPoints: 2,
      priority: 'low',
      assignee: '',
      type: 'documentation',
      status: 'open'
    },
    {
      id: '6',
      title: 'Implement dark mode for slide viewer',
      storyPoints: 8,
      priority: 'medium',
      assignee: '',
      type: 'feature',
      status: 'open'
    }
  ]);

  const [achievements, setAchievements] = useState<string[]>([]);
  const [simulatorSteps, setSimulatorSteps] = useState<SimulatorStep[]>([
    {
      id: 1,
      title: 'Create Milestone',
      description: 'Set up your sprint milestone with proper naming and description',
      completed: false,
      validationErrors: []
    },
    {
      id: 2,
      title: 'Calculate Capacity',
      description: 'Determine your team\'s sprint capacity using the provided formula',
      completed: false,
      validationErrors: []
    },
    {
      id: 3,
      title: 'Add Issues',
      description: 'Select and assign issues to your milestone within capacity limits',
      completed: false,
      validationErrors: []
    },
    {
      id: 4,
      title: 'Validate Sprint',
      description: 'Review and validate your complete sprint setup',
      completed: false,
      validationErrors: []
    }
  ]);

  const calculateTotalCapacity = () => {
    const { teamSize, sprintDuration, availability, velocity } = teamCapacity;
    return Math.round(teamSize * sprintDuration * (availability / 100) * velocity);
  };

  const getCurrentStoryPoints = () => {
    return milestone.issues.reduce((sum, issue) => sum + issue.storyPoints, 0);
  };

  const validateStep = (stepId: number): string[] => {
    const errors: string[] = [];
    
    switch (stepId) {
      case 1:
        if (!milestone.name.trim()) errors.push('Milestone name is required');
        if (!milestone.name.match(/^Sprint \d+ - .+ - .+$/)) {
          errors.push('Use naming convention: Sprint [Number] - [Theme] - [Dates]');
        }
        if (!milestone.description.trim()) errors.push('Milestone description is required');
        if (!milestone.dueDate) errors.push('Due date is required');
        break;
        
      case 2:
        const capacity = calculateTotalCapacity();
        if (capacity < 20) errors.push('Team capacity seems too low (< 20 story points)');
        if (capacity > 200) errors.push('Team capacity seems too high (> 200 story points)');
        break;
        
      case 3:
        if (milestone.issues.length === 0) errors.push('At least one issue must be assigned');
        const currentPoints = getCurrentStoryPoints();
        const maxCapacity = calculateTotalCapacity();
        if (currentPoints > maxCapacity) {
          errors.push(`Story points (${currentPoints}) exceed team capacity (${maxCapacity})`);
        }
        if (currentPoints < maxCapacity * 0.2) {
          errors.push('Consider adding more work - team is under-utilized');
        }
        break;
        
      case 4:
        const finalCapacity = calculateTotalCapacity();
        const finalPoints = getCurrentStoryPoints();
        const utilization = (finalPoints / finalCapacity) * 100;
        if (utilization < 50) errors.push('Team utilization is quite low - consider adding more work');
        if (utilization > 90) errors.push('Team is over-committed - consider reducing scope');
        break;
    }
    
    return errors;
  };

  const completeStep = (stepId: number) => {
    const errors = validateStep(stepId);
    const updatedSteps = simulatorSteps.map(step => {
      if (step.id === stepId) {
        return {
          ...step,
          completed: errors.length === 0,
          validationErrors: errors
        };
      }
      return step;
    });
    
    setSimulatorSteps(updatedSteps);
    
    if (errors.length === 0) {
      if (stepId < 4) {
        setCurrentStep(stepId + 1);
      } else {
        // All steps completed
        checkAchievements();
        setCurrentMode('completed');
      }
    }
  };

  const checkAchievements = () => {
    const newAchievements: string[] = [];
    const capacity = calculateTotalCapacity();
    const points = getCurrentStoryPoints();
    const utilization = (points / capacity) * 100;
    
    if (milestone.name.includes('Sprint')) newAchievements.push('Sprint Master');
    if (utilization >= 70 && utilization <= 85) newAchievements.push('Perfect Balance');
    if (milestone.issues.length >= 4) newAchievements.push('Issue Organizer');
    if (milestone.description.length > 200) newAchievements.push('Detailed Planner');
    
    setAchievements(newAchievements);
  };

  const addIssueToMilestone = (issue: Issue) => {
    const updatedIssue = { ...issue, status: 'assigned' as const };
    setMilestone(prev => ({
      ...prev,
      issues: [...prev.issues, updatedIssue]
    }));
  };

  const removeIssueFromMilestone = (issueId: string) => {
    setMilestone(prev => ({
      ...prev,
      issues: prev.issues.filter(issue => issue.id !== issueId)
    }));
  };

  const resetSimulator = () => {
    setCurrentMode('learn');
    setCurrentStep(1);
    setMilestone({ name: '', description: '', dueDate: '', issues: [] });
    setTeamCapacity({ teamSize: 4, sprintDuration: 10, availability: 80, velocity: 2.5 });
    setAchievements([]);
    setSimulatorSteps(simulatorSteps.map(step => ({ ...step, completed: false, validationErrors: [] })));
  };

  // Learning mode - Introduction
  if (currentMode === 'learn') {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <Target className="w-16 h-16 mx-auto mb-4 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            GitLab Milestone Creation Simulator
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Practice creating sprint milestones without needing access to GitLab
          </p>
          
          <div className="bg-blue-50 p-6 rounded-lg mb-6">
            <h2 className="text-xl font-semibold text-blue-800 mb-4">🎯 What You\'ll Learn:</h2>
            <div className="grid md:grid-cols-2 gap-4 text-left text-blue-700">
              <ul className="space-y-2">
                <li>• <strong>Milestone Creation:</strong> Proper naming conventions and setup</li>
                <li>• <strong>Capacity Planning:</strong> Calculate realistic team capacity</li>
                <li>• <strong>Issue Management:</strong> Assign work within capacity limits</li>
                <li>• <strong>Sprint Validation:</strong> Ensure balanced, achievable sprints</li>
              </ul>
              <ul className="space-y-2">
                <li>• <strong>Story Point Allocation:</strong> Balance team workload effectively</li>
                <li>• <strong>Priority Management:</strong> Handle high/medium/low priority work</li>
                <li>• <strong>Team Coordination:</strong> Consider availability and velocity</li>
                <li>• <strong>Quality Standards:</strong> Apply GitLab best practices</li>
              </ul>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">📋 Simulation Steps:</h2>
            <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <Target className="w-4 h-4" />
                1. Create Milestone
              </span>
              <span>→</span>
              <span className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                2. Calculate Capacity
              </span>
              <span>→</span>
              <span className="flex items-center gap-1">
                <BookOpen className="w-4 h-4" />
                3. Add Issues
              </span>
              <span>→</span>
              <span className="flex items-center gap-1">
                <CheckCircle className="w-4 h-4" />
                4. Validate Sprint
              </span>
            </div>
          </div>

          <button
            onClick={() => setCurrentMode('simulate')}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2 mx-auto"
          >
            Start Milestone Simulator <Target className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  // Completion screen
  if (currentMode === 'completed') {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white">
        <div className="text-center mb-8">
          <Award className="w-16 h-16 mx-auto mb-4 text-green-600" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Milestone Simulation Complete!</h1>
          <div className="text-6xl font-bold mb-2 text-green-600">
            ✓
          </div>
          <div className="text-xl text-green-600">
            Ready for Real GitLab! 🎯
          </div>
        </div>

        {/* Results Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-blue-600">{getCurrentStoryPoints()}</div>
            <div className="text-sm text-blue-700">Story Points Committed</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-green-600">{calculateTotalCapacity()}</div>
            <div className="text-sm text-green-700">Team Capacity</div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-purple-600">
              {Math.round((getCurrentStoryPoints() / calculateTotalCapacity()) * 100)}%
            </div>
            <div className="text-sm text-purple-700">Utilization</div>
          </div>
        </div>

        {/* Achievements */}
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

        {/* Your Milestone Summary */}
        <div className="bg-gray-50 p-6 rounded-lg mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">📋 Your Milestone Summary</h3>
          <div className="space-y-2 text-sm">
            <div><strong>Name:</strong> {milestone.name}</div>
            <div><strong>Due Date:</strong> {milestone.dueDate}</div>
            <div><strong>Issues:</strong> {milestone.issues.length} items</div>
            <div><strong>Team Size:</strong> {teamCapacity.teamSize} people</div>
            <div><strong>Sprint Duration:</strong> {teamCapacity.sprintDuration} days</div>
            <div><strong>Availability:</strong> {teamCapacity.availability}%</div>
          </div>
        </div>

        <div className="text-center space-y-4">
          <div className="bg-green-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-green-900 mb-4">🚀 Ready for Real GitLab!</h3>
            <p className="text-green-700 mb-4">
              You\'ve successfully simulated creating a GitLab milestone. Now you\'re ready to apply these skills in an actual GitLab environment.
            </p>
            <div className="text-sm text-green-600 text-left">
              <strong>Next Steps:</strong>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Access a real GitLab repository</li>
                <li>Navigate to Issues → Milestones</li>
                <li>Apply the same process you just practiced</li>
                <li>Use GitLab Duo Chat for additional assistance</li>
              </ul>
            </div>
          </div>
          
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => setCurrentMode('simulate')}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Practice Again
            </button>
            <button
              onClick={resetSimulator}
              className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2"
            >
              <RotateCcw className="w-5 h-5" />
              Start Over
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Main simulation interface
  const currentStepData = simulatorSteps.find(step => step.id === currentStep);
  const capacity = calculateTotalCapacity();
  const currentPoints = getCurrentStoryPoints();
  const utilizationPercent = capacity > 0 ? Math.round((currentPoints / capacity) * 100) : 0;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-2">
          <Target className="text-blue-600" />
          GitLab Milestone Simulator
        </h1>
        <p className="text-gray-600">Step-by-step milestone creation practice</p>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {simulatorSteps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                step.completed ? 'bg-green-500 text-white' : 
                step.id === currentStep ? 'bg-blue-500 text-white' : 
                'bg-gray-200 text-gray-600'
              }`}>
                {step.completed ? '✓' : step.id}
              </div>
              <div className={`ml-2 text-sm ${step.id === currentStep ? 'font-semibold text-blue-600' : 'text-gray-600'}`}>
                {step.title}
              </div>
              {index < simulatorSteps.length - 1 && (
                <div className="mx-4 w-8 h-0.5 bg-gray-300"></div>
              )}
            </div>
          ))}
        </div>
        
        {currentStepData && (
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-2">{currentStepData.title}</h3>
            <p className="text-blue-700">{currentStepData.description}</p>
            {currentStepData.validationErrors.length > 0 && (
              <div className="mt-2">
                {currentStepData.validationErrors.map((error, index) => (
                  <div key={index} className="flex items-center gap-2 text-red-600 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    {error}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Step 1: Create Milestone */}
          {currentStep >= 1 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="text-blue-600" size={20} />
                  Step 1: Create Milestone
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Milestone Name *
                  </label>
                  <input
                    type="text"
                    value={milestone.name}
                    onChange={(e) => setMilestone(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Sprint 13 - Platform Enhancement - July 21 - Aug 4, 2025"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                  <p className="text-xs text-gray-500 mt-1">Format: Sprint [Number] - [Theme] - [Dates]</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description *
                  </label>
                  <textarea
                    value={milestone.description}
                    onChange={(e) => setMilestone(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe the sprint goal and objectives..."
                    rows={3}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Due Date *
                  </label>
                  <input
                    type="date"
                    value={milestone.dueDate}
                    onChange={(e) => setMilestone(prev => ({ ...prev, dueDate: e.target.value }))}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>

                {currentStep === 1 && (
                  <button
                    onClick={() => completeStep(1)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Complete Step 1
                  </button>
                )}
              </CardContent>
            </Card>
          )}

          {/* Step 2: Calculate Capacity */}
          {currentStep >= 2 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="text-green-600" size={20} />
                  Step 2: Team Capacity Planning
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Team Size
                    </label>
                    <input
                      type="number"
                      value={teamCapacity.teamSize}
                      onChange={(e) => setTeamCapacity(prev => ({ ...prev, teamSize: parseInt(e.target.value) || 0 }))}
                      min="1"
                      max="20"
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Sprint Duration (days)
                    </label>
                    <input
                      type="number"
                      value={teamCapacity.sprintDuration}
                      onChange={(e) => setTeamCapacity(prev => ({ ...prev, sprintDuration: parseInt(e.target.value) || 0 }))}
                      min="1"
                      max="30"
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Availability (%)
                    </label>
                    <input
                      type="number"
                      value={teamCapacity.availability}
                      onChange={(e) => setTeamCapacity(prev => ({ ...prev, availability: parseInt(e.target.value) || 0 }))}
                      min="1"
                      max="100"
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Velocity (pts/person/day)
                    </label>
                    <input
                      type="number"
                      step="0.5"
                      value={teamCapacity.velocity}
                      onChange={(e) => setTeamCapacity(prev => ({ ...prev, velocity: parseFloat(e.target.value) || 0 }))}
                      min="0.5"
                      max="10"
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">Capacity Calculation:</h4>
                  <p className="text-green-700 text-sm mb-2">
                    {teamCapacity.teamSize} × {teamCapacity.sprintDuration} × {teamCapacity.availability}% × {teamCapacity.velocity} = <strong>{capacity} story points</strong>
                  </p>
                  <p className="text-green-600 text-xs">
                    This is your team\'s maximum capacity for this sprint.
                  </p>
                </div>

                {currentStep === 2 && (
                  <button
                    onClick={() => completeStep(2)}
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                  >
                    Complete Step 2
                  </button>
                )}
              </CardContent>
            </Card>
          )}

          {/* Step 3: Add Issues */}
          {currentStep >= 3 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="text-purple-600" size={20} />
                  Step 3: Issue Management
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <h4 className="font-semibold text-gray-800">Available Issues:</h4>
                <div className="grid gap-2">
                  {availableIssues.map(issue => {
                    const isAssigned = milestone.issues.some(assigned => assigned.id === issue.id);
                    return (
                      <div key={issue.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex-1">
                          <div className="font-medium text-sm">{issue.title}</div>
                          <div className="text-xs text-gray-500">
                            {issue.storyPoints} pts • {issue.priority} priority • {issue.type}
                          </div>
                        </div>
                        <button
                          onClick={() => isAssigned ? removeIssueFromMilestone(issue.id) : addIssueToMilestone(issue)}
                          className={`px-3 py-1 text-xs rounded-md transition-colors ${
                            isAssigned 
                              ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                              : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                          }`}
                        >
                          {isAssigned ? 'Remove' : 'Add'}
                        </button>
                      </div>
                    );
                  })}
                </div>

                {currentStep === 3 && (
                  <button
                    onClick={() => completeStep(3)}
                    className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
                  >
                    Complete Step 3
                  </button>
                )}
              </CardContent>
            </Card>
          )}

          {/* Step 4: Validate Sprint */}
          {currentStep >= 4 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="text-green-600" size={20} />
                  Step 4: Sprint Validation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{currentPoints}</div>
                    <div className="text-sm text-blue-700">Committed Points</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{capacity}</div>
                    <div className="text-sm text-green-700">Total Capacity</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{utilizationPercent}%</div>
                    <div className="text-sm text-purple-700">Utilization</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-800">Sprint Health Check:</h4>
                  <div className="space-y-1 text-sm">
                    <div className={`flex items-center gap-2 ${milestone.name ? 'text-green-600' : 'text-red-600'}`}>
                      {milestone.name ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                      Milestone has a clear name
                    </div>
                    <div className={`flex items-center gap-2 ${milestone.issues.length > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {milestone.issues.length > 0 ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                      Issues assigned to milestone
                    </div>
                    <div className={`flex items-center gap-2 ${currentPoints <= capacity ? 'text-green-600' : 'text-red-600'}`}>
                      {currentPoints <= capacity ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                      Within team capacity
                    </div>
                    <div className={`flex items-center gap-2 ${utilizationPercent >= 50 && utilizationPercent <= 85 ? 'text-green-600' : 'text-yellow-600'}`}>
                      {utilizationPercent >= 50 && utilizationPercent <= 85 ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                      Good team utilization (50-85%)
                    </div>
                  </div>
                </div>

                {currentStep === 4 && (
                  <button
                    onClick={() => completeStep(4)}
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                  >
                    Complete Sprint Setup
                  </button>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Current Milestone Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Current Milestone</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <div className="text-sm font-medium text-gray-700">Name:</div>
                <div className="text-sm text-gray-600">{milestone.name || 'Not set'}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-700">Due Date:</div>
                <div className="text-sm text-gray-600">{milestone.dueDate || 'Not set'}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-700">Issues:</div>
                <div className="text-sm text-gray-600">{milestone.issues.length} assigned</div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-700">Story Points:</div>
                <div className={`text-sm ${currentPoints <= capacity ? 'text-green-600' : 'text-red-600'}`}>
                  {currentPoints} / {capacity}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tips & Help */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Tips
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-gray-600">
              <div>• Use consistent naming conventions</div>
              <div>• Keep team utilization between 60-80%</div>
              <div>• Balance different types of work</div>
              <div>• Consider team availability realistically</div>
              <div>• Start conservative with new teams</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GitLabMilestoneSimulator;
