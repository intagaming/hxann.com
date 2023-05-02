import React from "https://esm.sh/react@18.2.0";
import { ImageResponse } from "https://deno.land/x/og_edge@0.0.2/mod.ts";

const firamonoRegular = await fetch(
  "https://github.com/google/fonts/raw/main/ofl/firamono/FiraMono-Regular.ttf"
).then((res) => res.arrayBuffer());
const firamonoMedium = await fetch(
  "https://github.com/google/fonts/raw/main/ofl/firamono/FiraMono-Medium.ttf"
).then((res) => res.arrayBuffer());
const firamonoBold = await fetch(
  "https://github.com/google/fonts/raw/main/ofl/firamono/FiraMono-Bold.ttf"
).then((res) => res.arrayBuffer());

export default function handler(req: Request) {
  // Get the query parameters from the request
  const url = new URL(req.url);
  const params = new URLSearchParams(url.search);
  const title = params.get("title") ?? "Read more on hxann.com";

  // Generate the open graph image
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#171717",
          fontSize: 32,
          padding: "72px 64px",
          fontFamily: "Fira Mono",
          color: "#f5f5f5",
          border: "7px solid #a78bfa",
        }}
      >
        <div
          style={{
            color: "#a78bfa",
            fontSize: 76,
            fontWeight: "bold",
          }}
        >
          {title}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <img
            src="https://github.com/intagaming.png"
            width={120}
            height={120}
            style={{
              borderRadius: "50%",
              marginRight: 20,
              border: "3px solid #a78bfa",
            }}
          />

          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                color: "#a78bfa",
                fontSize: 50,
                fontWeight: "bold",
              }}
            >
              An Hoang
            </div>
            <div>https://hxann.com</div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Fira Mono",
          data: firamonoRegular,
          weight: 400,
          style: "normal",
        },
        {
          name: "Fira Mono",
          data: firamonoMedium,
          weight: 500,
          style: "normal",
        },
        {
          name: "Fira Mono",
          data: firamonoBold,
          weight: 700,
          style: "normal",
        },
      ],
    }
  );
}
