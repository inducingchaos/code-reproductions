import { contract } from "@acme/api-contract/src"
import { implement } from "@orpc/server"

export const apiFactory = implement(contract).$context<{ request: { headers: Headers } }>()
