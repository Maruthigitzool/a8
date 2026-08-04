export interface HeaderLogo {
    id: number;
    url: string;
    alternativeText: string | null;
    width: number;
    height: number;
}

export interface HeaderButton {
    id: number;
    ButtonText: string;
    ButtonUrl: string;
}

export interface HeaderNavItem {
    id: number;
    Label: string;
    URL: string;
}

export interface HeaderNavigation {
    id: number;
    NavItem: HeaderNavItem[];
}

export interface HeaderLogoSection {
    __component: "common.logo";
    Logo: HeaderLogo;
}

export interface HeaderButtonSection {
    __component: "common.button";
    ButtonText: string;
    ButtonUrl: string;
}

export interface HeaderNavigationSection {
    __component: "common.navigation";
    NavItem: HeaderNavItem[];
}

export type HeaderSection =
    | HeaderLogoSection
    | HeaderButtonSection
    | HeaderNavigationSection;

export interface HeaderResponse {
    data: {
        id: number;
        documentId: string;
        Section: HeaderSection[];
    };
}