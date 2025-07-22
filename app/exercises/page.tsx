import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BookOpen, Rocket, Target, TrendingUp, Zap, BarChart3, Briefcase, DollarSign, Users, RefreshCw, Activity, Gauge, MessageSquare, Shield, Calendar } from "lucide-react";

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
            <div className="grid gap-6">
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

              <Link href="/exercises/GitLabCommunicationQuiz" className="group">
                <Card className="p-6 hover:shadow-lg transition-shadow border-l-4 border-l-indigo-500">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-indigo-100 rounded-lg group-hover:bg-indigo-200 transition-colors">
                      <Users className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                        GitLab Communication & Collaboration Quiz
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Test and improve your collaboration skills with scenarios covering merge request reviews, issue discussions, cross-team communication, and conflict resolution.
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <BookOpen className="w-4 h-4" />
                          Communication best practices
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          Team collaboration
                        </span>
                        <span className="flex items-center gap-1">
                          <Target className="w-4 h-4" />
                          Conflict resolution
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>

              <Link href="/exercises/GitLabQuiz" className="group">
                <Card className="p-6 hover:shadow-lg transition-shadow border-l-4 border-l-green-500">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                      <Rocket className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                        GitLab Fundamentals Quiz
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Master core GitLab concepts including projects, groups, merge requests, issues, CI/CD pipelines, and essential workflows for effective project management.
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <BookOpen className="w-4 h-4" />
                          Core concepts
                        </span>
                        <span className="flex items-center gap-1">
                          <Rocket className="w-4 h-4" />
                          Essential workflows
                        </span>
                        <span className="flex items-center gap-1">
                          <Target className="w-4 h-4" />
                          CI/CD basics
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

              <Link href="/exercises/GitLabPermissions" className="group">
                <Card className="p-6 hover:shadow-lg transition-shadow border-l-4 border-l-purple-500">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                      <Users className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                        GitLab Permissions & Access Control Workshop
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Navigate complex permission scenarios including role assignments, access escalation, security compliance, and team onboarding challenges every PM encounters.
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          Role management
                        </span>
                        <span className="flex items-center gap-1">
                          <Target className="w-4 h-4" />
                          Security compliance
                        </span>
                        <span className="flex items-center gap-1">
                          <BarChart3 className="w-4 h-4" />
                          Access strategies
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>

              <Link href="/exercises/GitLabOKRPlanningWorkshop" className="group">
                <Card className="p-6 hover:shadow-lg transition-shadow border-l-4 border-l-teal-500">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-teal-100 rounded-lg group-hover:bg-teal-200 transition-colors">
                      <TrendingUp className="w-6 h-6 text-teal-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors">
                        GitLab OKR Planning & Iterations Workshop
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Master strategic goal-setting with OKRs, iteration planning, milestone tracking, and performance measurement using GitLab's proven methodologies for scaling teams.
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <TrendingUp className="w-4 h-4" />
                          OKR methodology
                        </span>
                        <span className="flex items-center gap-1">
                          <Target className="w-4 h-4" />
                          Iteration planning
                        </span>
                        <span className="flex items-center gap-1">
                          <BarChart3 className="w-4 h-4" />
                          Performance tracking
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>

              <Link href="/exercises/GitLabStakeholderScenarios" className="group">
                <Card className="p-6 hover:shadow-lg transition-shadow border-l-4 border-l-blue-500">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                      <MessageSquare className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        GitLab Stakeholder & Client Management Scenarios
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Master complex stakeholder relationships including C-suite alignment, client conflict resolution, partnership management, and crisis communication strategies.
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          8 stakeholder scenarios
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageSquare className="w-4 h-4" />
                          Crisis communication
                        </span>
                        <span className="flex items-center gap-1">
                          <Shield className="w-4 h-4" />
                          Relationship management
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
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

          <Link href="/exercises/GitLabRetrospectiveLab" className="group">
            <Card className="p-6 hover:shadow-lg transition-shadow border-l-4 border-l-green-500">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                  <RefreshCw className="w-6 h-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                    GitLab Agile Retrospective & Process Improvement Lab
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Master continuous improvement through data-driven retrospectives, velocity analysis, workflow optimization, and GitLab analytics integration.
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <BarChart3 className="w-4 h-4" />
                      8 process scenarios
                    </span>
                    <span className="flex items-center gap-1">
                      <Activity className="w-4 h-4" />
                      Analytics-driven
                    </span>
                    <span className="flex items-center gap-1">
                      <Gauge className="w-4 h-4" />
                      Performance metrics
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </Link>

          <Link href="/exercises/MilestonesAndEpics" className="group">
            <Card className="p-6 hover:shadow-lg transition-shadow border-l-4 border-l-purple-500">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                  <Target className="w-6 h-6 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                    GitLab Milestones & Epics Workshop
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Master milestone planning, sprint capacity management, and epic organization through interactive hands-on workshops with achievement tracking and realistic project scenarios.
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Sprint planning
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      Capacity management
                    </span>
                    <span className="flex items-center gap-1">
                      <Target className="w-4 h-4" />
                      Goal setting
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </Link>

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
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
