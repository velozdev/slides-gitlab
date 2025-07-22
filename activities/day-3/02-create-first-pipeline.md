# Activity 3.2: Create Your First CI/CD Pipeline

## 🎯 **Objective**
Build your first GitLab CI/CD pipeline from scratch, learning the fundamental concepts of stages, jobs, and automated workflows while creating a functional two-stage pipeline that demonstrates build and test automation.

---

## ⏱️ **Duration**: 30 minutes
- **Pipeline Editor Setup**: 5 minutes
- **Stages Definition**: 5 minutes
- **Build Job Creation**: 10 minutes
- **Test Job Creation**: 5 minutes
- **Commit & Execution**: 5 minutes

---

## 📋 **Prerequisites**
- Completed Activity 3.1 (Branch Naming Challenge)
- Access to slides-gitlab repository with Developer permissions
- Basic understanding of YAML syntax (will be explained)
- Familiarity with GitLab navigation

---

## 🚀 **Your Mission**

Create a complete CI/CD pipeline with build and test stages using GitLab's Pipeline Editor, demonstrating how automated workflows can streamline development processes for training platform projects.

### **Training Platform Context**
The slides-gitlab platform benefits from CI/CD automation to ensure code quality, run tests, and deploy updates reliably. Your pipeline will simulate typical development workflows used in professional training platform maintenance.

---

## 📝 **Step-by-Step Instructions**

### **Step 1: Open the Pipeline Editor** (5 minutes)

#### **Navigate to CI/CD Editor:**
1. In the slides-gitlab repository, go to the **left sidebar**
2. Find and click **CI/CD** → **Editor**
3. This opens GitLab's recommended tool for creating `.gitlab-ci.yml` files

#### **Prepare for Fresh Start:**
- If you see an existing file, **select all content** and **delete it**
- We'll start with a clean slate to understand each component

#### **Why Pipeline Editor?**
- **Syntax validation** as you type
- **Helpful tooltips** and documentation
- **Live preview** of pipeline structure
- **Error detection** before committing

---

### **Step 2: Define Your Stages** (5 minutes)

#### **Understanding Stages:**
Stages define the **overall order of execution** in your pipeline. Jobs in earlier stages must complete successfully before later stages begin.

#### **Add Stages Configuration:**
Type this at the **top of your file**:

```yaml
stages:
  - build
  - test
```

#### **What This Means:**
- **`build` stage**: Contains jobs that compile, package, or prepare code
- **`test` stage**: Contains jobs that validate, test, or verify the build
- **Sequential execution**: All `build` jobs complete before any `test` jobs start
- **Professional workflow**: Mirrors real development pipelines

---

### **Step 3: Create the Build Job** (10 minutes)

#### **Understanding Jobs:**
A job is a **set of commands executed by a GitLab Runner**. Each job runs in an isolated environment and performs specific tasks.

#### **Add Build Job Configuration:**
Add this code **below your stages**:

```yaml
build_project:
  stage: build
  script:
    - echo "This is the build job."
    - echo "Compiling training platform code..."
    - echo "Installing dependencies..."
    - sleep 10
    - echo "Build complete - artifacts ready for testing."
  artifacts:
    reports:
      junit: "test-results.xml"
    expire_in: 1 hour
```

#### **Component Breakdown:**

**Job Definition:**
- **`build_project`**: Custom job name (descriptive and meaningful)
- **`stage: build`**: Assigns this job to the build stage
- **`script:`**: Contains shell commands executed sequentially

**Script Commands:**
- **`echo` statements**: Provide clear feedback about progress
- **`sleep 10`**: Simulates realistic build time
- **Descriptive messages**: Help track pipeline progress

**Advanced Features:**
- **`artifacts:`**: Preserves build outputs for later stages
- **`expire_in:`**: Automatically cleans up old artifacts

---

### **Step 4: Create the Test Job** (5 minutes)

#### **Add Test Job Configuration:**
Add this code at the **bottom of your file**:

```yaml
run_tests:
  stage: test
  script:
    - echo "This is the test job."
    - echo "Running unit tests for slides-gitlab..."
    - echo "Testing markdown parsing..."
    - echo "Validating slide generation..."
    - sleep 5
    - echo "All tests passed - no errors found."
  dependencies:
    - build_project
```

#### **Test Job Features:**

