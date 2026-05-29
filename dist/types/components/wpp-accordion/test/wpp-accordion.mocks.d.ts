/**
 * Creates a mock content element with the 'content' part attribute,
 * simulating the accordion's content area in the event composedPath.
 */
export declare const createMockContentElement: () => HTMLDivElement;
/**
 * Creates a mock keydown event with a custom composedPath.
 * Used to simulate keyboard events originating from specific DOM regions
 * (e.g., header button vs content area) in accordion tests.
 */
export declare const createMockKeydownEvent: (key: string, composedPathNodes: EventTarget[]) => {
  event: KeyboardEvent;
  preventDefaultSpy: jest.Mock;
};
