import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";

const ImageCropper = ({ image, onCropComplete, onCancel }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const handleCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleConfirm = () => {
    onCropComplete(image, croppedAreaPixels);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4">Crop Your Image</h2>
        
        <div className="relative w-full h-64">
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={1} // Square crop
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={handleCropComplete}
          />
        </div>

        <div className="flex justify-between mt-4">
          <button onClick={onCancel} className="bg-gray-300 px-4 py-2 rounded-md">Cancel</button>
          <button onClick={handleConfirm} className="bg-blue-500 text-white px-4 py-2 rounded-md">Save</button>
        </div>
      </div>
    </div>
  );
};

export default ImageCropper;
