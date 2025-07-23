# Activity 3.8: Security and Compliance Workflow

## 🎯 **Objective**
Implement comprehensive security scanning, compliance monitoring, and secure development practices using GitLab's integrated security features to ensure code quality, vulnerability management, and regulatory compliance throughout the development lifecycle.

---

## ⏱️ **Duration**: 25 minutes
- **Security Scanning Setup**: 10 minutes
- **Compliance Workflow Implementation**: 10 minutes
- **Security Policy Enforcement**: 5 minutes

---

## 📋 **Prerequisites**
- Completed Activity 3.2 (Create First CI/CD Pipeline)
- Understanding of basic security concepts and compliance requirements
- Access to GitLab Security features (Ultimate tier for advanced features)
- Knowledge of your organization's security and compliance requirements

---

## 🚀 **Your Mission**

Establish a comprehensive security and compliance workflow that automatically scans for vulnerabilities, enforces security policies, and maintains compliance audit trails while integrating seamlessly with your development process.

### **Training Platform Context**
The slides-gitlab training platform implements enterprise security practices to protect training content and user data. You'll practice the same security workflows used to maintain this platform's security posture and compliance requirements.

---

## 🔒 **Part 1: Security Scanning Setup** (10 minutes)

### **GitLab Security Scanner Configuration:**

#### **1. Enable Security Scanning in CI/CD Pipeline:**
```yaml
# .gitlab-ci.yml - Comprehensive Security Pipeline
include:
  - template: Security/SAST.gitlab-ci.yml
  - template: Security/Dependency-Scanning.gitlab-ci.yml
  - template: Security/Container-Scanning.gitlab-ci.yml
  - template: Security/Secret-Detection.gitlab-ci.yml

stages:
  - build
  - test
  - security
  - deploy

# Custom security stage for additional checks
custom_security_audit:
  stage: security
  script:
    - echo "Running custom security audit..."
    - npm audit --audit-level moderate
    - echo "Checking for hardcoded secrets..."
    - grep -r "password\|secret\|key" src/ || true
  artifacts:
    reports:
      junit: security-audit-results.xml
  allow_failure: false

# SAST (Static Application Security Testing)
sast:
  stage: security
  variables:
    SAST_EXCLUDED_PATHS: "spec, test, tests, tmp, node_modules"
  artifacts:
    reports:
      sast: gl-sast-report.json

# Dependency Scanning
dependency_scanning:
  stage: security
  variables:
    DS_EXCLUDED_PATHS: "spec, test, tests, tmp"
  artifacts:
    reports:
      dependency_scanning: gl-dependency-scanning-report.json

# Container Scanning (if using Docker)
container_scanning:
  stage: security
  variables:
    CS_IMAGE: $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA
  artifacts:
    reports:
      container_scanning: gl-container-scanning-report.json
```

#### **2. Security Dashboard Configuration:**

**Access Security Dashboard:**
- Navigate to **Security & Compliance** → **Security Dashboard**
- Review vulnerability overview and trends
- Set up vulnerability thresholds and alerts

**Vulnerability Management Workflow:**
```markdown
# Vulnerability Response Process

## Critical Vulnerabilities (CVSS 9.0-10.0)
- 🚨 **Immediate Response Required** (4-hour SLA)
- Block deployment until resolved
- Notify security team immediately
- Create emergency patch if needed

## High Vulnerabilities (CVSS 7.0-8.9)
- ⚠️ **High Priority** (24-hour SLA)
- Review and assess impact
- Plan remediation within next sprint
- Document risk acceptance if immediate fix not possible

## Medium Vulnerabilities (CVSS 4.0-6.9)
- 📋 **Standard Priority** (7-day SLA)
- Include in regular development cycle
- Group with related security improvements
- Update dependencies during regular maintenance

## Low/Info Vulnerabilities (CVSS 0.1-3.9)
- 📝 **Informational** (30-day review)
- Document and monitor
- Address during major version updates
- Consider during architecture reviews
```

#### **3. Secret Detection and Management:**

**Configure Secret Detection:**
```yaml
# Enhanced secret detection rules
secret_detection:
  variables:
    SECRET_DETECTION_EXCLUDED_PATHS: "tests/, docs/"
    SECRET_DETECTION_RULES_FILE: ".gitlab/security-rules.yml"
  stage: security
```

