import React, { useState } from "react";
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

const MultiLineChart = ({ data }) => {
  const data1 = {
    datasets: [
      {
        backgroundColor: "#00A7FF",
        borderColor: "#00A7FF",
        borderWidth: 1.5,
        label: "View Counts",
        data: [
          1, 1, 2, 3, 3, 2, 2, 3, 2, 1, 2, 1, 2, 1, 1, 0, 1, 2, 2, 1, 1, 1, 1,
          0, 0, 0, 3, 1,
        ],
      },
      {
        backgroundColor: "#E0A91C",
        borderColor: "#E0A91C",
        borderWidth: 1.5,
        label: "Favorite Counts",
        data: [
          2, 1, 0, 1, 2, 1, 1, 0, 1, 2, 2, 0, 4, 0, 1, 0, 0, 2, 0, 0, 0, 0, 1,
          0, 0, 0, 1, 3, 2,
        ],
      },
    ],
    labels: [
      "Nov 24",
      "Nov 25",
      "Nov 26",
      "Nov 27",
      "Nov 28",
      "Nov 29",
      "Nov 30",
      "Dec 01",
      "Dec 02",
      "Dec 03",
      "Dec 04",
      "Dec 05",
      "Dec 06",
      "Dec 07",
      "Dec 08",
      "Dec 09",
      "Dec 10",
      "Dec 11",
      "Dec 12",
      "Dec 13",
      "Dec 14",
      "Dec 15",
      "Dec 16",
      "Dec 17",
      "Dec 18",
      "Dec 19",
      "Dec 20",
      "Dec 21",
      "Dec 22",
    ],
  };

  return (
    <>
      <Line
        options={{
          responsive: true,
          plugins: {
            legend: {
              display: true,
              position: "right",
              labels: {
                usePointStyle: true,
                pointStyle: "rect",
              },
            },
          },
          elements: {
            point: {
              radius: 3,
            },
          },
          scales: {
            x: {
              grid: {
                drawBorder: false,
                display: false,
              },
            },
            y: {
              beginAtZero: true,
              ticks: {
                beginAtZero: true,
                callback: function (value) {
                  if (value % 1 === 0) {
                    return value;
                  }
                },
              },
            },
          },
          maintainAspectRatio: true,
        }}
        data={data1}
      />
    </>
  );
};

export default MultiLineChart;
