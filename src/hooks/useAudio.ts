"use client";

import { usePlayerStore } from "@/store/playerStore";
import { useEffect, useRef, type RefObject } from "react";

export function useAudioEngine(audioRef: RefObject<HTMLAudioElement | null>) {
    const lastSrcRef = useRef<string | null>(null);
    const lastSeekTokenRef = useRef(0);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const { setProgress, setDuration, setBuffering, next, pause } =
            usePlayerStore.getState().actions;

        const onTimeUpdate = () => {
            const d = audio.duration;
            if (!Number.isFinite(d) || d <= 0) return;
            setProgress((audio.currentTime / d) * 100);
        };

        const onLoadedMetadata = () => {
            if (Number.isFinite(audio.duration) && audio.duration > 0) {
                setDuration(audio.duration);
            }
        };

        const onWaiting = () => setBuffering(true);
        const onPlaying = () => setBuffering(false);
        const onCanPlay = () => setBuffering(false);

        const onEnded = () => {
            setProgress(0);
            next();
        };

        const onError = () => {
            setBuffering(false);
            pause();
        };

        audio.addEventListener("timeupdate", onTimeUpdate);
        audio.addEventListener("loadedmetadata", onLoadedMetadata);
        audio.addEventListener("waiting", onWaiting);
        audio.addEventListener("playing", onPlaying);
        audio.addEventListener("canplay", onCanPlay);
        audio.addEventListener("ended", onEnded);
        audio.addEventListener("error", onError);

        audio.volume = usePlayerStore.getState().volume;

        return () => {
            audio.removeEventListener("timeupdate", onTimeUpdate);
            audio.removeEventListener("loadedmetadata", onLoadedMetadata);
            audio.removeEventListener("waiting", onWaiting);
            audio.removeEventListener("playing", onPlaying);
            audio.removeEventListener("canplay", onCanPlay);
            audio.removeEventListener("ended", onEnded);
            audio.removeEventListener("error", onError);
        };
    }, [audioRef]);

    // Subscribe imperatively to the store to avoid re-renders for every timeupdate.
    useEffect(() => {
        const unsubscribe = usePlayerStore.subscribe((state, prev) => {
            const audio = audioRef.current;
            if (!audio) return;

            const nextSrc = state.currentTrack?.audioUrl ?? "";
            if (nextSrc !== lastSrcRef.current) {
                lastSrcRef.current = nextSrc;
                if (nextSrc) {
                    audio.src = nextSrc;
                    audio.currentTime = 0;
                    audio.load();
                    if (state.isPlaying) {
                        void audio.play().catch(() => {
                            console.log("Rejected");
                        });
                    }
                } else {
                    audio.removeAttribute("src");
                    audio.load();
                }
                return;
            }

            if (state.isPlaying !== prev.isPlaying) {
                if (state.isPlaying) {
                    void audio.play().catch(() => {
                        console.log("Rejected");
                    });
                } else {
                    audio.pause();
                }
            }

            if (state.volume !== prev.volume) {
                audio.volume = state.volume;
            }

            if (state.seekToken !== lastSeekTokenRef.current) {
                lastSeekTokenRef.current = state.seekToken;
                const d = audio.duration;
                if (Number.isFinite(d) && d > 0) {
                    audio.currentTime = (state.progress / 100) * d;
                }
            }
        });

        const s = usePlayerStore.getState();
        lastSeekTokenRef.current = s.seekToken;

        return unsubscribe;
    }, [audioRef]);
}
