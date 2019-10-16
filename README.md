# TDD React with Accessibility

Do you find it hard to test React because:

- Your tests are brittle to implementation changes? — changing internal component structure, changing state management
- You find it hard to know what to test?
- Animation or interactions seem to be difficult to test?

We can use accessibility affordances from the [WAI ARIA](https://www.w3.org/WAI/standards-guidelines/aria/) spec such as roles and `aria-` attributes to make testing easier.

These specify standardized HTML attributes that you can use to make assertions on. HTML can be very descriptive — use it!

The best part is you also improve your accessibility for everyday users. The same accessibility features you use to extract information from your rendered components’ result are what screen readers and other assistives technologies use.

## Components

### Carousel

- Displays an item of images and descriptions as the accessible `<figure>` and `<figcaption>` elements
- Has previous and next buttons
- Allows setting an initial current item via a prop
- Animates when current item changes

We test:

- How many carousel items are shown?
- Are the images shown with correct URLs?
- Are the descriptions shown?
- What happens when the previous and next buttons are pressed?
- How to detect which carousel item is shown as current?
- What CSS style is applied when the current carousel item changes?
- How much knowledge about the underlying HTML structure can we avoid tying ourselves to using roles?
