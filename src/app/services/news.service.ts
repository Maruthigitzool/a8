import type { A8NewsApiResponse } from "@/types/news";
import { apiClient } from "../lib/api/http-client";

const NEWS_ENDPOINT = "/a8-news";

function richTextToString(excerpt: A8NewsApiResponse["data"][number]["Excerpt"]) {
    return excerpt
        .flatMap((block) => block.children ?? [])
        .map((child) => child.text)
        .join(" ");
}

export async function getNews() {
    const response = await apiClient.get<A8NewsApiResponse>(NEWS_ENDPOINT);

    return response.data.map((item) => ({
        documentId: item.documentId,
        title: item.Title,
        url: item.Url,
        excerpt: richTextToString(item.Excerpt),
    }));
}