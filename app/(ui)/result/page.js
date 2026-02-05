"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useBoothStore } from "@/store/boothStore";
import Button from "@/components/ui/Button";

const EXPIRY_SECONDS = 180;

export default function ResultPage() {
  const router = useRouter();
  const { finalImage } = useBoothStore();

  const [previewUrl, setPreviewUrl] = useState(null);
  const [qr, setQr] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [secondsLeft, setSecondsLeft] = useState(EXPIRY_SECONDS);
  const [remaining, setRemaining] = useState(EXPIRY_SECONDS);

  const timerRef = useRef(null);

  async function fetchQr() {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch("/api/qr", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: finalImage }),
      });

      if (!res.ok) throw new Error("QR generation failed");

      const data = await res.json();

      setPreviewUrl(data.downloadUrl);
      setQr(data.qr);

      setSecondsLeft(EXPIRY_SECONDS);
      setRemaining(EXPIRY_SECONDS);
    } catch (err) {
      console.error(err);
      setError("Could not generate QR code.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!finalImage) return;
    fetchQr();
  }, [finalImage]);

  useEffect(() => {
    if (!qr) return;

    clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(timerRef.current);
          setRemaining(0);
          return 0;
        }
        setRemaining(s - 1);
        return s - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [qr]);

  const expired = secondsLeft === 0;

  function formatTime(sec) {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  }

  function handleDownload() {
    if (!previewUrl || expired) return;
    const a = document.createElement("a");
    a.href = previewUrl;
    a.download = "photobooth-strip.png";
    a.click();
  }

  if (!finalImage) {
    return (
      <div className="min-h-screen flex items-center justify-center font-body text-white/60">
        No final image found.
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      {/* Ruby concentric background */}
      <div className="ruby-animated-bg" />
      <div className="ruby-circles" />
      <div className="film-grain" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_40%_at_50%_0%,rgba(252,217,166,0.08),rgba(0,0,0,0))]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16">
        {/* HEADER */}
        <header className="text-center mb-14">
          <h1 className="mx-auto text-center">
            Your Keepsake Awaits
          </h1>
          <p className="subtitle mx-auto text-white/70 text-[clamp(1rem,1.6vw,1.25rem)]">
            Scan the QR or download directly
          </p>
          <p className="label-text text-white/50 mt-4">
            Step 4 of 4 — Save your strip
          </p>
          <p className="font-body text-white/40 text-xs mt-2 tracking-wide">
            Save now — the QR link expires in a few minutes.
          </p>
        </header>

        {/* CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* IMAGE */}
          <div className="flex justify-center">
            {previewUrl ? (
              <div className="relative">
                <div className="pointer-events-none absolute -inset-8 rounded-full bg-[radial-gradient(60%_60%_at_50%_30%,rgba(242,217,166,0.18),rgba(122,46,53,0.2),rgba(0,0,0,0))] blur-3xl" />
                <img
                  src={previewUrl}
                  alt="Final strip"
                  className="max-h-[70vh] shadow-[0_30px_80px_rgba(0,0,0,0.7)] rounded-xl border border-white/10"
                />
              </div>
            ) : (
              <div className="w-[240px] h-[600px] bg-white/10 animate-pulse rounded-lg" />
            )}
          </div>

          {/* QR + ACTIONS */}
          <div className="space-y-8">
            {qr && (
              <div className="text-center relative">
                <div
                  className={`relative transition-all duration-500 ${
                    expired ? "opacity-40 grayscale" : ""
                  }`}
                >
                  <img
                    src={qr}
                    alt="QR Code"
                    className="w-40 h-40 rounded-2xl mx-auto bg-white p-3 shadow-[0_12px_30px_rgba(0,0,0,0.35)]"
                  />

                  {remaining <= 10 && remaining > 0 && (
                    <div className="absolute inset-0 rounded-2xl ring-2 ring-rose-500/40 animate-pulse" />
                  )}

                  {expired && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-2xl backdrop-blur-sm">
                      <span className="label-text text-white/80">EXPIRED</span>
                    </div>
                  )}
                </div>

                <p className="mt-5 font-accent text-sm text-white/70 tracking-wide">
                  {expired ? (
                    <span className="text-red-400">QR expired</span>
                  ) : (
                    <>
                      Expires in{" "}
                      <span className="font-mono font-semibold">
                        {formatTime(secondsLeft)}
                      </span>
                    </>
                  )}
                </p>
                <p className="font-body text-white/45 text-xs mt-2">
                  Tip: scan to save on your phone.
                </p>
              </div>
            )}

            {error && (
              <p className="font-body text-red-400 text-sm text-center">
                {error}
              </p>
            )}

            <div className="flex flex-col gap-3">
              <Button
                variant="primary"
                onClick={handleDownload}
                disabled={!previewUrl || expired}
              >
                Download
              </Button>

              <Button
                variant="secondary"
                onClick={fetchQr}
                disabled={loading}
              >
                Regenerate QR
              </Button>

              <Button
                variant="ghost"
                onClick={() => router.push("/editor")}
              >
                Edit again
              </Button>

              <Button
                variant="ghost"
                onClick={() => router.push("/choose-layout")}
              >
                Start over
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
