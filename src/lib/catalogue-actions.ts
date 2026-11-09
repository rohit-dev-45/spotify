"use server";

import { Track } from "@/types";
import { getAlbumDetail, getPlaylistDetail } from "./catalogues";

export async function getPlayablePlaylistTracks(
    playlistId: string,
): Promise<Track[]> {
    const playlist = await getPlaylistDetail(playlistId);
    return playlist?.tracks ?? [];
}

export async function getPlayableAlbumTracks(
    albumId: string,
): Promise<Track[]> {
    const album = await getAlbumDetail(albumId);
    return album?.tracks ?? [];
}
