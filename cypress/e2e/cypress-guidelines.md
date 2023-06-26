# Guidelines for writing Cypress tests

### Using [cypress-drag-drop](https://github.com/4teamwork/cypress-drag-drop)

The `drag` command is for drag-n-dropping an element onto a particular target element
('drop zone').

The `move` command is for dragging an element in an arbitrary direction (deltaX, deltaY).

### Using [cypress-real-events](https://github.com/dmtrKovalenko/cypress-real-events)

The `realClick`, `realHover`, `realPress`, `realTouch`, `realType`, `realSwipe`, `realMouseDown`,
`realMouseUp`, `realMouseMove`, `realMouseWheel` commands help us simulate mouse events.

<b>Note: This library works only in Chromium-based browsers (Chrome, Edge, Electron).
It will not work in Firefox or Safari.</b>

### [cypress-drag-drop](https://github.com/4teamwork/cypress-drag-drop) <i>vs</i> [cypress-real-events](https://github.com/dmtrKovalenko/cypress-real-events) <i>vs</i> `cy.trigger()`

<b>cypress-real-events</b> proved to be useful when we needed to simulate mouse events on elements that were hidden
until being hovered over, e.g. plain-draggable of the block exit. We could not make <b>cypress-drag-drop</b>
or Cypress's `trigger` command to work in this case.

On the other hand, moving blocks on the canvas using `realMouseDown`-`realMouseMove`-`realMouseUp`
did not work as expected, so <b>cypress-drag-drop</b> was used instead.

At the end of the day, all approaches provide similar functionality but have their own limitations, and it is up to
the developer to decide which one to use.
