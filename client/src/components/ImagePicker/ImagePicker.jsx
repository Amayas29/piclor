import React, { useState } from "react";

import "./ImagePicker.scss";

const ImagePicker = ({ setImage }) => {
  const [classOnDrag, setClassOnDrag] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const upload = (files) => {
    if (files.length !== 1) return;

    setImage(files[0]);
    setFile(files[0]);
    setPreview(URL.createObjectURL(files[0]));
  };

  return (
    <section className="imagepicker">
      <div className={`imagepicker-dropzone ${classOnDrag}`}>
        {file ? (
          <span className="selected-image">{file.name}</span>
        ) : (
          "Drag and drop image here, or click to select image"
        )}
        <input
          type="file"
          name="image"
          accept="image/png, image/jpeg"
          onChange={(e) => upload(e.target.files)}
          onDragEnter={() => setClassOnDrag("drag")}
          onDragLeave={() => setClassOnDrag("")}
        />
      </div>

      {file && (
        <img
          src={preview}
          alt="selected-image"
          className="imagepicker-image"
          onLoad={() => URL.revokeObjectURL(preview)}
        />
      )}
    </section>
  );
};

export default ImagePicker;
