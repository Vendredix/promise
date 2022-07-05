interface PromiseConstructor {

  /**
   * Start the chain of promises with `Promise.try`. Any synchronous exceptions will be turned into rejections on the returned promise.
   *
   * Note about second argument: if it's specifically a true array, its values become respective arguments for the function call. Otherwise it is passed as is as the first argument for the function call.
   *
   * Alias for `attempt();` for compatibility with earlier ECMAScript version.
   */
  // try<R>(fn: () => R | PromiseLike<R>): Promise<R>;
  // attempt<R>(fn: () => R | PromiseLike<R>): Promise<R>;

  /**
   * Create a promise with undecided fate and return a `PromiseResolver` to control it. See resolution?: Promise(#promise-resolution).
   */
  defer<R>(): PromiseExtensions.Resolver<R>;

  /**
   * Returns a promise that will be resolved with value (or undefined) after given ms milliseconds.
   * If value is a promise, the delay will start counting down when it is fulfilled and the returned
   *  promise will be fulfilled with the fulfillment value of the value promise.
   */
  // delay<R>(ms: number, value: R | PromiseLike<R>): Promise<R>;
  delay(ms: number): Promise<void>;

  /**
   * Given an array, or a promise of an array, which contains promises (or a mix of promises and values) return a promise that is fulfilled when all the items in the array are fulfilled. The promise's fulfillment value is an array with fulfillment values at respective positions to the original array. If any promise in the array rejects, the returned promise is rejected with the rejection reason.
   */
  // TODO enable more overloads
  // array with promises of different types
  all<T1, T2, T3, T4, T5>(values: [PromiseLike<T1> | T1, PromiseLike<T2> | T2, PromiseLike<T3> | T3, PromiseLike<T4> | T4, PromiseLike<T5> | T5]): Promise<[T1, T2, T3, T4, T5]>;
  all<T1, T2, T3, T4>(values: [PromiseLike<T1> | T1, PromiseLike<T2> | T2, PromiseLike<T3> | T3, PromiseLike<T4> | T4]): Promise<[T1, T2, T3, T4]>;
  all<T1, T2, T3>(values: [PromiseLike<T1> | T1, PromiseLike<T2> | T2, PromiseLike<T3> | T3]): Promise<[T1, T2, T3]>;
  all<T1, T2>(values: [PromiseLike<T1> | T1, PromiseLike<T2> | T2]): Promise<[T1, T2]>;
  all<T1>(values: [PromiseLike<T1> | T1]): Promise<[T1]>;
  // array with values
  all<R>(values: PromiseLike<ArrayLike<PromiseLike<R> | R>> | ArrayLike<PromiseLike<R> | R>): Promise<R[]>;

  /**
   * Like ``Promise.all`` but for object properties instead of array items. Returns a promise that is fulfilled when all the properties of the object are fulfilled. The promise's fulfillment value is an object with fulfillment values at respective keys to the original object. If any promise in the object rejects, the returned promise is rejected with the rejection reason.
   *
   * If `object` is a trusted `Promise`, then it will be treated as a promise for object rather than for its properties. All other objects are treated for their properties as is returned by `Object.keys` - the object's own enumerable properties.
   *
   * *The original object is not modified.*
   */
  // trusted promise for map
  props<K, V>(map: PromiseLike<Map<K, PromiseLike<V> | V>>): Promise<Map<K, V>>;
  // trusted promise for object
  props<T>(object: PromiseLike<PromiseExtensions.ResolvableProps<T>>): Promise<T>; // tslint:disable-line:unified-signatures
  // map
  props<K, V>(map: Map<K, PromiseLike<V> | V>): Promise<Map<K, V>>; // tslint:disable-line:unified-signatures
  // object
  props<T>(object: PromiseExtensions.ResolvableProps<T>): Promise<T>; // tslint:disable-line:unified-signatures

  /**
   * Like `Promise.some()`, with 1 as `count`. However, if the promise fulfills, the fulfillment value is not an array of 1 but the value directly.
   */
  any<R>(values: PromiseLike<ArrayLike<PromiseLike<R> | R>> | ArrayLike<PromiseLike<R> | R>): Promise<R>;

  /**
   * Given an array, or a promise of an array, which contains promises (or a mix of promises and values) return a promise that is fulfilled or rejected as soon as a promise in the array is fulfilled or rejected with the respective rejection reason or fulfillment value.
   *
   * **Note** If you pass empty array or a sparse array with no values, or a promise/thenable for such, it will be forever pending.
   */
  // race<R>(values: PromiseLike<ArrayLike<PromiseLike<R> | R>> | ArrayLike<PromiseLike<R> | R>): Promise<R>;

  /**
   * Initiate a competetive race between multiple promises or values (values will become immediately fulfilled promises). When `count` amount of promises have been fulfilled, the returned promise is fulfilled with an array that contains the fulfillment values of the winners in order of resolution.
   *
   * If too many promises are rejected so that the promise can never become fulfilled, it will be immediately rejected with an array of rejection reasons in the order they were thrown in.
   *
   * *The original array is not modified.*
   */
  some<R>(values: PromiseLike<ArrayLike<PromiseLike<R> | R>> | ArrayLike<PromiseLike<R> | R>, count: number): Promise<R[]>;

  /**
   * Map an array, or a promise of an array, which contains a promises (or a mix of promises and values) with the given `mapper` function with the signature `(item, index, arrayLength)` where `item` is the resolved value of a respective promise in the input array. If any promise in the input array is rejected the returned promise is rejected as well.
   *
   * If the `mapper` function returns promises or thenables, the returned promise will wait for all the mapped results to be resolved as well.
   *
   * *The original array is not modified.*
   */
  map<R, U>(values: PromiseLike<ArrayLike<PromiseLike<R> | R>> | ArrayLike<PromiseLike<R> | R>, mapper: (item: R, index: number, arrayLength: number) => U | PromiseLike<U>): Promise<U[]>;

  /**
   * Reduce an array, or a promise of an array, which contains a promises (or a mix of promises and values) with the given `reducer` function with the signature `(total, current, index, arrayLength)` where `item` is the resolved value of a respective promise in the input array. If any promise in the input array is rejected the returned promise is rejected as well.
   *
   * If the reducer function returns a promise or a thenable, the result for the promise is awaited for before continuing with next iteration.
   *
   * *The original array is not modified. If no `intialValue` is given and the array doesn't contain at least 2 items, the callback will not be called and `undefined` is returned. If `initialValue` is given and the array doesn't have at least 1 item, `initialValue` is returned.*
   */
  reduce<R, U>(values: PromiseLike<ArrayLike<PromiseLike<R> | R>> | ArrayLike<PromiseLike<R> | R>, reducer: (total: U, current: R, index: number, arrayLength: number) => U | PromiseLike<U>, initialValue?: U | PromiseLike<U>): Promise<U>;

  /**
   * Filter an array, or a promise of an array, which contains a promises (or a mix of promises and values) with the given `filterer` function with the signature `(item, index, arrayLength)` where `item` is the resolved value of a respective promise in the input array. If any promise in the input array is rejected the returned promise is rejected as well.
   *
   * The return values from the filtered functions are coerced to booleans, with the exception of promises and thenables which are awaited for their eventual result.
   *
   * *The original array is not modified.
   */
  filter<R>(values: PromiseLike<ArrayLike<PromiseLike<R> | R>> | ArrayLike<PromiseLike<R> | R>, filterer: (item: R, index: number, arrayLength: number) => boolean | PromiseLike<boolean>): Promise<R[]>;

  /**
   * Iterate over an array, or a promise of an array, which contains promises (or a mix of promises and values) with the given iterator function with the signature (item, index, value) where item is the resolved value of a respective promise in the input array. Iteration happens serially. If any promise in the input array is rejected the returned promise is rejected as well.
   *
   * Resolves to the original array unmodified, this method is meant to be used for side effects. If the iterator function returns a promise or a thenable, the result for the promise is awaited for before continuing with next iteration.
   */
  each<R, U>(values: PromiseLike<ArrayLike<PromiseLike<R> | R>> | ArrayLike<PromiseLike<R> | R>, iterator: (item: R, index: number, arrayLength: number) => U | PromiseLike<U>): Promise<R[]>;

  /**
   * Given an Iterable(arrays are Iterable), or a promise of an Iterable, which produces promises (or a mix of promises and values), iterate over all the values in the Iterable into an array and iterate over the array serially, in-order.
   *
   * Returns a promise for an array that contains the values returned by the iterator function in their respective positions. The iterator won't be called for an item until its previous item, and the promise returned by the iterator for that item are fulfilled. This results in a mapSeries kind of utility but it can also be used simply as a side effect iterator similar to Array#forEach.
   *
   * If any promise in the input array is rejected or any promise returned by the iterator function is rejected, the result will be rejected as well.
   */
  // mapSeries<R, U>(values: PromiseLike<ArrayLike<PromiseLike<R> | R>> | ArrayLike<PromiseLike<R> | R>, iterator: (item: R, index: number, arrayLength: number) => U | PromiseLike<U>): Promise<U[]>;


  /**
   * Conditionally checks an array, or a promise of an array, which contains promises (or a mix of promises and values) with the given `guard` function with the signature `(item, index, arrayLength)` where `item` is the resolved value of a respective promise in the input array. If any promise in the input array is rejected the returned promise is rejected as well.
   *
   * The return values from the `guard` functions are coerced to booleans, with the exception of promises and thenables which are awaited for their eventual result.
   *
   * *The original array is not modified.
   */
  every<R>(values: PromiseLike<ArrayLike<PromiseLike<R> | R>> | ArrayLike<PromiseLike<R> | R>, guard: (item: R, index: number, arrayLength: number) => boolean | PromiseLike<boolean>): Promise<boolean>;
}



