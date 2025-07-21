import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BookOpen } from "lucide-react";

export default function ExercisesDashboard() {
  return (
    <div className="min-h-screen bg-background text-foreground p-4 font-sans">
      <div className="max-w-4xl mx-auto">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-blue-600" />
              Interactive Exercises
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-gray-700">Practice project planning, communication, and GitLab skills with interactive exercises and quizzes.</p>
            <div className="grid md:grid-cols-2 gap-6">
              <Link href="/exercises/ProjectPlanning" className="block p-4 rounded-lg bg-blue-50 hover:bg-blue-100 transition">
                <span className="font-semibold text-blue-800">Project Planning Workshop</span>
                <p className="text-sm text-gray-600">Estimate stories, plan sprints, assess risks.</p>
              </Link>
              <Link href="/exercises/GitLabCommunicationQuiz" className="block p-4 rounded-lg bg-indigo-50 hover:bg-indigo-100 transition">
                <span className="font-semibold text-indigo-800">GitLab Communication Quiz</span>
                <p className="text-sm text-gray-600">Test your collaboration and communication best practices.</p>
              </Link>
              <Link href="/exercises/GitLabQuiz" className="block p-4 rounded-lg bg-green-50 hover:bg-green-100 transition">
                <span className="font-semibold text-green-800">GitLab Fundamentals Quiz</span>
                <p className="text-sm text-gray-600">Core concepts and workflows in GitLab.</p>
              </Link>
              <Link href="/exercises/GitLabLabelQuiz" className="block p-4 rounded-lg bg-yellow-50 hover:bg-yellow-100 transition">
                <span className="font-semibold text-yellow-800">Labeling & Filtering Quiz</span>
                <p className="text-sm text-gray-600">Practice strategic labeling and filtering.</p>
              </Link>
              <Link href="/exercises/GitLabSearchQuiz" className="block p-4 rounded-lg bg-pink-50 hover:bg-pink-100 transition">
                <span className="font-semibold text-pink-800">GitLab Search Quiz</span>
                <p className="text-sm text-gray-600">Master search and navigation in GitLab.</p>
              </Link>
              <Link href="/exercises/GitLabPermissions" className="block p-4 rounded-lg bg-purple-50 hover:bg-purple-100 transition">
                <span className="font-semibold text-purple-800">GitLab Permissions & Access Control</span>
                <p className="text-sm text-gray-600">Real-world permission scenarios every PM faces.</p>
              </Link>
            <Link href="/exercises/GitLabOKRPlanningWorkshop" className="block p-4 rounded-lg bg-teal-50 hover:bg-teal-100 transition">
                <span className="font-semibold text-teal-800">GitLab OKR Planning + Iterations</span>
                <p className="text-sm text-gray-600">OKRs have been a game-changer in GitLab.</p>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
