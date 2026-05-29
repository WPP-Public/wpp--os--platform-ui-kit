/// <reference types="jest" />
export declare class ResizeObserverMock {
  callback: ResizeObserverCallback;
  constructor(callback: ResizeObserverCallback);
  observe: jest.Mock<any, any>;
  unobserve: jest.Mock<any, any>;
  disconnect: jest.Mock<any, any>;
  triggerResize(height: number): void;
}
