import {
  Circle,
  DashPathEffect,
  Line,
  useFont,
  vec,
} from "@shopify/react-native-skia";
import { useDerivedValue } from "react-native-reanimated";

import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import {
  CartesianChart,
  Candlestick,
  useChartPressState,
} from "victory-native";
import { format } from "date-fns";
import inter from "../assets/inter-medium.ttf";

import { appColors } from "./consts/colors";

// Mock data for the candlestick chart
const mockCandlestickData = [
  {
    time: 1632614400000,
    close: 14.3,
    open: 14.78,
    high: 14.78,
    low: 14.2,
    volume: 621588,
  },
  {
    time: 1632700800000,
    close: 14.01,
    open: 14.2,
    high: 14.38,
    low: 14,
    volume: 559843,
  },
  {
    time: 1632787200000,
    close: 14.22,
    open: 13.91,
    high: 14.39,
    low: 13.91,
    volume: 401391,
  },
  {
    time: 1632873600000,
    close: 14.07,
    open: 14.18,
    high: 14.35,
    low: 14.01,
    volume: 92561,
  },
  {
    time: 1632960000000,
    close: 14.14,
    open: 14.07,
    high: 14.27,
    low: 13.81,
    volume: 926324,
  },
  {
    time: 1633219200000,
    close: 13.71,
    open: 14,
    high: 14.2,
    low: 13.6,
    volume: 1069842,
  },
  {
    time: 1633305600000,
    close: 13.95,
    open: 14.15,
    high: 14.15,
    low: 13.7,
    volume: 240541,
  },
  {
    time: 1633392000000,
    close: 13.7,
    open: 13.98,
    high: 13.98,
    low: 13.55,
    volume: 258940,
  },
  {
    time: 1633478400000,
    close: 13.25,
    open: 13.71,
    high: 13.71,
    low: 13.1,
    volume: 1117283,
  },
  {
    time: 1633824000000,
    close: 13.15,
    open: 13.38,
    high: 13.5,
    low: 13.11,
    volume: 196006,
  },
  {
    time: 1633910400000,
    close: 13.39,
    open: 13.54,
    high: 13.54,
    low: 13,
    volume: 474272,
  },
  {
    time: 1633996800000,
    close: 13.45,
    open: 13.16,
    high: 13.5,
    low: 13.16,
    volume: 264771,
  },
  {
    time: 1634083200000,
    close: 13.49,
    open: 13.6,
    high: 13.66,
    low: 13.3,
    volume: 345377,
  },
  {
    time: 1634169600000,
    close: 13.73,
    open: 13.49,
    high: 13.75,
    low: 13.49,
    volume: 151835,
  },
  {
    time: 1634428800000,
    close: 13.36,
    open: 13.68,
    high: 13.75,
    low: 13.36,
    volume: 904430,
  },
  {
    time: 1634515200000,
    close: 13.6,
    open: 13.75,
    high: 13.8,
    low: 13.44,
    volume: 716943,
  },
  {
    time: 1634601600000,
    close: 13.7,
    open: 13.78,
    high: 13.78,
    low: 13.55,
    volume: 258859,
  },
  {
    time: 1634688000000,
    close: 13.8,
    open: 13.73,
    high: 13.8,
    low: 13.4,
    volume: 206226,
  },
  {
    time: 1635033600000,
    close: 13.81,
    open: 13.8,
    high: 13.95,
    low: 13.75,
    volume: 477246,
  },
  {
    time: 1635120000000,
    close: 13.7,
    open: 13.8,
    high: 14.25,
    low: 13.6,
    volume: 918816,
  },
  {
    time: 1635206400000,
    close: 13.84,
    open: 13.71,
    high: 14.08,
    low: 13.71,
    volume: 1026266,
  },
  {
    time: 1635292800000,
    close: 13.6,
    open: 13.96,
    high: 13.96,
    low: 13.55,
    volume: 579343,
  },
  {
    time: 1635379200000,
    close: 13.57,
    open: 13.52,
    high: 13.9,
    low: 13.52,
    volume: 1170821,
  },
  {
    time: 1635638400000,
    close: 13.4,
    open: 13.75,
    high: 13.75,
    low: 13.26,
    volume: 348830,
  },
  {
    time: 1635724800000,
    close: 13.69,
    open: 13.7,
    high: 13.7,
    low: 13.4,
    volume: 844246,
  },
  {
    time: 1635811200000,
    close: 13.94,
    open: 13.73,
    high: 13.94,
    low: 13.67,
    volume: 1292324,
  },
  {
    time: 1635897600000,
    close: 13.9,
    open: 13.95,
    high: 14.2,
    low: 13.76,
    volume: 1567684,
  },
  {
    time: 1635984000000,
    close: 13.84,
    open: 13.9,
    high: 13.97,
    low: 13.6,
    volume: 341840,
  },
  {
    time: 1636243200000,
    close: 13.84,
    open: 13.95,
    high: 13.95,
    low: 13.67,
    volume: 313172,
  },
  {
    time: 1636329600000,
    close: 13.86,
    open: 13.84,
    high: 13.94,
    low: 13.7,
    volume: 2293325,
  },
  {
    time: 1636416000000,
    close: 13.75,
    open: 13.7,
    high: 13.95,
    low: 13.7,
    volume: 429322,
  },
  {
    time: 1636502400000,
    close: 13.83,
    open: 14.23,
    high: 14.5,
    low: 13.67,
    volume: 2994941,
  },
  {
    time: 1636588800000,
    close: 14.34,
    open: 14,
    high: 14.46,
    low: 13.99,
    volume: 3474312,
  },
  {
    time: 1636848000000,
    close: 14.6,
    open: 14.42,
    high: 14.73,
    low: 14.25,
    volume: 1629943,
  },
  {
    time: 1636934400000,
    close: 14.29,
    open: 14.6,
    high: 14.7,
    low: 14.14,
    volume: 2052012,
  },
  {
    time: 1637020800000,
    close: 14.21,
    open: 14.29,
    high: 14.38,
    low: 14,
    volume: 711060,
  },
  {
    time: 1637107200000,
    close: 14.45,
    open: 14.16,
    high: 14.45,
    low: 14.1,
    volume: 657223,
  },
  {
    time: 1637193600000,
    close: 14.5,
    open: 14.45,
    high: 14.7,
    low: 14.3,
    volume: 931043,
  },
  {
    time: 1637452800000,
    close: 14.35,
    open: 14.4,
    high: 14.59,
    low: 14.3,
    volume: 322746,
  },
  {
    time: 1637539200000,
    close: 14.34,
    open: 14.4,
    high: 14.45,
    low: 14.3,
    volume: 579530,
  },
  {
    time: 1637625600000,
    close: 14.57,
    open: 14.45,
    high: 14.57,
    low: 14.3,
    volume: 568478,
  },
  {
    time: 1637712000000,
    close: 14.5,
    open: 14.37,
    high: 14.62,
    low: 14.3,
    volume: 260955,
  },
  {
    time: 1637798400000,
    close: 14.6,
    open: 14.52,
    high: 14.8,
    low: 14.52,
    volume: 1459499,
  },
  {
    time: 1638057600000,
    close: 14.38,
    open: 14.5,
    high: 14.5,
    low: 14,
    volume: 413884,
  },
  {
    time: 1638144000000,
    close: 14.56,
    open: 14.49,
    high: 14.6,
    low: 14.32,
    volume: 562404,
  },
  {
    time: 1638230400000,
    close: 14.36,
    open: 14.5,
    high: 14.8,
    low: 14.3,
    volume: 5387070,
  },
  {
    time: 1638316800000,
    close: 14.79,
    open: 14.15,
    high: 14.85,
    low: 14.15,
    volume: 1645081,
  },
  {
    time: 1638403200000,
    close: 14.85,
    open: 14.55,
    high: 15.01,
    low: 14.55,
    volume: 3644971,
  },
  {
    time: 1638662400000,
    close: 14.88,
    open: 14.75,
    high: 14.99,
    low: 14.75,
    volume: 693718,
  },
  {
    time: 1638748800000,
    close: 15.1,
    open: 14.88,
    high: 15.1,
    low: 14.88,
    volume: 3808534,
  },
  {
    time: 1638835200000,
    close: 15.22,
    open: 15.1,
    high: 15.4,
    low: 15,
    volume: 4199181,
  },
  {
    time: 1638921600000,
    close: 15.57,
    open: 15.04,
    high: 15.61,
    low: 15.04,
    volume: 2224108,
  },
  {
    time: 1639008000000,
    close: 15.9,
    open: 15.56,
    high: 15.96,
    low: 15.56,
    volume: 1053267,
  },
  {
    time: 1639267200000,
    close: 16,
    open: 15.9,
    high: 16,
    low: 15.84,
    volume: 465778,
  },
  {
    time: 1639353600000,
    close: 15.91,
    open: 15.99,
    high: 16.42,
    low: 15.91,
    volume: 3108188,
  },
  {
    time: 1639440000000,
    close: 15.85,
    open: 15.95,
    high: 16.07,
    low: 15.83,
    volume: 728434,
  },
  {
    time: 1639526400000,
    close: 16.05,
    open: 15.85,
    high: 16.05,
    low: 15.81,
    volume: 1309450,
  },
  {
    time: 1639612800000,
    close: 16.25,
    open: 15.9,
    high: 16.25,
    low: 15.9,
    volume: 588901,
  },
  {
    time: 1639872000000,
    close: 15.9,
    open: 16.22,
    high: 16.24,
    low: 15.9,
    volume: 155579,
  },
  {
    time: 1639958400000,
    close: 16.1,
    open: 15.95,
    high: 16.1,
    low: 15.85,
    volume: 608073,
  },
  {
    time: 1640044800000,
    close: 16,
    open: 15.91,
    high: 16.1,
    low: 15.9,
    volume: 650631,
  },
  {
    time: 1640131200000,
    close: 16.54,
    open: 16,
    high: 16.89,
    low: 16,
    volume: 1789054,
  },
  {
    time: 1640217600000,
    close: 16.85,
    open: 16.75,
    high: 16.93,
    low: 16.46,
    volume: 1141312,
  },
  {
    time: 1640476800000,
    close: 16.53,
    open: 16.87,
    high: 16.87,
    low: 16.52,
    volume: 110449,
  },
  {
    time: 1640563200000,
    close: 16.52,
    open: 16.78,
    high: 16.78,
    low: 16.45,
    volume: 74612,
  },
  {
    time: 1640649600000,
    close: 16.7,
    open: 16.51,
    high: 16.82,
    low: 16.51,
    volume: 606766,
  },
  {
    time: 1640736000000,
    close: 16.85,
    open: 16.7,
    high: 16.85,
    low: 16.61,
    volume: 284880,
  },
  {
    time: 1640822400000,
    close: 16.77,
    open: 16.83,
    high: 16.85,
    low: 16.63,
    volume: 1507097,
  },
  {
    time: 1641081600000,
    close: 16.75,
    open: 16.88,
    high: 16.88,
    low: 16.01,
    volume: 78345,
  },
  {
    time: 1641168000000,
    close: 16.85,
    open: 16.79,
    high: 16.85,
    low: 16.61,
    volume: 350905,
  },
  {
    time: 1641254400000,
    close: 16.91,
    open: 16.62,
    high: 16.98,
    low: 16.62,
    volume: 1180362,
  },
  {
    time: 1641340800000,
    close: 17.15,
    open: 16.95,
    high: 17.15,
    low: 16.83,
    volume: 1125515,
  },
  {
    time: 1641686400000,
    close: 16.88,
    open: 17.15,
    high: 17.15,
    low: 16.85,
    volume: 429750,
  },
  {
    time: 1641772800000,
    close: 17,
    open: 17,
    high: 17.19,
    low: 16.85,
    volume: 406275,
  },
  {
    time: 1641859200000,
    close: 17.02,
    open: 17.15,
    high: 17.4,
    low: 17,
    volume: 629092,
  },
  {
    time: 1641945600000,
    close: 17.5,
    open: 16.92,
    high: 17.55,
    low: 16.91,
    volume: 1014786,
  },
  {
    time: 1642032000000,
    close: 17.3,
    open: 17.55,
    high: 17.55,
    low: 17.15,
    volume: 559611,
  },
  {
    time: 1642291200000,
    close: 16.9,
    open: 17.2,
    high: 17.47,
    low: 16.71,
    volume: 231127,
  },
  {
    time: 1642377600000,
    close: 16.9,
    open: 17,
    high: 17.1,
    low: 16.7,
    volume: 28677,
  },
  {
    time: 1642464000000,
    close: 16.9,
    open: 16.98,
    high: 17,
    low: 16.85,
    volume: 406018,
  },
  {
    time: 1642550400000,
    close: 16.93,
    open: 16.98,
    high: 16.98,
    low: 16.63,
    volume: 1067495,
  },
  {
    time: 1642636800000,
    close: 16.61,
    open: 16.63,
    high: 16.95,
    low: 16.59,
    volume: 48023,
  },
  {
    time: 1642896000000,
    close: 16.35,
    open: 16.97,
    high: 16.97,
    low: 16.3,
    volume: 568360,
  },
  {
    time: 1642982400000,
    close: 16.5,
    open: 16.49,
    high: 16.63,
    low: 16.21,
    volume: 293979,
  },
  {
    time: 1643068800000,
    close: 16.3,
    open: 16.5,
    high: 16.5,
    low: 16.25,
    volume: 245382,
  },
  {
    time: 1643155200000,
    close: 16.29,
    open: 16.5,
    high: 16.5,
    low: 16.2,
    volume: 568138,
  },
  {
    time: 1643500800000,
    close: 16.35,
    open: 16.3,
    high: 16.69,
    low: 16.2,
    volume: 403464,
  },
  {
    time: 1643587200000,
    close: 16.87,
    open: 16.4,
    high: 17,
    low: 16.3,
    volume: 724379,
  },
  {
    time: 1643673600000,
    close: 16.9,
    open: 16.9,
    high: 16.95,
    low: 16.75,
    volume: 122009,
  },
  {
    time: 1643760000000,
    close: 17,
    open: 16.9,
    high: 17.01,
    low: 16.8,
    volume: 238210,
  },
  {
    time: 1643846400000,
    close: 16.88,
    open: 17.1,
    high: 17.1,
    low: 16.85,
    volume: 401090,
  },
  {
    time: 1644105600000,
    close: 16.85,
    open: 16.83,
    high: 17,
    low: 16.8,
    volume: 77929,
  },
  {
    time: 1644192000000,
    close: 16.99,
    open: 16.82,
    high: 17,
    low: 16.82,
    volume: 532852,
  },
  {
    time: 1644278400000,
    close: 17.15,
    open: 17.05,
    high: 17.49,
    low: 17,
    volume: 1275981,
  },
  {
    time: 1644364800000,
    close: 17.7,
    open: 17.03,
    high: 18.1,
    low: 17.03,
    volume: 1024743,
  },
  {
    time: 1644451200000,
    close: 17.52,
    open: 17.65,
    high: 17.7,
    low: 17.5,
    volume: 54594,
  },
  {
    time: 1644710400000,
    close: 17.22,
    open: 17.52,
    high: 17.52,
    low: 17.17,
    volume: 121588,
  },
  {
    time: 1644796800000,
    close: 17.25,
    open: 17.43,
    high: 17.44,
    low: 17.02,
    volume: 82401,
  },
  {
    time: 1644883200000,
    close: 17.55,
    open: 17.15,
    high: 17.6,
    low: 17.1,
    volume: 292836,
  },
  {
    time: 1644969600000,
    close: 17.8,
    open: 17.5,
    high: 18.37,
    low: 17.4,
    volume: 652295,
  },
  {
    time: 1645056000000,
    close: 17.88,
    open: 17.99,
    high: 17.99,
    low: 17.74,
    volume: 50475,
  },
  {
    time: 1645315200000,
    close: 17.76,
    open: 17.97,
    high: 17.97,
    low: 17.6,
    volume: 269230,
  },
  {
    time: 1645401600000,
    close: 17.8,
    open: 17.64,
    high: 17.9,
    low: 17.5,
    volume: 118423,
  },
  {
    time: 1645488000000,
    close: 17.74,
    open: 17.57,
    high: 17.81,
    low: 17.57,
    volume: 361004,
  },
  {
    time: 1645574400000,
    close: 17.61,
    open: 17.8,
    high: 17.8,
    low: 17.55,
    volume: 731801,
  },
  {
    time: 1645660800000,
    close: 17.41,
    open: 16.94,
    high: 17.6,
    low: 16.5,
    volume: 1115010,
  },
  {
    time: 1645920000000,
    close: 17.4,
    open: 17.42,
    high: 17.59,
    low: 17.32,
    volume: 120715,
  },
  {
    time: 1646006400000,
    close: 17.68,
    open: 17.4,
    high: 17.72,
    low: 17.35,
    volume: 231544,
  },
  {
    time: 1646092800000,
    close: 18.49,
    open: 17.68,
    high: 18.5,
    low: 17.6,
    volume: 1142456,
  },
  {
    time: 1646179200000,
    close: 18.94,
    open: 18.46,
    high: 19.75,
    low: 18.46,
    volume: 3163651,
  },
  {
    time: 1646265600000,
    close: 19.36,
    open: 18.85,
    high: 19.45,
    low: 18.85,
    volume: 941449,
  },
  {
    time: 1646524800000,
    close: 18.59,
    open: 19.3,
    high: 19.3,
    low: 18.53,
    volume: 590298,
  },
  {
    time: 1646611200000,
    close: 18.26,
    open: 18.53,
    high: 18.55,
    low: 18.03,
    volume: 1333758,
  },
  {
    time: 1646697600000,
    close: 17.5,
    open: 18.15,
    high: 18.24,
    low: 17.4,
    volume: 1066612,
  },
  {
    time: 1646784000000,
    close: 17.1,
    open: 17.5,
    high: 17.55,
    low: 17.02,
    volume: 644213,
  },
  {
    time: 1646870400000,
    close: 17.34,
    open: 17.49,
    high: 17.49,
    low: 17.13,
    volume: 2195699,
  },
  {
    time: 1647129600000,
    close: 16.91,
    open: 17.5,
    high: 17.5,
    low: 16.9,
    volume: 455750,
  },
  {
    time: 1647216000000,
    close: 16.83,
    open: 16.94,
    high: 17.08,
    low: 16.7,
    volume: 618190,
  },
  {
    time: 1647302400000,
    close: 16.7,
    open: 16.98,
    high: 16.98,
    low: 16.56,
    volume: 1158294,
  },
  {
    time: 1647388800000,
    close: 17.17,
    open: 16.65,
    high: 17.3,
    low: 16.65,
    volume: 992455,
  },
  {
    time: 1647475200000,
    close: 17.17,
    open: 17.17,
    high: 17.2,
    low: 16.7,
    volume: 1289938,
  },
  {
    time: 1647734400000,
    close: 17.25,
    open: 16.96,
    high: 17.48,
    low: 16.82,
    volume: 1123916,
  },
  {
    time: 1647820800000,
    close: 17.26,
    open: 17.37,
    high: 17.53,
    low: 17.06,
    volume: 4433801,
  },
  {
    time: 1647907200000,
    close: 17,
    open: 17.39,
    high: 17.48,
    low: 17,
    volume: 1150331,
  },
  {
    time: 1647993600000,
    close: 17.13,
    open: 17.01,
    high: 17.35,
    low: 16.82,
    volume: 710140,
  },
];

