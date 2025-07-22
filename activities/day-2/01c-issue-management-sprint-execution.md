# Activity 1C: Issue Management & Sprint Execution

## 🎯 **Objective**
Complete your sprint setup by adding issues to your milestone, managing story points, and establishing quality standards for sprint execution.

---

## ⏱️ **Duration**: 7 minutes
- **Individual Practice**: 5 minutes
- **Review & Validation**: 2 minutes

---

## 📋 **Prerequisites**
- Completed Activity 1A (Basic Milestone Creation)
- Completed Activity 1B (Capacity Planning)
- Understanding of story points and issue management
- Access to create/edit issues in `slides-gitlab` repository

---

## 🚀 **Your Mission**

Transform your milestone into a complete sprint plan by adding relevant issues, managing story point allocation, and establishing your Definition of Done for the slides-gitlab training platform.

### **Scenario Context**
Your sprint milestone now has proper capacity planning. The final step is to populate it with actual work items and establish quality standards that ensure successful delivery.

---

## 📝 **Step-by-Step Instructions**

### **Step 1: Create Sprint Issues** (3 minutes)
Create 4-5 issues that fit your calculated capacity. Use these templates for slides-gitlab:

#### **Issue 1: Content Enhancement** (8 story points)
- **Title**: "Update Module 4 slides with GitLab 17.2 features"
- **Description**: Update CI/CD content to reflect latest GitLab features
- **Labels**: `~"type::content"` `~"priority::high"` `~"module::ci-cd"`
- **Story Points**: 8
- **Assignee**: Content Creator

#### **Issue 2: Interactive Exercise** (5 story points)
- **Title**: "Create hands-on exercise for merge request workflows"
- **Description**: Build interactive exercise for Module 6
- **Labels**: `~"type::exercise"` `~"priority::medium"` `~"module::git"`
- **Story Points**: 5
- **Assignee**: Developer

#### **Issue 3: Bug Fix** (3 story points)
- **Title**: "Fix responsive design issues in slide navigation"
- **Description**: Mobile users report navigation problems
- **Labels**: `~"type::bug"` `~"priority::high"` `~"component::frontend"`
- **Story Points**: 3
- **Assignee**: Developer

#### **Issue 4: Documentation** (2 story points)
- **Title**: "Update trainer guides for new exercise formats"
- **Description**: Document new interactive exercise templates
- **Labels**: `~"type::documentation"` `~"priority::medium"`
- **Story Points**: 2
- **Assignee**: Content Creator

#### **Issue 5: Testing** (3 story points)
- **Title**: "Validate accessibility compliance for new features"
- **Description**: WCAG 2.1 AA compliance check
- **Labels**: `~"type::testing"` `~"priority::medium"` `~"qa::required"`
- **Story Points**: 3
- **Assignee**: QA/Reviewer

**Total**: 21 story points (adjust to fit your calculated capacity)

### **Step 2: Assign Issues to Milestone** (1 minute)
For each issue you create:
1. Go to the issue page
2. Click **"Edit"**
3. Select your `Sprint 13 - Platform Basics` milestone
4. Save the issue

### **Step 3: Complete Milestone Description** (1 minute)
Add the final sections to your milestone description:

```markdown
## 🎯 Definition of Done
- [ ] Code reviewed and approved by at least 1 team member
- [ ] Content reviewed for accuracy and clarity
- [ ] Basic testing completed (manual or automated)
- [ ] Documentation updated where applicable
- [ ] Accessibility guidelines followed
- [ ] No critical bugs introduced

## 📊 Sprint Backlog
**Committed Stories**: 21 story points
**Team Capacity**: 80 story points
**Capacity Utilization**: 26% (conservative for learning sprint)

### Issue Breakdown:
- Content Enhancement: 8 pts
- Interactive Exercise: 5 pts
- Bug Fix: 3 pts
- Documentation: 2 pts
- Testing: 3 pts

## 🔗 Related Links
- [Sprint Planning Board](../../issues/boards)
- [Training Content Guidelines](../../wikis/content-guidelines)
- [Definition of Done Checklist](../../wikis/definition-of-done)
```

---

## 🎯 **Story Point Allocation Strategies**

### **Strategy 1: Conservative Loading (Recommended for Learning)**
- Use 25-50% of total capacity
- Focus on completing fewer items well
- Build confidence and team rhythm

### **Strategy 2: Balanced Loading**
- Use 60-80% of total capacity
- Mix of different story point sizes
- Realistic for experienced teams

### **Strategy 3: Aggressive Loading**
- Use 80-95% of total capacity
- Only for very experienced, stable teams
- High risk of not completing sprint goal

### **Story Point Distribution Guidelines:**
- **Small (1-3 pts)**: 40-50% of stories
- **Medium (5-8 pts)**: 30-40% of stories  
- **Large (13+ pts)**: 10-20% of stories (break down if possible)

---

## 🏆 **Advanced Sprint Management**

