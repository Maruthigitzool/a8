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

export interface DsmCard {
    id: number;
    Title: string;
    Description: RichTextNode[];
    Card: DsmStatistic[];
}

export interface DsmStatistic {
    id: number;
    Title: string;
    Description: string;
}

export interface DsmSection {
    id: number;
    __component: "section-dsm.section-dsm";
    FooterText: string;
    SectionHeader: SectionHeader;
    DimondCards: DsmCard[];
}