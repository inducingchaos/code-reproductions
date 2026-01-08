export async function register() {
    if (process.env.NEXT_RUNTIME === "nodejs") {
        await import("~/lib/rpc/client.server")

        console.log("[apps/web/src/instrumentation.ts] - Pre-loaded RPC client")
    }
}
