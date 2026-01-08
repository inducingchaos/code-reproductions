import { api } from "~/lib/rpc"

console.log("[apps/web/src/app/api/test-stream/route.ts] - Evaluated module")

export async function POST() {
    console.log("[apps/web/src/app/api/test-stream/route.ts] - In handler")

    const { data } = await api.streamMessage({ message: "`streamMessage` test" })
    if (!data) return Response.json({ error: "No result" }, { status: 500 })

    const chunks: string[] = []

    for await (const chunk of data) chunks.push(chunk.content)

    return Response.json({ chunks })
}
