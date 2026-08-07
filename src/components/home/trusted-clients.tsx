import { getClients } from "@/app/services/client.service";
import type { HomeTrustedCompaniesData } from "@/types/home";
import { TrustedClientsMotion } from "./trusted-clients-motion";

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

    return <TrustedClientsMotion clients={clients} />;
}