interface Promise<T> {

  /**
   * Convenience method for:
   *
   * <code>
   * .then(function() {
   *    return value;
   * });
   * </code>
   *
   * in the case where `value` doesn't change its value. That means `value` is bound at the time of calling `.return()`
   *
   */
  return(): Promise<void>;
  return<U>(value: U): Promise<U>;

  /**
   * Convenience method for:
   *
   * <code>
   * .then(function() {
   *    throw reason;
   * });
   * </code>
   * Same limitations apply as with `.return()`.
   *
   */
  throw(reason: Error): Promise<never>;

  /**
   * Pass a handler that will be called regardless of this promise's fate. Returns a new promise chained from this promise. There are special semantics for `.finally()` in that the final value cannot be modified from the handler.
   */
  finally<U>(handler: () => U | PromiseLike<U>): Promise<T>;

  /**
   * Convenience method for:
   *
   * <code>
   * .catch(function() {
   *    return value;
   * });
   * </code>
   *
   * in the case where `value` doesn't change its value. That means `value` is bound at the time of calling `.catchReturn()`
   * TODO: disallow non-objects
   */
  // catchReturn<U>(value: U): Promise<U>;
  //
  // catchReturn<U, E1 extends Error, E2 extends Error, E3 extends Error, E4 extends Error, E5 extends Error>(
  //   filter1: (new (...args: any[]) => E1) | ((error: any) => boolean) | object,
  //   filter2: (new (...args: any[]) => E2) | ((error: any) => boolean) | object,
  //   filter3: (new (...args: any[]) => E3) | ((error: any) => boolean) | object,
  //   filter4: (new (...args: any[]) => E4) | ((error: any) => boolean) | object,
  //   filter5: (new (...args: any[]) => E5) | ((error: any) => boolean) | object,
  //   value: U,
  // ): Promise<U>;
  // catchReturn<U, E1 extends Error, E2 extends Error, E3 extends Error, E4 extends Error>(
  //   filter1: (new (...args: any[]) => E1) | ((error: any) => boolean) | object,
  //   filter2: (new (...args: any[]) => E2) | ((error: any) => boolean) | object,
  //   filter3: (new (...args: any[]) => E3) | ((error: any) => boolean) | object,
  //   filter4: (new (...args: any[]) => E4) | ((error: any) => boolean) | object,
  //   value: U,
  // ): Promise<U>;
  // catchReturn<U, E1 extends Error, E2 extends Error, E3 extends Error>(
  //   filter1: (new (...args: any[]) => E1) | ((error: any) => boolean) | object,
  //   filter2: (new (...args: any[]) => E2) | ((error: any) => boolean) | object,
  //   filter3: (new (...args: any[]) => E3) | ((error: any) => boolean) | object,
  //   value: U,
  // ): Promise<U>;
  // catchReturn<U, E1 extends Error, E2 extends Error>(
  //   filter1: (new (...args: any[]) => E1) | ((error: any) => boolean) | object,
  //   filter2: (new (...args: any[]) => E2) | ((error: any) => boolean) | object,
  //   value: U,
  // ): Promise<U>;
  // catchReturn<U, E1 extends Error>(
  //   filter1: (new (...args: any[]) => E1) | ((error: any) => boolean) | object,
  //   value: U,
  // ): Promise<U>;

