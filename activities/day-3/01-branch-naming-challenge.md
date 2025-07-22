# Activity 3.1: The Branch Naming Challenge

## 🎯 **Objective**
Master Git branch naming conventions using real issues from the slides-gitlab repository, developing skills to create descriptive, traceable branch names that enhance team collaboration and project organization.

---

## ⏱️ **Duration**: 25 minutes
- **Convention Introduction**: 5 minutes
- **Interactive Challenge**: 15 minutes
- **Group Discussion & Best Practices**: 5 minutes

---

## 📋 **Prerequisites**
- Basic Git knowledge (creating and switching branches)
- Completed Day 1 and Day 2 activities
- Access to slides-gitlab repository
- Understanding of issue types and labels

---

## 🚀 **Your Mission**

You'll practice creating professional branch names using actual issues from our slides-gitlab repository, applying industry-standard conventions that make repository navigation and team collaboration seamless.

---

## 🎯 **Part 1: The Importance of Naming Conventions** (5 minutes)

### **Why Branch Names Matter**

A well-named branch gives you context at a glance. When you see a branch named `#23-fix-markdown-injection`, you immediately understand:
- **Issue traceability**: Links to issue #23
- **Work type**: It's a bug fix
- **What's being addressed**: Markdown injection vulnerability

### **Our Training Platform Convention**

For this activity, we'll use a simple, professional convention:

```
[issue-number]-[work-type]-[short-description]
```

**Work Types:**
- `fix` - Bug fixes and security patches
- `feat` - New features and enhancements  
- `chore` - Maintenance, refactoring, tooling
- `perf` - Performance improvements
- `docs` - Documentation updates

**Naming Best Practices:**
- Use lowercase and hyphens (kebab-case)
- Keep descriptions concise but meaningful
- Include issue number for traceability
- Be consistent across the team

---

## 🎲 **Part 2: Interactive Challenge - Name That Branch!** (15 minutes)

### **Instructions:**
1. **Form small groups** (2-3 people) or work individually
2. **Review each scenario** from our actual repository issues
3. **Create appropriate branch names** using our convention
4. **Discuss your reasoning** with teammates
5. **Be ready to share** your branch name and rationale

---

### **🔐 Scenario 1: Security Fix** (5 minutes)

**Real Issue from `/example/issues/security/markdown-injection.md`:**

```
Summary: The markdown parser does not sanitize input, allowing script injection via markdown files.

Impact: Attackers could craft malicious markdown that executes JavaScript in viewers' browsers.

Mitigation: Sanitize markdown input before rendering, using libraries like DOMPurify.
```

**Your Challenge:**
Create a branch name for fixing this security vulnerability.

**Consider:**
- This is a security fix (what work type?)
- It's about markdown injection
- It affects the parser/rendering system

<details>
<summary>💡 Example Answer (click to reveal)</summary>

**Good Options:**
- `#45-fix-markdown-injection`
- `#45-fix-script-injection`
- `#45-fix-markdown-sanitization`

**Best Choice:** `#45-fix-markdown-injection`
- Clear issue type (fix)
- Specific problem (markdown injection)
- Professional and searchable
</details>

---

### **♿ Scenario 2: Accessibility Enhancement** (5 minutes)

**Real Issue from `/example/issues/feature-requests/accessibility-heading-order.md`:**

```
Summary: Improve accessibility by ensuring heading elements in slides are rendered in a sequentially-descending order, while preserving the original markdown creator's intent and style.

Motivation: Screen readers and accessibility tools expect headings to follow a logical order (e.g., h1 > h2 > h3).

Solution: Automatically adjust heading levels to maintain sequential order while preserving styling.
```

**Your Challenge:**
Create a branch name for implementing this accessibility feature.

**Consider:**
- This is a new feature enhancement
- It's specifically about accessibility
- It involves heading order/structure

<details>
<summary>💡 Example Answer (click to reveal)</summary>

**Good Options:**
- `#78-feat-accessibility-headings`
- `#78-feat-heading-order`
- `#78-feat-sequential-headings`

**Best Choice:** `#78-feat-accessibility-headings`
- Clear feature type (feat)
- Indicates accessibility focus
- Specific to headings
</details>

---

### **🔧 Scenario 3: Development Tooling** (5 minutes)

**Real Issue from `/example/issues/chore/add-eslint-rule.md`:**

```
Task Description: Add a specific ESLint rule to enforce consistent use of arrow functions for component definitions.

Motivation: Consistent function style improves readability and maintainability across the codebase.

Acceptance Criteria: ESLint rule is added to config, all component definitions use arrow functions, linting passes without errors.
```

**Your Challenge:**
Create a branch name for adding this ESLint rule.

**Consider:**
- This is maintenance/tooling work
- It's about adding a linting rule
- It affects code style/consistency

<details>
<summary>💡 Example Answer (click to reveal)</summary>

