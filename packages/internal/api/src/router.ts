import { apiFactory } from "./factory"

console.log("[packages/internal/api/src/router.ts] - Evaluated module: v1")

const getMessageProcedure = apiFactory.getMessage.handler(async ({ input, context }) => {
    console.log("[packages/internal/api/src/router.ts] - In `getMessage` handler: v1")

    return { message: input.message }
})

const streamMessageProcedure = apiFactory.streamMessage.handler(async function* ({ input, context }) {
    console.log("[packages/internal/api/src/router.ts] - In `streamMessage` handler: v1")

    for (let i = 0; i < 3; i++) yield { content: `${input.message} chunk ${i}` }
})

export const router = apiFactory.router({
    getMessage: getMessageProcedure,
    streamMessage: streamMessageProcedure
})

export type Router = typeof router