export default function ScatterPage(props: { segment: string }) {
  const { state, isActive } = useChartPressState({
    x: 0,
    y: { high: 0, close: 0, low: 0, open: 0, time: 0 },
  });

  const [chartBottom, setChartBottom] = React.useState(0);
  // const [chartLeft, setChartLeft] = React.useState(0);
  // const [chartRight, setChartRight] = React.useState(0);
  const [chartTop, setChartTop] = React.useState(0);

  // const p1Horizontal = useDerivedValue(() =>
  //   vec(chartLeft, state.y.close.position.value),
  // );
  // const p2Horizontal = useDerivedValue(() =>
  //   vec(chartRight, state.y.close.position.value),
  // );

  const p1Vertical = useDerivedValue(() =>
    vec(state.x.position.value, chartTop),
  );
  const p2Vertical = useDerivedValue(() =>
    vec(state.x.position.value, chartBottom),
  );
  const font = useFont(inter, 12);
  // map over mockCandlestickData and change time to index and increment by 1
  const data = mockCandlestickData.map((data, index) => {
    return {
      ...data,
      index: index + 1,
    };
  });
  return (
    <>
      <SafeAreaView style={styles.safeView}>
        <CartesianChart
          data={data}
          xKey={"index"}
          yKeys={["close", "high", "low", "open"]}
          chartPressState={state}
          domainPadding={15}
          onChartBoundsChange={({ bottom, left, right, top }) => {
            setChartBottom(bottom);
            // setChartLeft(left);
            // setChartRight(right);
            setChartTop(top);
          }}
          // domain={{ x: [0, 20] }}
          // axisOptions={{
          //   tickCount: 5,
          //   font: font,
          //   labelColor: "black",
          //   formatXLabel(label) {
          //     return format(label, "dd MMM");
          //   },
          // }}
        >
          {({ points, canvasSize }) => {
            return (
              <>
                <Candlestick
                  canvasSize={canvasSize}
                  animate={{ type: "timing" }}
                  points={{
                    close: points.close,
                    high: points.high,
                    low: points.low,
                    open: points.open,
                  }}
                />
                {isActive && (
                  <>
                    <Line
                      p1={p1Vertical}
                      p2={p2Vertical}
                      style="stroke"
                      strokeWidth={1}
                    >
                      <DashPathEffect intervals={[8, 4]} />
                    </Line>
                    {/* <Line
                        p1={p1Horizontal}
                        p2={p2Horizontal}
                        style="stroke"
                        strokeWidth={1}
                      /> */}
                  </>
                )}
              </>
            );
          }}
        </CartesianChart>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  safeView: {
    maxHeight: 350,
    flex: 1,
    backgroundColor: appColors.viewBackground.light,
    $dark: {
      backgroundColor: appColors.viewBackground.dark,
    },
  },
  chart: {
    flex: 1.5,
    height: 250,
  },
  optionsScrollView: {
    flex: 1,
    backgroundColor: appColors.cardBackground.light,
    $dark: {
      backgroundColor: appColors.cardBackground.dark,
    },
  },
  options: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
});
