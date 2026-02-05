export function useKonvaExport(stageRef) {
  async function exportImage() {
    return new Promise((resolve) => {
      const stage = stageRef.current;
      if (!stage) return;

      // 👇 export ONLY the content layer
      const contentLayer = stage.findOne("#content-layer");
      if (!contentLayer) return;

      contentLayer.toBlob({
        mimeType: "image/png",
        pixelRatio: 2, // sharp export
        callback: (blob) => {
          resolve(blob);
        },
      });
    });
  }

  async function exportAndUpload() {
    const blob = await exportImage();
    if (!blob) return null;

    const formData = new FormData();
    formData.append("image", blob);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    return await res.json(); // { key }
  }

  return { exportImage, exportAndUpload };
}