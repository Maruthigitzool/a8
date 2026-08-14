"use client";

import { useEffect, useRef, useState } from "react";

type LazyYoutubeProps = {
    src: string;
    title: string;
};

export function LazyYoutube({ src, title }: LazyYoutubeProps) {
    const [isLoaded, setIsLoaded] = useState(false);
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (isLoaded) return;
        const element = ref.current;
        if (!element) return;

        const onClick = () => setIsLoaded(true);
        element.addEventListener("click", onClick, { once: true });

        return () => {
            element.removeEventListener("click", onClick);
        };
    }, [isLoaded]);

    const videoId = (() => {
        try {
            const url = new URL(src, typeof window !== "undefined" ? window.location.origin : "https://www.youtube.com");

            if (url.hostname.includes("youtu.be")) {
                return url.pathname.slice(1);
            }

            if (url.hostname.includes("youtube.com")) {
                return url.searchParams.get("v") ?? url.pathname.split("/").pop() ?? src;
            }

            return src;
        } catch {
            return src;
        }
    })();

    const thumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

    return (
        <div
            ref={ref}
            className="group relative overflow-hidden rounded-3xl bg-black/5"
            style={{ aspectRatio: "16 / 9" }}
        >
            {isLoaded ? (
                <iframe
                    className="absolute inset-0 h-full w-full"
                    src={src}
                    title={title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                />
            ) : (
                <>
                    <img
                        className="absolute inset-0 h-full w-full object-cover"
                        src={thumbnail}
                        alt={title}
                        aria-hidden="true"
                    />
                    <button
                        type="button"
                        className="absolute inset-0 flex items-center justify-center bg-black/30 text-white transition duration-200 hover:bg-black/40"
                    >
                        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10 ring-2 ring-white/60">
                            <svg viewBox="0 0 24 24" className="h-8 w-8 fill-current">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        </span>
                    </button>
                </>
            )}
        </div>
    );
}
