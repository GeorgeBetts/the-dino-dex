import React from 'react';
import { Button } from '@/components/retroui/Button';
import { Text } from '@/components/retroui/Text';
import { Link } from '@inertiajs/react';

const routes = [
    {
        label: 'Home',
        href: '/',
    },
    {
        label: 'About',
        href: '/about',
    },
];

function NavBar() {
    return (
        <div>
            <nav className="border-b-2 border-black bg-primary text-primary-foreground">
                <div className="max-w-7\6xl mx-auto px-4 py-4 flex justify-between items-center">
                    <Text className="text-3xl font-logo text-primary-foreground">DINODEX</Text>

                    <div className="hidden md:flex items-center gap-8 font-medium">
                        {routes.map((route) => (
                            <Link
                                key={route.label}
                                href={route.href}
                                className="hover:-translate-y-1 transition-transform"
                            >
                                {route.label}
                            </Link>
                        ))}
                    </div>
                    <div className="flex items-center gap-4">
                        <Button variant="outline" size="sm" asChild>
                            <a
                                href="https://github.com/GeorgeBetts/the-dino-dex"
                                className="flex items-center gap-2"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="GitHub Link"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                                </svg>
                                GitHub
                            </a>
                        </Button>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default NavBar;
