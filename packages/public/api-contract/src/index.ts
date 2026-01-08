import { oc, type, eventIterator } from "@orpc/contract"

export const contract = {
    getMessage: oc
        .route({
            method: "GET"
        })
        .input(
            type<{
                message: string
            }>()
        )
        .output(
            type<{
                message: string
            }>()
        ),

    streamMessage: oc
        .route({
            method: "POST"
        })
        .input(
            type<{
                message: string
            }>()
        )
        .output(
            eventIterator(
                type<{
                    content: string
                }>()
            )
        )
}