  /**
   * Convenience method for:
   *
   * <code>
   * .catch(function() {
   *    throw reason;
   * });
   * </code>
   * Same limitations apply as with `.catchReturn()`.
   * TODO: disallow non-objects
   */
  // catchThrow(reason: Error): Promise<T>;

  // catchThrow<E1 extends Error, E2 extends Error, E3 extends Error, E4 extends Error, E5 extends Error>(
  //   filter1: (new (...args: any[]) => E1) | ((error: any) => boolean) | object,
  //   filter2: (new (...args: any[]) => E2) | ((error: any) => boolean) | object,
  //   filter3: (new (...args: any[]) => E3) | ((error: any) => boolean) | object,
  //   filter4: (new (...args: any[]) => E4) | ((error: any) => boolean) | object,
  //   filter5: (new (...args: any[]) => E5) | ((error: any) => boolean) | object,
  //   reason: Error,
  // ): Promise<T>;
  // catchThrow<E1 extends Error, E2 extends Error, E3 extends Error, E4 extends Error>(
  //   filter1: (new (...args: any[]) => E1) | ((error: any) => boolean) | object,
  //   filter2: (new (...args: any[]) => E2) | ((error: any) => boolean) | object,
  //   filter3: (new (...args: any[]) => E3) | ((error: any) => boolean) | object,
  //   filter4: (new (...args: any[]) => E4) | ((error: any) => boolean) | object,
  //   reason: Error,
  // ): Promise<T>;
  // catchThrow<E1 extends Error, E2 extends Error, E3 extends Error>(
  //   filter1: (new (...args: any[]) => E1) | ((error: any) => boolean) | object,
  //   filter2: (new (...args: any[]) => E2) | ((error: any) => boolean) | object,
  //   filter3: (new (...args: any[]) => E3) | ((error: any) => boolean) | object,
  //   reason: Error,
  // ): Promise<T>;
  // catchThrow<E1 extends Error, E2 extends Error>(
  //   filter1: (new (...args: any[]) => E1) | ((error: any) => boolean) | object,
  //   filter2: (new (...args: any[]) => E2) | ((error: any) => boolean) | object,
  //   reason: Error,
  // ): Promise<T>;
  // catchThrow<E1 extends Error>(
  //   filter1: (new (...args: any[]) => E1) | ((error: any) => boolean) | object,
  //   reason: Error,
  // ): Promise<T>;

