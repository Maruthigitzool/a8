export interface RichTextNode {
    type: string;
    text?: string;
    children?: RichTextNode[];
}

export interface A8NewsApiItem {
    id: number;
    documentId: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    Title: string;
    Excerpt: RichTextNode[];
}

export interface A8NewsApiResponse {
    data: A8NewsApiItem[];
}