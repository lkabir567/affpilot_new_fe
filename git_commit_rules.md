## ✅ Standard Git Commit Message Structure of Affpilot

```
<type>[optional scope]: <short description>

[optional body]

[optional footer(s)]
```

---

## 🔤 Common `<type>` Values

| Type       | Description                                                  |
| ---------- | ------------------------------------------------------------ |
| `feat`     | A new feature                                                |
| `fix`      | A bug fix                                                    |
| `docs`     | Documentation changes only                                   |
| `style`    | Code formatting, missing semi-colons, etc. (no logic change) |
| `refactor` | Code change that neither fixes a bug nor adds a feature      |
| `perf`     | A performance improvement                                    |
| `test`     | Adding or updating tests                                     |
| `chore`    | Other changes that don't modify src or test files            |
| `build`    | Changes affecting the build system or external dependencies  |
| `ci`       | Continuous Integration related changes                       |
| `revert`   | Reverts a previous commit                                    |

---

## 🧠 Example Commit Messages

```bash
feat(auth): add login functionality with JWT
fix(dashboard): correct broken link in navbar
docs(readme): update installation instructions
style: format all files using Prettier
refactor: simplify date parser logic
test(api): add tests for GET /users endpoint
chore: update dependencies
```

---

## 📜 Additional Rules

- **Limit subject line to 50–72 characters**.
- **Use imperative mood**: (“fix”, not “fixed” or “fixes”)
- **Capitalize** the first letter of the subject.
- **Don’t end** the subject line with a period.
- Add a **body** if the change is complex:

  ```
  fix(auth): handle empty tokens correctly

  Empty tokens were causing a 500 server error. This change adds a check
  to redirect unauthenticated users to login instead.
  ```

- **Footer** (for breaking changes or issues):

  ```
  BREAKING CHANGE: signup flow now requires email verification

  Closes #123
  ```

---

## 📦 Tools That Use These Conventions

- [**Commitlint**](https://commitlint.js.org/)
