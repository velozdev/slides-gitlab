'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { CheckCircle, AlertCircle, GitBranch, Link as LinkIcon, ArrowRight, ArrowDown } from 'lucide-react'

interface Issue {
  id: string
  title: string
  type: 'parent' | 'child' | 'task'
  milestone: string
  blockedBy: string[]
  blocks: string[]
}

interface DependencyChain {
  issues: Issue[]
  relationships: Array<{
    from: string
    to: string
    type: 'blocks' | 'blocked_by' | 'related'
  }>
}

export default function DependencyMappingExercise() {
  const [issues, setIssues] = useState<Issue[]>([])
  const [currentIssue, setCurrentIssue] = useState<Partial<Issue>>({
    title: '',
    type: 'task',
    milestone: '',
    blockedBy: [],
    blocks: []
  })
  const [relationships, setRelationships] = useState<Array<{from: string, to: string, type: string}>>([])
  const [feedback, setFeedback] = useState<string[]>([])
  const [currentStep, setCurrentStep] = useState(1)

  const scenarios = [
    {
      title: "Website Redesign Project",
      description: "Plan dependencies for a complete website overhaul",
      suggestedIssues: [
        "Complete Website Redesign - Q4 2024",
        "Design Phase Complete",
        "User Research Complete",
        "Visual Design Signed Off",
        "Development Phase Complete",
        "Frontend Implementation",
        "Backend Integration",
        "Testing Phase Complete",
        "QA Testing Complete"
      ]
    },
    {
      title: "Mobile App Launch",
      description: "Structure dependencies for mobile app development",
      suggestedIssues: [
        "Mobile App Launch - Q1 2025",
        "iOS Development Complete",
        "Android Development Complete",
        "Backend API Ready",
        "Authentication System",
        "Core Features Implementation",
        "App Store Submission",
        "Play Store Submission"
      ]
    }
  ]

  const [selectedScenario, setSelectedScenario] = useState(0)

  const addIssue = () => {
    if (!currentIssue.title) return

    const newIssue: Issue = {
      id: Date.now().toString(),
      title: currentIssue.title,
      type: currentIssue.type || 'task',
      milestone: currentIssue.milestone || '',
      blockedBy: [],
      blocks: []
    }

    setIssues(prev => [...prev, newIssue])
    setCurrentIssue({
      title: '',
      type: 'task',
      milestone: '',
      blockedBy: [],
      blocks: []
    })
  }

  const addDependency = (fromId: string, toId: string, type: 'blocks' | 'blocked_by') => {
    setRelationships(prev => [
      ...prev,
      { from: fromId, to: toId, type }
    ])

    // Update issue objects
    setIssues(prev => prev.map(issue => {
      if (issue.id === fromId && type === 'blocks') {
        return { ...issue, blocks: [...issue.blocks, toId] }
      }
      if (issue.id === toId && type === 'blocks') {
        return { ...issue, blockedBy: [...issue.blockedBy, fromId] }
      }
      if (issue.id === fromId && type === 'blocked_by') {
        return { ...issue, blockedBy: [...issue.blockedBy, toId] }
      }
      if (issue.id === toId && type === 'blocked_by') {
        return { ...issue, blocks: [...issue.blocks, fromId] }
      }
      return issue
    }))
  }

  const validateDependencies = () => {
    const feedback: string[] = []
    
    // Check for parent issues
    const parentIssues = issues.filter(issue => issue.type === 'parent')
    if (parentIssues.length > 0) {
      feedback.push("✅ Has parent milestone issues for high-level tracking")
    } else {
      feedback.push("❌ Consider adding parent issues for milestone overview")
    }
    
    // Check for logical dependency chains
    const hasChains = relationships.length > 0
    if (hasChains) {
      feedback.push("✅ Dependencies defined between issues")
    } else {
      feedback.push("❌ No dependencies created - add logical relationships")
    }
    
    // Check for circular dependencies
    const hasCircular = checkCircularDependencies()
    if (!hasCircular) {
      feedback.push("✅ No circular dependencies detected")
    } else {
      feedback.push("❌ Circular dependencies found - review relationships")
    }
    
    // Check milestone assignment
    const milestoneCoverage = issues.filter(issue => issue.milestone).length / issues.length
    if (milestoneCoverage > 0.8) {
      feedback.push("✅ Good milestone assignment coverage")
    } else {
      feedback.push("❌ Assign more issues to specific milestones")
    }
    
    setFeedback(feedback)
  }

  const checkCircularDependencies = (): boolean => {
    // Simple cycle detection - could be enhanced
    const visited = new Set<string>()
    const recStack = new Set<string>()
    
    const hasCycle = (issueId: string): boolean => {
      if (recStack.has(issueId)) return true
      if (visited.has(issueId)) return false
      
      visited.add(issueId)
      recStack.add(issueId)
      
      const issue = issues.find(i => i.id === issueId)
      if (issue) {
        for (const blockedId of issue.blocks) {
          if (hasCycle(blockedId)) return true
        }
      }
      
      recStack.delete(issueId)
      return false
    }
    
    return issues.some(issue => hasCycle(issue.id))
  }

  const getDependencyVisualization = () => {
    const parentIssues = issues.filter(issue => issue.type === 'parent')
    const childIssues = issues.filter(issue => issue.type === 'child')
    const taskIssues = issues.filter(issue => issue.type === 'task')
    
    return { parentIssues, childIssues, taskIssues }
  }

  const getIssueById = (id: string) => issues.find(issue => issue.id === id)

  const presetIssues = () => {
    const scenario = scenarios[selectedScenario]
    const newIssues: Issue[] = scenario.suggestedIssues.map((title, index) => ({
      id: `preset-${index}`,
      title,
      type: index === 0 ? 'parent' : (index <= 3 ? 'child' : 'task'),
      milestone: title.includes('Q4 2024') ? 'Q4 2024' : (title.includes('Q1 2025') ? 'Q1 2025' : ''),
      blockedBy: [],
      blocks: []
    }))
    
    setIssues(newIssues)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <LinkIcon className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Dependency Mapping Exercise</h1>
          </div>
          <p className="text-lg text-gray-600">
            Practice creating logical issue dependencies for hierarchical milestone management
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Scenario and Issue Creation */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <GitBranch className="w-5 h-5 text-purple-600" />
              Create Issues & Dependencies
            </h3>
            
            {/* Scenario Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Choose Scenario:</label>
              <div className="space-y-2">
                {scenarios.map((scenario, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedScenario(index)}
                    className={`w-full p-3 text-left rounded-lg border ${
                      selectedScenario === index 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-medium">{scenario.title}</div>
                    <div className="text-sm text-gray-600">{scenario.description}</div>
                  </button>
                ))}
              </div>
              <Button onClick={presetIssues} variant="outline" className="w-full mt-2">
                Load Suggested Issues
              </Button>
            </div>

            {/* Issue Creation Form */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Issue Title</label>
                <Input
                  value={currentIssue.title || ''}
                  onChange={(e) => setCurrentIssue(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g., Design Phase Complete"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Issue Type</label>
                <select
                  value={currentIssue.type || 'task'}
                  onChange={(e) => setCurrentIssue(prev => ({ ...prev, type: e.target.value as 'parent' | 'child' | 'task' }))}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="parent">Parent (Milestone Overview)</option>
                  <option value="child">Child (Major Phase)</option>
                  <option value="task">Task (Specific Work)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Milestone</label>
                <Input
                  value={currentIssue.milestone || ''}
                  onChange={(e) => setCurrentIssue(prev => ({ ...prev, milestone: e.target.value }))}
                  placeholder="e.g., Q4 2024 Website Redesign"
                />
              </div>
              
              <Button onClick={addIssue} className="w-full" disabled={!currentIssue.title}>
                Add Issue
              </Button>
            </div>
          </Card>

          {/* Dependency Management */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Manage Dependencies</h3>
            
            {issues.length >= 2 ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Create Dependency Relationship:</label>
                  <div className="space-y-3">
                    {issues.map((fromIssue) => (
                      <div key={fromIssue.id} className="border rounded p-3">
                        <div className="font-medium text-sm mb-2">{fromIssue.title}</div>
                        <div className="space-y-2">
                          <div className="text-xs text-gray-600">This issue blocks:</div>
                          <div className="grid grid-cols-1 gap-1">
                            {issues.filter(i => i.id !== fromIssue.id).map((toIssue) => (
                              <button
                                key={toIssue.id}
                                onClick={() => addDependency(fromIssue.id, toIssue.id, 'blocks')}
                                disabled={relationships.some(r => r.from === fromIssue.id && r.to === toIssue.id)}
                                className="text-left p-2 text-xs border rounded hover:bg-blue-50 disabled:opacity-50"
                              >
                                <ArrowRight className="w-3 h-3 inline mr-1" />
                                {toIssue.title}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Button onClick={validateDependencies} className="w-full">
                  Validate Dependencies
                </Button>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <LinkIcon className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>Add at least 2 issues to create dependencies</p>
              </div>
            )}
          </Card>
        </div>

        {/* Visualization */}
        {issues.length > 0 && (
          <Card className="p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4">Dependency Visualization</h3>
            
            <div className="space-y-6">
              {/* Issues by Type */}
              {(() => {
                const { parentIssues, childIssues, taskIssues } = getDependencyVisualization()
                return (
                  <div className="space-y-4">
                    {parentIssues.length > 0 && (
                      <div>
                        <h4 className="font-medium text-purple-700 mb-2">Parent Issues (Milestones)</h4>
                        <div className="space-y-2">
                          {parentIssues.map((issue) => (
                            <div key={issue.id} className="bg-purple-50 border-l-4 border-purple-500 p-3">
                              <div className="font-medium">{issue.title}</div>
                              {issue.blocks.length > 0 && (
                                <div className="text-sm text-gray-600 mt-1">
                                  Blocks: {issue.blocks.map(id => getIssueById(id)?.title).join(', ')}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {childIssues.length > 0 && (
                      <div>
                        <h4 className="font-medium text-blue-700 mb-2">Child Issues (Phases)</h4>
                        <div className="space-y-2 ml-4">
                          {childIssues.map((issue) => (
                            <div key={issue.id} className="bg-blue-50 border-l-4 border-blue-500 p-3">
                              <div className="font-medium">{issue.title}</div>
                              {(issue.blockedBy.length > 0 || issue.blocks.length > 0) && (
                                <div className="text-sm text-gray-600 mt-1 space-y-1">
                                  {issue.blockedBy.length > 0 && (
                                    <div>Blocked by: {issue.blockedBy.map(id => getIssueById(id)?.title).join(', ')}</div>
                                  )}
                                  {issue.blocks.length > 0 && (
                                    <div>Blocks: {issue.blocks.map(id => getIssueById(id)?.title).join(', ')}</div>
                                  )}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {taskIssues.length > 0 && (
                      <div>
                        <h4 className="font-medium text-green-700 mb-2">Task Issues (Specific Work)</h4>
                        <div className="space-y-2 ml-8">
                          {taskIssues.map((issue) => (
                            <div key={issue.id} className="bg-green-50 border-l-4 border-green-500 p-3">
                              <div className="font-medium">{issue.title}</div>
                              {(issue.blockedBy.length > 0 || issue.blocks.length > 0) && (
                                <div className="text-sm text-gray-600 mt-1 space-y-1">
                                  {issue.blockedBy.length > 0 && (
                                    <div>Blocked by: {issue.blockedBy.map(id => getIssueById(id)?.title).join(', ')}</div>
                                  )}
                                  {issue.blocks.length > 0 && (
                                    <div>Blocks: {issue.blocks.map(id => getIssueById(id)?.title).join(', ')}</div>
                                  )}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )
              })()}
            </div>
          </Card>
        )}

        {/* Feedback */}
        {feedback.length > 0 && (
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Validation Feedback</h3>
            <div className="space-y-2">
              {feedback.map((item, index) => (
                <div key={index} className="flex items-start gap-2 text-sm">
                  {item.startsWith('✅') ? (
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-red-600 mt-0.5" />
                  )}
                  <span className={item.startsWith('✅') ? 'text-green-700' : 'text-red-700'}>
                    {item.substring(2)}
                  </span>
                </div>
              ))}
            </div>
            
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-800 mb-2">Key Learning Points:</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Parent issues represent overall milestones and project goals</li>
                <li>• Child issues break down major phases within milestones</li>
                <li>• Task issues represent specific deliverable work items</li>
                <li>• Dependencies help identify critical path and potential bottlenecks</li>
                <li>• Avoid circular dependencies that create impossible conditions</li>
              </ul>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
