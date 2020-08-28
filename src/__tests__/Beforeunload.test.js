import React from 'react';
import TestRenderer from 'react-test-renderer';
import Beforeunload from '../Beforeunload';
import useBeforeunload from '../useBeforeunload';

jest.mock('../useBeforeunload');

test('calls useBeforeunload with onBeforeunload prop when rendered', () => {
  const handler = jest.fn();
  const testRenderer = TestRenderer.create(
    <Beforeunload onBeforeunload={handler} />
  );
  expect(useBeforeunload).toHaveBeenCalledWith(handler);
});

test('renders children', () => {
  const testRenderer = TestRenderer.create(
    <Beforeunload onBeforeunload={() => {}}>
      Hello <strong>World!</strong>
    </Beforeunload>
  );
  console.log(testRenderer.toJSON());
  expect(testRenderer.toJSON()).toMatchObject([
    'Hello ',
    { type: 'strong', props: {}, children: ['World!'] },
  ]);
});
