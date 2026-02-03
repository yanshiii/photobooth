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

  return { exportImage };
}