**Good Options:**
- `#102-chore-eslint-arrow-functions`
- `#102-chore-add-eslint-rule`
- `#102-chore-arrow-function-rule`

**Best Choice:** `#102-chore-eslint-arrow-functions`
- Clear chore type (tooling)
- Specific tool (eslint)
- Clear purpose (arrow functions)
</details>

---

## 🏆 **Bonus Challenge: Advanced Scenarios**

### **Performance Issue** (Optional)
From `/example/issues/performance/svg-image-optimization.md`:
"Optimize SVG usage by preferring `<img src="...">` for SVGs instead of inline SVG"

**Branch Name Ideas:**
- `#67-perf-svg-optimization`
- `#67-perf-svg-image-tags`

### **Refactoring Task** (Optional)
From `/example/issues/refactor/modularize-components.md`:
"Break down large components into smaller, reusable modules"

**Branch Name Ideas:**
- `#89-chore-modularize-components`
- `#89-chore-component-refactor`

---

## 🤔 **Part 3: Group Discussion & Best Practices** (5 minutes)

### **Share Your Answers:**
1. **Present your branch names** to the group
2. **Explain your reasoning** for each choice
3. **Discuss alternatives** that teammates suggested

### **Real-World Considerations:**

#### **Team Consistency:**
- Agree on conventions before starting projects
- Document your branch naming rules
- Use templates or automation when possible

#### **Issue Integration:**
- Always include issue numbers for traceability
- Link branches to issues in GitLab
- Use branch descriptions for additional context

#### **Searchability:**
- Use keywords that teammates will search for
- Avoid abbreviations that aren't universally known
- Think about filtering and reporting needs

---

## ✅ **Completion Checklist**

### **Individual Skills:**
- [ ] Created branch names for all three scenarios
- [ ] Applied consistent naming convention throughout
- [ ] Included issue numbers for traceability
- [ ] Used appropriate work type prefixes
- [ ] Kept descriptions concise but meaningful

### **Team Collaboration:**
- [ ] Discussed reasoning behind naming choices
- [ ] Considered alternative approaches from teammates
- [ ] Understood how naming affects project organization
- [ ] Identified team conventions for real projects

### **Best Practices Understanding:**
- [ ] Recognize the importance of consistent naming
- [ ] Can differentiate between work types (fix, feat, chore, perf)
- [ ] Understand how branch names support project management
- [ ] Ready to apply these skills in actual development work

---

## 🤖 **Leverage GitLab Duo Chat**

**Use Duo Chat to refine your branch naming skills!**

### **Convention Refinement:**
```
"What are the most important elements to include in a Git branch naming convention for a development team?"
```

```
"Help me create a branch name for this issue: [paste issue description]. What work type should I use?"
```

### **Team Coordination:**
```
"How can consistent branch naming improve team collaboration and project management?"
```

```
"What are some common branch naming anti-patterns I should avoid?"
```

### **Advanced Scenarios:**
```
"I need to create a branch for a hotfix. How should I modify my naming convention for urgent fixes?"
```

```
"What's the best way to handle branch names when working on multiple related issues?"
```

---

## 💡 **Key Takeaways**

### **Professional Branch Naming Principles:**

1. **Consistency is King**: Team-wide conventions prevent confusion
2. **Traceability Matters**: Always link to issues or tickets
3. **Context at a Glance**: Names should tell a story
4. **Searchable and Filterable**: Think about discovery and reporting

### **Real-World Applications:**

- **Code Reviews**: Reviewers understand context immediately
- **Release Planning**: Easy to group related changes
- **Bug Tracking**: Quick identification of fix attempts
- **Project Management**: Clear progress visibility

### **Training Platform Context:**

Our slides-gitlab repository benefits from good branch naming because:
- **Multiple Contributors**: Clear ownership and purpose
- **Diverse Issue Types**: Security, features, performance, accessibility
- **Continuous Improvement**: Easy to track enhancement patterns
- **Learning Environment**: Models professional development practices

---

## 📚 **Additional Resources**
- [Git Branch Naming Best Practices](https://docs.gitlab.com/ee/topics/gitlab_flow.html)
- [GitLab Flow Documentation](https://docs.gitlab.com/ee/topics/gitlab_flow.html)
- [Conventional Commits Specification](https://www.conventionalcommits.org/)
- [Git Workflow Strategies](https://www.atlassian.com/git/tutorials/comparing-workflows)

---

## 🔗 **Integration with Learning Path**
- **Builds on**: Day 2 project management skills and issue understanding
- **Prepares for**: Activity 3.2 (Advanced Git Workflows)
- **Foundation for**: Merge request best practices and code review
- **Skills developed**: Git conventions, team collaboration, project organization

---

## 📈 **Next Activity Preview**
**Activity 3.2: Advanced Git Workflows** will build on your branch naming skills by exploring feature branches, merge strategies, and collaboration patterns that make team development efficient and organized.
