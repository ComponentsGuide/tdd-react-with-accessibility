# TDD React with Accessibility

Do you find it hard to test React because:

- Your tests are brittle to implementation changes?
- You find it hard to know what to test?
- Adding animation or interaction seems to be difficult to test?

What I propose here is adding accessibility features from the [WAI ARIA](https://www.w3.org/WAI/standards-guidelines/aria/) spec such as roles and `aria-` attributes to make testing easier.

This surfaces standardized HTML attributes that you can use to make assertions on. HTML can be very descriptive — use it!

The best part is you also improve your accessibility for everyday users. The same accessibility features you use to extract information from your rendered components’ result are what screen readers and other assistives technologies use.

## Components

### Carousel

- Displays an item of images and descriptions as the accessible `<figure>` and `<figcaption>` elements
- Has previous and next buttons
- Allows setting an initial current item
- Animates when current item changes

We test:

- How many carousel items are shown?
- Are the images shown with correct URLs?
- Are the descriptions shown?
- Which carousel item is shown as current when the current index changes?
- What CSS style is applied when the current carousel item changes?
