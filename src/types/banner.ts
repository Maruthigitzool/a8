import type { RichTextNode } from "@/types/home-api";

export interface Button {
  id: number;
  ButtonText: string;
  ButtonUrl: string;
}

export interface Banner {
  id: number;
  __component: "home-components.banner";
  Title: string;
  Description: RichTextNode[];
  Button: Button;
}