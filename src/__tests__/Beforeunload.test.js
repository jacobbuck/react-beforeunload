import { jest } from '@jest/globals';
import { createElement } from 'react';
import { act, render } from '@testing-library/react';
import { Beforeunload } from '../Beforeunload';

test('calls useBeforeunload with onBeforeunload prop when rendered', () => {
  const handler = jest.fn();
  render(createElement(Beforeunload, { onBeforeunload: handler }));
  const event = new Event('beforeunload', { cancelable: true });
  act(() => {
    window.dispatchEvent(event);
  });
  expect(handler).toHaveBeenCalledWith(event);
});

test('renders children', () => {
  const { container } = render(
    createElement(
      Beforeunload,
      { onBeforeunload: () => {} },
      'Hello ',
      createElement('strong', null, 'World!')
    )
  );
  expect(container).toContainHTML('Hello <strong>World!</strong>');
});
