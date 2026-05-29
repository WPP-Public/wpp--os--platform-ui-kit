/**
 * Creates a mock content element with the 'content' part attribute,
 * simulating the accordion's content area in the event composedPath.
 */
export const createMockContentElement = () => {
  const contentDiv = document.createElement('div');
  contentDiv.setAttribute('part', 'content');
  return contentDiv;
};
/**
 * Creates a mock keydown event with a custom composedPath.
 * Used to simulate keyboard events originating from specific DOM regions
 * (e.g., header button vs content area) in accordion tests.
 */
export const createMockKeydownEvent = (key, composedPathNodes) => {
  const preventDefaultSpy = jest.fn();
  const event = {
    key,
    composedPath: () => composedPathNodes,
    preventDefault: preventDefaultSpy,
  };
  return { event, preventDefaultSpy };
};
