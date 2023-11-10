import * as React from "react";
import {
  Path,
  Skia,
  type PathProps,
  type SkiaDefaultProps,
} from "@shopify/react-native-skia";

import { AnimatedPath } from "./AnimatedPath";
import type { PathAnimationConfig } from "../../hooks/useAnimatedPath";

type CandlestickData = {
  high: number;
  low: number;
  open: number;
  close: number;
};

type CandlestickProps = {
  points: any;
  animate?: PathAnimationConfig;
  candleWidth?: number;
  canvasSize: { width: number };
} & SkiaDefaultProps<
  Pick<
    PathProps,
    | "color"
    | "blendMode"
    | "opacity"
    | "antiAlias"
    | "start"
    | "end"
    | "strokeWidth"
    | "stroke"
    | "strokeJoin"
    | "strokeCap"
  >,
  "start" | "end"
>;

export function Candlestick({
  points,
  animate,
  candleWidth,
  canvasSize,
}: React.PropsWithChildren<CandlestickProps>) {
  const calculateCandleWidth = React.useCallback(() => {
    const { width } = canvasSize;

    return width / (points.close.length * 2 - 1);
  }, [canvasSize, points]);

  const wickPath = React.useMemo(() => {
    const p = Skia.Path.Make();

    points.close.forEach((closePoint, index) => {
      const x = closePoint.x;
      const highY = points.high[index].y;
      const lowY = points.low[index].y;

      // Draw the wick
      p.moveTo(x, highY);
      p.lineTo(x, lowY);
    });

    return p;
  }, [points]);

  const bodyElements = points.close.map((closePoint, index) => {
    const x = closePoint.x;
    const openY = points.open[index].y;
    const closeY = closePoint.y;
    const candleWidth = calculateCandleWidth();
    const bodyTop = Math.min(openY, closeY);
    const bodyBottom = Math.max(openY, closeY);
    const bodyHeight = bodyBottom - bodyTop;
    const bodyPath = Skia.Path.Make();
    const rect = Skia.XYWHRect(
      x - candleWidth / 2,
      bodyTop,
      candleWidth,
      bodyHeight > 0 ? bodyHeight : 1,
    );

    bodyPath.addRect(rect);

    const isBullish = closeY <= openY;

    return React.createElement(animate ? AnimatedPath : Path, {
      key: index,
      path: bodyPath,
      style: "fill",
      color: isBullish ? "#20A144" : "#FA0000",
      ...(Boolean(animate) && { animate }),
    });
  });

  // Render the wick with a stroke
  const wickElement = React.createElement(animate ? AnimatedPath : Path, {
    path: wickPath,
    style: "stroke",
    strokeWidth: 0.5,
    color: "grey",
    ...(Boolean(animate) && { animate }),
  });

  return (
    <>
      {wickElement}
      {bodyElements}
    </>
  );
}
