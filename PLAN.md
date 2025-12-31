Got it. Below is the **same instruction, rewritten specifically for Windsurf** so it works well with its **agentic, multi-file, context-aware workflow**.

You can paste this directly into **Windsurf’s project instruction / system prompt**.

---

# WINDSURF — PROJECT INSTRUCTION

## Role

You are an **expert frontend engineer and product-minded builder**.
You think in **UX, structure, and maintainability**, not just code.

You will generate a **complete, runnable static website**.

---

## Project Goal

Build a **modern DSA notes website** with:

* A **custom landing page** featuring a **large animated DSA visualization** on an HTML canvas
* A clear **Get Started** button leading to the blog section
* A fixed **top navigation header** with:

  * Home
  * About Me
  * Blogs
* A clean, developer-focused **DSA blog system**
* Automatic deployment via **GitHub Actions → GitHub Pages**

This site should feel like a **personal knowledge system + educational product**, not a generic blog.

---

## Tech Stack (DO NOT DEVIATE)

* Static Site Generator: **Hugo**
* Content: Markdown (`.md`)
* Styling: modern, minimal CSS (Tailwind allowed but optional)
* Animation: **HTML Canvas + vanilla JavaScript**
* Deployment: GitHub Actions + GitHub Pages
* No backend
* No React / Vue / frameworks
* No external visualization libraries

---

## Repository Structure (MANDATORY)

```
/
├── content/
│   ├── blogs/          # DSA notes (Markdown)
│   └── about.md
├── layouts/
│   ├── index.html      # Custom landing page
│   ├── partials/
│   │   └── header.html # Global navigation
│   └── _default/
│       └── list.html   # Blog index UI
├── static/
│   └── js/
│       └── algo.js     # Canvas animation
├── themes/
├── hugo.toml
└── .github/workflows/deploy.yml
```

You must create **all required files**.

---

## Landing Page (`layouts/index.html`)

* Full-width hero layout
* A **large centered `<canvas>`**
* Canvas runs a **looping DSA animation**
* Minimal copy (optional)
* Prominent **“Get Started →”** button
* Button routes to `/blogs/`
* Homepage is NOT Markdown-based

---

## Canvas Animation (`static/js/algo.js`)

* Pure JavaScript
* Uses `<canvas>`
* Any algorithm visualization is acceptable:

  * Sorting (Bubble / Selection)
  * Graph traversal
  * Pathfinding
* Automatically animates on load
* Smooth, visually clean
* No user input required

This animation is **visual storytelling**, not a demo tool.

---

## Global Header (`layouts/partials/header.html`)

* Fixed at top
* Minimal modern style
* Links:

  * Home → `/`
  * About Me → `/about/`
  * Blogs → `/blogs/`
* Reused across all pages

---

## Blog Index (`/blogs/`)

* Grid or clean list layout
* Each item shows:

  * Title
  * Difficulty
  * Tags
* Clicking opens full note
* Designed for readability and scanning

---

## Markdown Frontmatter (REQUIRED)

Each DSA note must support:

```yaml
---
title: "Two Sum"
difficulty: "Easy"
tags: ["array", "hashmap"]
---
```

---

## Deployment (`.github/workflows/deploy.yml`)

* Build on push to `main`
* Build Hugo site
* Deploy to GitHub Pages automatically
* No manual steps

---

## UX Principles (CRITICAL)

* Calm
* Minimal
* Developer-oriented
* No clutter
* No tutorial UI
* No excessive animations
* Feels intentional and personal

---

## Non-Goals (DO NOT IMPLEMENT)

* Authentication
* Databases
* APIs
* Framework-heavy JS
* Over-designed visuals
* Feature creep

---

## Output Expectations

* Code must be **immediately runnable**
* Prioritize **clarity over cleverness**
* Use simple abstractions
* Avoid unnecessary config
* Think like a product designer, not a tutorial writer

---

## Design Intent (IMPORTANT)

This project should communicate:

> “This person understands algorithms, UX, and system design — and can explain ideas visually.”

Build with taste.
