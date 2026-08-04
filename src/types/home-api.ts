export interface RichTextNode {
    type: string;
    text?: string;
    children?: RichTextNode[];
}
export interface HomeButtonApi {
    id: number;
    ButtonText: string;
    ButtonUrl: string;
}


export interface SectionHeaderApi {
    id: number;
    SubTitle: string;
    Title: string;
    Description: RichTextNode[];
}

export interface HomeSectionApi {
    id: number;
    __component: string;

    SectionHeader?: SectionHeaderApi;

    Title?: string;
    Description?: string;
    Button?: HomeButtonApi;
}

export interface HomeApiData {
    id: number;
    documentId: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    Section: HomeSectionApi[];
}

export interface HomeApiResponse {
    data: HomeApiData;
    meta: object;
}
