import { AsyncLocalStorage } from "node:async_hooks";

/**
 * Example of a class that masquerades as a Promise, but is not a real Promise.
 * For some reason, calling `await` against an instance of this class will
 * result in the loss of ALS context (in workerd) but not in miniflare.
 */
export class OtherPromiseyThing {
  find() {
    return this;
  }

  async get() {
    // This will return `undefined` even though it's executing within ALS run:
    return getContext()?.foo;

    // However, returning a simple string works fine:
    // return 'hello';
  }

  then(fulfill: any, reject: any) {
    const promise = this.get();
    return promise.then(fulfill, reject);
  }

  catch(reject: any) {
    const promise = this.get();
    return promise.catch(reject);
  }
}

export class PromiseyThing {
  static find() {
    return new OtherPromiseyThing();

    // This _will_ work, though:
    // return new OtherPromiseyThing().get();
  }
}

export function getMyThing() {
  return getContext()?.foo;
}

export const asyncLocalStorage = new AsyncLocalStorage<{ foo: string }>();

export function getContext() {
  return asyncLocalStorage.getStore();
}
