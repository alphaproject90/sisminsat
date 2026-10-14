// Tes contoh sementara untuk memverifikasi runner Vitest dan alias @/* (Tugas 0.2)
import { cn } from "@/lib/utils";
import { describe, expect, it } from "vitest";

describe("Sanity test", () => {
  it("memverifikasi bahwa runner test Vitest bekerja dengan benar", () => {
    expect(1 + 1).toBe(2);
  });

  it("memverifikasi resolusi alias @/* berjalan normal", () => {
    expect(cn("px-2", "py-1")).toBe("px-2 py-1");
  });
});
