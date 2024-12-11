import { Box, Typography } from "@mui/material";
import { useRef, useEffect, useState } from "react";
import examples from "./examples.json";

type Word = {
  text: string;
  count: number;
};

type PlacedWord = {
  word: Word;
  x: number;
  y: number;
  fontSize: number;
  width: number;
  height: number;
  color: string;
};

export const Cloud = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [positions, setPositions] = useState<PlacedWord[]>([]);
  const [containerSize, setContainerSize] = useState({ width: 400, height: 400 });
  const [baseSize, setBaseSize] = useState({ width: 400, height: 400 });

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect) {
          setContainerSize({
            width: entry.contentRect.width,
            height: entry.contentRect.height,
          });
        }
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    const maxCount = Math.max(...examples.results.map((w) => w.count));
    const { width, height } = containerSize;

    if (positions.length === 0) {
      const a = width / 2 - 20; // Horizontale Halbachse
      const b = height / 2 - 20; // Vertikale Halbachse

      const placedWords: PlacedWord[] = [];
      const colorPalette = [
        "#3f51b5",
        "#f44336",
        "#4caf50",
        "#ff9800",
        "#9c27b0",
        "#009688",
        "#795548",
        "#2196f3",
        "#e91e63",
        "#00bcd4",
      ];

      examples.results.forEach((word, index) => {
        const fontSize = getFontSize(word.count, maxCount, a, b);
        const color = getRandomColor(colorPalette);

        const { x, y, width: w, height: h } = placeWordSpiral(word, fontSize, a, b, placedWords);
        placedWords.push({ word, x, y, fontSize, width: w, height: h, color });
      });

      setPositions(placedWords);
      setBaseSize(containerSize); // Basisgröße speichern
    }
  }, [examples.results, containerSize, positions]);

  const getFontSize = (count: number, maxCount: number, a: number, b: number) => {
    const minFontSize = Math.min(a, b) * 0.05;
    const maxFontSize = Math.min(a, b) * 0.2;
    return ((count / maxCount) * (maxFontSize - minFontSize)) + minFontSize;
  };

  const getRandomColor = (palette: string[]) => {
    const index = Math.floor(Math.random() * palette.length);
    return palette[index];
  };

  const estimateTextSize = (text: string, fontSize: number) => {
    const approxCharWidth = fontSize * 0.6;
    const baseWidth = approxCharWidth * text.length;
    const baseHeight = fontSize * 1.2;
    return { width: baseWidth, height: baseHeight };
  };

  const placeWordSpiral = (
    word: Word,
    fontSize: number,
    a: number,
    b: number,
    placedWords: PlacedWord[]
  ) => {
    const { width, height } = estimateTextSize(word.text, fontSize);

    let angle = 0;
    let radiusFactor = 0.05;
    const radiusIncrement = 0.01;
    const angleIncrement = Math.PI / 36;

    for (let attempts = 0; attempts < 5000; attempts++) {
      const x = (a * radiusFactor) * Math.cos(angle);
      const y = (b * radiusFactor) * Math.sin(angle);

      let overlap = false;
      for (const placed of placedWords) {
        if (
          x + width / 2 > placed.x - placed.width / 2 &&
          x - width / 2 < placed.x + placed.width / 2 &&
          y + height / 2 > placed.y - placed.height / 2 &&
          y - height / 2 < placed.y + placed.height / 2
        ) {
          overlap = true;
          break;
        }
      }

      if (!overlap) {
        return { x, y, width, height };
      }

      angle += angleIncrement;
      radiusFactor += radiusIncrement / (2 * Math.PI);
    }

    // Fallback, falls keine Position gefunden wird
    return { x: 0, y: 0, width, height };
  };

  // Dynamisches Skalieren
  const scaleFactor = Math.min(
    containerSize.width / baseSize.width,
    containerSize.height / baseSize.height
  );

  return (
    <Box
      ref={containerRef}
      sx={{
        position: "relative",
        width: "100%",
        height: "100%",
        minWidth: "400px",
        minHeight: "400px",
        backgroundColor: "#f5f5f5",
        overflow: "hidden",
      }}
    >
      {positions.map(({ word, x, y, fontSize, color }) => (
        <Typography
          key={word.text}
          sx={{
            position: "absolute",
            left: `calc(50% + ${x * scaleFactor}px)`,
            top: `calc(50% + ${y * scaleFactor}px)`,
            transform: "translate(-50%, -50%)",
            fontSize: `${fontSize * scaleFactor}px`,
            fontWeight: "bold",
            color,
            whiteSpace: "nowrap",
          }}
        >
          {word.text}
        </Typography>
      ))}
    </Box>
  );
};
