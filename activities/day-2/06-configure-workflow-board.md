# Activity 2: Configure Your Team's Workflow Board

## 🎯 **Objective**
Practice building customized GitLab issue boards that match real team workflows, using the slides-gitlab repository to create boards for content development, training delivery, and platform enhancement.

---

## ⏱️ **Duration**: 10 minutes
- **Individual Practice**: 7 minutes
- **Review & Discussion**: 3 minutes

---

## 📋 **Prerequisites**
- Access to the `slides-gitlab` GitLab repository with Maintainer permissions
- Completed Activity 1 (Sprint Milestone creation)
- Basic understanding of GitLab issue boards and labels
- Existing issues and labels in the repository

---

## 🚀 **Your Mission**

You'll configure a specialized issue board that addresses real workflow challenges in training content development. Choose from three tailored options that reflect common scenarios in educational platform development.

### **Repository Context**
The slides-gitlab platform serves enterprise GitLab training with multiple stakeholders: content creators, developers, trainers, and learners. Each role has different workflow needs and visibility requirements.

---

## 🎯 **Choose Your Challenge Path**

### **Option 1: Content Development Board** 
*Perfect for training content creators and curriculum developers*

**Scenario**: You're managing the creation and maintenance of GitLab training slides, exercises, and activities across multiple modules.

**Board Focus**: Content lifecycle from ideation to delivery

### **Option 2: Training Delivery Board**
*Ideal for trainers and instructional designers*

**Scenario**: You're preparing and delivering GitLab training sessions, tracking learner progress, and managing training logistics.

**Board Focus**: Training preparation, delivery, and follow-up

### **Option 3: Platform Enhancement Board**
*Designed for developers and technical teams*

**Scenario**: You're developing and maintaining the technical platform that delivers GitLab training content.

**Board Focus**: Feature development, bug fixes, and technical improvements

---

## 📝 **Step-by-Step Instructions**

### **Step 1: Navigate to Issue Boards** (1 minute)
1. Go to your `slides-gitlab` repository
2. Navigate to **Issues** → **Boards**
3. Click **"New board"** (or edit existing board)

### **Step 2: Choose and Configure Your Board** (5 minutes)

#### **Option 1: Content Development Board Setup**

**Board Name**: `📚 Content Development Workflow`

**Columns to Create:**
1. **📝 Content Ideas** (Open)
   - Filter: `~"content::ideas" ~"type::content"`
   - WIP Limit: 10
   
2. **🔍 Research & Planning** (Open)
   - Filter: `~"content::research" ~"status::planning"`
   - WIP Limit: 5
   
3. **✍️ Content Creation** (Open)
   - Filter: `~"content::writing" ~"status::in-progress"`
   - WIP Limit: 8
   
4. **👀 Review & Feedback** (Open)
   - Filter: `~"content::review" ~"status::review"`
   - WIP Limit: 6
   
5. **✅ Ready for Training** (Closed)
   - Filter: `~"content::complete" ~"status::done"`

**Swimlanes Configuration:**
- **By Module**: Group by `~"module::foundations"`, `~"module::advanced"`, `~"module::ci-cd"`
- **By Content Type**: Group by `~"type::slides"`, `~"type::exercise"`, `~"type::activity"`

#### **Option 2: Training Delivery Board Setup**

**Board Name**: `🎓 Training Delivery Pipeline`

**Columns to Create:**
1. **📋 Training Requests** (Open)
   - Filter: `~"training::request" ~"status::new"`
   - WIP Limit: 15
   
2. **📅 Session Planning** (Open)
   - Filter: `~"training::planning" ~"status::planning"`
   - WIP Limit: 8
   
3. **🎯 Active Delivery** (Open)
   - Filter: `~"training::delivery" ~"status::in-progress"`
   - WIP Limit: 5
   
4. **📊 Feedback Collection** (Open)
   - Filter: `~"training::feedback" ~"status::review"`
   - WIP Limit: 10
   
