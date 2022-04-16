/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render } from '@testing-library/react';
import Beforeunload from '../Beforeunload';
import useBeforeunload from '../useBeforeunload';

jest.mock('../useBeforeunload');

test('calls useBeforeunload with onBeforeunload prop when rendered', () => {
  const handler = jest.fn();
  render(<Beforeunload onBeforeunload={handler} />);
  expect(useBeforeunload).toHaveBeenCalledWith(handler);
});

test('renders children', () => {
  const { container } = render(
    <Beforeunload onBeforeunload={() => {}}>
      Hello <strong>World!</strong>
    </Beforeunload>
  );
  expect(container).toContainHTML('Hello <strong>World!</strong>');
});
