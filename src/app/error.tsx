"use client";

import { Container } from "@/components/ui/container";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  return (
    <section className="py-24">
      <Container>
        <div className="mx-auto max-w-2xl rounded-[24px] border border-line bg-white px-6 py-10 text-center shadow-[0_24px_64px_rgba(12,16,36,0.08)]">
          <p className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-accent">
            Something went wrong
          </p>
          <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground">
            We couldn&apos;t load the homepage content.
          </h1>
          <p className="mt-4 text-[15px] leading-7 text-muted">
            Please try again. If the problem keeps happening, check the Strapi connection and
            published home page entry.
          </p>
          <button
            className="mt-8 inline-flex items-center justify-center rounded-[10px] bg-brand px-5 py-[11px] text-[14px] font-semibold text-white transition duration-150 hover:-translate-y-px hover:bg-brand-deep"
            onClick={reset}
            type="button"
          >
            Try again
          </button>
          <p className="mt-4 text-xs text-muted">{error.message}</p>
        </div>
      </Container>
    </section>
  );
}

