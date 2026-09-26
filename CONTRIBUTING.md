# Contributing to Axio

This guide covers contributions to the Vanilla JavaScript application on `main`. The app runs in the browser without a build step or runtime dependencies.

## 🔒 Branch policy

The active GitHub ruleset for `main` requires a pull request and at least one approved review for contributors without bypass access. It blocks branch deletion and non-fast-forward updates. Merge, squash, and rebase are allowed PR merge methods.

Some repository roles have bypass access. Contributors should follow the pull request workflow below.

## 💻 Run locally

From the repository root, start an HTTP server:

```bash
python3 -m http.server 8000
```

Open the application at `http://localhost:8000/` and the browser test runner at `http://localhost:8000/tests/`. Click **Run Tests** on the test page.

The Vanilla application does not require dependency installation.

The browser test runner loads all 135 declared cases from ten test modules.

Code coverage is not currently measured.

## 🔄 Contribution workflow

1. If you do not have write access, fork the repository.
2. Update your local `main` and create a focused branch, such as `feat/task-search`, `fix/keyboard-shortcut`, or `docs/test-guide`.
3. Make the change and add relevant tests when behavior changes.
4. Validate the change using the checklist below.
5. Push the branch to your fork or to this repository if you have write access.
6. Open a pull request targeting `main`. Describe the reason for the change and how you tested it.
7. Address review feedback. A maintainer can merge the PR after the required approval.

## ✅ Before opening a pull request

- [ ] Run the current browser test suite and report any failures.
- [ ] Manually check the changed behavior in the application.
- [ ] For interface changes, check mouse and keyboard interaction and inspect the browser console.
- [ ] Run `git diff --check` to find whitespace errors.
- [ ] Update the README or changelog when the change affects documented behavior.

In the pull request description, include what changed, why it changed, and how you validated it. Include a screenshot when the interface changes.

## 📌 Rationale

- Prevent accidental breakages or regressions on the main branch.
- Preserve a clean, reviewable history.
- Ease maintenance, code review, and traceability.
