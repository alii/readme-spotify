import { NowRequest, NowResponse } from "@now/node";
import tti from "text-to-image";
import fetch from "node-fetch";

const { LASTFM_API_KEY } = process.env;

console.log(LASTFM_API_KEY);

const generate = async (username: string, darkTheme: boolean = false) => {
  const endpoint = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${LASTFM_API_KEY}&format=json&limit=1`;
  const request = await fetch(endpoint);

  const body = (await request.json()) as APIResponse;
  const tracks = body.recenttracks.track;
  const lastTrack = tracks[0];

  return tti.generate(
    `Last listening to ${lastTrack.name} by ${lastTrack.artist["#text"]}`,
    { fontFamily: "Arial" }
  );
};

export default async (req: NowRequest, res: NowResponse): Promise<void> => {
  const body = await generate(
    req.query.username as string,
    req.query.dark === "true"
  );
  const img = Buffer.from(body.split(",")[1], "base64");

  res.writeHead(200, {
    "Content-Type": "image/png",
    "Content-Length": img.length
  });

  res.end(img);
};

export interface APIResponse {
  recenttracks: Recenttracks;
}

export interface Recenttracks {
  "@attr": Attr;
  track: Track[];
}

export interface Attr {
  page: string;
  total: string;
  user: string;
  perPage: string;
  totalPages: string;
}

export interface Track {
  artist: Artist;
  "@attr"?: Attr2;
  mbid: string;
  album: Album;
  streamable: string;
  url: string;
  name: string;
  image: Image[];
  date?: Date;
}

export interface Artist {
  mbid: string;
  "#text": string;
}

export interface Attr2 {
  nowplaying: string;
}

export interface Album {
  mbid: string;
  "#text": string;
}

export interface Image {
  size: string;
  "#text": string;
}

export interface Date {
  uts: string;
  "#text": string;
}
