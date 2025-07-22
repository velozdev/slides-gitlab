import React, { useState, useEffect } from 'react';
import { Calendar, Users, Target, CheckSquare, Plus, Save, Clock, Award, TrendingUp, RotateCcw, BookOpen } from 'lucide-react';

interface Issue {
  id: number;
  title: string;
  storyPoints: number;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignee: string;
}

interface NewIssue {
  title: string;
  storyPoints: number;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignee: string;
}

interface Milestone {
  name: string;
  type: 'sprint' | 'release';
  sprintGoal: string;
  startDate: string;
  endDate: string;
  teamMembers: number;
  availabilityPercentage: number;
  storyPointsPerDay: number;
  successCriteria: string[];
  definitionOfDone: string[];
  issues: Issue[];
}

const GitLabMilestonesAndEpics = () => {
  const [currentMode, setCurrentMode] = useState<'learn' | 'practice' | 'completed'>('learn');
  const [achievements, setAchievements] = useState<string[]>([]);
  const [milestonesCreated, setMilestonesCreated] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  
  const [milestone, setMilestone] = useState<Milestone>({
    name: '',
    type: 'sprint',
    sprintGoal: '',
    startDate: '',
    endDate: '',
    teamMembers: 5,
    availabilityPercentage: 80,
    storyPointsPerDay: 3,
    successCriteria: [''],
    definitionOfDone: [
      'Code reviewed and approved',
      'Unit tests written and passing',
      'Integration tests passing',
      'Documentation updated'
    ],
    issues: []
  });

  const [newIssue, setNewIssue] = useState<NewIssue>({
    title: '',
    storyPoints: 1,
    priority: 'medium',
    assignee: ''
  });

  // Load progress from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem('gitlab-milestones-epics');
    if (savedProgress) {
      const data = JSON.parse(savedProgress);
      setMilestonesCreated(data.milestonesCreated || 0);
      setAchievements(data.achievements || []);
    }
  }, []);

  // Save progress to localStorage
  useEffect(() => {
    if (hasStarted) {
      const progressData = {
        milestonesCreated,
        achievements,
        lastUpdate: Date.now()
      };
      localStorage.setItem('gitlab-milestones-epics', JSON.stringify(progressData));
    }
  }, [milestonesCreated, achievements, hasStarted]);

  const calculateCapacity = () => {
    const sprintDays = getSprintDays();
    const totalCapacity = milestone.teamMembers * sprintDays * (milestone.availabilityPercentage / 100) * milestone.storyPointsPerDay;
    return Math.round(totalCapacity);
  };

  const getSprintDays = () => {
    if (!milestone.startDate || !milestone.endDate) return 10; // default 2 weeks
    const start = new Date(milestone.startDate);
    const end = new Date(milestone.endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    // Exclude weekends (rough calculation)
    return Math.round(diffDays * 0.714); // ~5/7 days are weekdays
  };

  const getCurrentStoryPoints = () => {
    return milestone.issues.reduce((total, issue) => total + issue.storyPoints, 0);
  };

  const updateMilestone = (field: keyof Milestone, value: any) => {
    setMilestone(prev => ({ ...prev, [field]: value }));
  };

  const addSuccessCriteria = () => {
    setMilestone(prev => ({
      ...prev,
      successCriteria: [...prev.successCriteria, '']
    }));
  };

  const updateSuccessCriteria = (index: number, value: string) => {
    setMilestone(prev => ({
      ...prev,
      successCriteria: prev.successCriteria.map((item, i) => i === index ? value : item)
    }));
  };

  const removeSuccessCriteria = (index: number) => {
    setMilestone(prev => ({
      ...prev,
      successCriteria: prev.successCriteria.filter((_, i) => i !== index)
    }));
  };

  const addIssue = () => {
    if (!newIssue.title) return;
    
    setMilestone(prev => ({
      ...prev,
      issues: [...prev.issues, { ...newIssue, id: Date.now() } as Issue]
    }));
    
    setNewIssue({
      title: '',
      storyPoints: 1,
      priority: 'medium',
      assignee: ''
    });
  };

  const removeIssue = (issueId: number) => {
    setMilestone(prev => ({
      ...prev,
      issues: prev.issues.filter(issue => issue.id !== issueId)
    }));
  };

  const generateMilestoneName = () => {
    const type = milestone.type === 'sprint' ? 'Sprint' : 'Release';
    const date = new Date().toISOString().slice(0, 7).replace('-', '.');
    const version = milestone.type === 'sprint' ? Math.floor(Math.random() * 50) + 1 : '1.0';
    return `${type} ${date}.${version}`;
  };

  const checkForAchievements = () => {
    const newAchievements: string[] = [];
    
    if (milestonesCreated >= 1 && !achievements.includes('First Milestone')) {
      newAchievements.push('First Milestone');
    }
    
    if (milestonesCreated >= 5 && !achievements.includes('Milestone Master')) {
      newAchievements.push('Milestone Master');
    }
    
    if (milestone.issues.length >= 10 && !achievements.includes('Backlog Builder')) {
      newAchievements.push('Backlog Builder');
    }
    
    const capacity = calculateCapacity();
    const current = getCurrentStoryPoints();
    if (current > 0 && current <= capacity && !achievements.includes('Capacity Planner')) {
      newAchievements.push('Capacity Planner');
    }
    
    if (newAchievements.length > 0) {
      setAchievements(prev => [...new Set([...prev, ...newAchievements])]);
    }
  };

  const saveMilestone = () => {
    const milestoneData = {
      ...milestone,
      capacity: calculateCapacity(),
      currentPoints: getCurrentStoryPoints(),
      createdAt: new Date().toISOString()
    };
    
    // Increment milestones created
    setMilestonesCreated(prev => prev + 1);
    setHasStarted(true);
    
    // Check for achievements
    checkForAchievements();
    
    // In a real app, this would save to a backend
    console.log('Saving milestone:', milestoneData);
    alert(`Milestone "${milestone.name}" saved successfully!\n\nCapacity: ${calculateCapacity()} story points\nCurrent allocation: ${getCurrentStoryPoints()} story points`);
    
    // Reset form for next milestone
    setMilestone({
      name: '',
      type: 'sprint',
      sprintGoal: '',
      startDate: '',
      endDate: '',
      teamMembers: 5,
      availabilityPercentage: 80,
      storyPointsPerDay: 3,
      successCriteria: [''],
      definitionOfDone: [
        'Code reviewed and approved',
        'Unit tests written and passing',
        'Integration tests passing',
        'Documentation updated'
      ],
      issues: []
    });
  };

  const capacityColor = () => {
    const current = getCurrentStoryPoints();
    const capacity = calculateCapacity();
    const ratio = current / capacity;
    
    if (ratio <= 0.8) return 'text-green-600';
    if (ratio <= 1.0) return 'text-yellow-600';
    return 'text-red-600';
  };

  const resetWorkshop = () => {
    setCurrentMode('learn');
    setMilestonesCreated(0);
    setAchievements([]);
    setHasStarted(false);
    localStorage.removeItem('gitlab-milestones-epics');
    setMilestone({
      name: '',
      type: 'sprint',
      sprintGoal: '',
      startDate: '',
      endDate: '',
      teamMembers: 5,
      availabilityPercentage: 80,
      storyPointsPerDay: 3,
      successCriteria: [''],
      definitionOfDone: [
        'Code reviewed and approved',
        'Unit tests written and passing',
        'Integration tests passing',
        'Documentation updated'
      ],
      issues: []
    });
  };

  // Landing page for the workshop
  if (currentMode === 'learn') {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <Target className="w-16 h-16 mx-auto mb-4 text-purple-600" />
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            GitLab Milestones & Epics Workshop
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Master milestone planning, sprint capacity management, and epic organization
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-gray-500 mb-6">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              Sprint planning
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              Capacity management
            </span>
            <span className="flex items-center gap-1">
              <Target className="w-4 h-4" />
              Goal setting
            </span>
          </div>
          <div className="bg-purple-50 p-6 rounded-lg mb-6">
            <h2 className="text-xl font-semibold text-purple-800 mb-4">🎯 Master Milestone Management:</h2>
            <div className="grid md:grid-cols-2 gap-4 text-left text-purple-700">
              <ul className="space-y-2">
                <li>• <strong>Sprint Planning:</strong> Create realistic sprint goals and timelines</li>
                <li>• <strong>Capacity Calculation:</strong> Factor in team size, availability, and velocity</li>
                <li>• <strong>Backlog Management:</strong> Organize issues with proper story point estimation</li>
                <li>• <strong>Success Criteria:</strong> Define clear, measurable sprint objectives</li>
              </ul>
              <ul className="space-y-2">
                <li>• <strong>Team Coordination:</strong> Align multiple team members and stakeholders</li>
                <li>• <strong>Risk Assessment:</strong> Identify potential blockers and dependencies</li>
                <li>• <strong>Definition of Done:</strong> Establish quality standards and exit criteria</li>
                <li>• <strong>Progress Tracking:</strong> Monitor sprint progress and adjust as needed</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">📋 What You'll Practice:</h2>
            <ul className="text-left text-gray-700 space-y-2">
              <li>• <strong>Interactive milestone creation</strong> with real capacity calculations</li>
              <li>• <strong>Sprint goal definition</strong> and success criteria planning</li>
              <li>• <strong>Team capacity planning</strong> considering availability and velocity</li>
              <li>• <strong>Issue management</strong> with story point estimation and prioritization</li>
              <li>• <strong>Achievement system</strong> to track your milestone planning skills</li>
              <li>• <strong>Best practices</strong> from real GitLab project management workflows</li>
            </ul>
          </div>

          <button
            onClick={() => setCurrentMode('practice')}
            className="bg-purple-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-purple-700 transition-colors flex items-center gap-2 mx-auto"
          >
            Start Milestone Workshop <Target className="w-5 h-5" />
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
          <Target className="w-16 h-16 mx-auto mb-4 text-purple-600" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Milestone Workshop Results</h1>
          <div className="text-6xl font-bold mb-2 text-purple-600">
            {milestonesCreated}
          </div>
          <div className="text-xl text-purple-600">
            Milestones Created! 🎯
          </div>
        </div>

        {/* Achievements Section */}
        {achievements.length > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Award className="w-5 h-5 text-yellow-600" />
              <h3 className="font-semibold text-yellow-800">Milestone Management Achievements Unlocked!</h3>
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-purple-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-purple-600">{milestonesCreated}</div>
            <div className="text-sm text-purple-700">Milestones Created</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-green-600">{achievements.length}</div>
            <div className="text-sm text-green-700">Achievements</div>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-blue-600">Expert</div>
            <div className="text-sm text-blue-700">Skill Level</div>
          </div>
        </div>

        <div className="mt-8 text-center space-y-4">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">📚 Continue Your GitLab Journey</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="text-left">
                <h4 className="font-medium text-gray-800 mb-2">GitLab Milestone Resources</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• <a href="https://docs.gitlab.com/ee/user/project/milestones/" className="text-purple-600 hover:underline" target="_blank" rel="noopener noreferrer">GitLab Milestones Documentation</a></li>
                  <li>• <a href="https://docs.gitlab.com/ee/user/group/epics/" className="text-purple-600 hover:underline" target="_blank" rel="noopener noreferrer">Epic management and planning</a></li>
                  <li>• <a href="https://docs.gitlab.com/ee/user/project/issues/" className="text-purple-600 hover:underline" target="_blank" rel="noopener noreferrer">Issue tracking and organization</a></li>
                </ul>
              </div>
              <div className="text-left">
                <h4 className="font-medium text-gray-800 mb-2">Milestone Excellence</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• Plan realistic sprint capacities</li>
                  <li>• Set clear, measurable sprint goals</li>
                  <li>• Track progress with burndown charts</li>
                  <li>• Regularly review and adjust milestones</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => setCurrentMode('practice')}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Create More Milestones
            </button>
            <button
              onClick={resetWorkshop}
              className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2"
            >
              <RotateCcw className="w-5 h-5" />
              Reset Workshop
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Main milestone creation interface
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-2">
          <Target className="text-blue-600" />
          Sprint Milestone Creator
        </h1>
        <p className="text-gray-600">Practice creating and managing sprint milestones with capacity planning</p>
      </div>

      <div className="space-y-6">
        {/* Basic Information */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Calendar className="text-blue-600" size={20} />
            Basic Information
          </h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Milestone Name
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={milestone.name}
                  onChange={(e) => updateMilestone('name', e.target.value)}
                  className="flex-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter milestone name..."
                />
                <button
                  onClick={() => updateMilestone('name', generateMilestoneName())}
                  className="px-3 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 text-sm"
                >
                  Generate
                </button>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type
              </label>
              <select
                value={milestone.type}
                onChange={(e) => updateMilestone('type', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              >
                <option value="sprint">Sprint</option>
                <option value="release">Release</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <input
                type="date"
                value={milestone.startDate}
                onChange={(e) => updateMilestone('startDate', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <input
                type="date"
                value={milestone.endDate}
                onChange={(e) => updateMilestone('endDate', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Sprint Goal */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Sprint Goal</h2>
          <textarea
            value={milestone.sprintGoal}
            onChange={(e) => updateMilestone('sprintGoal', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            rows={3}
            placeholder="What is the main objective of this sprint? What value will be delivered?"
          />
        </div>

        {/* Capacity Planning */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Users className="text-blue-600" size={20} />
            Team Capacity Planning
          </h2>
          
          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Team Members
              </label>
              <input
                type="number"
                value={milestone.teamMembers}
                onChange={(e) => updateMilestone('teamMembers', parseInt(e.target.value) || 0)}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                min="1"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Availability % (consider PTO, meetings)
              </label>
              <input
                type="number"
                value={milestone.availabilityPercentage}
                onChange={(e) => updateMilestone('availabilityPercentage', parseInt(e.target.value) || 0)}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                min="1"
                max="100"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Story Points per Person/Day
              </label>
              <input
                type="number"
                value={milestone.storyPointsPerDay}
                onChange={(e) => updateMilestone('storyPointsPerDay', parseFloat(e.target.value) || 0)}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                min="0.5"
                step="0.5"
              />
            </div>
          </div>
          
          <div className="bg-white p-4 rounded border">
            <div className="flex justify-between items-center">
              <span className="text-lg font-medium">Team Capacity:</span>
              <span className="text-2xl font-bold text-blue-600">
                {calculateCapacity()} story points
              </span>
            </div>
            <div className="text-sm text-gray-600 mt-1">
              {milestone.teamMembers} members × {getSprintDays()} days × {milestone.availabilityPercentage}% × {milestone.storyPointsPerDay} points/day
            </div>
            
            <div className="mt-3 flex justify-between items-center">
              <span className="text-sm">Current allocation:</span>
              <span className={`font-semibold ${capacityColor()}`}>
                {getCurrentStoryPoints()} / {calculateCapacity()} points
                ({getCurrentStoryPoints() > 0 ? Math.round((getCurrentStoryPoints() / calculateCapacity()) * 100) : 0}%)
              </span>
            </div>
          </div>
        </div>

        {/* Success Criteria */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <CheckSquare className="text-blue-600" size={20} />
            Success Criteria
          </h2>
          
          {milestone.successCriteria.map((criteria, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={criteria}
                onChange={(e) => updateSuccessCriteria(index, e.target.value)}
                className="flex-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                placeholder="What makes this sprint successful?"
              />
              {milestone.successCriteria.length > 1 && (
                <button
                  onClick={() => removeSuccessCriteria(index)}
                  className="px-3 py-2 bg-red-100 text-red-600 rounded hover:bg-red-200"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          
          <button
            onClick={addSuccessCriteria}
            className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 text-sm"
          >
            <Plus size={16} />
            Add Success Criteria
          </button>
        </div>

        {/* Issues */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Sprint Backlog</h2>
          
          {/* Add Issue Form */}
          <div className="bg-white p-4 rounded border mb-4">
            <h3 className="font-medium mb-3">Add Issue</h3>
            <div className="grid md:grid-cols-4 gap-3">
              <input
                type="text"
                value={newIssue.title}
                onChange={(e) => setNewIssue(prev => ({ ...prev, title: e.target.value }))}
                className="md:col-span-2 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                placeholder="Issue title..."
              />
              <select
                value={newIssue.priority}
                onChange={(e) => setNewIssue(prev => ({ ...prev, priority: e.target.value as 'low' | 'medium' | 'high' | 'urgent' }))}
                className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
                <option value="urgent">Urgent</option>
              </select>
              <input
                type="number"
                value={newIssue.storyPoints}
                onChange={(e) => setNewIssue(prev => ({ ...prev, storyPoints: parseInt(e.target.value) || 1 }))}
                className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                min="1"
                max="13"
                placeholder="Points"
              />
            </div>
            <button
              onClick={addIssue}
              className="mt-3 flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              <Plus size={16} />
              Add Issue
            </button>
          </div>

          {/* Issues List */}
          <div className="space-y-2">
            {milestone.issues.map((issue) => (
              <div key={issue.id} className="bg-white p-3 rounded border flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    issue.priority === 'urgent' ? 'bg-red-100 text-red-700' :
                    issue.priority === 'high' ? 'bg-orange-100 text-orange-700' :
                    issue.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {issue.priority}
                  </span>
                  <span className="font-medium">{issue.title}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm font-medium">
                    {issue.storyPoints} pts
                  </span>
                  <button
                    onClick={() => removeIssue(issue.id)}
                    className="text-red-500 hover:text-red-700 px-2 py-1"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            
            {milestone.issues.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No issues added yet. Add some issues to your sprint backlog above.
              </div>
            )}
          </div>
        </div>

        {/* Definition of Done */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Definition of Done Checklist</h2>
          <div className="grid md:grid-cols-2 gap-2">
            {milestone.definitionOfDone.map((item, index) => (
              <label key={index} className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span className="text-sm">{item}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-center pt-6">
          <button
            onClick={saveMilestone}
            className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-lg font-medium"
            disabled={!milestone.name || !milestone.sprintGoal}
          >
            <Save size={20} />
            Save Milestone
          </button>
        </div>

        {/* Practice Tips */}
        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
          <h3 className="font-semibold text-yellow-800 mb-2">💡 Practice Tips</h3>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• Try different team sizes and see how it affects capacity</li>
            <li>• Experiment with availability percentages (80% is realistic for most teams)</li>
            <li>• Notice how the capacity calculation changes with sprint length</li>
            <li>• Add more story points than capacity and see the warning color change</li>
            <li>• Create both sprint and release type milestones</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default GitLabMilestonesAndEpics;