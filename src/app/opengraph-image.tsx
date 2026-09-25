import { ImageResponse } from "next/og";
import { site } from "@/config/site";

export const alt = `${site.name}, a community pharmacy in Pitt Meadows, BC`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Shared social preview image. Replace with a real photo once the pharmacy supplies one. */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#F3F7EE",
          borderLeft: "24px solid #6B9E32",
        }}
      >
        <div style={{ fontSize: 72, fontWeight: 800, color: "#E66A00", letterSpacing: 4 }}>PITTRIDGE</div>
        <div style={{ fontSize: 96, fontWeight: 800, color: "#4A7A1F", letterSpacing: 2 }}>PHARMACY</div>
        <div style={{ marginTop: 40, fontSize: 40, color: "#062640" }}>{site.tagline}</div>
        <div style={{ display: "flex", marginTop: 16, fontSize: 30, color: "#4A5B6B" }}>
          {site.address.city}, {site.address.regionName} · Open 7 days a week · {site.phone.display}
        </div>
      </div>
    ),
    size,
  );
}
