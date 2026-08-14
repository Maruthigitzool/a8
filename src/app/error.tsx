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
        <div className="mx-auto max-w-2xl rounded-panel border border-line bg-background px-6 py-10 text-center shadow-overlay">
          <p className="type-eyebrow">
            Something went wrong
          </p>
          <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground">
            We couldn&apos;t load the homepage content.
          </h1>
          <p className="type-body mt-4">
            Please try again. If the problem keeps happening, check the Strapi connection and
            published home page entry.
          </p>
          <button
            className="btn btn-solid mt-8"
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

