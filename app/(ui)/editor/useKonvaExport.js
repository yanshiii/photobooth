export function useKonvaExport(stageRef) {
  async function exportImage() {
    return new Promise((resolve) => {
      stageRef.current.toBlob({
        mimeType: "image/png",
        quality: 1,
        callback: (blob) => {
          resolve(blob);
        },
      });
    });
  }

  return { exportImage };
}
