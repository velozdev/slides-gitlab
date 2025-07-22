# Activity 1.2: Create Your First Advanced Issue

## 🎯 **Objective**
Master GitLab issue creation by building a comprehensive, well-structured issue for the slides-gitlab training platform, practicing user story formatting, acceptance criteria, and GitLab's issue management features.

---

## ⏱️ **Duration**: 20 minutes
- **Individual Work**: 15 minutes
- **Review & Discussion**: 5 minutes

---

## 📋 **Prerequisites**
- Access to the `slides-gitlab` GitLab repository with Developer permissions
- Completed Activity 1.1 (GitLab Navigation Practice)
- Basic understanding of user stories (will be reviewed)
- Familiarity with GitLab interface from navigation practice

---

## 🚀 **Your Mission**

You'll create a professional-quality issue for a training platform enhancement using GitLab's advanced issue features, proper user story formatting, and comprehensive acceptance criteria that could guide actual development work.

### **Repository Context**
The slides-gitlab platform needs continuous improvement to serve trainers, learners, and content creators effectively. Your issue will represent a real enhancement that could improve the training experience - think about features that would make training delivery more effective or content creation easier.

---

## 📝 **Step-by-Step Instructions**

### **Step 1: Choose Your Enhancement** (2 minutes)

**Select one training platform improvement:**

#### **Option 1: Learner Experience Enhancement**
- **Focus**: Features that improve the training experience for learners
- **Examples**: Progress tracking, interactive exercises, accessibility improvements

#### **Option 2: Trainer Productivity Tool**
- **Focus**: Features that make training delivery more effective
- **Examples**: Presentation tools, audience engagement, session management

#### **Option 3: Content Creator Workflow**
- **Focus**: Features that streamline training content development
- **Examples**: Content templates, collaboration tools, preview capabilities

#### **Option 4: Platform Performance Improvement**
- **Focus**: Technical enhancements that improve platform reliability
- **Examples**: Loading speed, mobile responsiveness, error handling

### **Step 2: Create Your Issue with Structured Content** (10 minutes)

#### **Navigate to Issue Creation:**
1. Go to **Issues** → **New Issue**
2. Start with a clear, descriptive title

#### **Issue Title Format:**
```
As a [user type], I want to [specific action] so that [clear benefit]
```

**Example Titles by Option:**

**Option 1**: `As a learner, I want to track my progress through training modules so that I can see my learning advancement`

**Option 2**: `As a trainer, I want to display real-time audience polls during presentations so that I can engage participants effectively`

**Option 3**: `As a content creator, I want to preview slide formatting while editing markdown so that I can ensure professional presentation quality`

**Option 4**: `As a platform user, I want pages to load in under 2 seconds so that I can navigate efficiently during training sessions`

#### **Issue Description Structure:**
Use this markdown template in your description:

```markdown
## 🎯 User Story
As a [specific user type], I want to [detailed action] so that [clear business value].

## 📋 Acceptance Criteria
- [ ] [Specific, testable requirement 1]
- [ ] [Specific, testable requirement 2]  
- [ ] [Specific, testable requirement 3]
- [ ] [Specific, testable requirement 4]
- [ ] [Specific, testable requirement 5]

## 🔧 Technical Notes
[Any technical considerations, constraints, or implementation details]

## ✅ Definition of Done
- [ ] Feature functionality implemented and tested
- [ ] User interface is responsive and accessible
- [ ] Documentation updated (if applicable)
- [ ] Code reviewed and approved
- [ ] No breaking changes to existing functionality

## 🎨 Additional Context
[Screenshots, mockups, related issues, or external resources if relevant]
```

**Example Content for Option 1 (Learner Progress Tracking):**

```markdown
## 🎯 User Story
As a training participant, I want to see a visual progress indicator showing my completion status across all training modules so that I can track my learning advancement and identify areas that need attention.

## 📋 Acceptance Criteria
- [ ] Progress bar displays overall completion percentage on main dashboard
- [ ] Individual module completion status is clearly indicated (completed/in-progress/not-started)
- [ ] Time spent on each module is tracked and displayed
- [ ] Progress data persists across browser sessions
- [ ] Progress indicators are visible on both desktop and mobile devices

## 🔧 Technical Notes
- Consider using browser localStorage for persistence
- Progress calculation should be based on slides viewed and exercises completed
- Ensure compatibility with existing slide navigation system
- May require new database fields for user progress tracking

## ✅ Definition of Done
- [ ] Feature functionality implemented and tested
- [ ] User interface is responsive and accessible
- [ ] Documentation updated (if applicable)
- [ ] Code reviewed and approved
- [ ] No breaking changes to existing functionality

## 🎨 Additional Context
This feature would help trainers assess group progress and help learners stay motivated during longer training programs.
```

### **Step 3: Add Metadata and Organization** (2 minutes)

#### **Set Issue Metadata:**
- **Due Date**: Set a realistic deadline (2-4 weeks from now)
- **Assignee**: Assign to yourself for practice
- **Labels**: Add relevant labels (create new ones if needed):
  - `type::feature` (for new functionality)
  - `area::frontend` or `area::backend` (depending on your enhancement)
  - `priority::medium` (unless urgent)
  - `component::ui` (if interface changes)
  - `learner-experience`, `trainer-tools`, `content-creation`, or `performance` (based on your option)

#### **Story Points/Weight:**
- Add weight estimation: 1-2 (small), 3-5 (medium), 6-8 (large)
- Consider complexity, unknowns, and testing requirements

### **Step 4: Review and Refine** (1 minute)
- Check markdown formatting with preview
- Ensure acceptance criteria are specific and testable
- Verify all metadata is set appropriately

---

## 🏆 **Bonus Challenges**

