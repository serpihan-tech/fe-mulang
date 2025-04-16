import { createImage } from "./utils"; // Fungsi tambahan untuk membuat gambar dari base64


const getCroppedImg = async (imageSrc, pixelCrop, originalName = "cropped_image.jpg", originalType = "image/jpeg") => {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      if (!blob) return;
      const file = new File([blob], originalName, { type: originalType });
      resolve({ blob, file, base64: URL.createObjectURL(blob) });
    }, "image/jpeg");
  });
};

export default getCroppedImg;