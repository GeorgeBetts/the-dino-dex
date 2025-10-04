import * as React from 'react'

export default function Home({ appName }: { appName: string }) {
    return (
        <main style={{ padding: 24 }}>
            <h1>{appName}</h1>
            <p>Inertia + React is working!</p>
        </main>
    )
}
