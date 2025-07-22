import Link from "next/link";
import { ArrowLeft, Clock, Target, BookOpen, CheckCircle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function IssueManagement() {
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
                <BookOpen className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <CardTitle className="text-2xl">Activity 2.3: Issue Management & Sprint Execution</CardTitle>
                <p className="text-gray-600 mt-1">Day 2: Project Planning & Management</p>
              </div>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                7 minutes
              </span>
              <span className="flex items-center gap-1">
                <Target className="w-4 h-4" />
                Advanced level
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle className="w-4 h-4" />
                Quality focused
              </span>
            </div>
            
            {/* Start Activity Button */}
            <div className="mt-6">
              <a 
                href="https://github.com/jsdev/slides-gitlab/blob/main/activities/day-2/04c-issue-management-sprint-execution.md"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors"
              >
                <BookOpen className="w-5 h-5" />
                Start Activity - View Instructions
              </a>
              <p className="text-sm text-gray-500 mt-2">
                Opens the detailed step-by-step instructions in a new tab
              </p>
            </div>
          </CardHeader>
        </Card>

        {/* Content Placeholder */}
        <Card>
          <CardContent className="p-8">
            <div className="text-center text-gray-600">
              <h3 className="text-lg font-semibold mb-4">Complete Sprint Execution</h3>
              <p className="mb-4">Master issue creation, assignment, and validation with Definition of Done.</p>
              
              <div className="bg-purple-50 p-6 rounded-lg text-left max-w-2xl mx-auto">
                <h4 className="font-semibold text-purple-800 mb-3">🎯 Learning Objectives:</h4>
                <ul className="space-y-2 text-purple-700">
                  <li>• Create well-structured GitLab issues with acceptance criteria</li>
                  <li>• Assign story points and team members effectively</li>
                  <li>• Implement Definition of Done practices</li>
                  <li>• Validate sprint setup and execution readiness</li>
                </ul>
              </div>

              <div className="mt-6 grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h5 className="font-semibold text-blue-800 mb-2">📝 Issue Creation</h5>
                  <p className="text-sm text-blue-700">Professional issue templates and structure</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <h5 className="font-semibold text-green-800 mb-2">⚖️ Story Points</h5>
                  <p className="text-sm text-green-700">Accurate estimation and assignment</p>
                </div>
                <div className="p-4 bg-amber-50 rounded-lg">
                  <h5 className="font-semibold text-amber-800 mb-2">✅ Definition of Done</h5>
                  <p className="text-sm text-amber-700">Quality validation and completion criteria</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation Footer */}
        <div className="mt-8 flex justify-between">
          <Link 
            href="/activities/capacity-planning" 
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous: Capacity Planning
          </Link>
          
          <Link 
            href="/activities/workflow-boards" 
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Next: Workflow Boards
            <ArrowLeft className="w-4 h-4 rotate-180" />
          </Link>
        </div>
      </div>
    </div>
  );
}