### **Issue Prioritization Framework:**
1. **Critical Bugs**: Must fix, affects users
2. **High-Value Features**: Direct business impact
3. **Technical Debt**: Impacts team velocity
4. **Nice-to-Have**: Only if capacity allows

### **Risk Management:**
- **Dependency Issues**: Mark issues with external dependencies
- **Knowledge Gaps**: Identify items requiring learning
- **Resource Constraints**: Note any special tool/access needs
- **Time Boxing**: Set maximum time limits for research tasks

### **Sprint Commitment Guidelines:**
- **Must-Have**: Core sprint goal items (60-70% of capacity)
- **Should-Have**: Important but not critical (20-30% of capacity)
- **Could-Have**: Stretch goals if time permits (5-10% of capacity)

---

## 🤔 **Sprint Validation Questions**

### **Capacity Check:**
- Does total story points ≤ team capacity?
- Is there a mix of story point sizes?
- Are all team members appropriately loaded?
- Is there buffer for unexpected work?

### **Quality Check:**
- Is the Definition of Done realistic and clear?
- Are all issues properly labeled and assigned?
- Do issues contribute to the sprint goal?
- Are dependencies identified and managed?

### **Team Readiness:**
- Does everyone understand their assignments?
- Are there any blocking dependencies?
- Do we have all necessary tools and access?
- Is the sprint goal achievable and valuable?

---

## ✅ **Completion Checklist**

### **Issues & Assignment:**
- [ ] 4-5 issues created for the sprint
- [ ] All issues assigned to the milestone
- [ ] Story points total within team capacity (with buffer)
- [ ] Issues properly labeled and assigned to team members
- [ ] Mix of issue types (features, bugs, documentation)

### **Milestone Completion:**
- [ ] Definition of Done defined and realistic
- [ ] Sprint backlog documented with story point breakdown
- [ ] Capacity utilization calculated and appropriate
- [ ] Related links added for team reference
- [ ] Sprint goal clearly supports learning objectives

### **Quality Standards:**
- [ ] All issues have clear acceptance criteria
- [ ] Dependencies identified and documented
- [ ] Risk factors considered and mitigated
- [ ] Team has capacity for review and testing

---

## 🤖 **Leverage GitLab Duo Chat**

**Use Duo Chat for comprehensive sprint execution guidance!**

### **Issue Creation & Story Points:**
```
"Help me write a clear issue description for updating GitLab CI/CD training slides with latest features. Include acceptance criteria."
```

```
"What story point estimate would be appropriate for creating an interactive merge request exercise for a training platform?"
```

```
"Generate 5 realistic issue titles for improving a GitLab training platform, with appropriate story point estimates"
```

### **Definition of Done:**
```
"Help me create a Definition of Done checklist for a training content development team working on GitLab educational materials"
```

```
"What quality standards should be included in our Definition of Done for both technical and content work?"
```

### **Sprint Validation:**
```
"Review my sprint plan and check if the story point allocation is realistic: [paste your issue breakdown]"
```

```
"I have 80 story points capacity and 21 points committed. Is this a good ratio for a new team?"
```

### **Issue Management:**
```
"What GitLab labels should I use for organizing training content issues by type, priority, and module?"
```

```
"How should I structure issues to track both content creation and technical development work in the same sprint?"
```

### **Risk Assessment:**
```
"What are common risks in content development sprints and how can I mitigate them in my milestone planning?"
```

```
"Help me identify potential dependencies between these issues: [list your sprint issues]"
```

### **Sprint Optimization:**
```
"How can I improve this sprint backlog to better balance different types of work and team members?"
```

**💡 Expert Tip**: Use Duo Chat to simulate sprint planning conversations and identify potential issues before they occur!

---

## 💡 **Key Takeaways**

### **Sprint Planning Success Factors:**
- **Realistic Commitment**: Better to under-commit and over-deliver
- **Clear Definition of Done**: Ensures consistent quality standards
- **Balanced Workload**: Mix of story sizes and types
- **Team Alignment**: Everyone understands their role and responsibilities

### **Common Sprint Planning Mistakes:**
- Over-committing based on ideal capacity
- Unclear or missing Definition of Done
- Issues too large or poorly defined
- No buffer for unexpected work or learning

### **Continuous Improvement:**
- Track actual vs. planned story points
- Note what causes scope changes
- Refine estimation accuracy over time
- Adjust Definition of Done based on lessons learned

**Next Steps**: Use this milestone for daily standups, progress tracking, and sprint review preparation. Apply these skills to Activity 2 (Workflow Boards) and beyond.

---

## 📚 **Additional Resources**
- [GitLab Issue Management](https://docs.gitlab.com/ee/user/project/issues/)
- [Story Point Estimation Guide](https://about.gitlab.com/handbook/engineering/development/principles/#iteration)
- [Definition of Done Examples](https://docs.gitlab.com/ee/development/contributing/merge_request_workflow.html)
- [Sprint Review Best Practices](https://about.gitlab.com/handbook/engineering/workflow/)
