import { Container } from "@/components/ui/container";

export default function Loading() {
  return (
    <section className="py-24">
      <Container>
        <div className="mx-auto flex max-w-4xl animate-pulse flex-col items-center gap-5 text-center">
          <div className="h-6 w-28 rounded-full bg-surface" />
          <div className="h-14 w-full rounded-[24px] bg-surface" />
          <div className="h-10 w-4/5 rounded-[20px] bg-surface" />
          <div className="h-8 w-2/3 rounded-[18px] bg-surface" />
          <div className="h-12 w-40 rounded-[12px] bg-surface" />
        </div>
      </Container>
    </section>
  );
}

