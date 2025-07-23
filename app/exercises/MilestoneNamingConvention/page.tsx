'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { CheckCircle, AlertCircle, GitBranch, Target, Calendar } from 'lucide-react'

interface MilestoneStructure {
  project: string
  timeline: string
  phases: string[]
  components: string[]
}

export default function MilestoneNamingConvention() {
  const [userInput, setUserInput] = useState<MilestoneStructure>({
    project: '',
    timeline: '',
    phases: [],
    components: []
  })
  const [generatedMilestones, setGeneratedMilestones] = useState<string[]>([])
  const [feedback, setFeedback] = useState<string[]>([])
  const [currentStep, setCurrentStep] = useState(1)

  const scenarios = [
    {
      title: "Mobile App Development",
      description: "Create milestones for a mobile app project",
      hints: ["Include iOS and Android platforms", "Consider design, development, testing phases", "Think about backend API needs"]
    },
    {
      title: "Website Redesign",
      description: "Plan milestones for a complete website overhaul",
      hints: ["Include UX research and design", "Consider frontend and backend work", "Think about content migration"]
    },
    {
      title: "E-commerce Platform",
      description: "Structure milestones for an online store project",
      hints: ["Consider payment integration", "Think about product catalog", "Include security and compliance"]
    }
  ]

  const [selectedScenario, setSelectedScenario] = useState(0)

  const generateMilestones = () => {
    const { project, timeline, phases, components } = userInput
    const milestones: string[] = []
    
    // Parent milestone
    milestones.push(`${project} - ${timeline}`)
    
    // Phase milestones
    phases.forEach(phase => {
      milestones.push(`${project} - ${timeline} - ${phase}`)
      
      // Component milestones within phases
      components.forEach(component => {
        milestones.push(`${project} - ${timeline} - ${phase} - ${component}`)
      })
    })
    
    setGeneratedMilestones(milestones)
    validateNaming(milestones)
  }

  const validateNaming = (milestones: string[]) => {
    const feedback: string[] = []
    
    // Check consistency
    const separatorUsage = milestones.every(m => m.includes(' - '))
    if (!separatorUsage) {
      feedback.push("❌ Inconsistent separator usage. Use ' - ' consistently")
    } else {
      feedback.push("✅ Consistent separator usage")
    }
    
    // Check hierarchy
    const hasParent = milestones.some(m => m.split(' - ').length === 2)
    const hasChildren = milestones.some(m => m.split(' - ').length > 2)
    if (hasParent && hasChildren) {
      feedback.push("✅ Clear hierarchical structure")
    } else {
      feedback.push("❌ Missing hierarchical levels")
    }
    
    // Check naming length
    const reasonableLength = milestones.every(m => m.length <= 80)
    if (reasonableLength) {
      feedback.push("✅ Milestone names are appropriately concise")
    } else {
      feedback.push("❌ Some milestone names are too long")
    }
    
    // Check for timeline inclusion
    const hasTimeline = milestones.every(m => /Q[1-4]|2024|2025|\d{4}/.test(m))
    if (hasTimeline) {
      feedback.push("✅ Timeline information included")
    } else {
      feedback.push("❌ Consider adding timeline information")
    }
    
    setFeedback(feedback)
  }

  const addPhase = () => {
    const phase = (document.getElementById('newPhase') as HTMLInputElement)?.value
    if (phase && !userInput.phases.includes(phase)) {
      setUserInput(prev => ({
        ...prev,
        phases: [...prev.phases, phase]
      }))
    }
  }

  const addComponent = () => {
    const component = (document.getElementById('newComponent') as HTMLInputElement)?.value
    if (component && !userInput.components.includes(component)) {
      setUserInput(prev => ({
        ...prev,
        components: [...prev.components, component]
      }))
    }
  }

  const bestPractices = [
    "Start broad, get specific (Project → Phase → Component)",
    "Use consistent separators throughout",
    "Include timeline information",
    "Keep names concise but descriptive",
    "Ensure alphabetical sorting groups related items"
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Target className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Milestone Naming Convention Exercise</h1>
          </div>
          <p className="text-lg text-gray-600">
            Practice creating hierarchical milestone structures using strategic naming conventions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Scenario Selection */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-purple-600" />
              Choose Scenario
            </h3>
            <div className="space-y-3">
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
            
            <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
              <h4 className="font-medium text-yellow-800 mb-2">Hints:</h4>
              <ul className="text-sm text-yellow-700 space-y-1">
                {scenarios[selectedScenario].hints.map((hint, index) => (
                  <li key={index}>• {hint}</li>
                ))}
              </ul>
            </div>
          </Card>

          {/* Input Form */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <GitBranch className="w-5 h-5 text-green-600" />
              Build Your Structure
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Project Name</label>
                <Input
                  value={userInput.project}
                  onChange={(e) => setUserInput(prev => ({ ...prev, project: e.target.value }))}
                  placeholder="e.g., Mobile App Development"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Timeline</label>
                <Input
                  value={userInput.timeline}
                  onChange={(e) => setUserInput(prev => ({ ...prev, timeline: e.target.value }))}
                  placeholder="e.g., Q4 2024"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Phases</label>
                <div className="flex gap-2 mb-2">
                  <Input id="newPhase" placeholder="e.g., Design Phase" />
                  <Button onClick={addPhase} size="sm">Add</Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {userInput.phases.map((phase, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                      {phase}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Components</label>
                <div className="flex gap-2 mb-2">
                  <Input id="newComponent" placeholder="e.g., iOS App" />
                  <Button onClick={addComponent} size="sm">Add</Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {userInput.components.map((component, index) => (
                    <span key={index} className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">
                      {component}
                    </span>
                  ))}
                </div>
              </div>
              
              <Button 
                onClick={generateMilestones} 
                className="w-full"
                disabled={!userInput.project || !userInput.timeline}
              >
                Generate Milestone Structure
              </Button>
            </div>
          </Card>

          {/* Results */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Generated Milestones</h3>
            
            {generatedMilestones.length > 0 && (
              <div className="space-y-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <h4 className="font-medium mb-2">Your Milestone Hierarchy:</h4>
                  <div className="space-y-1 text-sm font-mono">
                    {generatedMilestones.map((milestone, index) => {
                      const level = milestone.split(' - ').length - 2
                      const indent = '  '.repeat(level)
                      return (
                        <div key={index} className="text-gray-700">
                          {indent}├── {milestone}
                        </div>
                      )
                    })}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium">Validation Feedback:</h4>
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
              </div>
            )}
          </Card>
        </div>

        {/* Best Practices */}
        <Card className="mt-6 p-6">
          <h3 className="text-lg font-semibold mb-4">Best Practices for Milestone Naming</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">Key Principles:</h4>
              <ul className="space-y-1 text-sm">
                {bestPractices.map((practice, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                    <span>{practice}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Example Pattern:</h4>
              <div className="bg-gray-50 p-3 rounded text-sm font-mono">
                [Project] - [Timeline] - [Phase] - [Component]<br/>
                <span className="text-gray-600">
                  Mobile App - Q4 2024 - Development - iOS
                </span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
