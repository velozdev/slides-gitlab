import Link from "next/link";
import { ArrowLeft, Clock, Target, Users } from "lucide-react";

export default function TimeTrackingPracticePage() {
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
          
          <div className="border-l-4 border-l-orange-500 pl-4 mb-6">
            <div className="text-sm text-orange-600 font-medium mb-1">Day 1 • Activity 1.3</div>
            <h1 className="text-3xl font-bold text-gray-900">Time Tracking Practice</h1>
            <p className="text-gray-600 mt-2">
              Master GitLab's time tracking features for better project planning and sprint management
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
                <div className="text-sm text-green-700">Beginner+</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
              <Users className="w-5 h-5 text-purple-600" />
              <div>
                <div className="font-medium text-purple-900">Work Style</div>
                <div className="text-sm text-purple-700">Individual Practice</div>
              </div>
            </div>
          </div>
        </div>

        {/* Learning Objectives */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200 mb-8">
          <h2 className="text-xl font-semibold text-blue-900 mb-4">🎯 What You'll Learn</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium text-blue-800 mb-2">Time Tracking Fundamentals</h3>
              <ul className="space-y-1 text-sm text-blue-700">
                <li>• Add accurate time estimates using /estimate</li>
                <li>• Log work time with descriptive /spend commands</li>
                <li>• Navigate GitLab's time tracking interface</li>
                <li>• Update and correct time tracking data</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-blue-800 mb-2">Sprint Planning Applications</h3>
              <ul className="space-y-1 text-sm text-blue-700">
                <li>• Calculate estimation accuracy patterns</li>
                <li>• Analyze time tracking for velocity insights</li>
                <li>• Apply time data to retrospectives</li>
                <li>• Improve future estimation processes</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Prerequisites */}
        <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg mb-8">
          <h3 className="font-medium text-amber-800 mb-2">📋 Prerequisites</h3>
          <ul className="text-sm text-amber-700 space-y-1">
            <li>• Completed Activity 1.2 (Create Your First Advanced Issue)</li>
            <li>• At least one issue created in the slides-gitlab repository</li>
            <li>• Access to comment and edit issues</li>
            <li>• Understanding of basic GitLab issue features</li>
          </ul>
        </div>

        {/* Training Platform Context */}
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">🚀 Training Platform Context</h3>
          <p className="text-gray-700 mb-4">
            You'll practice time tracking using your training platform enhancement issues, learning skills that directly apply to:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Project Management Benefits</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Sprint capacity planning</li>
                <li>• Development velocity tracking</li>
                <li>• Estimation accuracy improvement</li>
                <li>• Resource allocation optimization</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Team Collaboration Insights</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Data-driven retrospectives</li>
                <li>• Bottleneck identification</li>
                <li>• Workload distribution analysis</li>
                <li>• Process improvement metrics</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Key Activities Preview */}
        <div className="bg-white border border-gray-200 p-6 rounded-lg mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">📝 Activity Highlights</h3>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                <span className="text-orange-600 font-semibold text-sm">1</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Practice Time Estimation</h4>
                <p className="text-sm text-gray-600">Add realistic estimates to your training platform issues using GitLab's /estimate quick action</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                <span className="text-orange-600 font-semibold text-sm">2</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Log Development Time</h4>
                <p className="text-sm text-gray-600">Simulate work sessions with detailed time logging using /spend commands and descriptive comments</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                <span className="text-orange-600 font-semibold text-sm">3</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Analyze Time Tracking Data</h4>
                <p className="text-sm text-gray-600">Review estimation accuracy and extract insights for improved sprint planning</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="text-center">
          <Link 
            href="/activities/day-1/03-time-tracking-practice.md"
            className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium transition-colors"
          >
            Start Time Tracking Practice
            <ArrowLeft className="w-4 h-4 rotate-180" />
          </Link>
        </div>

        {/* Navigation Footer */}
        <div className="mt-8 flex justify-between">
          <Link 
            href="/activities/advanced-issue" 
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous: Advanced Issue Creation
          </Link>
          
          <Link 
            href="/activities/label-system" 
            className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
          >
            Next: Label System Design
            <ArrowLeft className="w-4 h-4 rotate-180" />
          </Link>
        </div>
      </div>
    </div>
  );
}
