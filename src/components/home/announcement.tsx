import Link from "next/link";

type AnnouncementProps = {
  announcement: {
    Title: string;
    Url?: string | null;
  } | null;
};

export function Announcement({ announcement }: AnnouncementProps) {
  if (!announcement) return null;

  return (
    <div
      className="relative mx-auto mb-14 flex max-w-5xl flex-col items-center justify-center gap-3 overflow-hidden rounded-card border border-brand/10 bg-mint/90 px-5 py-4 text-sm shadow-soft sm:flex-row sm:gap-4 sm:px-6 sm:py-4 sm:text-base"
      data-gsap-hero-announcement
    >
      <span
        className="pointer-events-none absolute inset-0 inline-block bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0"
        data-gsap-hero-announcement-sweep
        aria-hidden="true"
      />

      <span
        className="relative z-10 shrink-0 overflow-hidden rounded-md bg-foreground px-3 py-1.5 font-display text-xs font-bold tracking-[0.12em] text-white"
        data-gsap-hero-badge
      >
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
        <span className="relative z-10 text-sm text-foreground">
          {announcement.Title}
        </span>
      )}
    </div>
  );
}
