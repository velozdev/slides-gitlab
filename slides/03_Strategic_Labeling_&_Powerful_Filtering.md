# Strategic Labeling & Powerful Filtering

## From Sticky Notes to a Structured Database

![GitLab Logo](https://gitlab.com/assets/favicon-72a2cad5025aa931d6ea56c3201d1f18e68a8cd39788c7c80d5b2b82aa5143ef.png) + ![Veloz Logo](https://img1.wsimg.com/isteam/ip/55a4d049-b669-44b1-befb-5cbb852ac163/Veloz-Logo.svg/:/rs=w:59,h:59,cg:true,m/cr=w:59,h:59/qt=q:100/ll)


# Today's Goals

* **Design label systems** that actually help instead of confuse.  
* **Find any work in seconds** using advanced filtering.  
* **Create saved searches** that replace your daily manual hunting.  
* **Set up label automation** that works while you sleep.

# The Common Challenge: Label Chaos


## Labels often become a source of confusion:

* Inconsistent naming (e.g.,  
   `bug`, `Bug`).  
* Duplicates (e.g.,  
   `high priority`, `high-priority`, `urgent`).  
* Conflicting Information (e.g., an issue labeled both  
   `high priority` and `low priority`).

# The Solution: Scoped Labels

## Bringing Structure with `scope::value`

Scoped labels solve this with a simple concept: categories with values. Instead of random tags, you have structured data.

* `Priority::High`  
* `Team::Frontend`  
* `Type::Bug`  
* `Workflow::Ready`

*(Graphic: A simple animation showing messy labels being sorted into clean, colored, scoped labels.)*

# How Scoped Labels Work

## One Value Per Scope

The magic of scoped labels is that GitLab ensures

**only ONE label per scope can be applied** to an issue.

An issue **CANNOT** have both:

* `Priority::High`  
* `Priority::Low`

This enforces consistency and turns your labels into a reliable database.

# Building a Label System

## A Live Demo Preview

We will create a complete system with four key scopes, using color for instant visual scanning.

| Scope | Example Values (with colors) |  |
| :---- | :---- | :---- |
| **Workflow** |  | `workflow::backlog` (gray), `workflow::in-progress` (orange), `workflow::done` (green) |
| **Priority** |  | `priority::critical` (red), `priority::medium` (yellow), `priority::low` (light green) |
| **Team** |  | `team::frontend` (pink), `team::backend` (indigo), `team::qa` (purple) |
| **Type** |  | `type::bug` (red), `type::feature` (blue), `type::enhancement` (orange) |


# Group vs. Project Labels

## Where you create labels matters.

* **Group Labels:** Available to all projects in the group.  
   **Best for core, consistent labels** like Workflow, Priority, and Team.  
* **Project Labels:** Only available in the specific project.  
   **Best for project-specific needs** like Components or Releases.

# Unleash the Power of Search

## From Scrolling to Asking Questions

With a good label system, you can stop scrolling and start asking GitLab complex questions like:

* "Show me all high priority bugs assigned to the frontend team."  
* "What's blocking our current sprint?"  
* "Find everything due this week that's not yet started."

# Advanced Search Syntax

## Your "Cheat Sheet"

Combine keywords to find exactly what you need.

| Keyword | Example |  |
| :---- | :---- | :---- |
| `label:` |  | `label:priority::high` |
| `assignee:` |  | `assignee:@me` |
| `milestone:` |  | `milestone:"Current Sprint"` |
| `not` |  | `not label:workflow::done` |
| `due_date:` |  | `due_date:overdue` |


# Example: A Real-World Search

## "My Sprint Focus"

This query finds all high-priority work assigned to me in the current sprint that is not yet done.

`label:priority::high assignee:@me milestone:"Current Sprint" not label:workflow::done`

*(Graphic: Break down the search query into visual blocks, explaining what each part does.)*

# Save Time with Automation

## Saved Searches & Subscriptions

### Saved Searches

* Save complex queries so you never have to retype them.  
* Build a personal dashboard of one-click reports like 'My Current Work' or 'Overdue Items'.

### Label Subscriptions

* Get notified automatically when a specific label is added to an issue.  
* Perfect for QA teams subscribing to  
   `workflow::ready-for-testing`.

# Best Practices for Label Governance

## Keep Your System Clean and Useful

| DO ✅ | DON'T ❌ |
| :---- | :---- |
| Use consistent naming conventions. | Create too many one-off labels. |
| Document your system in a wiki. | Use colors randomly. |
| Start simple and evolve. | Let anyone create labels without discussion. |
| Regularly clean up unused labels. | Duplicate features (e.g., a label for a milestone). |


# Module Recap

## Key Concepts Mastered

* **Scoped Labels:** You can create structured, hierarchical label systems that scale.  
* **Advanced Search Syntax:** You can find any work in seconds using complex queries.  
* **Saved Searches:** You've built a personal arsenal of searches that save time daily.  
* **Label Subscriptions:** You know how to create automatic awareness systems.  
* **Label Governance:** You understand how to maintain and evolve your system over time.

# Questions?