5. **✅ Training Complete** (Closed)
   - Filter: `~"training::complete" ~"status::done"`

**Swimlanes Configuration:**
- **By Client**: Group by `~"client::enterprise"`, `~"client::startup"`, `~"client::internal"`
- **By Training Type**: Group by `~"format::workshop"`, `~"format::webinar"`, `~"format::self-paced"`

#### **Option 3: Platform Enhancement Board Setup**

**Board Name**: `⚙️ Platform Development Workflow`

**Columns to Create:**
1. **📋 Feature Backlog** (Open)
   - Filter: `~"type::feature" ~"status::backlog"`
   - WIP Limit: 20
   
2. **🚧 Development** (Open)
   - Filter: `~"status::in-progress" ~"type::feature,bug,enhancement"`
   - WIP Limit: 6
   
3. **🧪 Testing & QA** (Open)
   - Filter: `~"status::testing" ~"qa::required"`
   - WIP Limit: 4
   
4. **🚀 Ready for Release** (Open)
   - Filter: `~"status::ready" ~"release::pending"`
   - WIP Limit: 8
   
5. **✅ Deployed** (Closed)
   - Filter: `~"status::deployed" ~"release::complete"`

**Swimlanes Configuration:**
- **By Priority**: Group by `~"priority::urgent"`, `~"priority::high"`, `~"priority::medium"`
- **By Component**: Group by `~"component::frontend"`, `~"component::backend"`, `~"component::content"`

### **Step 3: Apply Board-Wide Filters** (1 minute)
Add these global filters to your chosen board:

**For Content Development Board:**
- Milestone: Current content sprint
- Author: Content team members
- Exclude: `~"type::infrastructure"` `~"type::technical"`

**For Training Delivery Board:**
- Labels: Include `~"area::training"`
- Assignee: Training team members
- Due date: Next 30 days

**For Platform Enhancement Board:**
- Milestone: Current development sprint
- Assignee: Development team members
- Exclude: `~"type::content"` `~"type::training"`

### **Step 4: Test Your Board** (1 minute)
1. Create 2-3 test issues that fit your board's workflow
2. Move issues between columns to test the flow
3. Verify filters are working correctly
4. Check that WIP limits make sense for your team

---

## 🏆 **Advanced Challenges**

### **Challenge 1: Multi-Perspective Boards**
Create two boards showing the same work differently:
- **Executive View**: High-level progress across all initiatives
- **Team View**: Detailed workflow for daily stand-ups

### **Challenge 2: Complex Filter Combinations**
Use multiple label filters for sophisticated views:
```
Labels: ~"priority::high" AND (~"type::bug" OR ~"type::security")
Milestone: Current sprint
Assignee: @your-team
```

### **Challenge 3: Dynamic Swimlane Experiments**
Try different swimlane configurations:
- **By Epic**: Group related stories under larger initiatives
- **By Blocked Status**: Highlight dependencies and blockers
- **By Review Status**: Track approval workflows

---

## 🤔 **Guiding Questions**

### **Board Strategy Questions:**
- **What questions does this board help answer?**
  - "What's blocking our content delivery?"
  - "Which training sessions need immediate attention?"
  - "What platform features are ready for release?"

- **What workflow problems does it solve?**
  - Visibility into work in progress
  - Identifying bottlenecks in the process
  - Coordinating across team members and roles

- **How often would you look at this board?**
  - Daily stand-ups and planning
  - Weekly progress reviews
  - Sprint/milestone check-ins

### **Optimization Questions:**
- **What would make this board even more useful?**
  - Automated workflows and triggers
  - Integration with external tools
  - Custom metrics and reporting

### **Team Alignment Questions:**
- **Does this board match how work actually flows?**
- **Are the WIP limits realistic for your team size?**
- **Do the swimlanes provide actionable insights?**

---

## ✅ **Completion Checklist**

