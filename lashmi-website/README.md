# Lashmi Mahila Samuh — Social Org Website

A clean, responsive multi-page website for the Lashmi Mahila Samuh social organization.

## Project Structure

```
lashmi-website/

├── index.html          ← Main HTML (all sections)
├── css/
│   └── style.css       ← All styles, variables, responsive
├── js/
│   └── main.js         ← Navbar, FAQ, animations, counter
└── README.md
```

## Sections

| Section      | Description                                      |
|--------------|--------------------------------------------------|
| Hero         | Full-screen with parallax background             |
| Founder      | Two-column with video thumbnail & play button    |
| Reviews      | 3-column customer testimonial cards              |
| Our Story    | Split layout + animated stat counters            |
| Products     | 6-card product grid + custom orders CTA          |
| FAQ          | Accordion with 10 questions                      |
| Contact      | Contact info, team members, social links         |
| Footer       | Copyright line                                   |

## Features

- Fixed navbar with scroll detection (transparent → white)
- Active link highlighting based on scroll position
- Mobile hamburger menu
- FAQ accordion (one open at a time)
- Scroll-triggered fade animations (Intersection Observer)
- Animated stat counters (counts up when in view)
- Hero parallax background
- Fully responsive (900px, 520px breakpoints)

## Tech Stack

- Pure HTML5, CSS3, Vanilla JavaScript
- Google Fonts: Playfair Display + Lato
- No frameworks, no dependencies
