# **Module 9: CI/CD Foundations & Best Practices**

## **Automating Your Workflow with Confidence**

![GitLab Logo](https://about.gitlab.com/images/press/logo/png/gitlab-icon-rgb.png) + ![Veloz Logo](https://img1.wsimg.com/isteam/ip/55a4d049-b669-44b1-befb-5cbb852ac163/Veloz-Logo.svg/:/rs=w:59,h:59,cg:true,m/cr=w:59,h:59/qt=q:100/ll)


# **The Payoff for Good Branching**

## **From Branch to Automated Pipeline**

* In our last module, we created a clean, consistent branching strategy.  
* Now, we see the payoff: **Automation**.  
* CI/CD is the automated system that runs on the bridge we built.

*(Graphic: A simple flow diagram showing: Branch \-\> Merge Request \-\> Pipeline)*

# **What is CI/CD?**

## **The Two Halves of Automation**

| Continuous Integration (CI) | Continuous Delivery/Deployment (CD) |
| :---- | :---- |
| The practice of frequently merging code changes. | Takes over after CI passes. |
| Automatically runs builds and tests after each change. | Automatically deploys your code to staging or production. |
| **Goal:** Detect issues as early as possible. It's your "safety net." | **Goal:** Release new features to users quickly and reliably. |

Export to Sheets

# **The Heart of the Pipeline: `.gitlab-ci.yml`**

## **The Recipe for Your Automation**

* GitLab CI/CD is controlled by a single file in your repository: `.gitlab-ci.yml`.  
* This file is the "recipe" that tells GitLab what to do.  
* **Key Components:**  
  * `stages`: Defines the order of execution (e.g., build, then test, then deploy).  
  * `jobs`: The individual commands to be executed within a stage.

*(Graphic: A simple icon of a text file with `.gitlab-ci.yml` written on it.)*

# **Live Demo: A Pipeline in Action**

## **See the Automation**

* We will now see how a pipeline runs automatically.  
* **Focus Areas:**  
  * Reviewing a pre-existing `.gitlab-ci.yml` file.  
  * Creating a branch and merge request to trigger the pipeline.  
  * Watching the pipeline graph and its stages.  
  * Seeing security scan and code coverage results in the merge request.

*(Graphic: A large GitLab logo or a "play button" icon.)*

# **Activity: Create Your First Pipeline\!**

## **Your Turn to Automate**

* We are now going to build a simple, two-stage pipeline from scratch.  
* The goal is to see how approachable the basic structure is.  
* **Please navigate to:** `Project -> CI/CD -> Editor`

# **Activity Step 1: Define Your Stages**

## **Setting the Order**

* The `stages` keyword defines the overall order of execution.  
* Add this to the top of your file in the editor:  
  YAML  
* **Key Insight:** This ensures all `build` jobs finish before any `test` jobs begin.

# **Activity Step 2: The Build Job**

## **Building the Project**

* A `job` is a set of commands. Let's create our first one.  
* Add this below your stages:  
  YAML  
* **Explanation:** We've named the job `build_project` and assigned it to the `build` stage.

# **Activity Step 3: The Test Job**

## **Testing the Code**

* Now, let's add a job for the `test` stage.  
* Add this to the bottom of your file:  
  YAML  
* **Explanation:** This job, `run_tests`, will only run after `build_project` succeeds.

# **Activity Step 4: Commit and Watch it Run\!**

## **See the Magic**

* Commit your new `.gitlab-ci.yml` file.  
* Navigate to **CI/CD \> Pipelines**.  
* You should see your new pipeline running\!  
* Click on it to watch your stages and jobs execute in real-time.

*(Graphic: An icon of a rocket launching with "Success\!" text.)*

# **Module Recap**

## **Key Concepts Mastered**

* **CI/CD Concepts:** You understand the purpose of Continuous Integration and Delivery.  
* **The Pipeline Recipe:** You can define a basic pipeline using `.gitlab-ci.yml` with stages and jobs.  
* **Automation in Action:** You know how a pipeline is triggered and can read its graph.  
* **Hands-On Creation:** You have successfully created your first automated pipeline.

# **What's Next? Extending the Pipeline**

## **The GitLab Ecosystem**

* Our simple pipeline is just the beginning.  
* In our final module, we'll explore how to connect our pipeline to other tools your team uses every day.  
* **Coming up in Module 10:** Integrations with Slack, Jira, ServiceNow, and more.

*(Graphic: A diagram showing the GitLab pipeline icon connecting to icons for Slack, Jira, and ServiceNow.)*

# **Questions?**
