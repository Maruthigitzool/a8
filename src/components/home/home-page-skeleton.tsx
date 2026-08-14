import { Container } from "@/components/ui/container";

function Block({ className }: { className: string }) {
  return (
    <div
      className={`animate-pulse rounded-2xl bg-surface ${className}`}
      aria-hidden="true"
    />
  );
}

export function HomePageSkeleton() {
  return (
    <div aria-busy="true" aria-label="Loading page content">
      <section className="pb-6 pt-16 sm:pt-20">
        <Container className="space-y-6 text-center">
          <Block className="mx-auto h-14 max-w-3xl" />
          <Block className="mx-auto h-24 max-w-4xl" />
          <Block className="mx-auto h-12 w-44" />
          <Block className="mx-auto mt-16 h-10 max-w-xl" />
        </Container>
      </section>

      <section className="py-24">
        <Container className="space-y-8">
          <Block className="mx-auto h-20 max-w-2xl" />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            <Block className="h-48" />
            <Block className="h-48" />
            <Block className="h-48" />
            <Block className="h-48" />
          </div>
        </Container>
      </section>
    </div>
  );
}
