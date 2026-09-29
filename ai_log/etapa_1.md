# Stage 1: AI log

## Tools
- Gemini

## Conversations
- MotoVault UI Mockup and Project Setup (Theme definition, HTML semantic structure, CSS responsive layout)

## Key requests

### 1. Project theme and data structure adaptation
Asked: Help me define the data model for a motorcycle dealership and gear shop with products, stock states, and categories conforming to course constraints.
- Got: Suggested MotoVault inventory schema with vehicles and equipment, stock status (Available vs Sold/Out of stock), and fixed product types.
- Changed or rejected: Adapted the boolean field to map directly to "Available / Out of stock" to avoid illogical "Done" task statuses on inventory goods while strictly complying with the grading rubric.

### 2. Semantic layout and dark theme implementation
Asked: Generate index.html and style.css adhering to Stage 1 mockup requirements (header, form, item list, keyboard focus, responsive layout).
- Got: Clean 2-column Grid with Flexbox for internal alignment, visible :focus-visible outlines, and a prefers-color-scheme dark theme via CSS custom properties.
- Changed or rejected: Kept custom automotive styling variables and aligned badge color schemes for motorcycle, equipment, and accessory types.

## What I learned / what did not work
I learned how CSS Grid (`grid-template-columns: 1fr 2fr`) and Flexbox complement each other for page-level vs component-level alignment. I also learned that defining all colors exclusively through `:root` CSS variables allows switching to a full dark mode simply by overriding variable values inside a `@media (prefers-color-scheme: dark)` block.