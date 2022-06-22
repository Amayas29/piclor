import React, { useState } from "react";
import "./ColorPalette.scss";

const ColorPalette = ({ colors, numberColors, setNumberColors }) => {
  const [selectedRect, setSelectedRect] = useState(null);

  const widthColor = colors.length === 0 ? 0 : 300 / colors.length;

  let rects = [];
  let x = 0;

  for (const color of colors) {
    rects.push(
      <rect
        key={x}
        className="rect"
        width={`${widthColor}`}
        height="300"
        x={`${x}`}
        fill={color}
        onClick={() => {
          setSelectedRect(color);
        }}
      />
    );

    x = x + widthColor;
  }

  return (
    <section className="colorpalette">
      <div className="colorpalette-range-colors">
        Number of colors : {numberColors}
        <input
          type="range"
          min={2}
          max={10}
          step={1}
          value={numberColors}
          onChange={(e) => setNumberColors(Number(e.target.value))}
        />
      </div>

      {colors.length !== 0 && (
        <svg
          className="colorpalette-preview"
          version="1.1"
          width="300"
          height="200"
          xmlns="http://www.w3.org/2000/svg"
        >
          {rects}
        </svg>
      )}

      {selectedRect && (
        <span className="color">
          <div style={{ backgroundColor: selectedRect }} />
          {selectedRect}
        </span>
      )}
    </section>
  );
};

export default ColorPalette;
