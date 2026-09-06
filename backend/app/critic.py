"""AI Code Critic System - Automatic code quality checker"""

from typing import Dict, List, Optional
from dataclasses import dataclass
from enum import Enum


class SeverityLevel(str, Enum):
    """Severity levels for code issues"""
    ERROR = "error"
    WARNING = "warning"
    INFO = "info"


@dataclass
class CodeIssue:
    """Represents a code quality issue"""
    file: str
    line: int
    severity: SeverityLevel
    category: str
    message: str
    suggestion: Optional[str] = None
    rule_id: Optional[str] = None


class PythonCodeCritic:
    """Python code critic - checks code quality"""
    
    def check_docstrings(self, code: str, file_path: str) -> List[CodeIssue]:
        """Check if functions have docstrings"""
        issues = []
        lines = code.split('\n')
        
        for i, line in enumerate(lines, 1):
            if line.strip().startswith('def ') and 'test_' not in line:
                if i < len(lines):
                    next_line = lines[i].strip()
                    if not (next_line.startswith('"""') or next_line.startswith("'''")):
                        issues.append(CodeIssue(
                            file=file_path,
                            line=i,
                            severity=SeverityLevel.WARNING,
                            category="documentation",
                            message="Function missing docstring",
                            suggestion='Add: """Description"""',
                            rule_id="py001"
                        ))
        return issues
    
    def check_type_hints(self, code: str, file_path: str) -> List[CodeIssue]:
        """Check if functions have type hints"""
        issues = []
        lines = code.split('\n')
        
        for i, line in enumerate(lines, 1):
            if line.strip().startswith('def ') and '->' not in line:
                issues.append(CodeIssue(
                    file=file_path,
                    line=i,
                    severity=SeverityLevel.WARNING,
                    category="type_safety",
                    message="Missing type hints",
                    suggestion="Add: def func(param: str) -> bool:",
                    rule_id="py002"
                ))
        return issues
    
    def check_hardcoded_values(self, code: str, file_path: str) -> List[CodeIssue]:
        """Check for hardcoded secrets"""
        issues = []
        lines = code.split('\n')
        
        patterns = ['password=', 'api_key=', 'secret=', 'token=']
        
        for i, line in enumerate(lines, 1):
            for pattern in patterns:
                if pattern in line.lower() and '=' in line:
                    issues.append(CodeIssue(
                        file=file_path,
                        line=i,
                        severity=SeverityLevel.ERROR,
                        category="security",
                        message="Hardcoded secret detected",
                        suggestion="Use: os.getenv('VAR_NAME')",
                        rule_id="py006"
                    ))
        return issues
    
    def analyze(self, code: str, file_path: str) -> List[CodeIssue]:
        """Run all checks"""
        issues = []
        issues.extend(self.check_docstrings(code, file_path))
        issues.extend(self.check_type_hints(code, file_path))
        issues.extend(self.check_hardcoded_values(code, file_path))
        return sorted(issues, key=lambda x: (x.file, x.line))


class CriticReport:
    """Generate code review report"""
    
    def __init__(self, issues: List[CodeIssue]):
        self.issues = issues
    
    def to_markdown(self) -> str:
        """Convert issues to markdown"""
        if not self.issues:
            return "✅ No issues found!\n"
        
        report = "# 🤖 AI Critic Report\n\n"
        
        # Summary
        errors = len([i for i in self.issues if i.severity == SeverityLevel.ERROR])
        warnings = len([i for i in self.issues if i.severity == SeverityLevel.WARNING])
        
        report += f"## Summary\n"
        report += f"- 🔴 Errors: {errors}\n"
        report += f"- 🟡 Warnings: {warnings}\n\n"
        
        # Issues by file
        by_file = {}
        for issue in self.issues:
            if issue.file not in by_file:
                by_file[issue.file] = []
            by_file[issue.file].append(issue)
        
        for file_path, file_issues in sorted(by_file.items()):
            report += f"### `{file_path}`\n"
            for issue in file_issues:
                emoji = "🔴" if issue.severity == SeverityLevel.ERROR else "🟡"
                report += f"{emoji} Line {issue.line}: {issue.message}\n"
                if issue.suggestion:
                    report += f"   💡 {issue.suggestion}\n"
            report += "\n"
        
        return report