  /**
   * Like calling `.then`, but the fulfillment value or rejection reason is assumed to be an array, which is flattened to the formal parameters of the handlers.
   */
  spread<U, W>(fulfilledHandler: (...values: W[]) => U | PromiseLike<U>): Promise<U>;
  spread<U>(fulfilledHandler: (...args: any[]) => U | PromiseLike<U>): Promise<U>;

  /**
   * Same as calling `Promise.all(thisPromise)`. With the exception that if this promise is bound to a value, the returned promise is bound to that value too.
   */
  // TODO type inference from array-resolving promise?
  // all<U>(): Promise<U[]>;

  /**
   * Same as calling `Promise.props(thisPromise)`. With the exception that if this promise is bound to a value, the returned promise is bound to that value too.
   */
  props<K, V>(this: PromiseLike<Map<K, PromiseLike<V> | V>>): Promise<Map<K, V>>;
  props<T>(this: PromiseLike<PromiseExtensions.ResolvableProps<T>>): Promise<T>;

  /**
   * Same as calling `Promise.any(thisPromise)`. With the exception that if this promise is bound to a value, the returned promise is bound to that value too.
   */
  // TODO type inference from array-resolving promise?
  any<U>(): Promise<U>;

  /**
   * Same as calling `Promise.some(thisPromise)`. With the exception that if this promise is bound to a value, the returned promise is bound to that value too.
   */
  // TODO type inference from array-resolving promise?
  some<U>(count: number): Promise<U[]>;

