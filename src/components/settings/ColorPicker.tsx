import React, { useState, useEffect } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

// Utility functions to convert colors
function hexToRgb(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return [r, g, b];
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h: number = 0;
  let s: number = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h *= 60;
  }

  return [h, s * 100, l * 100]; // Return HSL values
}

function hslToCssHsl(h: number, s: number, l: number): string {
  return `hsl(${h.toFixed(2)}, ${s.toFixed(2)}%, ${l.toFixed(2)}%)`;
}

// Define the color object type
type Colors = {
  [key: string]: string;
};

// Load colors before component renders
const loadColorsFromLocalStorage = (): Colors => {
  if (typeof window !== "undefined") {
    const savedColors = localStorage.getItem("colors");
    return savedColors ? JSON.parse(savedColors) : { primary: "#4784CD" };
  }
  return { primary: "#4784CD" };
};

// Apply color immediately on page load (before React renders)
const applyStoredColors = () => {
  const savedColors = loadColorsFromLocalStorage();
  Object.keys(savedColors).forEach((property) => {
    const [r, g, b] = hexToRgb(savedColors[property]);
    const [h, s, l] = rgbToHsl(r, g, b);
    document.documentElement.style.setProperty(
      `--${property}`,
      hslToCssHsl(h, s, l)
    );
  });
};

// Run immediately on script load
applyStoredColors();

const ColorPicker: React.FC = () => {
  const [colors, setColors] = useState<Colors>(loadColorsFromLocalStorage());

  // Update color in CSS variable dynamically
  const updateColor = (property: string, color: string): void => {
    const [r, g, b] = hexToRgb(color);
    const [h, s, l] = rgbToHsl(r, g, b);
    document.documentElement.style.setProperty(
      `--${property}`,
      hslToCssHsl(h, s, l)
    );
  };

  // Handle color input changes
  const handleColorChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    property: string
  ): void => {
    const newColor = e.target.value;
    const updatedColors = { ...colors, [property]: newColor };

    setColors(updatedColors);
    localStorage.setItem("colors", JSON.stringify(updatedColors));

    updateColor(property, newColor);
  };

  // Apply colors on first mount (for safety)
  useEffect(() => {
    Object.keys(colors).forEach((property) => {
      updateColor(property, colors[property]);
    });
  }, []);

  return (
    <div className="grid gap-2">
      {Object.keys(colors).map((property) => (
        <div key={property} className="grid gap-2 border-b pb-2">
          <Label>
            {property.charAt(0).toUpperCase() + property.slice(1)} Color:
          </Label>
          <Input
            type="color"
            value={colors[property]}
            onChange={(e) => handleColorChange(e, property)}
          />
        </div>
      ))}
    </div>
  );
};

export default ColorPicker;
