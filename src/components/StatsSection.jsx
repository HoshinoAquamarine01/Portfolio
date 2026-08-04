import { useEffect, useState } from "react";
import useScrollReveal from "@/hooks/useScrollReveal";
import { certificates } from "./CertificateSection";

const RAW_SHEET_ID = import.meta.env.VITE_GOOGLE_SHEET_ID || "";

const extractSheetId = (input) => {
  if (!input) return "";
  const match = input.match(/\/d\/([a-zA-Z0-9-_]+)/);
  return match ? match[1] : input.trim();
};

const GOOGLE_SHEET_ID = extractSheetId(RAW_SHEET_ID);

const StatCounter = ({ end, duration = 2000, label, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const [ref, isVisible] = useScrollReveal();

  useEffect(() => {
    if (!isVisible) return;

    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = (timestamp - startTime) / duration;

      if (progress < 1) {
        setCount(Math.floor(end * progress));
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isVisible, end, duration]);

  return (
    <div
      ref={ref}
      className="text-center py-4 transition-all duration-500"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
      }}
    >
      <div className="text-4xl md:text-5xl font-bold bg-linear-to-r from-primary via-primary/70 to-primary bg-clip-text text-transparent">
        {count}
        {suffix}
      </div>
      <p className="text-muted-foreground mt-2 text-sm md:text-base">{label}</p>
    </div>
  );
};

const StatsSection = () => {
  const [certCount, setCertCount] = useState(certificates.length);

  useEffect(() => {
    if (!GOOGLE_SHEET_ID) return;

    fetch(
      `https://docs.google.com/spreadsheets/d/${GOOGLE_SHEET_ID}/gviz/tq?tqx=out:csv`
    )
      .then((res) => res.text())
      .then((text) => {
        const lines = text
          .trim()
          .split(/\r?\n/)
          .filter((line) => line.trim().length > 0);
        if (lines.length > 1) {
          setCertCount(lines.length - 1);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section className="py-20 px-4 relative bg-linear-to-b from-background via-background/50 to-background">
      <div className="container mx-auto max-w-5xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <StatCounter end={5} label="Projects Completed" />
          <StatCounter end={certCount} label="Certificates" />
          <StatCounter end={3} label="Years Learning" />
          <StatCounter end={100} label="% Dedication" suffix="%" />
        </div>
      </div>
    </section>
  );
};

export default StatsSection;

