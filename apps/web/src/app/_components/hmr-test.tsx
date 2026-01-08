"use client"

import { useState } from "react"

export function HMRTest() {
    const [data, setData] = useState("")

    const [isLoading, setIsLoading] = useState(false)

    async function handleClick() {
        setIsLoading(true)

        try {
            const [getMessage, streamMessage] = (await Promise.all([fetch("/api/test").then(response => response.json()), fetch("/api/test-stream", { method: "POST" }).then(response => response.json())])) as [string, string[]]

            setData(JSON.stringify({ getMessage, streamMessage }, null, 2))
        } catch (error) {
            setData(`Error: ${error}`)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div style={{ maxWidth: "540px", gap: "16px", display: "flex", flexDirection: "column" }}>
            <h1>{"HMR Bug Reproduction"}</h1>
            <p>{"Click the button to fetch from test endpoints. "}</p>

            <button onClick={handleClick} disabled={isLoading} style={{ padding: "8px 16px", cursor: isLoading ? "not-allowed" : "pointer" }}>
                {isLoading ? "Testing..." : "Test HMR"}
            </button>

            {data && (
                <pre
                    style={{
                        padding: "16px",
                        background: "#efefef",
                        borderRadius: "8px"
                    }}
                >
                    {data}
                </pre>
            )}
        </div>
    )
}
