# Contributing

## Workflow

1. Branch from `main`: `feat/<short-name>` or `fix/<short-name>`.
2. Add or change behaviour **feature-first**: write the Gherkin scenario before the glue code.
3. Run `npm test` locally — all scenarios must pass.
4. Open a PR; CI runs smoke then the full suite and uploads the HTML report as an artifact.

## Gherkin style guide

- Write scenarios in **business language**, from the user's perspective. No selectors, URLs, or technical detail in `.feature` files.
- One behaviour per scenario; prefer **Scenario Outline** over copy-pasted scenarios.
- Use `Background` only for genuinely shared context (e.g. "Given I am on the shop homepage").
- Tag intentionally: `@smoke` for the critical path, a domain tag per feature (`@cart`, `@shop`), `@wip` to exclude from runs.

## Step definition rules

- Steps stay **thin**: navigate/act via a page object, assert with `expect`.
- No raw selectors in steps — if you need one, add it to a page object.
- Share data between steps via `this.state`, never module-level variables (breaks scenario isolation and parallel runs).
- Prefer reusable parameterised steps (`{string}`, `{int}`) over near-duplicates.

## Page object rules

- Locators live in the constructor; behaviour in methods.
- Prefer role/label-based locators (`getByRole`, aria labels) over CSS classes.
- Shared UI (header, drawers, modals) goes in `pages/components/`.
