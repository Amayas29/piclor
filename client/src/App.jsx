import React, { useState } from "react";

import { ColorPalette, ImagePicker } from "./components";

import axios from "axios";

import "./App.scss";

const App = () => {
  const [image, setImage] = useState(null);
  const [numberColors, setNumberColors] = useState(2);
  const [colors, setColors] = useState([]);

  const [loading, setLoading] = useState(false);

  return (
    <>
      {loading && (
        <div className="loading">
          Loading...
          <div class="loading-ellipsis">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      )}
      <div className="app">
        <ImagePicker
          setImage={(img) => {
            setColors([]);
            setNumberColors(2);
            setImage(img);
          }}
        />

        <aside>
          <ColorPalette
            colors={colors}
            numberColors={numberColors}
            setNumberColors={setNumberColors}
          />

          <button
            onClick={() => {
              if (!image) return;

              const imageBlob = new Blob([image], { type: image.type });
              let data = new FormData();
              data.append("image", imageBlob);
              data.append("nb_colors", numberColors);

              setLoading(true);

              return axios
                .post("http://localhost:5000/generateColors", data, {
                  headers: {
                    "Content-Type": "multipart/form-data",
                  },
                })
                .then((response) => {
                  setColors(response.data.colors);
                  setLoading(false);
                });
            }}
          >
            Generate
          </button>
        </aside>
      </div>
    </>
  );
};

export default App;
