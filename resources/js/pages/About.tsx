import React from 'react';
import Layout from '@/components/Layout';
import { Card } from '@/components/retroui/Card';
import { Text } from '@/components/retroui/Text';
import { Button } from '@/components/retroui/Button';

export default function About() {
    return (
        <Layout>
            <div className="container mx-auto px-4 py-8 flex justify-center">
                <Card className="w-full max-w-3xl py-4">
                    <Card.Header className="text-center">
                        <Card.Title className="mb-4">
                            <h1>About The Dino-Dex</h1>
                        </Card.Title>
                        <Card.Description className="max-w-2xl mx-auto">
                            <Text as="p" className="text-lg text-muted-foreground">
                                Dino‑Dex lets you browse thousands of species of pre‑historic
                                creatures. We collect images, articles, and facts from trusted
                                sources so you can search, explore and learn about every species of
                                dinosaur.
                            </Text>
                        </Card.Description>
                    </Card.Header>

                    <Card.Content className="space-y-6">
                        <section>
                            <Text as="h3" className="mb-2">
                                Our Sources
                            </Text>
                            <ul className="list-disc pl-6 space-y-1">
                                <li>
                                    <a
                                        href="https://www.wikipedia.org/"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="underline underline-offset-2 decoration-primary"
                                    >
                                        Wikipedia
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://www.britannica.com/"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="underline underline-offset-2 decoration-primary"
                                    >
                                        Encyclopedia Britannica
                                    </a>
                                </li>
                            </ul>
                        </section>

                        <div className="pt-2 flex justify-center">
                            <Button asChild size="lg">
                                <a
                                    href="https://github.com/GeorgeBetts"
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label="Find me on GitHub"
                                >
                                    Find me on Github
                                </a>
                            </Button>
                        </div>
                    </Card.Content>
                </Card>
            </div>
        </Layout>
    );
}
