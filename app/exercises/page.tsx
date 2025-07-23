import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BookOpen, Rocket, Target, TrendingUp, Zap, BarChart3, Briefcase, DollarSign, Users, RefreshCw, Activity, Gauge, MessageSquare, Shield, Calendar, GitBranch } from "lucide-react";

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
            <div className="space-y-6">
              {/* Day 1: GitLab Foundations */}
              <details className="group" name="training-days" open>
                <summary className="flex items-center justify-between p-6 bg-white border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-6 h-6 text-green-600" />
                      <h2 className="text-xl font-bold text-gray-900">Day 1: GitLab Foundations</h2>
                    </div>
                  </div>
                  <div className="text-gray-400 group-open:rotate-180 transition-transform">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </summary>
                <div className="px-6 pb-6">
                  <Link href="/exercises/GitLabSearchQuiz" className="group">
                    <Card className="p-6 hover:shadow-lg transition-shadow border-l-4 border-l-pink-500">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-pink-100 rounded-lg group-hover:bg-pink-200 transition-colors">
                          <Activity className="w-6 h-6 text-pink-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-pink-600 transition-colors">
                            GitLab Search & Navigation Mastery Quiz
                          </h3>
                          <p className="text-gray-600 mb-4">
                            Master advanced search techniques, global search patterns, code search optimization, and navigation strategies for large GitLab instances and repositories.
                          </p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Activity className="w-4 h-4" />
                              Advanced search
                            </span>
                            <span className="flex items-center gap-1">
                              <Target className="w-4 h-4" />
                              Code navigation
                            </span>
                            <span className="flex items-center gap-1">
                              <Zap className="w-4 h-4" />
                              Productivity boost
                            </span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>

                  <Link href="/exercises/GitLabLabelQuiz" className="group">
                    <Card className="p-6 hover:shadow-lg transition-shadow border-l-4 border-l-yellow-500">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-yellow-100 rounded-lg group-hover:bg-yellow-200 transition-colors">
                          <Target className="w-6 h-6 text-yellow-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-yellow-600 transition-colors">
                            GitLab Labeling & Filtering Mastery Quiz
                          </h3>
                          <p className="text-gray-600 mb-4">
                            Practice strategic labeling systems, advanced filtering techniques, and organizational strategies for managing complex projects with hundreds of issues.
                          </p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Target className="w-4 h-4" />
                              Strategic labeling
                            </span>
                            <span className="flex items-center gap-1">
                              <TrendingUp className="w-4 h-4" />
                              Advanced filtering
                            </span>
                            <span className="flex items-center gap-1">
                              <BarChart3 className="w-4 h-4" />
                              Organization systems
                            </span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                </div>
              </details>

              {/* Day 2: Project Planning & Management */}
              <details className="group" name="training-days">
                <summary className="flex items-center justify-between p-6 bg-white border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Target className="w-6 h-6 text-blue-600" />
                      <h2 className="text-xl font-bold text-gray-900">Day 2: Project Planning & Management</h2>
                    </div>
                  </div>
                  <div className="text-gray-400 group-open:rotate-180 transition-transform">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </summary>
                <div className="px-6 pb-6">
                                    <Link href="/exercises/GitLabMilestoneSimulator" className="group">
                    <Card className="p-6 hover:shadow-lg transition-shadow border-l-4 border-l-indigo-500">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-indigo-100 rounded-lg group-hover:bg-indigo-200 transition-colors">
                          <Target className="w-6 h-6 text-indigo-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                            GitLab Milestone Creation Simulator
                          </h3>
                          <p className="text-gray-600 mb-4">
                            Practice milestone creation without GitLab access! Interactive step-by-step simulator for learning sprint planning, capacity calculations, and issue management in a safe environment.
                          </p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Target className="w-4 h-4" />
                              No GitLab needed
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              Step-by-step guidance
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              Safe practice environment
                            </span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                  <Link href="/exercises/ProjectPlanning" className="group">
                    <Card className="p-6 hover:shadow-lg transition-shadow border-l-4 border-l-blue-500">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                          <BookOpen className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                            Project Planning Workshop
                          </h3>
                          <p className="text-gray-600 mb-4">
                            Master essential project management skills including story estimation, sprint planning, risk assessment, and team capacity management in realistic project scenarios.
                          </p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Target className="w-4 h-4" />
                              Multiple scenarios
                            </span>
                            <span className="flex items-center gap-1">
                              <TrendingUp className="w-4 h-4" />
                              Estimation skills
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              Risk management
                            </span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                </div>
              </details>

              {/* Day 3: Advanced Workflows */}
              <details className="group" name="training-days">
                <summary className="flex items-center justify-between p-6 bg-white border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <GitBranch className="w-6 h-6 text-purple-600" />
                      <h2 className="text-xl font-bold text-gray-900">Day 3: Advanced Workflows & Integration</h2>
                    </div>
                  </div>
                  <div className="text-gray-400 group-open:rotate-180 transition-transform">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </summary>
                <div className="px-6 pb-6">
                  <Link href="/exercises/BranchNamingChallenge" className="group">
                    <Card className="p-6 hover:shadow-lg transition-shadow border-l-4 border-l-green-500">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                          <Zap className="w-6 h-6 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                            Branch Naming Challenge
                          </h3>
                          <p className="text-gray-600 mb-4">
                            Test your skills in creating consistent and descriptive branch names that enhance collaboration and code management.
                          </p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Zap className="w-4 h-4" />
                              Naming conventions
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              Team collaboration
                            </span>
                            <span className="flex items-center gap-1">
                              <Activity className="w-4 h-4" />
                              Code management
                            </span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>

                  <Link href="/exercises/CreateFirstPipeline" className="group">
                    <Card className="p-6 hover:shadow-lg transition-shadow border-l-4 border-l-blue-500">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                          <Rocket className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                            Create Your First CI/CD Pipeline
                          </h3>
                          <p className="text-gray-600 mb-4">
                            Get hands-on experience in setting up a basic CI/CD pipeline, understanding pipeline stages, and configuring jobs for automated testing and deployment.
                          </p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Rocket className="w-4 h-4" />
                              CI/CD fundamentals
                            </span>
                            <span className="flex items-center gap-1">
                              <Gauge className="w-4 h-4" />
                              Pipeline configuration
                            </span>
                            <span className="flex items-center gap-1">
                              <RefreshCw className="w-4 h-4" />
                              Automated deployment
                            </span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>

                  <Link href="/exercises/BrainstormIdealIntegration" className="group">
                    <Card className="p-6 hover:shadow-lg transition-shadow border-l-4 border-l-yellow-500">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-yellow-100 rounded-lg group-hover:bg-yellow-200 transition-colors">
                          <Shield className="w-6 h-6 text-yellow-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-yellow-600 transition-colors">
                            Brainstorm Ideal Integration
                          </h3>
                          <p className="text-gray-600 mb-4">
                            Collaborate with your team to design an ideal integration strategy for a sample project, considering factors like code quality, testing, and deployment.
                          </p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Shield className="w-4 h-4" />
                              Integration strategy
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              Team collaboration
                            </span>
                            <span className="flex items-center gap-1">
                              <Activity className="w-4 h-4" />
                              Code quality
                            </span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                </div>
              </details>

              {/* Bonus Section */}
              <details className="group" name="training-days">
                <summary className="flex items-center justify-between p-6 bg-white border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Zap className="w-6 h-6 text-yellow-600" />
                      <h2 className="text-xl font-bold text-gray-900">Bonus Challenges</h2>
                    </div>
                  </div>
                  <div className="text-gray-400 group-open:rotate-180 transition-transform">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </summary>
                <div className="px-6 pb-6">
                  <Link href="/exercises/BonusExercise1" className="group">
                    {/* Bonus Exercise 1 Card */}
                  </Link>
                  <Link href="/exercises/BonusExercise2" className="group">
                    {/* Bonus Exercise 2 Card */}
                  </Link>
                  <Link href="/exercises/BonusExercise3" className="group">
                    {/* Bonus Exercise 3 Card */}
                  </Link>
                  <Link href="/exercises/BonusExercise4" className="group">
                    {/* Bonus Exercise 4 Card */}
                  </Link>
                  <Link href="/exercises/BonusExercise5" className="group">
                    {/* Bonus Exercise 5 Card */}
                  </Link>
                </div>
              </details>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
