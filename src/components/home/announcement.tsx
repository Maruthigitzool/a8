import Link from "next/link";
import { getAnnouncements } from "@/app/services/announcement.service";

export async function Announcement() {
    const { data } = await getAnnouncements();

    if (!data.length) return null;

    const announcement = data[0];

    return (
        <>

            <div className="mx-auto mb-14 flex max-w-5xl flex-col items-center justify-center gap-3 rounded-2xl border border-brand/10 bg-mint/90 px-5 py-4 text-sm shadow-[0_16px_30px_rgba(12,16,36,0.06)] sm:flex-row sm:gap-4 sm:px-6 sm:py-4 sm:text-base" data-gsap-item>
                <span className="shrink-0 rounded-md bg-foreground px-3 py-1.5 font-display text-xs font-bold tracking-[0.12em] text-white">
                    NEW
                </span>
                {announcement.Url ? (
                    <Link
                        href={announcement.Url}
                        className="text-sm text-foreground hover:text-brand"
                    >
                        {announcement.Title}
                    </Link>
                ) : (
                    <span className="text-[16] text-[#0C1024]">
                        {announcement.Title}
                    </span>
                )}
            </div>
        </>
    );
}
