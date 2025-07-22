# Activity 1B: Sprint Capacity Planning & Team Setup

## 🎯 **Objective**
Master sprint capacity calculations, team coordination, and professional milestone descriptions using real-world scenarios and formulas.

---

## ⏱️ **Duration**: 8 minutes
- **Individual Practice**: 6 minutes
- **Review & Discussion**: 2 minutes

---

## 📋 **Prerequisites**
- Completed Activity 1A (Basic Milestone Creation)
- Access to the `slides-gitlab` GitLab repository
- Understanding of story points concept
- Calculator or ability to do basic math

---

## 🚀 **Your Mission**

Transform your basic milestone into a professional sprint plan with detailed capacity calculations, team coordination details, and comprehensive planning information.

### **Scenario Context**
Your team lead has asked you to enhance the milestone you created with proper capacity planning. The team needs to understand exactly how much work can be committed to this sprint.

---

## 📝 **Step-by-Step Instructions**

### **Step 1: Open Your Existing Milestone** (1 minute)
1. Go to **Issues** → **Milestones**
2. Find your `Sprint 13 - Platform Basics` milestone
3. Click **"Edit"** to modify the description

### **Step 2: Add Team Capacity Section** (3 minutes)
Replace your basic description with this enhanced template:

```markdown
## 🎯 Sprint Goal
Learn milestone creation and basic GitLab project management workflows for the slides-gitlab training platform.

## 👥 Team Capacity Calculation
- **Team Size**: 4 team members
- **Sprint Duration**: 2 weeks (10 working days)
- **Availability**: 80% (accounting for meetings, code reviews, support)
- **Velocity**: 2.5 story points per person per day
- **Total Capacity**: 4 × 10 × 0.80 × 2.5 = **80 story points**

### Capacity Breakdown by Role:
- **Content Creator**: 20 story points
- **Developer**: 25 story points  
- **Designer**: 15 story points
- **QA/Reviewer**: 20 story points

## 📅 Sprint Schedule
- **Sprint Planning**: July 21, 2025 (9:00 AM)
- **Daily Standups**: 9:30 AM daily
- **Mid-Sprint Check**: July 28, 2025
- **Sprint Review**: August 4, 2025 (2:00 PM)
- **Retrospective**: August 4, 2025 (3:30 PM)

## ✅ Success Criteria
- [ ] Team completes capacity planning exercise
- [ ] All team members understand milestone process
- [ ] Basic GitLab workflows documented
- [ ] Sprint review successfully conducted
```

### **Step 3: Calculate Your Own Team Capacity** (2 minutes)
Customize the capacity calculation for a realistic scenario:

**Your Team Scenario:**
- **Team Size**: Choose 3-6 people
- **Availability**: Consider realistic factors (75-90%)
- **Velocity**: Estimate 2-4 story points per person per day
- **Calculate**: Team Size × 10 days × Availability % × Velocity = Total Capacity

**Example Calculations:**
- Small team (3 people, 85%, 3 pts/day): 3 × 10 × 0.85 × 3 = **76.5 story points**
- Medium team (5 people, 80%, 2.5 pts/day): 5 × 10 × 0.80 × 2.5 = **100 story points**
- Large team (6 people, 75%, 2 pts/day): 6 × 10 × 0.75 × 2 = **90 story points**

---

## 🤔 **Capacity Planning Questions**

Work through these questions to refine your calculations:

### **Team Availability Assessment:**
- **Meetings & Ceremonies**: How much time for standups, planning, reviews? (10-20%)
- **Code Reviews**: Time spent reviewing others' work? (5-15%)
- **Support & Maintenance**: Ongoing support responsibilities? (5-10%)
- **Learning & Development**: Time for skill building? (5-10%)

### **Velocity Considerations:**
- **Task Complexity**: Are tasks well-defined or exploratory?
- **Team Experience**: How familiar is the team with the technology?
- **Dependencies**: How many external dependencies exist?
- **Definition of Done**: How comprehensive are your quality standards?

