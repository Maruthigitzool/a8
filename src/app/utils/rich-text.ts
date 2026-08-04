export function richTextToString(content: any[] = []): string {
    return content
        .map((block) =>
            block.children?.map((child: any) => child.text).join("") ?? ""
        )
        .join("\n");
}