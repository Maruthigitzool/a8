export interface ClientApi {
    id: number;
    documentId: string;
    Title: string;
    Url: string | null;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
}

export interface ClientApiResponse {
    data: ClientApi[];
    meta: {
        pagination: {
            page: number;
            pageSize: number;
            pageCount: number;
            total: number;
        };
    };
}