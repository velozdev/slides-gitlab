import Link from "next/link";
import { ArrowLeft, Clock, Target, Users, Search } from "lucide-react";

export default function SearchArsenalPage() {
  return (
    <div className="min-h-screen bg-background text-foreground p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/activities" 
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Activities
          </Link>
          
          <div className="border-l-4 border-l-blue-500 pl-4 mb-6">
            <div className="text-sm text-blue-600 font-medium mb-1">Day 1 • Activity 1.5</div>
            <h1 className="text-3xl font-bold text-gray-900">Build Your Training Platform Search Arsenal</h1>
            <p className="text-gray-600 mt-2">
              Master GitLab's advanced search capabilities to create efficient workflows for training platform development
            </p>
          </div>

          {/* Activity Overview */}
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
              <Clock className="w-5 h-5 text-blue-600" />
              <div>
                <div className="font-medium text-blue-900">Duration</div>
                <div className="text-sm text-blue-700">20 minutes</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
              <Target className="w-5 h-5 text-green-600" />
              <div>
                <div className="font-medium text-green-900">Skill Level</div>
                <div className="text-sm text-green-700">Intermediate+</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-indigo-50 rounded-lg">
              <Users className="w-5 h-5 text-indigo-600" />
              <div>
                <div className="font-medium text-indigo-900">Work Style</div>
                <div className="text-sm text-indigo-700">Individual Practice</div>
              </div>
            </div>
          </div>
        </div>

        {/* Start Activity Button */}
        <div className="mb-8 text-center">
          <a 
            href="https://github.com/jsdev/slides-gitlab/blob/main/activities/day-1/04-search-arsenal.md"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-600 text-white font-medium rounded-lg hover:bg-cyan-700 transition-colors"
          >
            <Target className="w-5 h-5" />
            Start Activity - View Instructions
          </a>
          <p className="text-sm text-gray-500 mt-2">
            Opens the detailed step-by-step instructions in a new tab
          </p>
        </div>

        {/* Learning Objectives */}
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-lg border border-blue-200 mb-8">
          <h2 className="text-xl font-semibold text-blue-900 mb-4">🎯 What You'll Master</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium text-blue-800 mb-2">Advanced Search Techniques</h3>
              <ul className="space-y-1 text-sm text-blue-700">
                <li>• GitLab search syntax and filter combinations</li>
                <li>• Label-based filtering for training platform work</li>
                <li>• Saved search creation and organization</li>
                <li>• Label subscription and notification setup</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-blue-800 mb-2">Workflow Optimization</h3>
              <ul className="space-y-1 text-sm text-blue-700">
                <li>• Daily standup preparation searches</li>
                <li>• Sprint planning and capacity searches</li>
                <li>• Role-specific information filtering</li>
                <li>• Cross-team coordination strategies</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Prerequisites */}
        <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg mb-8">
          <h3 className="font-medium text-amber-800 mb-2">📋 Prerequisites</h3>
          <ul className="text-sm text-amber-700 space-y-1">
            <li>• Completed Activities 1.1-1.4 (Navigation, Issues, Time Tracking, Labels)</li>
            <li>• Multiple issues created with labels and metadata</li>
            <li>• Understanding of GitLab filtering interface</li>
            <li>• Access to GitLab issues, labels, and search functionality</li>
          </ul>
        </div>

        {/* Search Categories Preview */}
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">🔍 Essential Search Categories</h3>
          <p className="text-gray-700 mb-4">
            You'll create 9 powerful searches across these strategic categories:
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h4 className="font-medium text-green-800 mb-2">Personal Workflow</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• My Current Work</li>
                <li>• My Overdue Work</li>
                <li>• Quick Wins Available</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h4 className="font-medium text-blue-800 mb-2">User Experience Focus</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Critical Learner Issues</li>
                <li>• Trainer Tools Pipeline</li>
                <li>• Content Creator Workflow</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h4 className="font-medium text-purple-800 mb-2">Technical Organization</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• UI Development Pipeline</li>
                <li>• Performance Critical</li>
                <li>• Needs Estimation</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Search Examples */}
        <div className="bg-white border border-gray-200 p-6 rounded-lg mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">📝 Search Examples You'll Create</h3>
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">High Priority Learner Experience Issues</h4>
              <code className="text-sm text-blue-800 bg-blue-50 px-2 py-1 rounded">
                label:ux::learner label:priority::high state:opened
              </code>
              <p className="text-sm text-gray-600 mt-2">Find critical learner-facing improvements for sprint prioritization</p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Quick Wins for Sprint Planning</h4>
              <code className="text-sm text-green-800 bg-green-50 px-2 py-1 rounded">
                label:effort::small state:opened assignee:none
              </code>
              <p className="text-sm text-gray-600 mt-2">Identify small, unassigned tasks perfect for sprint capacity optimization</p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">UI Component Work Backlog</h4>
              <code className="text-sm text-purple-800 bg-purple-50 px-2 py-1 rounded">
                label:component::ui state:opened sort:priority-desc
              </code>
              <p className="text-sm text-gray-600 mt-2">All user interface work sorted by priority for frontend development planning</p>
            </div>
          </div>
        </div>

        {/* Workflow Benefits */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border border-green-200 mb-8">
          <h3 className="text-lg font-semibold text-green-900 mb-4">⚡ Workflow Benefits</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-green-800 mb-2">Daily Efficiency Gains</h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Find relevant work in seconds, not minutes</li>
                <li>• Streamlined daily standup preparation</li>
                <li>• Instant priority and deadline awareness</li>
                <li>• Automated workflow status monitoring</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-blue-800 mb-2">Team Coordination</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Role-specific work visibility for stakeholders</li>
                <li>• Sprint planning capacity optimization</li>
                <li>• Cross-functional team communication</li>
                <li>• Bottleneck identification and resolution</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="text-center">
          <Link 
            href="/activities/day-1/05-build-search-arsenal.md"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            Start Building Your Search Arsenal
            <Search className="w-4 h-4" />
          </Link>
        </div>

        {/* Navigation Footer */}
        <div className="mt-8 flex justify-between">
          <Link 
            href="/activities/label-system" 
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous: Label System Design
          </Link>
          
          <Link 
            href="/activities" 
            className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
          >
            Complete Day 1 → Day 2
            <ArrowLeft className="w-4 h-4 rotate-180" />
          </Link>
        </div>
      </div>
    </div>
  );
}