### **Basic Requirements:**
- [ ] Board created with descriptive, role-specific name
- [ ] At least 4 workflow-specific columns configured
- [ ] Board-wide filter applied and tested
- [ ] WIP limits set on 2+ columns with realistic numbers
- [ ] Swimlanes configured for meaningful grouping
- [ ] Test issues created and moved through workflow

### **Quality Checks:**
- [ ] Column names clearly indicate the stage of work
- [ ] Filters accurately show relevant work only
- [ ] WIP limits align with team capacity
- [ ] Swimlanes provide actionable insights
- [ ] Board addresses real workflow challenges

### **Team Readiness:**
- [ ] Board name makes purpose clear to stakeholders
- [ ] Workflow matches team's actual process
- [ ] All team members understand how to use the board
- [ ] Board complements (doesn't duplicate) existing tools

---

## 🤖 **Leverage GitLab Duo Chat**

**Use Duo Chat to optimize your workflow board design!**

### **Board Strategy & Design:**
```
"Help me design an issue board for a training content development team. What columns and workflow stages should I include?"
```

```
"I'm creating a board for GitLab training delivery. What filters and swimlanes would be most useful for trainers?"
```

```
"What are effective WIP limits for a 4-person development team working on a training platform?"
```

### **Column Configuration:**
```
"Suggest column names for a content development workflow that goes from ideas to published training materials"
```

```
"Help me create GitLab label filters for separating content work from technical development work"
```

### **Advanced Board Features:**
```
"How can I use swimlanes to show both priority levels and content modules on the same board?"
```

```
"What board-wide filters should I apply to focus on current sprint work while hiding completed items?"
```

### **Workflow Optimization:**
```
"Review my board configuration and suggest improvements: [describe your columns, filters, and swimlanes]"
```

```
"My team struggles with bottlenecks in the review stage. How should I configure my board to highlight this?"
```

### **Multi-Board Strategy:**
```
"I need both an executive overview board and a detailed team board. How should I design them differently for the same project?"
```

```
"Help me create different board views for content creators, developers, and trainers working on the same GitLab training platform"
```

### **Board Maintenance:**
```
"What are best practices for keeping GitLab issue boards useful and up-to-date over time?"
```

```
"How often should we review and adjust our board configuration, WIP limits, and filters?"
```

**💡 Pro Strategy**: Ask Duo Chat to help you anticipate workflow problems and design boards that provide early warning signals!

---

## 💡 **Key Takeaways**

### **Board Design Principles:**
- **Purpose-Driven**: Each board should solve specific workflow challenges
- **Team-Aligned**: Reflect how work actually flows, not idealized processes
- **Actionable**: Enable quick decisions and clear next steps
- **Maintainable**: Simple enough for consistent daily use

### **Common Patterns for slides-gitlab Context:**

**Content Boards**: Focus on editorial workflows and content quality
**Training Boards**: Emphasize scheduling, preparation, and feedback loops  
**Technical Boards**: Prioritize development stages and deployment readiness

### **Next Steps:**
1. **Use your board daily** for stand-ups and planning
2. **Iterate on design** based on team feedback
3. **Monitor WIP limits** and adjust as needed
4. **Share board URL** with stakeholders for transparency

---

## 📚 **Additional Resources**
- [GitLab Issue Boards Documentation](https://docs.gitlab.com/ee/user/project/issue_board.html)
- [Advanced Board Filtering](https://docs.gitlab.com/ee/user/project/issue_board.html#configurable-issue-boards)
- [Kanban Best Practices](https://about.gitlab.com/topics/kanban/)
- [GitLab Workflow Configuration](https://docs.gitlab.com/ee/development/contributing/issue_workflow.html)

---

## 🔗 **Integration with Other Activities**
- **Builds on**: Activity 1 (Sprint Milestones) for filtered milestone views
- **Prepares for**: Activity 3 (Merge Request Workflows) with development boards
- **Connects to**: Issue management and team coordination practices
