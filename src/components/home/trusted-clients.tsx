import Link from "next/link";
import { getClients } from "@/app/services/client.service";

export async function TrustedClients() {
    const { data } = await getClients();

    if (!data.length) return null;

    return (
        <>
            <div className="mt-12">
                <p className="mb-7 font-display text-[13px]  text-center font-semibold uppercase tracking-[0.16em] text-muted">
                    Trusted by Industry Leaders
                </p>

                <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
                    {data.map((client) =>
                        client.Url ? (
                            <Link
                                key={client.documentId}
                                href={client.Url}
                                className="font-display text-[20px] font-bold text-[#7a8399]"
                            >
                                {client.Title}
                            </Link>
                        ) : (
                            <span
                                key={client.documentId}
                                className="font-display text-[20px] font-bold text-[#7a8399]"
                            >
                                {client.Title}
                            </span>
                        )
                    )}
                </div>
            </div>

        </>
    );
}