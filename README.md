# BDD Framework Boilerplate

Behaviour-Driven Development test framework boilerplate using **Cucumber.js** + **Playwright** (JavaScript), following the Page Object Model and BDD best practices.

Demo target: [totesation.com](https://totesation.com) — swap the page objects and features for your own app.

## Best practices baked in

- **Declarative Gherkin** — scenarios describe *behaviour* ("When I add the first product to the cart"), never UI mechanics ("When I click button `.btn-add`").
- **Thin steps, fat page objects** — step definitions only orchestrate and assert; selectors and interactions live in `pages/`.
- **Custom World** — browser/page state is scoped per scenario, never global.
- **Hooks own the lifecycle** — browser launch/close, failure screenshots attached to the report.
- **Tags** — `@smoke`, `@cart`, `@wip` for selective runs and CI stages.
- **Living documentation** — HTML + JSON reports generated on every run.

## Structure

```
├── cucumber.js                  # Profiles: default, smoke, ci
├── features/
│   ├── *.feature                # Gherkin specs (the living documentation)
│   ├── step-definitions/        # Thin glue code
│   └── support/
│       ├── world.js             # Custom World: browser context per scenario
│       └── hooks.js             # Launch/teardown, screenshots on failure
├── pages/                       # Page Object Model
│   └── components/              # Reusable UI components (header, cart drawer)
└── reports/                     # HTML/JSON output (gitignored)
```

## Getting started

```bash
npm install
npx playwright install chromium
npm test               # all features, headless
npm run test:smoke     # @smoke tag only
HEADED=1 npm test      # watch the browser
```

## Writing a new behaviour

1. Describe it in a `.feature` file in business language.
2. Run it — Cucumber prints the missing step snippets.
3. Implement the steps by delegating to a page object.
4. Keep assertions in steps, selectors in page objects.
