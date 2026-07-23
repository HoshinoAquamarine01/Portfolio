import { useState, useEffect } from "react";
import { X, Download, Printer, Copy, ExternalLink, FileText, Check } from "lucide-react";
import toast from "react-hot-toast";
import { useSound } from "@/contexts/SoundContext";

const BASE = import.meta.env.BASE_URL || "/";
const PDF_PATH = `${BASE.endsWith("/") ? BASE : BASE + "/"}cv.pdf`;

const ResumeModal = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const { playClick, playModalOpen } = useSound();

  useEffect(() => {
    if (isOpen) {
      playModalOpen();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, playModalOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleDownload = () => {
    playClick();
    const link = document.createElement("a");
    link.href = PDF_PATH;
    link.download = "Resume_Software_Engineer.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Downloading CV PDF!");
  };

  const handlePrint = () => {
    playClick();
    const printWindow = window.open(PDF_PATH, "_blank");
    if (printWindow) {
      printWindow.onload = () => {
        printWindow.print();
      };
    }
  };

  const handleCopyLink = () => {
    playClick();
    const fullUrl = window.location.origin + PDF_PATH;
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    toast.success("CV Link copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenNewTab = () => {
    playClick();
    window.open(PDF_PATH, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/75 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-5xl h-[88vh] bg-background/95 border border-primary/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-b border-border/50 bg-secondary/30">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-primary/10 text-primary">
              <FileText size={22} />
            </div>
            <div>
              <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                Curriculum Vitae (Resume)
                <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-primary/15 text-primary">
                  PDF
                </span>
              </h3>
              <p className="text-xs text-muted-foreground">
                Verified Executive Format for HR & Tech Leads
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-secondary hover:bg-secondary/80 text-foreground transition-all cursor-pointer"
              title="Copy Link"
            >
              {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
              <span className="hidden sm:inline">{copied ? "Copied" : "Copy Link"}</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-secondary hover:bg-secondary/80 text-foreground transition-all cursor-pointer"
              title="Print Resume"
            >
              <Printer size={14} />
              <span className="hidden sm:inline">Print</span>
            </button>

            <button
              onClick={handleOpenNewTab}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-secondary hover:bg-secondary/80 text-foreground transition-all cursor-pointer"
              title="Open New Tab"
            >
              <ExternalLink size={14} />
              <span className="hidden sm:inline">New Tab</span>
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold rounded-lg bg-primary text-primary-foreground hover:opacity-90 shadow-xs transition-all cursor-pointer"
            >
              <Download size={14} />
              <span>Download PDF</span>
            </button>

            <button
              onClick={() => {
                playClick();
                onClose();
              }}
              className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-all ml-1 cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* PDF Viewer Body */}
        <div className="flex-1 w-full bg-black/40 relative">
          <iframe
            src={`${PDF_PATH}#toolbar=0&navpanes=0`}
            className="w-full h-full border-none"
            title="Resume PDF Viewer"
          />
        </div>
      </div>
    </div>
  );
};

export default ResumeModal;

