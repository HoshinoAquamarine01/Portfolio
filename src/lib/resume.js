const getPdfPath = () => {
  const base = import.meta.env.BASE_URL || "/";
  return `${base.endsWith("/") ? base : base + "/"}cv.pdf`;
};

/**
 * Download resume as PDF
 * Place cv.pdf in the public directory
 */
export const downloadResume = () => {
  try {
    const link = document.createElement("a");
    link.href = getPdfPath();
    link.download = "Resume_Software_Engineer.pdf";
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("Error downloading resume:", error);
    throw new Error("Failed to download resume. Please try again.");
  }
};

/**
 * Open resume in new tab
 */
export const openResume = () => {
  try {
    window.open(getPdfPath(), "_blank", "noopener,noreferrer");
  } catch (error) {
    console.error("Error opening resume:", error);
    throw new Error("Failed to open resume. Please try again.");
  }
};

