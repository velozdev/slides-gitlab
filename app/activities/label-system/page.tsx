import Link from "next/link";
import { ArrowLeft, Clock, Target, Users, Tags } from "lucide-react";

export default function LabelSystemPage() {
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
          
          <div className="border-l-4 border-l-purple-500 pl-4 mb-6">
            <div className="text-sm text-purple-600 font-medium mb-1">Day 1 • Activity 1.4</div>
            <h1 className="text-3xl font-bold text-gray-900">Design Your Training Platform Label System</h1>
            <p className="text-gray-600 mt-2">
              Master GitLab's labeling system by creating practical scoped labels for training platform organization
            </p>
          </div>

          {/* Activity Overview */}
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
              <Clock className="w-5 h-5 text-blue-600" />
              <div>
                <div className="font-medium text-blue-900">Duration</div>
                <div className="text-sm text-blue-700">15 minutes</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
              <Target className="w-5 h-5 text-green-600" />
              <div>
                <div className="font-medium text-green-900">Skill Level</div>
                <div className="text-sm text-green-700">Intermediate</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
              <Users className="w-5 h-5 text-purple-600" />
              <div>
                <div className="font-medium text-purple-900">Work Style</div>
                <div className="text-sm text-purple-700">Individual Design</div>
              </div>
            </div>
          </div>
        </div>

        {/* Learning Objectives */}
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-lg border border-purple-200 mb-8">
          <h2 className="text-xl font-semibold text-purple-900 mb-4">🎯 What You'll Learn</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium text-purple-800 mb-2">Label System Design</h3>
              <ul className="space-y-1 text-sm text-purple-700">
                <li>• Scoped label architecture (`scope::value`)</li>
                <li>• Color psychology for visual organization</li>
                <li>• Training platform categorization strategies</li>
                <li>• Stakeholder-friendly naming conventions</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-purple-800 mb-2">Project Management Applications</h3>
              <ul className="space-y-1 text-sm text-purple-700">
                <li>• Sprint planning with effort and priority labels</li>
                <li>• Team workflow organization</li>
                <li>• Issue filtering and search optimization</li>
                <li>• Cross-functional team collaboration</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Prerequisites */}
        <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg mb-8">
          <h3 className="font-medium text-amber-800 mb-2">📋 Prerequisites</h3>
          <ul className="text-sm text-amber-700 space-y-1">
            <li>• Completed Activities 1.2 (Advanced Issues) and 1.3 (Time Tracking)</li>
            <li>• At least one issue created in the slides-gitlab repository</li>
            <li>• Access to create and manage labels in the repository</li>
            <li>• Understanding of issue metadata from previous activities</li>
          </ul>
        </div>

        {/* Label Categories Preview */}
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">🏷️ Essential Label Categories for Training Platforms</h3>
          <p className="text-gray-700 mb-4">
            You'll design and implement these key scoped label categories:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h4 className="font-medium text-blue-800 mb-2">User Experience (`ux::`)</h4>
              <p className="text-sm text-gray-600 mb-2">Organize by who benefits from the feature</p>
              <div className="text-xs text-gray-500">learner • trainer • creator • admin</div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h4 className="font-medium text-green-800 mb-2">Component (`component::`)</h4>
              <p className="text-sm text-gray-600 mb-2">Categorize by technical area affected</p>
              <div className="text-xs text-gray-500">ui • content • navigation • performance</div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h4 className="font-medium text-orange-800 mb-2">Effort (`effort::`)</h4>
              <p className="text-sm text-gray-600 mb-2">Estimate development complexity</p>
              <div className="text-xs text-gray-500">small • medium • large • xl</div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h4 className="font-medium text-red-800 mb-2">Priority (`priority::`)</h4>
              <p className="text-sm text-gray-600 mb-2">Rank training impact importance</p>
              <div className="text-xs text-gray-500">critical • high • medium • low</div>
            </div>
          </div>
        </div>

        {/* Color Strategy */}
        <div className="bg-white border border-gray-200 p-6 rounded-lg mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">🎨 Strategic Color Psychology</h3>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <Tags className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">User Experience Colors</h4>
                <p className="text-sm text-gray-600">Blue for learners (trust), Green for trainers (success), Purple for creators (creativity)</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <Tags className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Effort Scale Progression</h4>
                <p className="text-sm text-gray-600">Light green (small) → Yellow (medium) → Orange (large) → Red (extra-large)</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                <Tags className="w-4 h-4 text-red-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Priority Urgency System</h4>
                <p className="text-sm text-gray-600">Dark red (critical) → Orange (high) → Blue (medium) → Gray (low)</p>
              </div>
            </div>
          </div>
        </div>

        {/* System Benefits */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border border-green-200 mb-8">
          <h3 className="text-lg font-semibold text-green-900 mb-4">✨ System Benefits</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-green-800 mb-2">For Development Teams</h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Quick issue filtering by technical component</li>
                <li>• Sprint planning with effort estimates</li>
                <li>• Clear assignment by expertise area</li>
                <li>• Progress tracking with status labels</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-blue-800 mb-2">For Training Stakeholders</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• User-focused feature organization</li>
                <li>• Priority clarity for training impact</li>
                <li>• Visual progress recognition</li>
                <li>• Cross-team communication improvement</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="text-center">
          <Link 
            href="/activities/day-1/04-design-label-system.md"
            className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
          >
            Start Label System Design
            <ArrowLeft className="w-4 h-4 rotate-180" />
          </Link>
        </div>

        {/* Navigation Footer */}
        <div className="mt-8 flex justify-between">
          <Link 
            href="/activities/time-tracking" 
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous: Time Tracking Practice
          </Link>
          
          <Link 
            href="/activities/search-arsenal" 
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Next: Search Arsenal
            <ArrowLeft className="w-4 h-4 rotate-180" />
          </Link>
        </div>
      </div>
    </div>
  );
}