### **Realistic Adjustments:**
- **Buffer for Unknowns**: Add 15-20% buffer for unexpected work
- **Vacation Time**: Account for any planned time off
- **Holidays**: Consider any holidays during the sprint
- **New Team Members**: Reduce capacity for onboarding time

---

## 🏆 **Advanced Capacity Scenarios**

### **Scenario 1: Cross-Functional Team**
Team with mixed skills working on slides-gitlab:
- 2 Developers (3 pts/day each)
- 1 Content Creator (2 pts/day)  
- 1 Designer (2.5 pts/day)
- **Calculation**: (2×3 + 1×2 + 1×2.5) × 10 × 0.85 = **91.8 story points**

### **Scenario 2: Remote Team with Time Zones**
Global team with coordination challenges:
- 4 team members across 3 time zones
- Reduced availability (70%) due to coordination overhead
- Lower velocity (2 pts/day) due to async communication
- **Calculation**: 4 × 10 × 0.70 × 2 = **56 story points**

### **Scenario 3: New Project Team**
Team starting fresh on slides-gitlab platform:
- 5 experienced developers
- 60% availability (learning new domain, setup time)
- Conservative velocity (1.5 pts/day) for first sprint
- **Calculation**: 5 × 10 × 0.60 × 1.5 = **45 story points**

---

## ✅ **Completion Checklist**

- [ ] Milestone description updated with capacity calculation
- [ ] Team size and roles defined
- [ ] Availability percentage justified with reasoning
- [ ] Velocity estimate based on team experience
- [ ] Total capacity calculated correctly
- [ ] Sprint schedule with specific dates/times
- [ ] Success criteria relevant to learning objectives

---

## 🤖 **Leverage GitLab Duo Chat**

**Use Duo Chat for advanced capacity planning assistance!**

### **Capacity Calculation Help:**
```
"Help me calculate sprint capacity for a 4-person team working 2 weeks at 80% availability with 2.5 story points per person per day"
```

```
"What factors should I consider when estimating team availability percentage for sprint planning?"
```

### **Team Scenario Analysis:**
```
"I have a mixed team: 2 developers, 1 designer, 1 content creator. How should I adjust velocity calculations for different roles?"
```

```
"My team is new to GitLab and this technology stack. How should this affect our first sprint capacity estimates?"
```

### **Template Customization:**
```
"Help me write success criteria for a GitLab training platform enhancement sprint that focuses on content quality and user experience"
```

```
"What should I include in a Definition of Done for a training content development team?"
```

### **Capacity Planning Best Practices:**
```
"What are common capacity planning mistakes teams make in their first few sprints?"
```

```
"How do I account for code reviews, meetings, and learning time in sprint capacity calculations?"
```

### **Validation and Improvement:**
```
"Review my sprint capacity plan and suggest improvements: [paste your capacity section]"
```

**💡 Advanced Tip**: Ask Duo Chat to help you create capacity planning templates for different team compositions!

---

## 💡 **Key Takeaways**

**Capacity Planning Principles:**
- **Start Conservative**: Better to under-promise and over-deliver
- **Factor Reality**: Account for meetings, reviews, and interruptions
- **Team-Specific**: Adjust for your team's actual experience and context
- **Iterative Improvement**: Track actual vs. planned for better future estimates

**Common Mistakes to Avoid:**
- Using 100% availability (unrealistic)
- Ignoring learning curves for new technologies
- Not accounting for code review and testing time
- Over-optimistic velocity estimates

**Next Steps**: Move to Activity 1C to learn issue management and sprint execution.

---

## 📚 **Additional Resources**
- [Agile Estimation Techniques](https://docs.gitlab.com/ee/topics/agile_delivery/)
- [Team Velocity Tracking](https://about.gitlab.com/handbook/engineering/development/principles/#iteration)
- [Sprint Planning Best Practices](https://about.gitlab.com/handbook/engineering/workflow/)
