# ALS workerd context loss repro

```bash
npm i
npm run dev
```

Expected output:

```
getContext().foo: bar
getMyThing(): bar
await PromiseyThing.find(): bar
```

Actual output:

```
getContext().foo: bar
getMyThing(): bar
await PromiseyThing.find(): undefined
```
