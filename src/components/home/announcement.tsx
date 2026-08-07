import Link from "next/link";
import { getAnnouncements } from "@/app/services/announcement.service";

export async function Announcement() {
    const { data } = await getAnnouncements();

    if (!data.length) return null;

    const announcement = data[0];

    return (
        <div
            className="relative mx-auto mb-14 flex max-w-5xl flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl border border-brand/10 bg-mint/90 px-5 py-4 text-sm shadow-[0_16px_30px_rgba(12,16,36,0.06)] sm:flex-row sm:gap-4 sm:px-6 sm:py-4 sm:text-base"
            data-gsap-hero-announcement
        >
            <span
                className="pointer-events-none absolute inset-0 inline-block bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0"
                data-gsap-hero-announcement-sweep
                aria-hidden="true"
            />

            <span className="relative z-10 shrink-0 rounded-md bg-foreground px-3 py-1.5 font-display text-xs font-bold tracking-[0.12em] text-white">
                NEW
            </span>

            {announcement.Url ? (
                <Link
                    href={announcement.Url}
                    className="relative z-10 text-sm text-foreground transition duration-200 hover:text-brand"
                    {...(announcement.Url.startsWith("http") && {
                        target: "_blank",
                        rel: "noopener noreferrer",
                    })}
                >
                    {announcement.Title}
                </Link>
            ) : (
                <span className="relative z-10 text-sm text-[#0C1024]">
                    {announcement.Title}
                </span>
            )}
        </div>
    );
}
