# react-beforeunload

React component and hook which listens to `beforeunload` on the window when mounted.

## Usage

### `useBeforeunload` Hook (recommended)

```jsx
import { useBeforeunload } from 'react-beforeunload';
```

Display a dialog box:

```jsx
useBeforeunload((event) => event.preventDefault());
```

Display a dialog box with custom message:

```jsx
useBeforeunload(() => "You'll lose your data!");
```

> :warning: Some browsers display the returned string in the dialog box, others display a fixed message.

[Source](https://developer.mozilla.org/en-US/docs/Web/Events/beforeunload)

### `Beforeunload` Component

```jsx
import { Beforeunload } from 'react-beforeunload';
```

And use as you would use the hook:

```jsx
<Beforeunload onBeforeunload={(event) => event.preventDefault()} />
```

```jsx
<Beforeunload onBeforeunload={() => "You'll lose your data!"} />
```

Alternatively use it as a wrapper:

```jsx
<Beforeunload onBeforeunload={…}>
  <MyApp />
</Beforeunload>
```

## Requirements

Requires a minimum of React version 16.8.0. If you're on an older version of React, then checkout [v1](https://github.com/jacobbuck/react-beforeunload/tree/v1).