**Structure:**
- **`run_tests`**: Clear, descriptive job name
- **`stage: test`**: Executes after build stage completes
- **Training-specific tests**: Reflects actual platform testing needs

**Dependencies:**
- **`dependencies:`**: Explicitly links to build job artifacts
- **Sequential logic**: Tests use outputs from build stage

---

### **Step 5: Complete Pipeline Review** (2 minutes)

#### **Your Complete `.gitlab-ci.yml` File:**

```yaml
stages:
  - build
  - test

build_project:
  stage: build
  script:
    - echo "This is the build job."
    - echo "Compiling training platform code..."
    - echo "Installing dependencies..."
    - sleep 10
    - echo "Build complete - artifacts ready for testing."
  artifacts:
    reports:
      junit: "test-results.xml"
    expire_in: 1 hour

run_tests:
  stage: test
  script:
    - echo "This is the test job."
    - echo "Running unit tests for slides-gitlab..."
    - echo "Testing markdown parsing..."
    - echo "Validating slide generation..."
    - sleep 5
    - echo "All tests passed - no errors found."
  dependencies:
    - build_project
```

#### **Validation Checklist:**
- [ ] Two stages defined: `build` and `test`
- [ ] Build job assigned to build stage
- [ ] Test job assigned to test stage
- [ ] All script commands are meaningful
- [ ] Dependencies properly configured

---

### **Step 6: Commit and Watch it Run!** (3 minutes)

#### **Commit Your Pipeline:**
1. **Scroll to bottom** of the Pipeline Editor
2. **Add commit message**: `"Add initial CI/CD pipeline with build and test stages"`
3. **Click "Commit changes"**

#### **Watch Pipeline Execution:**
1. **Navigate to** CI/CD → **Pipelines** in left sidebar
2. **Find your new pipeline** at the top (status: 'running')
3. **Click on the pipeline** to watch real-time execution
4. **Observe job progression**: Build completes, then test begins

#### **Celebrate Success! 🎉**
You've just created a **fully functional, automated CI/CD pipeline**!

---

## 🏆 **Bonus Challenges**

### **Challenge 1: Add a Deployment Stage**
Add a third stage that simulates deployment:

```yaml
stages:
  - build
  - test
  - deploy

deploy_to_staging:
  stage: deploy
  script:
    - echo "Deploying slides-gitlab to staging environment..."
    - echo "Running deployment scripts..."
    - sleep 3
    - echo "Deployment complete - staging environment updated."
  only:
    - main
```

### **Challenge 2: Environment Variables**
Add environment configuration to your build job:

```yaml
build_project:
  stage: build
  variables:
    BUILD_ENV: "production"
    NODE_VERSION: "18"
  script:
    - echo "Building for environment: $BUILD_ENV"
    - echo "Using Node.js version: $NODE_VERSION"
    # ... rest of build script
```

### **Challenge 3: Conditional Execution**
Add a job that only runs on specific branches:

```yaml
security_scan:
  stage: test
  script:
    - echo "Running security vulnerability scan..."
    - echo "Checking for dependency vulnerabilities..."
    - echo "Security scan complete."
  only:
    - merge_requests
    - main
```

---

## 🤖 **Leverage GitLab Duo Chat**

**Use Duo Chat to enhance your CI/CD pipeline creation and troubleshooting!**

### **Before You Start:**
```
"I'm new to GitLab CI/CD. Can you explain the difference between stages and jobs in a pipeline?"
```

```
"What are the essential components of a basic .gitlab-ci.yml file for a web application?"
```

### **During Pipeline Creation:**
```
"Help me understand this YAML syntax for GitLab CI/CD: [paste your pipeline code]"
```

```
"I'm creating a build job for a Next.js training platform. What script commands should I include?"
```

```
"What's the difference between 'artifacts' and 'dependencies' in GitLab CI/CD jobs?"
```

### **Pipeline Optimization:**
```
"How can I make my GitLab pipeline run faster? What are common performance optimization techniques?"
```

```
"I want to add environment variables to my pipeline. Show me examples for a Node.js project."
```

### **Troubleshooting:**
```
"My GitLab pipeline failed with this error: [paste error message]. How do I fix it?"
```

```
"Explain why my test job isn't receiving artifacts from my build job"
```

### **Advanced Features:**
```
"How do I set up conditional pipeline execution based on branch names or file changes?"
```

```
"What are GitLab CI/CD best practices for a team working on a training platform?"
```

