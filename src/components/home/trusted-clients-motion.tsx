"use client";

import Link from "next/link";
import type { TrustedClient } from "./use-trusted-clients-motion";
import { useTrustedClientsMotion } from "./use-trusted-clients-motion";

type TrustedClientsMotionProps = {
    clients: TrustedClient[];
};

function renderClient(
    client: TrustedClient,
    key: string,
    variant: "mobile-primary" | "desktop-primary"
) {
    const itemClassName =
        "shrink-0 whitespace-nowrap font-display text-[20px] font-bold text-[#7a8399] opacity-70 will-change-transform transform-gpu";

    if (client.clone) {
        return (
            <span
                key={key}
                className={itemClassName}
                aria-hidden="true"
                tabIndex={-1}
                data-trusted-clients-item={variant}
            >
                {client.Title}
            </span>
        );
    }

    return client.Url ? (
        <Link
            key={key}
            href={client.Url}
            className={itemClassName}
            data-trusted-clients-item={variant}
            aria-label={`Visit ${client.Title}`}
        >
            {client.Title}
        </Link>
    ) : (
        <span
            key={key}
            className={itemClassName}
            data-trusted-clients-item={variant}
        >
            {client.Title}
        </span>
    );
}

export function TrustedClientsMotion({ clients }: TrustedClientsMotionProps) {
    const { scopeRef } = useTrustedClientsMotion();

    return (
        <div ref={scopeRef} className="mt-12" data-gsap-hero-trusted>
            <div className="mx-auto w-full max-w-[1200px] px-6">
                <p
                    className="mb-7 text-center font-display text-[13px] font-semibold uppercase tracking-[0.16em] text-muted"
                    data-trusted-clients-label
                >
                    Trusted by Industry Leaders
                </p>

                <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-background via-background/90 to-transparent" />
                    <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-background via-background/90 to-transparent" />

                    <div className="grid gap-4 md:hidden">
                        <div
                            className="overflow-hidden"
                            data-trusted-clients-shell="mobile-primary"
                        >
                            <div
                                className="flex w-max flex-nowrap gap-10 will-change-transform"
                                data-trusted-clients-track="mobile-primary"
                            >
                                {clients.map((client, index) =>
                                    renderClient(
                                        client,
                                        `${client.documentId}-${index}`,
                                        "mobile-primary"
                                    )
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="hidden gap-4 md:grid">
                        <div
                            className="overflow-hidden"
                            data-trusted-clients-shell="desktop-primary"
                        >
                            <div
                                className="flex w-max flex-nowrap gap-10 will-change-transform"
                                data-trusted-clients-track="desktop-primary"
                            >
                                {clients.map((client, index) =>
                                    renderClient(
                                        client,
                                        `${client.documentId}-${index}-desktop`,
                                        "desktop-primary"
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
