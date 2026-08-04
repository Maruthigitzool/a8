import type { RichTextNode, SectionHeaderApi } from "@/types/home-api";
export interface FeatureCard {
    id: number;
    Title: string;
    Description: RichTextNode[];
}

export interface FeatureCardGroup {
    id: number;
    Card: FeatureCard[];
}

export interface FeatureHighlightsSection {
    id: number;
    __component: "section-feature-highlights.section-feature-highlights";
    SectionHeader: SectionHeaderApi;
    IconCard: FeatureCardGroup[];
}