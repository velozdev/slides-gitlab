import Link from "next/link";
import { ArrowLeft, Clock, Target, Users, Award, Calendar } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function BasicMilestone() {
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
              <div className="p-2 bg-blue-100 rounded-lg">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-2xl">Activity 2.1: Basic Milestone Creation</CardTitle>
                <p className="text-gray-600 mt-1">Day 2: Project Planning & Management</p>
              </div>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                5 minutes
              </span>
              <span className="flex items-center gap-1">
                <Target className="w-4 h-4" />
                Foundation level
              </span>
              <span className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                Individual practice
              </span>
            </div>
          </CardHeader>
        </Card>

        {/* Content Placeholder - Replace with actual activity content */}
        <Card>
          <CardContent className="p-8">
            <div className="text-center text-gray-600">
              <h3 className="text-lg font-semibold mb-4">Activity Content Loading...</h3>
              <p className="mb-4">This activity teaches the fundamentals of creating GitLab milestones with proper naming conventions and basic setup.</p>
              
              <div className="bg-blue-50 p-6 rounded-lg text-left max-w-2xl mx-auto">
                <h4 className="font-semibold text-blue-800 mb-3">🎯 Learning Objectives:</h4>
                <ul className="space-y-2 text-blue-700">
                  <li>• Create a properly named milestone in GitLab</li>
                  <li>• Set appropriate due dates and descriptions</li>
                  <li>• Understand milestone naming conventions</li>
                  <li>• Practice basic project planning concepts</li>
                </ul>
              </div>

              <div className="mt-6 p-4 bg-amber-50 rounded-lg border-l-4 border-amber-400">
                <p className="text-amber-800">
                  <strong>Note:</strong> The full activity content will be integrated from the markdown file. 
                  This is a navigation placeholder showing the activity structure.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation Footer */}
        <div className="mt-8 flex justify-between">
          <Link 
            href="/activities/milestone-simulator" 
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous: Milestone Simulator
          </Link>
          
          <Link 
            href="/activities/capacity-planning" 
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Next: Capacity Planning
            <ArrowLeft className="w-4 h-4 rotate-180" />
          </Link>
        </div>
      </div>
    </div>
  );
}
