export interface RichTextNode {
    type: string;
    children?: RichTextNode[];
    text?: string;
}

export interface SectionHeader {
    id: number;
    SubTitle: string;
    Title: string;
    Description: RichTextNode[];
}

export interface MarketplaceProduct {
    id: number;
    documentId: string;
    Name: string;
    Slug: string;
    Url: string;
    Logo: string;
}

export interface MarketplaceSection {
    id: number;
    SectionHeader: SectionHeader;
    MarketPlaceProduct: MarketplaceProduct[];
}