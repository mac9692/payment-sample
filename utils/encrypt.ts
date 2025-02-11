export default async function encryptSHA256 (message: string) {
    const encoder = new TextEncoder()
    const data = encoder.encode(message)
    const hashBuffer = await crypto.subtle.digest('SHA-256', data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))

    return hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('')
}