**Create Security Rules File:**
```yaml
# .gitlab/security-rules.yml
rules:
  - id: "custom-api-key-detection"
    pattern: "(api[_-]?key|apikey)\\s*[:=]\\s*['\"][a-zA-Z0-9]{32,}['\"]"
    description: "Potential API key detected"
    severity: "High"
  
  - id: "database-password-detection"
    pattern: "(password|pwd)\\s*[:=]\\s*['\"][^'\"\\s]{8,}['\"]"
    description: "Potential database password detected"
    severity: "Critical"
    
  - id: "private-key-detection"
    pattern: "-----BEGIN\\s+(RSA\\s+)?PRIVATE\\s+KEY-----"
    description: "Private key detected"
    severity: "Critical"
```

### **Part 2: Compliance Workflow Implementation** (10 minutes)

#### **Compliance Framework Setup:**

**1. Compliance Pipeline Configuration:**
```yaml
# Compliance-focused pipeline stages
compliance_audit:
  stage: compliance
  script:
    - echo "Running compliance audit..."
    - python scripts/compliance-check.py
    - echo "Generating audit report..."
  artifacts:
    reports:
      junit: compliance-audit.xml
    paths:
      - compliance-report.html
    expire_in: 1 year
  rules:
    - if: $CI_COMMIT_BRANCH == "main"
    - if: $CI_PIPELINE_SOURCE == "schedule"

# Data privacy compliance check
privacy_audit:
  stage: compliance
  script:
    - echo "Checking for PII handling compliance..."
    - grep -r "ssn\|social.*security\|credit.*card" src/ || true
    - python scripts/privacy-audit.py
  artifacts:
    reports:
      junit: privacy-audit.xml
  only:
    - schedules
    - main
```

**2. Audit Trail Documentation:**
```markdown
# Compliance Audit Trail Template

## Audit Information
- **Date**: {{ audit_date }}
- **Auditor**: {{ auditor_name }}
- **Scope**: {{ audit_scope }}
- **Framework**: SOC 2 / HIPAA / PCI DSS / GDPR

## Security Controls Verified
- [ ] Access controls and authentication
- [ ] Data encryption at rest and in transit
- [ ] Vulnerability management process
- [ ] Incident response procedures
- [ ] Change management and approval process

## Findings
### Critical Issues
- Issue 1: {{ description }}
  - Impact: {{ impact_assessment }}
  - Remediation: {{ remediation_plan }}
  - Target Date: {{ target_completion }}

### Recommendations
- Recommendation 1: {{ description }}
  - Business Value: {{ value_proposition }}
  - Implementation Effort: {{ effort_estimate }}
  - Priority: High/Medium/Low

## Compliance Status
- Overall Compliance Score: {{ percentage }}%
- Areas of Concern: {{ concern_areas }}
- Next Audit Date: {{ next_audit_date }}
```

#### **3. Regulatory Compliance Automation:**

**GDPR Compliance Checks:**
```python
# scripts/gdpr-compliance-check.py
import re
import os

def check_personal_data_handling():
    """Check for proper personal data handling"""
    violations = []
    
    # Check for PII without proper encryption markers
    pii_patterns = [
        r'email.*=.*[^encrypt]',
        r'phone.*=.*[^encrypt]',
        r'address.*=.*[^encrypt]'
    ]
    
    for root, dirs, files in os.walk('src/'):
        for file in files:
            if file.endswith('.py') or file.endswith('.js'):
                with open(os.path.join(root, file), 'r') as f:
                    content = f.read()
                    for pattern in pii_patterns:
                        if re.search(pattern, content, re.IGNORECASE):
                            violations.append(f"Potential GDPR violation in {file}")
    
    return violations

def check_consent_mechanisms():
    """Verify consent collection mechanisms"""
    # Implementation for checking consent flows
    pass

def generate_compliance_report():
    violations = check_personal_data_handling()
    
    report = {
        'timestamp': datetime.now().isoformat(),
        'violations': violations,
        'compliance_score': calculate_compliance_score(violations),
        'recommendations': generate_recommendations(violations)
    }
    
    with open('gdpr-compliance-report.json', 'w') as f:
        json.dump(report, f, indent=2)
```

### **Part 3: Security Policy Enforcement** (5 minutes)

#### **Merge Request Security Policies:**

