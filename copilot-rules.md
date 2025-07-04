# Copilot Custom Rules

## General Rules
1. All generated test case files must be added to `.gitignore`.
2. Any file not containing code (e.g., README drafts, design notes, progress trackers) must be ignored via `.gitignore`.
3. After completing each line of a requirement:
   - Git commit with a short, one-line message.
   - Push the commit to GitHub immediately.
4. Use clear code comments to describe the logic of all generated code.
5. Auto-generate unit tests for every function or component.
6. Remove all temporary or unused variables and artifacts.
7. Track every requirement step using `checklist.md` and `progress.md` by creating new folder and store the tracker files
8. For each requirement:
   - Create or update an API documentation file if applicable.
   - Update `README.md` with the requirement's summary.
9. Include author credit: **ELIA WILLIAM MARIKI (@dawillygene)** in all metadata and `README.md`.

## Automation Expectations
- `checklist.md` tracks ticked/unticked states of requirement steps.
- `progress.md` stores autosaved progress to prevent loss during outages.
- `api_docs/` folder stores generated API or module documentation.
- Documentation, checklist, and progress files are excluded via `.gitignore`.

## Additional Robustness Rules

10. Secure all sensitive data via `.env`, and ignore with `.gitignore`.
11. Sanitize and validate all user inputs to prevent security vulnerabilities.
12. Enforce HTTPS for all backend services and API calls.
13. Avoid deprecated or insecure libraries/functions in all generated code.
14. Use linters and formatters to maintain code consistency across files.
15. All Copilot-suggested code must be reviewed, edited, or annotated for traceability.
16. Track release versions via `CHANGELOG.md` and Git tags.
17. Ensure testing coverage stays above 80%.
18. Integrate CI/CD workflows for every commit to ensure quality.
19. Include project setup documentation in `/docs/` and update frequently.




