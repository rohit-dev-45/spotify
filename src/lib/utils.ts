export function getGreeting(date: Date = new Date()): string {
    const hour = date.getHours();
    if (hour < 5) return "Good Evening";
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
}

export function formatDuration(seconds: number): string {
    if (!Number.isFinite(seconds) || seconds < 0) return "0:00";

    const totalSEconds = Math.floor(seconds);
    const hours = Math.floor(totalSEconds / 3600);
    const minutes = Math.floor((totalSEconds % 3600) / 60);
    const secs = totalSEconds % 60;

    if (hours > 0) {
        return `${hours}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    }

    return `${minutes}:${secs.toString().padStart(2, "0")}`;
}