### **Real-World Applications:**
```
"Show me how to deploy a Next.js application using GitLab CI/CD pipelines"
```

```
"How would I integrate automated testing and security scanning into my pipeline?"
```

**💡 Pro Strategy**: Ask Duo Chat to review your complete `.gitlab-ci.yml` file and suggest improvements specific to training platform development!

---

## 🤔 **Quality Check Questions**

### **Pipeline Structure Validation:**
- **Are stages logically ordered?** (build → test → deploy)
- **Do job names clearly describe their purpose?** 
- **Are dependencies properly configured?**
- **Does the pipeline reflect real development workflows?**

### **Script Quality Review:**
- **Are echo messages informative and professional?**
- **Do timing delays simulate realistic operations?**
- **Are commands specific to training platform context?**
- **Would this pipeline provide useful feedback to developers?**

### **Professional Standards:**
- **Would this pipeline work in a production environment?**
- **Are artifact configurations appropriate?**
- **Does the commit message clearly describe changes?**
- **Can teammates understand the pipeline purpose?**

---

## ✅ **Completion Checklist**

### **Pipeline Creation:**
- [ ] Successfully opened GitLab Pipeline Editor
- [ ] Defined two stages: build and test
- [ ] Created build_project job with meaningful commands
- [ ] Created run_tests job with training platform context
- [ ] Added artifacts and dependencies configuration

### **Execution & Validation:**
- [ ] Committed pipeline with descriptive message
- [ ] Watched pipeline execute in real-time
- [ ] Verified build stage completed before test stage
- [ ] Confirmed all jobs completed successfully
- [ ] Understood each component's purpose

### **Understanding & Application:**
- [ ] Can explain the difference between stages and jobs
- [ ] Understand sequential execution of stages
- [ ] Know how to navigate to pipeline results
- [ ] Ready to expand pipeline with additional features
- [ ] Can apply concepts to real training platform development

---

## 💡 **Key Takeaways**

### **CI/CD Fundamentals:**

1. **Stages Define Order**: Sequential execution ensures logical workflow progression
2. **Jobs Execute Tasks**: Individual units of work within stages
3. **YAML Configuration**: Human-readable format for defining pipelines
4. **Automated Validation**: Pipelines run automatically on code changes

### **Professional Pipeline Patterns:**

**Typical Stage Progression:**
- **Build**: Compile, package, prepare artifacts
- **Test**: Validate functionality, run quality checks
- **Deploy**: Release to environments (staging, production)

**Job Best Practices:**
- **Descriptive names** that clearly indicate purpose
- **Meaningful output** that helps debug issues
- **Proper dependencies** between related jobs
- **Environment-specific configuration** as needed

### **Training Platform Applications:**

Our slides-gitlab platform benefits from CI/CD because:
- **Automated Testing**: Ensures slide generation works correctly
- **Quality Assurance**: Validates markdown parsing and formatting
- **Reliable Deployment**: Consistent updates without manual errors
- **Team Collaboration**: Shared understanding of deployment process

### **Real-World Impact:**
- **Faster Development**: Automated processes reduce manual work
- **Higher Quality**: Consistent testing catches issues early
- **Better Collaboration**: Clear workflow visibility for entire team
- **Professional Standards**: Industry-standard development practices

---

## 📚 **Additional Resources**
- [GitLab CI/CD Documentation](https://docs.gitlab.com/ee/ci/)
- [.gitlab-ci.yml Reference](https://docs.gitlab.com/ee/ci/yaml/)
- [GitLab Pipeline Editor Guide](https://docs.gitlab.com/ee/ci/pipeline_editor/)
- [CI/CD Best Practices](https://docs.gitlab.com/ee/ci/pipelines/pipeline_efficiency.html)

---

## 🔗 **Integration with Learning Path**
- **Builds on**: Activity 3.1 (Branch Naming Challenge) and professional Git workflows
- **Prepares for**: Advanced CI/CD topics, deployment strategies, and DevOps practices
- **Foundation for**: Automated testing, deployment pipelines, and team collaboration
- **Skills developed**: YAML configuration, pipeline design, automation thinking, DevOps fundamentals

---

## 📈 **Next Activity Preview**
**Activity 3.3: Advanced Pipeline Strategies** will build on your CI/CD foundation by exploring conditional execution, environment-specific deployments, security scanning, and performance optimization techniques that make training platform development more robust and efficient.
