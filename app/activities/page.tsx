import Link from "next/link";
import { BookOpen, Calendar, Target, Users, GitBranch, Settings, Award, Clock, FileText } from "lucide-react";

export default function ActivitiesDashboard() {
  return (
    <div className="min-h-screen bg-background text-foreground p-4 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 bg-white border border-gray-200 rounded-lg p-6">
          <div className="mb-4">
            <h1 className="flex items-center gap-2 text-2xl font-bold text-gray-900">
              <BookOpen className="w-6 h-6 text-blue-600" />
              GitLab Training Activities
            </h1>
          </div>
          <div>
            <p className="mb-4 text-gray-700">
              Hands-on practice activities for real GitLab environments. Each day builds on previous skills with progressive complexity.
            </p>
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <div className="flex items-center gap-4 text-sm text-blue-700">
                <span className="flex items-center gap-1">
                  <Target className="w-4 h-4" />
                  Real GitLab practice
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  Progressive difficulty
                </span>
                <span className="flex items-center gap-1">
                  <Award className="w-4 h-4" />
                  Achievement tracking
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Days Navigation */}
        <div className="space-y-6">
          {/* Day 1: GitLab Foundations */}
          <details className="group" name="training-days">
            <summary className="flex items-center justify-between p-6 bg-white border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-6 h-6 text-green-600" />
                  <h2 className="text-xl font-bold text-gray-900">Day 1: GitLab Foundations</h2>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">✅ Complete</span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded">85 minutes</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">5 activities</span>
                </div>
              </div>
              <div className="text-gray-400 group-open:rotate-180 transition-transform">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </summary>
            
            <div className="px-6 pb-6">
              <p className="text-gray-600 mb-6">
                Master GitLab basics, navigation, issue creation, time tracking, labeling, and advanced search. Perfect foundation for project management.
              </p>
              
              <div className="grid gap-4">
                {/* Navigation Practice */}
                <div className="bg-green-50 p-4 rounded-lg border-l-4 border-l-green-500">
                  <h3 className="font-semibold text-green-800 mb-3">🧭 Interface & Navigation</h3>
                  <Link href="/activities/gitlab-navigation" className="group block">
                    <div className="p-3 bg-white rounded-lg border hover:shadow-md transition-shadow">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                          <BookOpen className="w-4 h-4 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 group-hover:text-green-600 transition-colors">
                            Activity 1.1: GitLab Navigation Practice
                          </h4>
                          <p className="text-gray-600 mb-2">
                            Get comfortable with GitLab's interface through guided exploration of the slides-gitlab repository. No prior experience required!
                          </p>
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              10 minutes
                            </span>
                            <span className="flex items-center gap-1">
                              <Target className="w-3 h-3" />
                              Beginner level
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              Exploration focus
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                  <div className="mt-3 text-xs text-green-700">
                    <strong>Focus:</strong> Interface discovery • Scavenger hunt • Confidence building
                  </div>
                </div>

                {/* Advanced Issue Creation */}
                <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-l-orange-500">
                  <h3 className="font-semibold text-orange-800 mb-3">� Professional Issue Management</h3>
                  <Link href="/activities/advanced-issue" className="group block">
                    <div className="p-3 bg-white rounded-lg border hover:shadow-md transition-shadow">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-orange-100 rounded-lg group-hover:bg-orange-200 transition-colors">
                          <FileText className="w-4 h-4 text-orange-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 group-hover:text-orange-600 transition-colors">
                            Activity 1.2: Create Your First Advanced Issue
                          </h4>
                          <p className="text-gray-600 mb-2">
                            Master professional issue creation with user stories, acceptance criteria, and proper formatting for real-world projects.
                          </p>
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              20 minutes
                            </span>
                            <span className="flex items-center gap-1">
                              <Target className="w-3 h-3" />
                              Beginner+ level
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              Practice focus
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                  
                  {/* Time Tracking Activity */}
                  <Link href="/activities/time-tracking" className="group block mb-3">
                    <div className="p-3 bg-white rounded-lg border hover:shadow-md transition-shadow">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-orange-100 rounded-lg group-hover:bg-orange-200 transition-colors">
                          <Clock className="w-4 h-4 text-orange-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 group-hover:text-orange-600 transition-colors">
                            Activity 1.3: Time Tracking Practice
                          </h4>
                          <p className="text-gray-600 mb-2">
                            Learn GitLab's time tracking features for estimation, work logging, and sprint planning insights.
                          </p>
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              20 minutes
                            </span>
                            <span className="flex items-center gap-1">
                              <Target className="w-3 h-3" />
                              Beginner+ level
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              Individual practice
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>

                  {/* Label System Design Activity */}
                  <Link href="/activities/label-system" className="group block mb-3">
                    <div className="p-3 bg-white rounded-lg border hover:shadow-md transition-shadow">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                          <BookOpen className="w-4 h-4 text-purple-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 group-hover:text-purple-600 transition-colors">
                            Activity 1.4: Design Your Training Platform Label System
                          </h4>
                          <p className="text-gray-600 mb-2">
                            Master GitLab's labeling system by creating practical scoped labels for effective project organization.
                          </p>
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              15 minutes
                            </span>
                            <span className="flex items-center gap-1">
                              <Target className="w-3 h-3" />
                              Intermediate level
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              Design focus
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>

                  {/* Search Arsenal Activity */}
                  <Link href="/activities/search-arsenal" className="group block">
                    <div className="p-3 bg-white rounded-lg border hover:shadow-md transition-shadow">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                          <BookOpen className="w-4 h-4 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                            Activity 1.5: Build Your Training Platform Search Arsenal
                          </h4>
                          <p className="text-gray-600 mb-2">
                            Master GitLab's advanced search capabilities to create efficient workflows for daily project management.
                          </p>
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              20 minutes
                            </span>
                            <span className="flex items-center gap-1">
                              <Target className="w-3 h-3" />
                              Intermediate+ level
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              Workflow focus
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                  
                  <div className="mt-3 text-xs text-orange-700">
                    <strong>Focus:</strong> Advanced search • Workflow optimization • Team coordination • Information access
                  </div>
                </div>

                {/* Day 1 Complete Badge */}
                <div className="bg-green-50 p-4 rounded-lg border-l-4 border-l-green-500">
                  <h3 className="font-semibold text-green-800 mb-2">🎉 Day 1 Complete!</h3>
                  <p className="text-sm text-green-700 mb-3">
                    You've mastered GitLab foundations with 5 comprehensive activities covering navigation, issue creation, time tracking, labeling systems, and advanced search workflows.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4 mb-3">
                    <div>
                      <h4 className="font-medium text-green-800 mb-1">Skills Mastered</h4>
                      <ul className="text-xs text-green-600 space-y-1">
                        <li>• GitLab interface navigation</li>
                        <li>• Professional issue writing with user stories</li>
                        <li>• Time tracking for sprint planning</li>
                        <li>• Scoped label system design</li>
                        <li>• Advanced search and filtering</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-green-800 mb-1">Ready for Day 2</h4>
                      <ul className="text-xs text-green-600 space-y-1">
                        <li>• Milestone and sprint management</li>
                        <li>• Capacity planning with effort labels</li>
                        <li>• Workflow board configuration</li>
                        <li>• Epic planning and roadmaps</li>
                        <li>• Advanced project coordination</li>
                      </ul>
                    </div>
                  </div>
                  <div className="text-xs text-green-600">
                    <strong>Total Time:</strong> 85 minutes • <strong>Foundation Complete:</strong> Ready for advanced project management
                  </div>
                </div>
              </div>
            </div>
          </details>

          {/* Day 2: Project Planning & Management */}
          <details className="group" name="training-days" open>
            <summary className="flex items-center justify-between p-6 bg-white border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Target className="w-6 h-6 text-blue-600" />
                  <h2 className="text-xl font-bold text-gray-900">Day 2: Project Planning & Management</h2>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">In Progress</span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded">75 minutes</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">6 activities</span>
                </div>
              </div>
              <div className="text-gray-400 group-open:rotate-180 transition-transform">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </summary>
            
            <div className="px-6 pb-6">
              <p className="text-gray-600 mb-6">
                Advanced project management with milestones, capacity planning, and workflow boards. Build professional project management skills.
              </p>
              
              <div className="grid gap-4">
                {/* Milestone Series */}
                <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-l-blue-500">
                  <h3 className="font-semibold text-blue-800 mb-3">📋 Milestone & Sprint Management Series</h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    <Link href="/activities/milestone-simulator" className="group">
                      <div className="p-3 bg-white rounded-lg border hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-indigo-100 rounded-lg group-hover:bg-indigo-200 transition-colors">
                            <Target className="w-4 h-4 text-indigo-600" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                              Activity 2.0: Milestone Simulator
                            </h4>
                            <p className="text-xs text-gray-600 mb-2">
                              Practice milestone creation without GitLab access (15 min)
                            </p>
                            <div className="text-xs text-indigo-600">No GitLab needed • Interactive • Safe practice</div>
                          </div>
                        </div>
                      </div>
                    </Link>

                    <Link href="/activities/basic-milestone" className="group">
                      <div className="p-3 bg-white rounded-lg border hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                            <Calendar className="w-4 h-4 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                              Activity 2.1: Basic Milestone Creation
                            </h4>
                            <p className="text-xs text-gray-600 mb-2">
                              Learn milestone fundamentals and naming conventions (5 min)
                            </p>
                            <div className="text-xs text-blue-600">Foundation • Real GitLab • Quick start</div>
                          </div>
                        </div>
                      </div>
                    </Link>

                    <Link href="/activities/capacity-planning" className="group">
                      <div className="p-3 bg-white rounded-lg border hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                            <Users className="w-4 h-4 text-green-600" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                              Activity 2.2: Sprint Capacity Planning
                            </h4>
                            <p className="text-xs text-gray-600 mb-2">
                              Master capacity calculations and team coordination (8 min)
                            </p>
                            <div className="text-xs text-green-600">Intermediate • Mathematical • Team-focused</div>
                          </div>
                        </div>
                      </div>
                    </Link>

                    <Link href="/activities/issue-management" className="group">
                      <div className="p-3 bg-white rounded-lg border hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                            <BookOpen className="w-4 h-4 text-purple-600" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                              Activity 2.3: Issue Management & Sprint Execution
                            </h4>
                            <p className="text-xs text-gray-600 mb-2">
                              Complete sprint setup with issue assignment and validation (7 min)
                            </p>
                            <div className="text-xs text-purple-600">Advanced • Comprehensive • Quality-focused</div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                  <div className="mt-3 text-xs text-blue-700">
                    <strong>Series Total:</strong> 35 minutes • <strong>Path:</strong> Simulator → Basic → Capacity → Issues
                  </div>
                </div>

                {/* Workflow Boards */}
                <div className="bg-green-50 p-4 rounded-lg border-l-4 border-l-green-500">
                  <h3 className="font-semibold text-green-800 mb-3">📊 Issue Board & Workflow Management</h3>
                  <Link href="/activities/workflow-boards" className="group block">
                    <div className="p-3 bg-white rounded-lg border hover:shadow-md transition-shadow">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                          <Settings className="w-4 h-4 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 group-hover:text-green-600 transition-colors">
                            Activity 2.4: Configure Team Workflow Board
                          </h4>
                          <p className="text-gray-600 mb-2">
                            Build customized issue boards for content development, training delivery, or platform enhancement with role-specific templates.
                          </p>
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              10 minutes
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              Role-based boards
                            </span>
                            <span className="flex items-center gap-1">
                              <Target className="w-3 h-3" />
                              WIP limits & swimlanes
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                  <div className="mt-3 text-xs text-green-700">
                    <strong>Focus:</strong> Workflow optimization • Kanban boards • Team coordination
                  </div>
                </div>

                {/* Epic Structure */}
                <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-l-purple-500">
                  <h3 className="font-semibold text-purple-800 mb-3">🏗️ Strategic Epic Planning</h3>
                  <Link href="/activities/epic-structure" className="group block">
                    <div className="p-3 bg-white rounded-lg border hover:shadow-md transition-shadow">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                          <GitBranch className="w-4 h-4 text-purple-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 group-hover:text-purple-600 transition-colors">
                            Activity 2.5: Create Your Epic Structure
                          </h4>
                          <p className="text-gray-600 mb-2">
                            Master GitLab epic creation by organizing existing slides-gitlab issues into strategic initiatives that drive platform enhancement.
                          </p>
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              10 minutes
                            </span>
                            <span className="flex items-center gap-1">
                              <GitBranch className="w-3 h-3" />
                              Epic planning
                            </span>
                            <span className="flex items-center gap-1">
                              <Target className="w-3 h-3" />
                              Strategic thinking
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                  <div className="mt-3 text-xs text-purple-700">
                    <strong>Focus:</strong> Business objectives • Issue organization • Strategic planning
                  </div>
                </div>

                {/* Strategic Roadmaps */}
                <div className="bg-indigo-50 p-4 rounded-lg border-l-4 border-l-indigo-500">
                  <h3 className="font-semibold text-indigo-800 mb-3">🗺️ Strategic Planning & Communication</h3>
                  <Link href="/activities/roadmap-communication" className="group block">
                    <div className="p-3 bg-white rounded-lg border hover:shadow-md transition-shadow">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-indigo-100 rounded-lg group-hover:bg-indigo-200 transition-colors">
                          <Target className="w-4 h-4 text-indigo-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 group-hover:text-indigo-600 transition-colors">
                            Activity 2.6: Building and Communicating with Roadmaps
                          </h4>
                          <p className="text-gray-600 mb-2">
                            Master GitLab's roadmap visualization to communicate strategic plans and coordinate cross-functional training platform initiatives.
                          </p>
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              20 minutes
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              Strategic planning
                            </span>
                            <span className="flex items-center gap-1">
                              <Target className="w-3 h-3" />
                              Stakeholder communication
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                  <div className="mt-3 text-xs text-indigo-700">
                    <strong>Focus:</strong> Epic planning • Timeline visualization • Cross-functional coordination
                  </div>
                </div>
              </div>

              <div className="mt-4 bg-blue-100 p-3 rounded-lg">
                <div className="text-sm text-blue-800">
                  <strong>Day 2 Total:</strong> ~75 minutes • <strong>Skills:</strong> Sprint planning, capacity management, workflow boards, epic planning, strategic roadmaps
                </div>
              </div>
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
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded">Coming Soon</span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded">~90 minutes</span>
                  <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded">7 activities</span>
                </div>
              </div>
              <div className="text-gray-400 group-open:rotate-180 transition-transform">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </summary>
            
            <div className="px-6 pb-6">
              <p className="text-gray-600 mb-6">
                Advanced GitLab features including merge requests, CI/CD pipelines, and epic planning. Master professional development workflows.
              </p>
              
              <div className="grid gap-4">
                <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-l-purple-500">
                  <h3 className="font-semibold text-purple-800 mb-3">�️ Advanced Git Workflows</h3>
                  <Link href="/activities/branch-naming-challenge" className="group block">
                    <div className="p-3 bg-white rounded-lg border hover:shadow-md transition-shadow">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                          <GitBranch className="w-4 h-4 text-purple-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 group-hover:text-purple-600 transition-colors">
                            Activity 3.1: The Branch Naming Challenge
                          </h4>
                          <p className="text-gray-600 mb-2">
                            Master Git branch naming conventions using real issues from our slides-gitlab repository
                          </p>
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              25 minutes
                            </span>
                            <span className="flex items-center gap-1">
                              <Target className="w-3 h-3" />
                              Advanced level
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              Interactive challenge
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                  <div className="mt-3 text-xs text-purple-700">
                    <strong>Focus:</strong> Professional conventions • Repository organization • Team collaboration
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-l-gray-400">
                  <h3 className="font-semibold text-gray-700 mb-2">🚧 More Activities Coming Soon</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• <strong>Activity 3.2:</strong> Advanced Git Workflows & Merge Strategies (20 min)</li>
                    <li>• <strong>Activity 3.3:</strong> Code Review Best Practices (25 min)</li>
                    <li>• <strong>Activity 3.4:</strong> CI/CD Pipeline Fundamentals (30 min)</li>
                    <li>• <strong>Activity 3.5:</strong> Advanced GitLab Integration (20 min)</li>
                  </ul>
                  <div className="mt-3 text-xs text-gray-500">
                    <strong>Additional Time:</strong> ~95 minutes • <strong>Prerequisites:</strong> Day 1 & 2 completion
                  </div>
                </div>
              </div>
            </div>
          </details>
        </div>

        {/* Quick Links & Resources */}
        <div className="mt-8 bg-white border border-gray-200 rounded-lg p-6">
          <div className="mb-4">
            <h2 className="text-lg font-bold text-gray-900">🔗 Related Resources</h2>
          </div>
          <div>
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/exercises" className="group">
                <div className="p-4 bg-blue-50 rounded-lg border hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="w-5 h-5 text-blue-600" />
                    <h3 className="font-semibold text-blue-800 group-hover:text-blue-900">Interactive Exercises</h3>
                  </div>
                  <p className="text-sm text-blue-700">
                    Web-based practice tools and simulations that don't require GitLab access
                  </p>
                </div>
              </Link>

              <Link href="/slides" className="group">
                <div className="p-4 bg-green-50 rounded-lg border hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="w-5 h-5 text-green-600" />
                    <h3 className="font-semibold text-green-800 group-hover:text-green-900">Training Slides</h3>
                  </div>
                  <p className="text-sm text-green-700">
                    Comprehensive slide content covering GitLab concepts and best practices
                  </p>
                </div>
              </Link>

              <div className="p-4 bg-purple-50 rounded-lg border">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="w-5 h-5 text-purple-600" />
                  <h3 className="font-semibold text-purple-800">Progress Tracking</h3>
                </div>
                <p className="text-sm text-purple-700">
                  Complete activities to build comprehensive GitLab project management skills
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
