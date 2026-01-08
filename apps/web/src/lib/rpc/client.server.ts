import "server-only"

import { router } from "@acme-internal/api"
import { createRouterClient } from "@orpc/server"
import { headers } from "next/headers"

globalThis.$client = createRouterClient(router, {
    context: async () => ({ request: { headers: await headers() } })
})
