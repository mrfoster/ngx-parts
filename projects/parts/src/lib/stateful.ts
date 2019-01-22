export interface Stateful<T> {
  setState(state: T): void;
}
