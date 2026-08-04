export interface FooterLogo {
    Logo: {
        url: string;
        width: number;
        height: number;
        alternativeText: string | null;
    };
}

export interface FooterDescription {
    FooterDescription: any[];
}

export interface FooterNavItem {
    id: number;
    Label: string;
    URL: string | null;
}

export interface FooterNavigation {
    NavItem: FooterNavItem[];
}

export interface FooterCopyright {
    CopyrightText: string;
}

export interface FooterSocialItem {
    id: number;
    Label: string;
    Url: string | null;
}

export interface FooterSocialLinks {
    SocialItem: FooterSocialItem[];
}

export interface FooterSection {
    __component: string;

    Logo?: FooterLogo["Logo"];

    FooterDescription?: any[];

    NavItem?: FooterNavItem[];

    CopyrightText?: string;

    SocialItem?: FooterSocialItem[];
}

export interface FooterResponse {
    data: {
        id: number;
        documentId: string;
        Section: FooterSection[];
    };
}