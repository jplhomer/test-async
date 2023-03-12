import { getContext, getMyThing, PromiseyThing } from "./context";

export async function handleRequest(request: Request) {
  return new Response(`getContext().foo: ${getContext()!.foo}
getMyThing(): ${getMyThing()}
await PromiseyThing.find(): ${await PromiseyThing.find()}`);
}
