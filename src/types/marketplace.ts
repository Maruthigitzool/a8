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
    Title: string;
}

export interface MarketPlaceProduct {
    Product: MarketplaceProduct[];
}

export interface MarketplaceSection {
    id: number;
    __component?: "section-marketplace.section-marketplace";
    SectionHeader: SectionHeader;
    MarketPlaceProduct: MarketPlaceProduct;
}