## How to Reproduce

Run `pnpm dev` and go to [http://localhost:3000](http://localhost:3000). You should see the initial logs:

```bash
acme-web:dev:  ✓ Starting...
acme-web:dev: [packages/internal/api/src/router.ts] - Evaluated module: v1
acme-web:dev: [apps/web/src/instrumentation.ts] - Pre-loaded RPC client
acme-web:dev:  ✓ Ready in 625ms
acme-web:dev:  GET / 200 in 721ms (compile: 638ms, render: 83ms)
```

Click the "Test HMR" button. You should then see:

```bash
acme-web:dev: [apps/web/src/app/api/test/route.ts] - Evaluated module
acme-web:dev: [apps/web/src/app/api/test/route.ts] - In handler
acme-web:dev: [packages/internal/api/src/router.ts] - In `getMessage` handler: v1
acme-web:dev:  GET /api/test 200 in 194ms (compile: 183ms, render: 11ms)
acme-web:dev: [apps/web/src/app/api/test-stream/route.ts] - Evaluated module
acme-web:dev: [apps/web/src/app/api/test-stream/route.ts] - In handler
acme-web:dev: [packages/internal/api/src/router.ts] - In `streamMessage` handler: v1
acme-web:dev:  POST /api/test-stream 200 in 206ms (compile: 201ms, render: 5ms)
```

Here's where you would typically modify logic on your server, and expect those changes to be recompiled on save. Let's try it by opening `/packages/internal/api/src/router.ts` and changing all 3 instances of the version indicator from `v1` to `v2`.

Once done, click the "Test HMR" button again. You should see:

```bash
acme-web:dev: [apps/web/src/app/api/test/route.ts] - In handler
acme-web:dev: [apps/web/src/app/api/test-stream/route.ts] - In handler
acme-web:dev: [packages/internal/api/src/router.ts] - In `getMessage` handler: v1
acme-web:dev: GET /api/test 200 in 36ms (compile: 15ms, render: 20ms)
acme-web:dev: [packages/internal/api/src/router.ts] - In `streamMessage` handler: v1
acme-web:dev: POST /api/test-stream 200 in 31ms (compile: 22ms, render: 9ms)
```

Notice that the logs still indicate the version `v1`. Clearly, the runtime code is cached by the bundling system and is not re-evaluated. This is extremely problematic and hard to debug.

The only currently known fix is to restart the dev server manually - or in some cases (I was able to get it working in my production app, but not here) - wrap the `$globalThis.$client` in a `Proxy` instance to re-evaluate the router every time it's changed.
