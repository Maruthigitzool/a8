import { TrustedClientsMotion } from "./trusted-clients-motion";

type ClientItem = {
  id: number;
  documentId?: string;
  Title: string;
  Url?: string | null;
};

type TrustedClientsProps = {
  clients: ClientItem[];
};

export function TrustedClients({ clients }: TrustedClientsProps) {
  if (!clients.length) {
    return null;
  }

  const marqueeClients = [
    ...clients.map((client) => ({
      documentId: client.documentId ?? String(client.id),
      Title: client.Title,
      Url: client.Url ?? null,
      clone: false as const,
    })),
    ...clients.map((client) => ({
      documentId: client.documentId ?? String(client.id),
      Title: client.Title,
      Url: client.Url ?? null,
      clone: true as const,
    })),
  ];

  return <TrustedClientsMotion clients={marqueeClients} />;
}
