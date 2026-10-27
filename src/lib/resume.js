const getPdfPath = () => {
  const base = import.meta.env.BASE_URL || "/";
  return `${base.endsWith("/") ? base : base + "/"}cv.pdf`;
};


export const getGoogleDriveFileId = (url) => {
  if (!url || typeof url !== "string") return null;
  const fileMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (fileMatch) return fileMatch[1];
  const idMatch = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (idMatch) return idMatch[1];
  return null;
};


export const getCvRawUrl = () => {
  const envUrl = import.meta.env.VITE_CV_URL;
  return envUrl && envUrl.trim() !== "" ? envUrl.trim() : getPdfPath();
};


export const getCvPreviewUrl = () => {
  const rawUrl = getCvRawUrl();
  const driveId = getGoogleDriveFileId(rawUrl);
  if (driveId) {
    return `https://drive.google.com/file/d/${driveId}/preview`;
  }
  return rawUrl.endsWith(".pdf") ? `${rawUrl}#toolbar=0&navpanes=0` : rawUrl;
};


export const getCvDownloadUrl = () => {
  const rawUrl = getCvRawUrl();
  const driveId = getGoogleDriveFileId(rawUrl);
  if (driveId) {
    return `https://drive.usercontent.google.com/download?id=${driveId}&export=download`;
  }
  return rawUrl;
};

export const getCvExternalViewUrl = () => {
  return getCvRawUrl();
};


export const downloadResume = async () => {
  const downloadUrl = getCvDownloadUrl();
  const fileName = "Pham_Gia_Bao_CV.pdf";

  try {
    const response = await fetch(downloadUrl, { method: "GET" });
    if (response.ok) {
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
      return;
    }
  } catch (error) {
    console.warn("Direct blob download failed, using fallback trigger:", error);
  }

  try {
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = fileName;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (err) {

    const localFallback = getPdfPath();
    const link = document.createElement("a");
    link.href = localFallback;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

export const openResume = () => {
  try {
    const rawUrl = getCvExternalViewUrl();
    window.open(rawUrl, "_blank", "noopener,noreferrer");
  } catch (error) {
    console.error("Error opening resume:", error);
    window.open(getPdfPath(), "_blank", "noopener,noreferrer");
  }
};
