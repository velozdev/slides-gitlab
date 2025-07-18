# Advanced Git Branching Workflows with GitLab

# The Bridge from Plan to Production

![GitLab Logo](https://about.gitlab.com/images/press/logo/png/gitlab-icon-rgb.png) + ![Veloz Logo](https://img1.wsimg.com/isteam/ip/55a4d049-b669-44b1-befb-5cbb852ac163/Veloz-Logo.svg/:/rs=w:59,h:59,cg:true,m/cr=w:59,h:59/qt=q:100/ll)


# From 'Why' and 'When' to 'How'

* In the last modules, we focused on strategic planning (Epics, Roadmaps).
* Now, we shift to the technical execution that brings those plans to life.
* A solid branching strategy is the foundation for collaboration and automation.


# Why a Branching Strategy Matters

# Bringing Order to Collaboration

A consistent strategy prevents:
* Confusing code history
* Difficult merge conflicts
* Uncertainty about what's "production-ready"

**Key Takeaway:** The goal is a predictable, low-friction process for shipping value.

# Common Branching Models

# A Look at Popular Workflows

| GitHub Flow | Trunk-Based Development | GitLab Flow |
|-------------|-------------------------|-------------|
| **Concept:** Simple, `main` is always deployable. Branch from `main` for any work. | **Concept:** All developers work on a single `main` branch, integrating daily. | **Concept:** More structured with environment or release branches. |
| **Best for:** Continuous deployment. | **Best for:** High-maturity teams with robust automated testing. | **Best for:** Scheduled releases and version control. |

# Our Focus: The GitLab Flow

# Built for Traceability

* Provides excellent traceability from issue to code.
* Connects planning features with development work.
* Creates a clear separation between completed code and deployed code.

# The Power of a Naming Convention

# Context at a Glance

A well-named branch provides instant context.
* **Our Convention:** `[issue-number]-[short-description]`
* **Example:** `45-fix-profile-picture-upload`

**Key Insight:** This simple pattern creates clarity and predictability for the whole team.

# Activity: The Branch Naming Challenge

# Name That Branch!

* We will now practice naming branches for different scenarios.
* Use our convention: `[issue-number]-[short-description]`
* I will present three scenarios. Your task is to create the perfect branch name for each.

# Scenario 1: The Bug Fix

* **Issue #45:** "User profile picture fails to upload"
* **Task:** Create a branch to fix this bug.
* **What is your branch name?**

# Scenario 2: The New Feature

* **Issue #78:** "Add Google single sign-on (SSO) to login page"
* **Task:** Create a branch to develop this new feature.
* **What is your branch name?**

# Scenario 3: The Doc Update

* **Issue #102:** "Update a dependency in the API documentation"
* **Task:** Create a branch for this documentation update.
* **What is your branch name?**

# Module Recap

# Key Concepts Mastered

* **Branching Workflows:** You understand the principles behind popular strategies like GitLab Flow.
* **Traceability:** You can apply GitLab Flow to connect issues directly to code branches.
* **Naming Conventions:** You can create consistent and descriptive branch names.

# What's Next? The Bridge to Automation

* Our consistent branching strategy is the key that unlocks automation.
* When you create a merge request from a well-named branch, you can automatically trigger a CI/CD pipeline.
* **Coming up in Module 9:** We will build that pipeline.

# Questions?
