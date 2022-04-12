/**
 * @jest-environment jsdom
 */
import React from 'react';
import TestRenderer from 'react-test-renderer';
import Beforeunload from '../Beforeunload';
import useBeforeunload from '../useBeforeunload';

jest.mock('../useBeforeunload');

test('calls useBeforeunload with onBeforeunload prop when rendered', () => {
  const handler = jest.fn();
  TestRenderer.create(<Beforeunload onBeforeunload={handler} />);
  expect(useBeforeunload).toHaveBeenCalledWith(handler);
});

test('renders children', () => {
  const testRenderer = TestRenderer.create(
    <Beforeunload onBeforeunload={() => {}}>
      Hello <strong>World!</strong>
    </Beforeunload>
  );
  expect(testRenderer.toJSON()).toMatchObject([
    'Hello ',
    { type: 'strong', props: {}, children: ['World!'] },
  ]);
});