  /**
   * Same as calling `Promise.race(thisPromise, count)`. With the exception that if this promise is bound to a value, the returned promise is bound to that value too.
   */
  // TODO type inference from array-resolving promise?
  // race<U>(): Promise<U>;

  /**
   * Same as calling `Promise.map(thisPromise, mapper)`. With the exception that if this promise is bound to a value, the returned promise is bound to that value too.
   */
  // TODO type inference from array-resolving promise?
  map<Q, U>(mapper: (item: Q, index: number, arrayLength: number) => U | PromiseLike<U>): Promise<U[]>;
  map<U>(mapper: (item: U, index: number, arrayLength: number) => U | PromiseLike<U>): Promise<U[]>;

  /**
   * Same as calling `Promise.reduce(thisPromise, Function reducer, initialValue)`. With the exception that if this promise is bound to a value, the returned promise is bound to that value too.
   */
  // TODO type inference from array-resolving promise?
  reduce<Q, U>(reducer: (memo: U, item: Q, index: number, arrayLength: number) => U | PromiseLike<U>, initialValue?: U | PromiseLike<U>): Promise<U>;
  reduce<U>(reducer: (memo: U, item: U, index: number, arrayLength: number) => U | PromiseLike<U>, initialValue?: U | PromiseLike<U>): Promise<U>;

  /**
   * Same as calling ``Promise.filter(thisPromise, filterer)``. With the exception that if this promise is bound to a value, the returned promise is bound to that value too.
   */
  // TODO type inference from array-resolving promise?
  filter<U>(filterer: (item: U, index: number, arrayLength: number) => boolean | PromiseLike<boolean>): Promise<U[]>;

  /**
   * Same as calling ``Promise.each(thisPromise, iterator)``. With the exception that if this promise is bound to a value, the returned promise is bound to that value too.
   */
  each<R, U>(iterator: (item: R, index: number, arrayLength: number) => U | PromiseLike<U>): Promise<R[]>;

  /**
   * Same as calling ``Promise.mapSeries(thisPromise, iterator)``. With the exception that if this promise is bound to a value, the returned promise is bound to that value too.
   */
  // mapSeries<R, U>(iterator: (item: R, index: number, arrayLength: number) => U | PromiseLike<U>): Promise<U[]>;


  /**
   * Same as calling `Promise.delay(ms, this)`.
   */
  // delay(ms: number): Promise<T>;


  /**
   * Same as calling ``Promise.every(thisPromise, guard)``. With the exception that if this promise is bound to a value, the returned promise is bound to that value too.
   */
  // TODO type inference from array-resolving promise?
  every<U>(guard: (item: U, index: number, arrayLength: number) => boolean | PromiseLike<boolean>): Promise<boolean>;
}

declare namespace PromiseExtensions {
  export interface Resolver<R> {
    readonly promise: Promise<R>;
    resolve(value: R): void;
    resolve(): void;
    reject(reason: Error): void;
    isPending(): boolean;
    isFulfilled(): boolean;
    isResolved(): boolean;
    isRejected(): boolean;
  }

  export type ResolvableProps<T> = object & { [K in keyof T]: PromiseLike<T[K]> | T[K] };
}
