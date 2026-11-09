"use client";

import { LibrarySnapshot } from "@/lib/actions/library";
import { useLibraryStore } from "@/store/libraryStore";
import { useEffect } from "react";

interface Props {
    snapshot: LibrarySnapshot;
}

export function LibraryHydrator({ snapshot }: Props) {
    const hydrate = useLibraryStore((s) => s.hydrate);
    useEffect(() => {
        hydrate(snapshot);
    }, [hydrate, snapshot]);
    return null;
}
