import { useState, useEffect } from "react";
import CertificateCard from "./CertificateCard";

export const certificates = [];


const RAW_SHEET_ID = import.meta.env.VITE_GOOGLE_SHEET_ID || "";
const extractSheetId = (input) => {
  if (!input) return "";
  const match = input.match(/\/d\/([a-zA-Z0-9-_]+)/);
  return match ? match[1] : input.trim();
};

const GOOGLE_SHEET_ID = extractSheetId(RAW_SHEET_ID);

function parseCSV(text) {
  const lines = text.trim().split(/\r?\n/);
  if (lines.length <= 1) return [];

  const parseRow = (line) => {
    const result = [];
    let cur = "";
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === "," && !inQuotes) {
        result.push(cur.trim().replace(/^"|"$/g, ""));
        cur = "";
      } else {
        cur += char;
      }
    }
    result.push(cur.trim().replace(/^"|"$/g, ""));
    return result;
  };

  const headers = parseRow(lines[0]).map((h) => h.toLowerCase());


  const titleIdx = headers.findIndex(
    (h) => h.includes("title") || h.includes("tên")
  );
  const issuerIdx = headers.findIndex(
    (h) => h.includes("issuer") || h.includes("nơi") || h.includes("cấp")
  );
  const dateIdx = headers.findIndex(
    (h) => h.includes("date") || h.includes("ngày") || h.includes("năm")
  );
  const urlIdx = headers.findIndex(
    (h) =>
      h.includes("url") ||
      h.includes("link") ||
      h.includes("credential") ||
      h.includes("xác thực")
  );

  return lines
    .slice(1)
    .map((line, index) => {
      const cols = parseRow(line);
      if (!cols.length || !cols[0]) return null;

      return {
        id: index + 1,
        title: cols[titleIdx >= 0 ? titleIdx : 0] || "Certificate",
        issuer: cols[issuerIdx >= 0 ? issuerIdx : 1] || "Organization",
        date: cols[dateIdx >= 0 ? dateIdx : 2] || "2026",
        credentialUrl: cols[urlIdx >= 0 ? urlIdx : 3] || "#",
      };
    })
    .filter(Boolean);
}

const CertificateSection = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(!!GOOGLE_SHEET_ID);

  useEffect(() => {
    if (!GOOGLE_SHEET_ID) return;

    const fetchCertificatesFromSheet = async () => {
      try {
        const sheetUrl = `https://docs.google.com/spreadsheets/d/${GOOGLE_SHEET_ID}/gviz/tq?tqx=out:csv`;
        const res = await fetch(sheetUrl);
        if (!res.ok) throw new Error("Failed to fetch Google Sheet");
        const csvData = await res.text();
        const parsedData = parseCSV(csvData);

        setCertificates(parsedData);
      } catch (err) {
        console.error("Lỗi khi tải chứng chỉ từ Google Sheets:", err);
        setCertificates([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCertificatesFromSheet();
  }, []);

  return (
    <section id="certificates" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          My <span className="text-primary">Certificates</span>
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Professional learning journey through verified courses and technical
          certifications.
        </p>

        {loading ? (
          <div className="text-center py-12 text-muted-foreground animate-pulse">
            Đang tải chứng chỉ từ Google Sheets...
          </div>
        ) : certificates.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            Chưa có chứng chỉ nào trên Google Sheets.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((certificate) => (
              <CertificateCard key={certificate.id} certificate={certificate} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CertificateSection;

