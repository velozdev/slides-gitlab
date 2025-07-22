import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Users, Target, Lightbulb, ArrowRight, MessageSquare, GitBranch, Zap } from "lucide-react"

export default function BrainstormIntegrationPage() {
  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
            Day 3 Activity
          </Badge>
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Interactive Workshop
          </Badge>
        </div>
        
        <h1 className="text-4xl font-bold mb-4 flex items-center gap-3">
          <Lightbulb className="h-10 w-10 text-purple-600" />
          Activity 3.3: Brainstorm Your Ideal Integration
        </h1>
        
        <p className="text-xl text-muted-foreground mb-6">
          Identify realistic, high-impact integration opportunities by analyzing your team's workflows and discovering where GitLab integrations could eliminate manual work and improve productivity.
        </p>

        <div className="flex items-center gap-6 text-sm text-muted-foreground mb-8">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>15 minutes total</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>Individual + Group</span>
          </div>
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            <span>Workflow Analysis</span>
          </div>
        </div>
      </div>

      {/* Integration Discovery Framework */}
      <Card className="mb-8 border-purple-200 bg-purple-50/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-900">
            <MessageSquare className="h-5 w-5" />
            Integration Discovery Framework
          </CardTitle>
          <CardDescription className="text-purple-700">
            Systematic approach to identifying your most valuable integration opportunity
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-lg border border-purple-200">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-semibold text-sm">1</div>
                <h4 className="font-medium text-purple-900">Tool Inventory</h4>
              </div>
              <p className="text-sm text-purple-700">Map your daily tools and workflow ecosystem</p>
            </div>
            
            <div className="p-4 bg-white rounded-lg border border-purple-200">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-semibold text-sm">2</div>
                <h4 className="font-medium text-purple-900">Friction Analysis</h4>
              </div>
              <p className="text-sm text-purple-700">Identify manual processes and workflow bottlenecks</p>
            </div>
            
            <div className="p-4 bg-white rounded-lg border border-purple-200">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-semibold text-sm">3</div>
                <h4 className="font-medium text-purple-900">Opportunity Selection</h4>
              </div>
              <p className="text-sm text-purple-700">Choose highest-impact integration for your team</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Learning Objectives */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-blue-600" />
            Learning Objectives
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong>Workflow Analysis:</strong> Systematically identify manual processes and friction points in your daily workflows
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong>Integration Opportunity Assessment:</strong> Evaluate potential integrations based on impact, frequency, and feasibility
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong>Business Case Development:</strong> Articulate clear value proposition with quantifiable benefits
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong>Implementation Planning:</strong> Consider realistic next steps and potential challenges
              </div>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Common Integration Categories */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-amber-600" />
            High-Impact Integration Categories
          </CardTitle>
          <CardDescription>
            Common patterns that deliver significant workflow improvements
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2 text-amber-900">Status Communication</h4>
              <p className="text-sm text-muted-foreground mb-3">Automatically notify stakeholders about development progress</p>
              <div className="space-y-1">
                <Badge variant="outline" className="text-xs mr-2 mb-1">Slack notifications</Badge>
                <Badge variant="outline" className="text-xs mr-2 mb-1">Email updates</Badge>
                <Badge variant="outline" className="text-xs mr-2 mb-1">Teams messages</Badge>
              </div>
            </div>
            
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2 text-blue-900">Project Synchronization</h4>
              <p className="text-sm text-muted-foreground mb-3">Keep development work and project tracking in sync</p>
              <div className="space-y-1">
                <Badge variant="outline" className="text-xs mr-2 mb-1">Jira integration</Badge>
                <Badge variant="outline" className="text-xs mr-2 mb-1">Support tickets</Badge>
                <Badge variant="outline" className="text-xs mr-2 mb-1">Sprint planning</Badge>
              </div>
            </div>
            
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2 text-green-900">Quality Gates</h4>
              <p className="text-sm text-muted-foreground mb-3">Embed quality checks directly into development workflow</p>
              <div className="space-y-1">
                <Badge variant="outline" className="text-xs mr-2 mb-1">Security scans</Badge>
                <Badge variant="outline" className="text-xs mr-2 mb-1">Performance tests</Badge>
                <Badge variant="outline" className="text-xs mr-2 mb-1">Accessibility checks</Badge>
              </div>
            </div>
            
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2 text-purple-900">Infrastructure Automation</h4>
              <p className="text-sm text-muted-foreground mb-3">Connect code changes to infrastructure operations</p>
              <div className="space-y-1">
                <Badge variant="outline" className="text-xs mr-2 mb-1">Environment provisioning</Badge>
                <Badge variant="outline" className="text-xs mr-2 mb-1">Deployment triggers</Badge>
                <Badge variant="outline" className="text-xs mr-2 mb-1">Registry sync</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Activity Structure */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Activity Structure</CardTitle>
          <CardDescription>Interactive workshop format with individual analysis and group sharing</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
              <Clock className="h-6 w-6 text-blue-600 flex-shrink-0" />
              <div className="flex-1">
                <h4 className="font-medium text-blue-900">Individual Brainstorming (10 minutes)</h4>
                <p className="text-sm text-blue-700">Systematic workflow analysis using structured framework</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-4 bg-green-50 rounded-lg">
              <Users className="h-6 w-6 text-green-600 flex-shrink-0" />
              <div className="flex-1">
                <h4 className="font-medium text-green-900">Group Share Back (5 minutes)</h4>
                <p className="text-sm text-green-700">Present integration ideas with structured 30-second pitches</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Integration Vision Template */}
      <Card className="mb-8 border-green-200 bg-green-50/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-900">
            <GitBranch className="h-5 w-5" />
            Integration Vision Template
          </CardTitle>
          <CardDescription className="text-green-700">
            Framework for articulating your integration opportunity
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-white rounded-lg border border-green-200">
            <p className="text-sm text-green-800 mb-4 font-medium">Complete this vision statement:</p>
            <blockquote className="border-l-4 border-green-400 pl-4 italic text-green-900">
              "I want to integrate <strong>[Tool Name]</strong> with GitLab so that <strong>[specific automation/improvement]</strong> because <strong>[clear business benefit]</strong>."
            </blockquote>
          </div>
        </CardContent>
      </Card>

      {/* Start Activity Button */}
      <Card className="border-2 border-dashed border-gray-300 bg-gray-50">
        <CardContent className="pt-8 pb-8 text-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
              <Lightbulb className="h-8 w-8 text-purple-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Ready to Discover Your Ideal Integration?</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl">
                Follow the structured brainstorming framework to identify workflow friction points and discover integration opportunities that could transform your team's productivity.
              </p>
              <Button asChild size="lg" className="bg-purple-600 hover:bg-purple-700">
                <a 
                  href="https://github.com/jsdev/slides-gitlab/blob/main/activities/day-3/03-brainstorm-ideal-integration.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2"
                >
                  Start Activity
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
