# CAAT-Color-Contrast-Bookmarklet

With the CAAT Color Contrast Checker, you can easily check the color contrasts of website elements directly in your browser as a bookmarklet.
This tool evaluates the contrast conformity according to the W3C guidelines for small and large text, as well as non-text content.
Additionally, the color values and the calculated contrast ratio can be easily copied for further use.

## Features

- Provides color contrast checks for websites
- Adheres to the Web Content Accessibility Guidelines (WCAG) 2
- Usable as a bookmarklet in all major browsers
- Standalone and offline usage
- Real-time preview for different text sizes and non-text content
- Easy reuse by copying the values

## Building the Color Contrast Checker

Bookmarklet for check color contrasts directly in the browser.

1. Install the dependencies with `npm install`
2. Build the bookmarklet with `npm run build`

The default colors are controlled by the following variables:
- `const defaultForegroundColor` (default: #323130)
- `const defaultBackgroundColor` (default: #cdece8)


## Notes

The color picker function is not available in all browsers and operating systems.

If you have any questions or feedback, please open an issue.