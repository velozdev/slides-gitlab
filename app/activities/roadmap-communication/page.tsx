import Link from "next/link";
import { ArrowLeft, Clock, Target, Map, Layers } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function RoadmapCommunication() {
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
              <div className="p-2 bg-indigo-100 rounded-lg">
                <Map className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <CardTitle className="text-2xl">Activity 2.6: Building and Communicating with Roadmaps</CardTitle>
                <p className="text-gray-600 mt-1">Day 2: Project Planning & Management</p>
              </div>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                20 minutes
              </span>
              <span className="flex items-center gap-1">
                <Target className="w-4 h-4" />
                Advanced level
              </span>
              <span className="flex items-center gap-1">
                <Layers className="w-4 h-4" />
                Strategic planning
              </span>
            </div>
            
            {/* Start Activity Button */}
            <div className="mt-6">
              <a 
                href="https://github.com/jsdev/slides-gitlab/blob/main/activities/day-2/07-building-communicating-roadmaps.md"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <Map className="w-5 h-5" />
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
              <h3 className="text-lg font-semibold mb-4">Strategic Roadmap Visualization</h3>
              <p className="mb-4">Master GitLab's roadmap features to communicate strategic plans and coordinate cross-functional initiatives effectively.</p>
              
              <div className="bg-indigo-50 p-6 rounded-lg text-left max-w-2xl mx-auto">
                <h4 className="font-semibold text-indigo-800 mb-3">🎯 Learning Objectives:</h4>
                <ul className="space-y-2 text-indigo-700">
                  <li>• Build strategic roadmaps using GitLab's roadmap view</li>
                  <li>• Practice timeline adjustments and dependency management</li>
                  <li>• Communicate strategic priorities to different stakeholders</li>
                  <li>• Coordinate content development, platform, and training initiatives</li>
                </ul>
              </div>

              <div className="mt-6 grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h5 className="font-semibold text-blue-800 mb-2">📚 Content Development</h5>
                  <p className="text-sm text-blue-700">Plan training material creation and review cycles</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <h5 className="font-semibold text-green-800 mb-2">⚙️ Platform Enhancement</h5>
                  <p className="text-sm text-green-700">Coordinate technical improvements and new features</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h5 className="font-semibold text-purple-800 mb-2">🎓 Training Infrastructure</h5>
                  <p className="text-sm text-purple-700">Scale training environments and delivery capabilities</p>
                </div>
              </div>

              <div className="mt-6 bg-amber-50 p-4 rounded-lg border-l-4 border-amber-400">
                <h5 className="font-semibold text-amber-800 mb-2">🗺️ Strategic Focus Areas:</h5>
                <div className="text-sm text-amber-700 grid md:grid-cols-2 gap-2 text-left">
                  <div>• Timeline visualization and adjustment</div>
                  <div>• Cross-functional coordination</div>
                  <div>• Stakeholder communication</div>
                  <div>• Dependency management</div>
                  <div>• Risk and contingency planning</div>
                  <div>• Strategic narrative development</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation Footer */}
        <div className="mt-8 flex justify-between">
          <Link 
            href="/activities/epic-structure" 
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous: Epic Structure
          </Link>
          
          <div className="px-4 py-2 bg-green-100 rounded-lg text-green-800 font-medium">
            Day 2 Complete! 🎉 Ready for Day 3
          </div>
        </div>

        {/* Achievement Badge */}
        <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
          <div className="text-center">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Map className="w-8 h-8 text-indigo-600" />
            </div>
            <h4 className="font-semibold text-indigo-800 mb-2">Strategic Planning Mastery</h4>
            <p className="text-sm text-indigo-700">
              Complete this activity to master roadmap visualization and strategic communication skills essential for coordinating complex training platform initiatives.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
