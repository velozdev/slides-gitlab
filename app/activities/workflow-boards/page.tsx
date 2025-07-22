import Link from "next/link";
import { ArrowLeft, Clock, Target, Settings, Users } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function WorkflowBoards() {
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
                <Settings className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <CardTitle className="text-2xl">Activity 2.4: Configure Team Workflow Board</CardTitle>
                <p className="text-gray-600 mt-1">Day 2: Project Planning & Management</p>
              </div>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                10 minutes
              </span>
              <span className="flex items-center gap-1">
                <Target className="w-4 h-4" />
                Intermediate level
              </span>
              <span className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                Role-based boards
              </span>
            </div>
          </CardHeader>
        </Card>

        {/* Content Placeholder */}
        <Card>
          <CardContent className="p-8">
            <div className="text-center text-gray-600">
              <h3 className="text-lg font-semibold mb-4">Customized Workflow Boards</h3>
              <p className="mb-4">Build issue boards that match real team workflows for content development, training delivery, or platform enhancement.</p>
              
              <div className="bg-green-50 p-6 rounded-lg text-left max-w-2xl mx-auto">
                <h4 className="font-semibold text-green-800 mb-3">🎯 Learning Objectives:</h4>
                <ul className="space-y-2 text-green-700">
                  <li>• Configure role-specific GitLab issue boards</li>
                  <li>• Set up WIP limits and workflow columns</li>
                  <li>• Create effective swimlanes for team organization</li>
                  <li>• Apply board-wide filters for focused views</li>
                </ul>
              </div>

              <div className="mt-6 grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h5 className="font-semibold text-blue-800 mb-2">📚 Content Development</h5>
                  <p className="text-sm text-blue-700">Board for training content creators and curriculum developers</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h5 className="font-semibold text-purple-800 mb-2">🎓 Training Delivery</h5>
                  <p className="text-sm text-purple-700">Board for trainers and instructional design teams</p>
                </div>
                <div className="p-4 bg-amber-50 rounded-lg">
                  <h5 className="font-semibold text-amber-800 mb-2">⚙️ Platform Enhancement</h5>
                  <p className="text-sm text-amber-700">Board for developers and technical teams</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation Footer */}
        <div className="mt-8 flex justify-between">
          <Link 
            href="/activities/issue-management" 
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous: Issue Management
          </Link>
          
          <Link 
            href="/activities/epic-structure" 
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Next: Epic Structure
            <ArrowLeft className="w-4 h-4 rotate-180" />
          </Link>
        </div>
      </div>
    </div>
  );
}
