/* eslint-disable react/react-in-jsx-scope */
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const Graph = ({ p1, p2, p1name, p2name }) => {
  const processGraphArray = (p1, p2) => {
    // gragharrayからp1とp2を取り出す
    const hb1 = p1;
    const hb2 = p2;

    // データを整形
    const { formattedHb1, formattedHb2, labels1, labels2 } = formatHeartBeat(
      hb1,
      hb2
    );

    // グラフ用データを作成
    const graphData = plotGraph(labels1, labels2, formattedHb1, formattedHb2);

    return graphData;
  };

  const formatHeartBeat = (hb1, hb2) => {
    if (!Array.isArray(hb1) || !Array.isArray(hb2)) {
      console.error("hb1またはhb2が配列ではありません。", { hb1, hb2 });
      return { formattedHb1: [], formattedHb2: [], labels1: [], labels2: [] };
    }

    const str2intFilter = (heart) => {
      return heart
        .map((value) => parseFloat(value)) // 文字列を数値に変換
        .filter((value) => !isNaN(value) && value !== 0); // NaN や 0 を除外
    };

    const filteredHb1 = str2intFilter(hb1);
    const filteredHb2 = str2intFilter(hb2);

    const adjustArraysToShortest = (array1, array2) => {
      console.log("heartRate1の要素数: ", array1.length);
      console.log("heartRate2の要素数: ", array2.length);
      const minLength = Math.min(array1.length, array2.length);
      return [array1.slice(0, minLength), array2.slice(0, minLength)];
    };

      // 配列を短い方に揃える
  const [hr1, hr2] = adjustArraysToShortest(filteredHb1, filteredHb2);

  

    const labels1 = Array.from({ length: hr1.length }, (_, i) => i + 1);
    const labels2 = Array.from({ length: hr2.length }, (_, i) => i + 1);

    return {
      formattedHb1: hr1,
      formattedHb2: hr2,
      labels1,
      labels2,
    };
  };

  const plotGraph = (labels1, labels2, data1, data2) => ({
    labels: labels1.length > labels2.length ? labels1 : labels2,
    datasets: [
      {
        label: p1name,
        data: data1,
        fill: false,
        borderColor: "rgb(255, 182, 193)",
        backgroundColor: "rgb(255,182,193)",
        tension: 0.1,
      },
      {
        label: p2name,
        data: data2,
        fill: false,
        borderColor: "rgb(173, 216, 230)",
        backgroundColor: "rgb(173, 216,230)",
        tension: 0.1,
      },
    ],
  });

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: "black",
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
        },
        ticks: {
          color: "black",
        },
      },
      y: {
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
        },
        ticks: {
          color: "black",
        },
      },
    },
    layout: {
      padding: 20,
    },
  };

  return <Line data={processGraphArray(p1, p2)} options={options} />;
};
