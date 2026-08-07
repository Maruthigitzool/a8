export interface RichTextNode {
    type: string;
    children?: RichTextNode[];
    text?: string;
}

export interface TextCard {
    id: number;
    Title: string;
    Description: RichTextNode[];
}

export interface DimondCard {
    id: number;
    Title: string;
    Description: RichTextNode[];
    ButtonUrl: string | null;
    TextCard: TextCard[];
}

export interface DimondCards {
    id: number;
    DimondCard: DimondCard[];
}

export interface SectionHeader {
    id: number;
    SubTitle: string;
    Title: string;
    Description: RichTextNode[];
}

export interface DsmSection {
    id: number;
    __component: "section-dsm.section-dsm";
    FooterText: string;
    SectionHeader: SectionHeader;
    DimondCards: DimondCards;
}