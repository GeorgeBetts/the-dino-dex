import React from 'react';
import NavBar from '@/components/NavBar';

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main>
            <div className="font-sans">
                <NavBar />
                <div className="container mx-auto my-8 px-4">{children}</div>
            </div>
        </main>
    );
}
