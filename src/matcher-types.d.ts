declare namespace jasmine {
  interface Matchers<T> {
    toEmit(expected: any, callToTrigger: () => void): boolean;
  }
}
