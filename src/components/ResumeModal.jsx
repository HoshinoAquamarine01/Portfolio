import { useState, useEffect } from "react";
import { X, Download, Printer, Copy, ExternalLink, FileText, Check, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useSound } from "@/contexts/SoundContext";
import {
  getCvPreviewUrl,
  getCvExternalViewUrl,
  downloadResume,
  openResume,
} from "@/lib/resume";

const ResumeModal = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);
  const { playClick, playModalOpen } = useSound();

  const previewUrl = getCvPreviewUrl();
  const externalUrl = getCvExternalViewUrl();

  useEffect(() => {
    if (isOpen) {
      playModalOpen();
      setIsLoading(true);
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

  const handleDownload = async () => {
    playClick();
    if (isDownloading) return;
    setIsDownloading(true);
    const toastId = toast.loading("Downloading CV...");
    try {
      await downloadResume();
      toast.success("Download started immediately!", { id: toastId });
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Failed to download. Opening link instead...", { id: toastId });
      openResume();
    } finally {
      setIsDownloading(false);
    }
  };

  const handlePrint = () => {
    playClick();
    const printWindow = window.open(previewUrl, "_blank");
    if (printWindow) {
      printWindow.onload = () => {
        try {
          printWindow.print();
        } catch {
      
        }
      };
    }
  };

  const handleCopyLink = () => {
    playClick();
    navigator.clipboard.writeText(externalUrl);
    setCopied(true);
    toast.success("CV link copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenNewTab = () => {
    playClick();
    openResume();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/75 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-5xl h-[88vh] bg-background/95 border border-primary/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
      
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-b border-border/50 bg-secondary/30">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-primary/10 text-primary">
              <FileText size={22} />
            </div>
            <div>
              <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                Curriculum Vitae (Resume)
                <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-primary/15 text-primary">
                  Live View
                </span>
              </h3>
              <p className="text-xs text-muted-foreground">
                Verified Executive Format & Immediate Download
              </p>
            </div>
          </div>

        
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
              title="Open Fullscreen in New Tab"
            >
              <ExternalLink size={14} />
              <span className="hidden sm:inline">New Tab</span>
            </button>

            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold rounded-lg bg-primary text-primary-foreground hover:opacity-90 shadow-xs transition-all cursor-pointer disabled:opacity-60"
            >
              {isDownloading ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                <Download size={14} />
              )}
              <span>{isDownloading ? "Downloading..." : "Download CV"}</span>
            </button>

            <button
              onClick={() => {
                playClick();
                onClose();
              }}
              className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-all ml-1 cursor-pointer"
              title="Close modal"
            >
              <X size={20} />
            </button>
          </div>
        </div>

      
        <div className="flex-1 w-full bg-black/40 relative flex items-center justify-center">
          {isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-background/80 backdrop-blur-xs z-10">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
              <p className="text-xs text-muted-foreground">Loading CV preview...</p>
            </div>
          )}

          <iframe
            src={previewUrl}
            onLoad={() => setIsLoading(false)}
            className="w-full h-full border-none"
            title="Resume Viewer"
            allow="autoplay"
          />
        </div>
      </div>
    </div>
  );
};

export default ResumeModal;
