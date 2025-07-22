import Link from "next/link";
import { ArrowLeft, Clock, Target, Layers, GitBranch } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function EpicStructure() {
  return (
    <div className="min-h-screen bg-background text-foreground p-6 font-sans">
      <div className="max-w-4xl mx-auto">
        {/* Navigation */}
        <div className="mb-6">
          <Link href="/activities" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Activities Dashboard
          </Link>
        </div>

        {/* Activity Header */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Layers className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <CardTitle className="text-2xl">Activity 2.5: Create Your Epic Structure</CardTitle>
                <p className="text-gray-600 mt-1">Day 2: Project Planning & Management • Module 5</p>
              </div>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                10 minutes
              </span>
              <span className="flex items-center gap-1">
                <Target className="w-4 h-4" />
                Strategic level
              </span>
              <span className="flex items-center gap-1">
                <GitBranch className="w-4 h-4" />
                Epic planning
              </span>
            </div>
            
            {/* Start Activity Button */}
            <div className="mt-6">
              <a 
                href="https://github.com/jsdev/slides-gitlab/blob/main/activities/day-2/05-create-epic-structure.md"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors"
              >
                <Layers className="w-5 h-5" />
                Start Activity - View Instructions
              </a>
              <p className="text-sm text-gray-500 mt-2">
                Opens the detailed step-by-step instructions in a new tab
              </p>
            </div>
          </CardHeader>
        </Card>

        {/* Content Overview */}
        <Card>
          <CardContent className="p-8">
            <div className="text-center text-gray-600">
              <h3 className="text-lg font-semibold mb-4">Strategic Epic Creation</h3>
              <p className="mb-4">Master GitLab epic creation by organizing existing slides-gitlab issues into strategic initiatives that drive platform enhancement.</p>
              
              <div className="bg-purple-50 p-6 rounded-lg text-left max-w-2xl mx-auto">
                <h4 className="font-semibold text-purple-800 mb-3">🎯 Learning Objectives:</h4>
                <ul className="space-y-2 text-purple-700">
                  <li>• Create strategic epics with clear business objectives</li>
                  <li>• Organize existing repository issues under epic structures</li>
                  <li>• Define scope, dependencies, and success metrics</li>
                  <li>• Practice strategic thinking for platform enhancement</li>
                </ul>
              </div>

              <div className="mt-6 grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h5 className="font-semibold text-blue-800 mb-2">🎨 Advanced Slide System</h5>
                  <p className="text-sm text-blue-700">Enhanced presentation features and interactive elements</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <h5 className="font-semibold text-green-800 mb-2">📊 Assessment Platform</h5>
                  <p className="text-sm text-green-700">Learner progress tracking and evaluation tools</p>
                </div>
                <div className="p-4 bg-amber-50 rounded-lg">
                  <h5 className="font-semibold text-amber-800 mb-2">📝 Content Workflow</h5>
                  <p className="text-sm text-amber-700">Streamlined material creation and collaboration</p>
                </div>
                <div className="p-4 bg-indigo-50 rounded-lg">
                  <h5 className="font-semibold text-indigo-800 mb-2">⚡ Performance & Scale</h5>
                  <p className="text-sm text-indigo-700">Technical improvements and operational excellence</p>
                </div>
              </div>

              <div className="mt-6 bg-amber-50 p-4 rounded-lg border-l-4 border-amber-400">
                <h5 className="font-semibold text-amber-800 mb-2">🏗️ Repository Context:</h5>
                <p className="text-sm text-amber-700 text-left">
                  The slides-gitlab platform currently has various improvement issues that aren't organized under strategic epics. 
                  Your task is to create meaningful epic structures that group related work and communicate strategic value to stakeholders.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation Footer */}
        <div className="mt-8 flex justify-between">
          <Link 
            href="/activities/workflow-boards" 
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous: Workflow Boards
          </Link>
          
          <Link 
            href="/activities/roadmap-communication" 
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Next: Roadmap Communication
            <ArrowLeft className="w-4 h-4 rotate-180" />
          </Link>
        </div>

        {/* Epic Templates Preview */}
        <div className="mt-6 bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-lg border border-purple-200">
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Layers className="w-8 h-8 text-purple-600" />
            </div>
            <h4 className="font-semibold text-purple-800 mb-2">Strategic Initiative Planning</h4>
            <p className="text-sm text-purple-700 mb-4">
              Learn to create epics that organize existing platform issues into cohesive strategic initiatives with clear business value.
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs text-purple-600">
              <div>✓ Business objective definition</div>
              <div>✓ Scope and dependency mapping</div>
              <div>✓ Success metric identification</div>
              <div>✓ Issue organization and labeling</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
