export interface ContactPayload {
    name: string
    email: string
    message: string
}

export async function sendContactForm(data: ContactPayload): Promise<{ status: string }> {
    const base = process.env.REACT_APP_API_URL || ""
    const res = await fetch(`${base}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    })
    if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.error || "Failed to send message")
    }
    return res.json()
}
