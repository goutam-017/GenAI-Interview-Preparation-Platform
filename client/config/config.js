if (!process.env.NEXT_PUBLIC_BASE_URL) {
    throw new Error("NEXT_PUBLIC_BASE_URL is not defined in env file")
}

const config = {
    BASE_URL: process.env.NEXT_PUBLIC_BASE_URL
}

export default config