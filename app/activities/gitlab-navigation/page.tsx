import Link from "next/link";
import { ArrowLeft, Clock, Target, Compass, Search } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function GitLabNavigation() {
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
              <div className="p-2 bg-green-100 rounded-lg">
                <Compass className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <CardTitle className="text-2xl">Activity 1.1: GitLab Navigation Practice</CardTitle>
                <p className="text-gray-600 mt-1">Day 1: GitLab Foundations</p>
              </div>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                10 minutes
              </span>
              <span className="flex items-center gap-1">
                <Target className="w-4 h-4" />
                Beginner level
              </span>
              <span className="flex items-center gap-1">
                <Search className="w-4 h-4" />
                Exploration focus
              </span>
            </div>
            
            {/* Start Activity Button */}
            <div className="mt-6">
              <a 
                href="https://github.com/jsdev/slides-gitlab/blob/main/activities/day-1/01-gitlab-navigation-practice.md"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
              >
                <Compass className="w-5 h-5" />
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
              <h3 className="text-lg font-semibold mb-4">GitLab Interface Scavenger Hunt</h3>
              <p className="mb-4">Get comfortable with GitLab's interface through guided exploration of the slides-gitlab repository - no prior experience required!</p>
              
              <div className="bg-green-50 p-6 rounded-lg text-left max-w-2xl mx-auto">
                <h4 className="font-semibold text-green-800 mb-3">🎯 Learning Objectives:</h4>
                <ul className="space-y-2 text-green-700">
                  <li>• Explore GitLab's main navigation and interface elements</li>
                  <li>• Discover key features through hands-on exploration</li>
                  <li>• Build confidence in basic GitLab functionality</li>
                  <li>• Understand how training platforms use GitLab</li>
                </ul>
              </div>

              <div className="mt-6 grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h5 className="font-semibold text-blue-800 mb-2">🗂️ Project Overview</h5>
                  <p className="text-sm text-blue-700">Explore the slides-gitlab repository structure and README</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h5 className="font-semibold text-purple-800 mb-2">🧭 Sidebar Exploration</h5>
                  <p className="text-sm text-purple-700">Navigate through all main menu sections and features</p>
                </div>
                <div className="p-4 bg-amber-50 rounded-lg">
                  <h5 className="font-semibold text-amber-800 mb-2">🔍 Discovery Challenges</h5>
                  <p className="text-sm text-amber-700">Find specific features and capabilities through exploration</p>
                </div>
              </div>

              <div className="mt-6 bg-amber-50 p-4 rounded-lg border-l-4 border-amber-400">
                <h5 className="font-semibold text-amber-800 mb-2">🎯 Exploration Approach:</h5>
                <div className="text-sm text-amber-700 text-left">
                  <p className="mb-2"><strong>Individual Exploration (7 min):</strong> Guided scavenger hunt through GitLab interface</p>
                  <p><strong>Partner Discussion (3 min):</strong> Share discoveries and insights with others</p>
                </div>
              </div>

              <div className="mt-6 bg-green-100 p-4 rounded-lg">
                <h5 className="font-semibold text-green-800 mb-2">💡 Remember:</h5>
                <p className="text-sm text-green-700">
                  This is exploration, not mastery! Don't worry about understanding everything - just get comfortable clicking around and discovering what's available.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation Footer */}
        <div className="mt-8 flex justify-between">
          <div className="px-4 py-2 bg-gray-50 rounded-lg text-gray-500">
            First Day 1 Activity
          </div>
          
          <Link 
            href="/activities/advanced-issue" 
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Next: Create Advanced Issue
            <ArrowLeft className="w-4 h-4 rotate-180" />
          </Link>
        </div>

        {/* Exploration Preview */}
        <div className="mt-6 bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border border-green-200">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Compass className="w-8 h-8 text-green-600" />
            </div>
            <h4 className="font-semibold text-green-800 mb-2">GitLab Interface Discovery</h4>
            <p className="text-sm text-green-700 mb-4">
              Conduct a guided exploration of GitLab's interface to build confidence and discover key features before diving into specific workflows.
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs text-green-600">
              <div>✓ Sidebar navigation mastery</div>
              <div>✓ Feature discovery and exploration</div>
              <div>✓ Training platform understanding</div>
              <div>✓ Confidence building for future activities</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