### **Challenge 1: Create an Issue Template**
1. Navigate to **Settings** → **Repository** → **Issue Templates**
2. Create a template called "Feature Request" using your structure
3. Test the template by creating a second issue

### **Challenge 2: Practice Issue Relationships**
1. Create a second, smaller issue related to your first
2. Establish a blocking relationship: smaller issue blocks the larger one
3. Use issue references (#issue-number) to link them

### **Challenge 3: Advanced Markdown Practice**
Enhance your issue description with:
- **Bold** and *italic* text for emphasis
- [Links to external resources](https://docs.gitlab.com)
- Code blocks for technical details:
  ```javascript
  // Example code snippet
  ```
- Tables for structured information:
  | Feature | Priority | Effort |
  |---------|----------|--------|
  | Progress Bar | High | Medium |

---

## 🤔 **Quality Check Questions**

### **User Story Validation:**
- **Is your user clearly defined?** (specific role, not just "user")
- **Is the action specific and actionable?** (concrete behavior, not vague)
- **Is the benefit clear and measurable?** (business value, not feature description)

### **Acceptance Criteria Review:**
- **Are criteria testable?** (can someone verify completion?)
- **Are they specific enough?** (no ambiguous language)
- **Do they cover the complete user flow?** (from start to finish)
- **Are edge cases considered?** (error states, different devices)

### **Technical Completeness:**
- **Are implementation considerations noted?** (constraints, dependencies)
- **Is the scope appropriate?** (not too big, not too small)
- **Are related systems identified?** (what else might be affected)

---

## ✅ **Completion Checklist**

### **Issue Structure:**
- [ ] Clear user story title following format guidelines
- [ ] Complete description using markdown template structure
- [ ] At least 5 specific, testable acceptance criteria
- [ ] Technical notes section with implementation considerations
- [ ] Definition of done with quality gates

### **Metadata Configuration:**
- [ ] Realistic due date set (2-4 weeks out)
- [ ] Issue assigned to yourself
- [ ] Appropriate labels applied (type, area, priority, component)
- [ ] Story points/weight estimated based on complexity
- [ ] Description uses proper markdown formatting

### **Quality Validation:**
- [ ] User story is specific and provides clear business value
- [ ] Acceptance criteria are testable and comprehensive
- [ ] Technical considerations are documented
- [ ] Issue could realistically guide development work
- [ ] All sections of template are completed meaningfully

---

## 🤖 **Leverage GitLab Duo Chat**

**Use Duo Chat to enhance your issue creation and validation!**

### **User Story Refinement:**
```
"Help me improve this user story for a training platform: 'As a learner, I want to see progress so I know where I am.' How can I make it more specific and valuable?"
```

```
"I'm writing acceptance criteria for a progress tracking feature. What edge cases should I consider for learners using the training platform?"
```

### **Acceptance Criteria Development:**
```
"Review my acceptance criteria for completeness: [paste your criteria]. What am I missing for a progress tracking feature?"
```

```
"Help me write testable acceptance criteria for a feature that lets trainers display polls during presentations"
```

### **Technical Considerations:**
```
"I'm creating an issue for slide loading performance improvements. What technical notes should I include for developers?"
```

```
"What implementation considerations should I document for a feature that tracks learner progress in a Next.js application?"
```

### **Issue Organization:**
```
"What GitLab labels would be most useful for organizing training platform feature requests?"
```

```
"Help me estimate story points for a content preview feature. What factors should I consider for complexity?"
```

### **Quality Assurance:**
```
"Review my GitLab issue and suggest improvements: [paste your issue content]"
```

```
"Is this Definition of Done comprehensive for a training platform feature? [paste your DoD]"
```

**💡 Pro Strategy**: Ask Duo Chat to help you think from different user perspectives and identify requirements you might have missed!

---

## 💡 **Key Takeaways**

### **Professional Issue Writing Principles:**
- **User-Centric**: Always start with user value, not technical features
- **Specific and Testable**: Acceptance criteria should guide development and QA
- **Complete Context**: Include business value, technical notes, and quality gates
- **Proper Organization**: Use metadata to enable project management and filtering

### **GitLab Issue Management Best Practices:**

**User Story Format**: "As a [specific user], I want to [specific action] so that [clear benefit]"
**Acceptance Criteria**: Specific, testable requirements with checkboxes for tracking
**Technical Notes**: Implementation guidance without being overly prescriptive
**Definition of Done**: Quality gates that apply across all features

### **Training Platform Context Applications:**
1. **Learner Experience**: Focus on engagement, progress, and accessibility
2. **Trainer Tools**: Emphasize presentation effectiveness and session management
3. **Content Creation**: Streamline workflows and improve collaboration
4. **Platform Performance**: Ensure reliability and responsiveness during training

---

## 📚 **Additional Resources**
- [GitLab Issue Management Guide](https://docs.gitlab.com/ee/user/project/issues/)
- [Writing Effective User Stories](https://docs.gitlab.com/ee/user/project/issues/managing_issues.html)
- [GitLab Markdown Reference](https://docs.gitlab.com/ee/user/markdown.html)
- [Issue Templates Documentation](https://docs.gitlab.com/ee/user/project/description_templates.html)

---

## 🔗 **Integration with Learning Path**
- **Builds on**: Activity 1.1 (GitLab Navigation Practice)
- **Prepares for**: Activity 1.3 (Labels & Organization)
- **Foundation for**: All project management activities in Day 2
- **Skills developed**: User story writing, acceptance criteria, GitLab issue features

---

## 📈 **Next Activity Preview**
**Activity 1.3: Understanding GitLab Labels & Organization** will build on your issue creation skills by teaching you how to organize, categorize, and filter issues effectively using GitLab's labeling system and organizational features.
