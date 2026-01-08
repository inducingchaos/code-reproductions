import { api } from "~/lib/rpc"

console.log("[apps/web/src/app/api/test/route.ts] - Evaluated module")

export async function GET() {
    console.log("[apps/web/src/app/api/test/route.ts] - In handler")

    const { data } = await api.getMessage({ message: "`getMessage` test" })
    if (!data) return Response.json({ error: "No result" }, { status: 500 })

    const { message } = data
    return Response.json({ message })
}
