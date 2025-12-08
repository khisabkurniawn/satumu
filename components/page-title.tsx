"use client";

import { usePathname } from "next/navigation";

export default function PageTitle() {
  const pathname = usePathname();

  const map: Record<string, string> = {
    "/": "Dashboard",
    "/organisasi": "Organisasi",
    "/wilayah-geografis": "Wilayah Geografis",
    "/pengaturan": "Pengaturan",
    "/bantuan": "Bantuan",
    "/akun": "Akun",
  };

  if (pathname.startsWith("/organisasi/")) {
    return "Organisasi";
  }

  const title =
    map[pathname] ??
    pathname
      .split("/")
      .filter(Boolean)
      .pop()
      ?.replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase()) ??
    "";

  return title;
}
