# Git Commit Message Guidelines

This project follows a clear and standardized commit message format to better track project history and generate change logs.

## Basic Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

## Type

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, whitespace, etc. that don't affect code execution)
- **refactor**: Code refactoring (neither adding features nor fixing bugs)
- **perf**: Performance improvements
- **test**: Adding or modifying tests
- **chore**: Changes to build process or auxiliary tools (dependency updates, configuration changes)
- **revert**: Reverting a previous commit

## Scope (Optional)

Specifies the area of the codebase affected by the commit, for example:
- **backend**: Backend related
- **frontend**: Frontend related
- **api**: API interface
- **db**: Database
- **ui**: User interface
- **component**: Specific component

## Subject

- Use a concise description of the commit content in English or Chinese
- Maximum 50 characters
- Start with lowercase, no period at the end
- Use imperative mood (e.g., "add" not "added")

## Body (Optional)

- Provide detailed explanation of the motivation and specific changes
- Can span multiple lines
- Each line should not exceed 72 characters

## Footer (Optional)

- Reference related Issue numbers: `Closes #123` or `Fixes #456`
- Breaking changes: Start with `BREAKING CHANGE:`

## Commit Message Examples

### Simple Example
```
feat(backend): add feeding record export functionality
```

### Complete Example
```
feat(api): add weekly feeding record statistics endpoint

Implement weekly feeding record statistics with support for:
- Count feeding times for a specified week
- Calculate daily average feeding amount
- Generate weekly report data

Closes #45
```

### Bug Fix Example
```
fix(frontend): fix date picker timezone display error

Fixed date picker displaying incorrect dates in different timezones.
All dates now use local timezone.

Fixes #78
```

### Documentation Update Example
```
docs: update API documentation

Add parameter descriptions and response examples for feeding summary endpoint
```

### Refactoring Example
```
refactor(backend): optimize feeding record query performance

- Add database indexes
- Use caching to reduce database queries
- Optimize SQL query statements
```

## Important Notes

1. Each commit should do one thing only, maintain atomicity
2. Commit messages should accurately describe the changes, avoid vague descriptions
3. Breaking changes must be clearly stated in the commit message
4. Reference related Issue numbers
5. Ensure code passes tests and code checks before committing

## References

- [Conventional Commits](https://www.conventionalcommits.org/)
- [Angular Commit Guidelines](https://github.com/angular/angular/blob/main/CONTRIBUTING.md#commit)