**1. Security-Required Merge Request Template:**
```markdown
## Security Review Checklist

### Code Security
- [ ] No hardcoded secrets or credentials
- [ ] Input validation implemented where required
- [ ] Output encoding/escaping applied appropriately
- [ ] Authentication and authorization checks in place
- [ ] Error handling doesn't leak sensitive information

### Data Protection
- [ ] Personal data handling follows privacy guidelines
- [ ] Encryption used for sensitive data storage
- [ ] Secure communication protocols used
- [ ] Data retention policies respected
- [ ] Audit logging implemented for sensitive operations

### Infrastructure Security
- [ ] Dependencies updated to latest secure versions
- [ ] Container images scanned for vulnerabilities
- [ ] Environment variables properly configured
- [ ] Network security considerations addressed
- [ ] Monitoring and alerting configured

### Compliance Requirements
- [ ] Regulatory requirements satisfied (GDPR/HIPAA/SOX)
- [ ] Documentation updated for audit purposes
- [ ] Change management process followed
- [ ] Security testing completed
- [ ] Approval from security team obtained

## Security Impact Assessment
**Impact Level**: None / Low / Medium / High / Critical

**Justification**: 
<!-- Explain the security impact of these changes -->

**Mitigation Measures**:
<!-- Describe any additional security measures taken -->
```

**2. Automated Security Policy Enforcement:**
```yaml
# Security policy enforcement in pipeline
security_policy_check:
  stage: security
  script:
    - echo "Enforcing security policies..."
    - python scripts/security-policy-enforcement.py
  rules:
    - if: $CI_MERGE_REQUEST_ID
  allow_failure: false

security_gates:
  stage: security
  script:
    - |
      if [ "$SECURITY_SCAN_CRITICAL_COUNT" -gt 0 ]; then
        echo "❌ Critical security vulnerabilities found. Blocking deployment."
        exit 1
      fi
    - |
      if [ "$SECURITY_SCAN_HIGH_COUNT" -gt 5 ]; then
        echo "⚠️ Too many high-severity vulnerabilities. Manual review required."
        exit 1
      fi
    - echo "✅ Security gates passed. Deployment approved."
  variables:
    SECURITY_SCAN_CRITICAL_COUNT: "0"  # Will be set by scanning jobs
    SECURITY_SCAN_HIGH_COUNT: "0"     # Will be set by scanning jobs
```

#### **3. Incident Response Integration:**

**Security Incident Response Workflow:**
```markdown
# Security Incident Response Procedure

## Immediate Response (0-1 hour)
1. **Identify and Contain**
   - Stop affected services if necessary
   - Isolate compromised systems
   - Preserve evidence for investigation

2. **Assess Impact**
   - Determine scope of compromise
   - Identify affected data and systems
   - Evaluate business impact

3. **Notification**
   - Alert security team immediately
   - Notify stakeholders based on impact level
   - Document initial findings

## Investigation Phase (1-24 hours)
1. **Forensic Analysis**
   - Collect and analyze logs
   - Identify attack vectors
   - Determine timeline of events

2. **Remediation Planning**
   - Develop fix strategy
   - Plan system restoration
   - Update security controls

## Recovery and Lessons Learned
1. **System Restoration**
   - Apply security patches
   - Restore services safely
   - Verify system integrity

2. **Post-Incident Review**
   - Document lessons learned
   - Update security procedures
   - Improve detection capabilities
```

---

## 🎯 **Security Metrics and KPIs**

### **Vulnerability Management Metrics:**
- Mean Time to Detection (MTTD): _____ hours
- Mean Time to Remediation (MTTR): _____ hours
- Vulnerability backlog: _____ items
- Critical vulnerability SLA compliance: _____%

### **Compliance Metrics:**
- Audit finding resolution rate: _____%
- Policy compliance score: _____%
- Security training completion: _____%
- Incident response time: _____ hours

### **Security Quality Metrics:**
- Security scan coverage: _____%
- False positive rate: _____%
- Security test automation: _____%
- Security review completion: _____%

---

## 🎓 **Learning Outcomes**

### **Security Capabilities Developed:**
- Automated vulnerability scanning and management
- Comprehensive compliance monitoring
- Security policy enforcement
- Incident response integration

### **Process Improvements:**
- Shift-left security practices
- Continuous compliance monitoring
- Automated security gates
- Risk-based decision making

### **Organizational Benefits:**
- Reduced security risk exposure
- Improved compliance posture
- Faster incident response
- Enhanced security awareness

---

## 🚀 **Next Steps for Advanced Security**

### **Enhanced Security Measures:**
1. Implement security chaos engineering
2. Set up threat modeling processes
3. Establish security metrics dashboards
4. Create security training programs

### **Advanced Compliance:**
1. Automate compliance reporting
2. Implement continuous compliance monitoring
3. Set up regulatory change tracking
4. Establish compliance audit automation

This comprehensive security and compliance workflow ensures your development process maintains the highest standards of security and regulatory compliance!
