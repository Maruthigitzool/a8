import Link from "next/link";
import { getClients } from "@/app/services/client.service";
import type { HomeTrustedCompaniesData } from "@/types/home";
import { SectionAnimator } from "./section-animator";

type TrustedClientsProps = {
    data?: HomeTrustedCompaniesData;
};

export async function TrustedClients(props: TrustedClientsProps) {
    void props;
    const { data } = await getClients();

    if (!data.length) return null;

    const clients = [
        ...data.map((client) => ({ ...client, clone: false as const })),
        ...data.map((client) => ({ ...client, clone: true as const })),
    ];

    function renderClient(client: (typeof clients)[number], key: string) {
        const sharedClassName =
            "shrink-0 whitespace-nowrap font-display text-[20px] font-bold text-[#7a8399] opacity-70";

        const itemProps = client.clone
            ? {
                  "aria-hidden": true,
                  tabIndex: -1,
              }
            : undefined;

        return client.Url ? (
            <Link
                key={key}
                href={client.Url}
                className={sharedClassName}
                data-gsap-item
                {...itemProps}
            >
                {client.Title}
            </Link>
        ) : (
            <span
                key={key}
                className={sharedClassName}
                data-gsap-item
                {...itemProps}
            >
                {client.Title}
            </span>
        );
    }

    return (
        <SectionAnimator animation="list" className="mt-12">
            <p
                className="mb-7 text-center font-display text-[13px] font-semibold uppercase tracking-[0.16em] text-muted"
                data-gsap-label
            >
                Trusted by Industry Leaders
            </p>

            {/* Desktop */}
            <div className="group relative hidden overflow-hidden md:block">
                <div className="flex w-max flex-nowrap gap-10 will-change-transform animate-marquee motion-reduce:animate-none group-hover:[animation-play-state:paused] md:[animation-duration:28s]">
                    {clients.map((client, index) =>
                        renderClient(client, `${client.documentId}-${index}`)
                    )}
                </div>
            </div>

            {/* Mobile */}
            <div className="group relative overflow-hidden md:hidden">
                <div className="flex w-max flex-nowrap gap-10 will-change-transform animate-marquee motion-reduce:animate-none group-hover:[animation-play-state:paused]">
                    {clients.map((client, index) =>
                        renderClient(client, `${client.documentId}-${index}`)
                    )}
                </div>
            </div>
        </SectionAnimator>
    );
}
