export interface AnnouncementApi {
    id: number;
    documentId: string;
    Title: string;
    Url: string | null;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
}

export interface AnnouncementApiResponse {
    data: AnnouncementApi[];
    meta: {
        pagination: {
            page: number;
            pageSize: number;
            pageCount: number;
            total: number;
        };
    };
}