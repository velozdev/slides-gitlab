import Link from "next/link";
import { BookOpen, Clock, Target, Users, Settings, Play, Code, GitBranch, ArrowRight, ArrowLeft } from "lucide-react";

export default function CreateFirstPipelinePage() {
  return (
    <div className="min-h-screen bg-background text-foreground p-4 font-sans">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center gap-4 mb-4">
            <Settings className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Activity 3.2: Create Your First CI/CD Pipeline</h1>
              <p className="text-gray-600">Build automated workflows from scratch with GitLab CI/CD</p>
            </div>
          </div>
          
          <div className="flex items-center gap-6 text-sm text-gray-600">
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              30 minutes total
            </span>
            <span className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              Intermediate level
            </span>
            <span className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Hands-on practice
            </span>
          </div>
          
          {/* Start Activity Button */}
          <div className="mt-6">
            <a 
              href="https://github.com/jsdev/slides-gitlab/blob/main/activities/day-3/02-create-first-pipeline.md"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Settings className="w-5 h-5" />
              Start Activity - View Instructions
            </a>
            <p className="text-sm text-gray-500 mt-2">
              Opens the detailed step-by-step instructions in a new tab
            </p>
          </div>
        </div>

        {/* Learning Objectives */}
        <div className="mb-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-blue-800 mb-4">🎯 What You'll Master</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium text-blue-700 mb-2">CI/CD Fundamentals</h3>
              <ul className="text-sm text-blue-600 space-y-1">
                <li>• Pipeline stages and job configuration</li>
                <li>• YAML syntax for GitLab CI/CD</li>
                <li>• Sequential workflow execution</li>
                <li>• Artifact management and dependencies</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-blue-700 mb-2">Practical Implementation</h3>
              <ul className="text-sm text-blue-600 space-y-1">
                <li>• Pipeline Editor navigation and usage</li>
                <li>• Build and test automation setup</li>
                <li>• Real-time pipeline monitoring</li>
                <li>• Professional development workflows</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Activity Structure */}
        <div className="mb-8 bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">🛠️ Pipeline Creation Process</h2>
          <div className="space-y-4">
            {/* Step 1 */}
            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full text-sm font-medium">1</div>
              <div>
                <h3 className="font-semibold text-gray-800">Pipeline Editor Setup (5 minutes)</h3>
                <p className="text-gray-600 text-sm mt-1">
                  Navigate to GitLab's CI/CD Editor and prepare for pipeline creation with syntax validation
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg">
              <div className="flex items-center justify-center w-8 h-8 bg-green-600 text-white rounded-full text-sm font-medium">2</div>
              <div>
                <h3 className="font-semibold text-gray-800">Stages Definition (5 minutes)</h3>
                <p className="text-gray-600 text-sm mt-1">
                  Configure pipeline stages for sequential execution: build → test workflow
                </p>
                <div className="mt-2 bg-white p-2 rounded border">
                  <code className="text-xs text-gray-700">
                    stages:<br/>
                    &nbsp;&nbsp;- build<br/>
                    &nbsp;&nbsp;- test
                  </code>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start gap-4 p-4 bg-orange-50 rounded-lg">
              <div className="flex items-center justify-center w-8 h-8 bg-orange-600 text-white rounded-full text-sm font-medium">3</div>
              <div>
                <h3 className="font-semibold text-gray-800">Build Job Creation (10 minutes)</h3>
                <p className="text-gray-600 text-sm mt-1">
                  Create comprehensive build job with artifacts, dependencies, and training platform context
                </p>
                <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-white p-2 rounded border">
                    <strong>Features:</strong> Artifacts, timing simulation
                  </div>
                  <div className="bg-white p-2 rounded border">
                    <strong>Context:</strong> Training platform compilation
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex items-start gap-4 p-4 bg-purple-50 rounded-lg">
              <div className="flex items-center justify-center w-8 h-8 bg-purple-600 text-white rounded-full text-sm font-medium">4</div>
              <div>
                <h3 className="font-semibold text-gray-800">Test Job Creation (5 minutes)</h3>
                <p className="text-gray-600 text-sm mt-1">
                  Add automated testing with dependencies on build artifacts and platform-specific validation
                </p>
              </div>
            </div>

            {/* Step 5 */}
            <div className="flex items-start gap-4 p-4 bg-emerald-50 rounded-lg">
              <div className="flex items-center justify-center w-8 h-8 bg-emerald-600 text-white rounded-full text-sm font-medium">5</div>
              <div>
                <h3 className="font-semibold text-gray-800">Commit & Execute (5 minutes)</h3>
                <p className="text-gray-600 text-sm mt-1">
                  Deploy your pipeline and watch real-time execution with job monitoring and progress tracking
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Pipeline Preview */}
        <div className="mb-8 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">🚀 Your Pipeline Architecture</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-800 mb-3">Pipeline Flow</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span>Stage 1: Build Project</span>
                </div>
                <div className="flex items-center gap-2 text-sm ml-5">
                  <ArrowRight className="w-3 h-3 text-gray-400" />
                  <span className="text-gray-600">Compile & prepare artifacts</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span>Stage 2: Run Tests</span>
                </div>
                <div className="flex items-center gap-2 text-sm ml-5">
                  <ArrowRight className="w-3 h-3 text-gray-400" />
                  <span className="text-gray-600">Validate & verify quality</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-medium text-gray-800 mb-3">Key Features</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <Play className="w-4 h-4 text-blue-600" />
                  Automated execution on commits
                </li>
                <li className="flex items-center gap-2">
                  <Code className="w-4 h-4 text-green-600" />
                  YAML configuration with validation
                </li>
                <li className="flex items-center gap-2">
                  <GitBranch className="w-4 h-4 text-purple-600" />
                  Sequential stage dependencies
                </li>
                <li className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-orange-600" />
                  Training platform context
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bonus Challenges Preview */}
        <div className="mb-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-yellow-800 mb-4">🏆 Advanced Challenges</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg border">
              <h3 className="font-medium text-yellow-800 mb-2">Deployment Stage</h3>
              <p className="text-sm text-yellow-700">Add a third stage for automated deployment to staging environments</p>
            </div>
            <div className="bg-white p-4 rounded-lg border">
              <h3 className="font-medium text-yellow-800 mb-2">Environment Variables</h3>
              <p className="text-sm text-yellow-700">Configure build-specific variables for different environments</p>
            </div>
            <div className="bg-white p-4 rounded-lg border">
              <h3 className="font-medium text-yellow-800 mb-2">Conditional Execution</h3>
              <p className="text-sm text-yellow-700">Set up branch-specific pipeline behavior and security scanning</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Link href="/activities/branch-naming-challenge" className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Previous: Branch Naming Challenge
          </Link>
          
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-1">Day 3: Advanced Workflows</p>
            <p className="font-medium text-gray-800">CI/CD Pipeline Creation</p>
          </div>
          
          <div className="text-gray-400">
            <span className="text-sm">Next: Activity 3.3</span>
          </div>
        </div>
      </div>
    </div>
  );
}
