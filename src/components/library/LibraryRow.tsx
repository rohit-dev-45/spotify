import { LibraryRow as LibraryRowtype } from "@/store/libraryStore";
import { cn } from "cn";
import Link from "next/link";
import { LibraryRowCover } from "./LibraryRowCover";
import { ui } from "@/lib/styles";

interface LibraryRowProps {
    row: LibraryRowtype;
    isActive?: boolean;
    onNavigate?: () => void;
    collapsed?: boolean;
}

export function LibraryRow({
    row,
    isActive,
    onNavigate,
    collapsed,
}: LibraryRowProps) {
    return (
        <Link
            href={row.href}
            onClick={onNavigate}
            className={cn(ui.libraryRow, isActive && "bg-white/10")}
        >
            <LibraryRowCover row={row} />
            {!collapsed && (
                <div className="min-w-0 flex-1">
                    <p
                        className={cn(
                            ui.rowTitle,
                            isActive && "text-spotify-green",
                        )}
                    >
                        {row.title}
                    </p>
                    <p className={ui.rowSubtitle}>{row.subtitle}</p>
                </div>
            )}
        </Link>
    );
}
