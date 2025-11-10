# Important Notes

## Images
The images used from Unsplash (https://unsplash.com) are **free for commercial use** under the Unsplash License. You can:
- Use them for commercial purposes
- No attribution required (though it's appreciated)
- No need to ask permission

However, you may want to replace them with your own images or more specific stock photos later.

## Privacy Policy Checkbox
**Not legally required** in most jurisdictions for a simple contact form. However, it's considered best practice if you're:
- Collecting personal data (which you are - email, name, etc.)
- Operating in EU/UK (GDPR) - though a simple contact form usually doesn't require explicit consent
- Wanting to be extra transparent

**Recommendation**: You can add a simple checkbox like "I agree to the Privacy Policy" linking to your privacy page, but it's not strictly necessary for a basic contact form. Many sites just have a link to the privacy policy in the footer (which you already have).

## Testing Dark Mode in Firefox
To test dark/light mode without changing system settings:
1. Open Firefox DevTools (F12)
2. Go to the "Responsive Design Mode" (Ctrl+Shift+M)
3. Click the device toolbar icon
4. In the settings, you can toggle "Dark mode simulation" or use the "prefers-color-scheme" media query
5. Or use Firefox's built-in dark mode toggle in about:preferences

Alternatively, you can add a manual toggle button to your site if you want users to be able to switch regardless of system preference.

## Logo in Dark Mode
I've added `dark:invert` class to the logo, which inverts the colors in dark mode. If this doesn't look good, you may want to:
1. Create a separate light version of the logo
2. Use CSS filters to adjust brightness/contrast
3. Use a different logo variant for dark mode






