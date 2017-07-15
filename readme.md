# react-beforeunload

React component which listens to `beforeunload` on the window when mounted.

## Usage

### Display a dialog box:

```jsx
<Beforeunload onBeforeunload={e => e.preventDefault()} />
```

### Display a dialog box with custom message:

```jsx
<Beforeunload onBeforeunload={() => "You'll loose your data!"} />
```

> Some browsers display the returned string in the dialog box, others display a fixed message.

[Source](https://developer.mozilla.org/en-US/docs/Web/Events/beforeunload)

### Or use as a wrapper:

```jsx
<Beforeunload onBeforeunload={…}>
  <MyApp />
</Beforeunload>
```
