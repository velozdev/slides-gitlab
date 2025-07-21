import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BookOpen, Rocket, Target, TrendingUp, Zap, BarChart3, Briefcase, DollarSign, Users } from "lucide-react";

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
                        <Link href="/exercises/GitLabReleaseQuiz" className="group">
            <Card className="p-6 hover:shadow-lg transition-shadow border-l-4 border-l-orange-500">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-orange-100 rounded-lg group-hover:bg-orange-200 transition-colors">
                  <Rocket className="w-6 h-6 text-orange-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                    GitLab Release Planning & Deployment Strategy Quiz
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Master critical release management scenarios including feature flags, database migrations, multi-platform coordination, emergency response, and global rollouts.
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Target className="w-4 h-4" />
                      8 high-stakes scenarios
                    </span>
                    <span className="flex items-center gap-1">
                      <TrendingUp className="w-4 h-4" />
                      Business impact focus
                    </span>
                    <span className="flex items-center gap-1">
                      <Zap className="w-4 h-4" />
                      Real deployment strategies
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </Link>

          <Link href="/exercises/GitLabPortfolioWorkshop" className="group">
            <Card className="p-6 hover:shadow-lg transition-shadow border-l-4 border-l-purple-500">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                  <BarChart3 className="w-6 h-6 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                    GitLab Portfolio Management Workshop
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Master strategic portfolio management including resource allocation, stakeholder alignment, budget optimization, crisis recovery, and scaling during growth.
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Briefcase className="w-4 h-4" />
                      8 executive scenarios
                    </span>
                    <span className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      ROI-focused decisions
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      C-suite alignment
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
