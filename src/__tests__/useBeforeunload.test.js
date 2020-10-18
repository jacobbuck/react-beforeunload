import { act, renderHook } from '@testing-library/react-hooks';
import useBeforeunload from '../useBeforeunload';

const createBeforeunloadEvent = () =>
  new Event('beforeunload', { cancelable: true });

const renderUseBeforeunloadHook = (handler) =>
  renderHook(() => useBeforeunload(handler));

test('uses default handler when not set', () => {
  const { result } = renderUseBeforeunloadHook();
  act(() => {
    window.dispatchEvent(createBeforeunloadEvent());
  });
  expect(result.error).toBeUndefined();
});

test('throws TypeError when handler is not a function', () => {
  const { result } = renderUseBeforeunloadHook({ hello: 'world' });
  expect(result.error).toEqual(
    new TypeError(
      'Expected `handler` to be of type `function`, but received type `object`'
    )
  );
});

test('handler function is called when beforeunload event is fired', () => {
  const handler = jest.fn();
  renderUseBeforeunloadHook(handler);
  const event = createBeforeunloadEvent();
  act(() => {
    window.dispatchEvent(event);
  });
  expect(handler).toHaveBeenCalledWith(event);
});

test('returnValue on event is set when preventDefault is called', () => {
  renderUseBeforeunloadHook((event) => {
    event.preventDefault();
  });
  const event = createBeforeunloadEvent();
  // jsdom currently doesn't have `BeforeUnloadEvent` implemented, so we're just
  // ensuring `returnValue` is set on `event`
  const set = jest.fn();
  Object.defineProperty(event, 'returnValue', { set });
  act(() => {
    window.dispatchEvent(event);
  });
  expect(set).toHaveBeenCalledWith('');
});

test('returnValue on event is set when a string is returned by handler', () => {
  renderUseBeforeunloadHook(() => 'goodbye');
  const event = createBeforeunloadEvent();
  // jsdom currently doesn't have `BeforeUnloadEvent` implemented, so we're just
  // ensuring `returnValue` is set on `event`
  const set = jest.fn();
  Object.defineProperty(event, 'returnValue', { set });
  act(() => {
    window.dispatchEvent(event);
  });
  expect(set).toHaveBeenCalledWith('goodbye');
});
