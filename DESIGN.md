---
name: Verified Trust Protocol
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#514532'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#837560'
  outline-variant: '#d5c4ab'
  surface-tint: '#7c5800'
  primary: '#7c5800'
  on-primary: '#ffffff'
  primary-container: '#ffb800'
  on-primary-container: '#6b4c00'
  inverse-primary: '#ffba20'
  secondary: '#575d78'
  on-secondary: '#ffffff'
  secondary-container: '#d8defe'
  on-secondary-container: '#5b617d'
  tertiary: '#595e6d'
  on-tertiary: '#ffffff'
  tertiary-container: '#bfc4d5'
  on-tertiary-container: '#4b515f'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdea8'
  primary-fixed-dim: '#ffba20'
  on-primary-fixed: '#271900'
  on-primary-fixed-variant: '#5e4200'
  secondary-fixed: '#dce1ff'
  secondary-fixed-dim: '#bfc5e4'
  on-secondary-fixed: '#141a32'
  on-secondary-fixed-variant: '#3f465f'
  tertiary-fixed: '#dde2f4'
  tertiary-fixed-dim: '#c1c6d7'
  on-tertiary-fixed: '#161c28'
  on-tertiary-fixed-variant: '#414755'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display-xl:
    fontFamily: Manrope
    fontSize: 64px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Manrope
    fontSize: 40px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Manrope
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-bold:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '700'
    lineHeight: '1'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  gutter: 24px
  margin-x: auto
  max-width: 1280px
  section-padding: 120px
---

## Brand & Style

This design system is built on the pillars of **Credibility, Transparency, and Precision**. It targets a B2B audience that values data-backed security and institutional-grade reliability. The visual language is a blend of **Corporate Modern** and **High-Contrast Minimal**, utilizing heavy whitespace to allow complex information to breathe.

The personality is authoritative yet accessible. By combining a deep, serious foundation of charcoal/navy with the energetic "action" of amber, the system communicates a message of proactive protection. UI elements should feel intentional and sturdy, avoiding excessive decoration in favor of structural clarity and functional hierarchy.

## Colors

The palette is anchored by high-contrast anchors to drive visual hierarchy and brand recall.

- **Primary Amber (#FFB800):** Used for highlighting key terms in headlines, primary Call-to-Action (CTA) buttons, and active status indicators. It signifies value and attention.
- **Deep Navy/Charcoal (#0A1128):** The base for body text, footers, and dark-mode sections. It provides the "institutional" weight required for a trust-focused brand.
- **Neutral Scales:** Use a cool-toned gray scale for secondary text and borders to maintain a crisp, clean environment.
- **Supportive Accents:** High-saturation greens are reserved exclusively for success states and "Verified" indicators to provide instant cognitive recognition of safety.

## Typography

This design system utilizes a modern sans-serif stack to ensure legibility and a contemporary feel. **Manrope** is used for headings to provide a geometric, technical character that feels precise. **Inter** is used for body copy and interface elements to ensure maximum readability across different screen densities.

To emphasize trust and focus, use "Color Spotlights" in headlines: wrap the most important word in the primary amber color. Maintain tight letter spacing on larger displays to create a solid, impactful visual block.

## Layout & Spacing

The system follows a **12-column fixed grid** for desktop, centering the content within a 1280px container. This creates a sense of stability and traditional structure.

- **Vertical Rhythm:** Generous section padding (120px+) is required to separate different phases of the user journey, preventing cognitive overload.
- **Grouping:** Use logical "card" groupings with 24px gutters. 
- **Content Density:** Keep line lengths for body text restricted to 60-70 characters to ensure the professional tone is matched by effortless reading.

## Elevation & Depth

Hierarchy is achieved through **Tonal Layers** and subtle depth cues rather than aggressive shadows. 

1.  **Level 0 (Surface):** White (#FFFFFF) or extremely light gray (#F8FAFC) backgrounds.
2.  **Level 1 (Cards):** Use thin, low-contrast outlines (1px, #E2E8F0) with a very soft, high-diffusion shadow (0px 4px 20px rgba(10, 17, 40, 0.05)) to lift content from the page.
3.  **Inverted Depth:** Dark sections (using the Deep Navy) should use flat surfaces with primary amber accents to create a "command center" feel for technical or high-value data segments.

## Shapes

The shape language is **Rounded**, balancing the "hard" nature of B2B transactions with a "soft" approachable user experience. 

- **Primary Components:** Use a 0.5rem (8px) radius for standard cards and input fields.
- **Action Elements:** CTA buttons and "Pill" badges use a larger 1.5rem (24px) radius or full-pill styling to make them feel distinct from the structural grid.
- **Iconography:** Icons should be contained within rounded-square enclosures with the primary amber background to draw the eye.

## Components

### Trust Badges & Indicators
Trust badges appear as a horizontal bar below the fold. They feature small, line-art icons in the primary amber color, paired with bold navy labels. This bar should have a subtle background tint or a top/bottom border to separate it from the hero and main content.

### CTA Buttons
Primary buttons are solid amber (#FFB800) with navy text (#0A1128) for maximum contrast. Use "Pill" shapes (rounded-xl) for buttons. Secondary buttons are outlined or "ghost" style with navy text.

### Process Steps
Visualize processes using a vertical or horizontal "Staircase" layout. Each step features a numbered "Pill" badge. The active step uses a light amber background tint to guide the user.

### Cards & Feature Blocks
Feature blocks use a "top-icon" layout. The icon is placed in a small, rounded-square container. Use "Label-bold" typography for small category tags (e.g., "CHALLENGE", "SOLUTION") positioned above main headers to provide instant context.

### Input Fields
Fields should have a 1px border and a subtle gray background (#F1F5F9). On focus, the border transitions to Primary Amber. Use Inter for input text to maintain consistency with the body copy.