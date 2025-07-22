import Link from "next/link";
import { BookOpen, Clock, Target, Users, GitBranch, Shield, Accessibility, Code, ArrowRight, ArrowLeft } from "lucide-react";

export default function BranchNamingChallengePage() {
  return (
    <div className="min-h-screen bg-background text-foreground p-4 font-sans">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center gap-4 mb-4">
            <GitBranch className="w-8 h-8 text-purple-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Activity 3.1: The Branch Naming Challenge</h1>
              <p className="text-gray-600">Master Git branch naming conventions using real repository issues</p>
            </div>
          </div>
          
          <div className="flex items-center gap-6 text-sm text-gray-600">
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              25 minutes total
            </span>
            <span className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              Advanced level
            </span>
            <span className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Interactive challenge
            </span>
          </div>
          
          {/* Start Activity Button */}
          <div className="mt-6">
            <a 
              href="https://github.com/jsdev/slides-gitlab/blob/main/activities/day-3/01-branch-naming-challenge.md"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors"
            >
              <GitBranch className="w-5 h-5" />
              Start Activity - View Instructions
            </a>
            <p className="text-sm text-gray-500 mt-2">
              Opens the detailed step-by-step instructions in a new tab
            </p>
          </div>
        </div>

        {/* Learning Objectives */}
        <div className="mb-8 bg-purple-50 border border-purple-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-purple-800 mb-4">🎯 What You'll Master</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium text-purple-700 mb-2">Naming Convention Skills</h3>
              <ul className="text-sm text-purple-600 space-y-1">
                <li>• Professional branch naming patterns</li>
                <li>• Issue number integration</li>
                <li>• Work type classification</li>
                <li>• Team collaboration conventions</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-purple-700 mb-2">Real-World Applications</h3>
              <ul className="text-sm text-purple-600 space-y-1">
                <li>• Repository organization</li>
                <li>• Code review efficiency</li>
                <li>• Project tracking integration</li>
                <li>• Development workflow optimization</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Activity Structure */}
        <div className="mb-8 bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">📝 Activity Structure</h2>
          <div className="space-y-4">
            {/* Convention Introduction */}
            <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg">
              <BookOpen className="w-6 h-6 text-blue-600 mt-1" />
              <div>
                <h3 className="font-semibold text-blue-800">Part 1: Convention Introduction (5 minutes)</h3>
                <p className="text-blue-700 text-sm mt-1">
                  Learn the importance of consistent branch naming and establish our training platform convention: 
                  <code className="bg-blue-100 px-2 py-1 rounded text-xs ml-1">[issue-number]-[work-type]-[description]</code>
                </p>
              </div>
            </div>

            {/* Interactive Challenge */}
            <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg">
              <Target className="w-6 h-6 text-green-600 mt-1" />
              <div>
                <h3 className="font-semibold text-green-800">Part 2: Interactive Challenge (15 minutes)</h3>
                <p className="text-green-700 text-sm mt-1">
                  Practice with three real scenarios from our slides-gitlab repository issues
                </p>
                <div className="grid md:grid-cols-3 gap-3 mt-3">
                  <div className="bg-white p-3 rounded border">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="w-4 h-4 text-red-600" />
                      <span className="text-xs font-medium text-red-700">Security Fix</span>
                    </div>
                    <p className="text-xs text-gray-600">Markdown injection vulnerability</p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <div className="flex items-center gap-2 mb-2">
                      <Accessibility className="w-4 h-4 text-blue-600" />
                      <span className="text-xs font-medium text-blue-700">Accessibility</span>
                    </div>
                    <p className="text-xs text-gray-600">Heading order enhancement</p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <div className="flex items-center gap-2 mb-2">
                      <Code className="w-4 h-4 text-purple-600" />
                      <span className="text-xs font-medium text-purple-700">Tooling</span>
                    </div>
                    <p className="text-xs text-gray-600">ESLint rule addition</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Group Discussion */}
            <div className="flex items-start gap-4 p-4 bg-orange-50 rounded-lg">
              <Users className="w-6 h-6 text-orange-600 mt-1" />
              <div>
                <h3 className="font-semibold text-orange-800">Part 3: Group Discussion (5 minutes)</h3>
                <p className="text-orange-700 text-sm mt-1">
                  Share solutions, discuss best practices, and explore real-world applications for team collaboration
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Preview */}
        <div className="mb-8 bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">🚀 Skills You'll Develop</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-800 mb-3">Technical Skills</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  Git branch naming conventions
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  Issue-to-branch traceability
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  Work type classification
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  Repository organization patterns
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-gray-800 mb-3">Collaboration Skills</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Team convention establishment
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Code review efficiency
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Project management integration
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Professional development practices
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Link href="/activities" className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Activities
          </Link>
          
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-1">Day 3: Advanced Workflows</p>
            <p className="font-medium text-gray-800">Branch Naming Challenge</p>
          </div>
          
          <div className="text-gray-400">
            <span className="text-sm">Next: Activity 3.2</span>
          </div>
        </div>
      </div>
    </div>
  );
}
