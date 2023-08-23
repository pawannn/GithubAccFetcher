import React, { useEffect, useState, useMemo } from "react";
import ReactApexChart from "react-apexcharts";

const DisplayStarChart = ({ reposData }) => {
  const [chartData, setChartData] = useState({
    series: [
      {
        name: "Stared Repos",
        data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "bar",
      },
      plotOptions: {
        bar: {
          borderRadius: 10,
          dataLabels: {
            position: "top", // top, center, bottom
          },
        },
      },
      dataLabels: {
        enabled: true,
        offsetY: -20,
        style: {
          fontSize: "12px",
          colors: ["#304758"],
        },
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        position: "top",
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        crosshairs: {
          fill: {
            type: "gradient",
            gradient: {
              colorFrom: "#D8E3F0",
              colorTo: "#BED1E6",
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5,
            },
          },
        },
        tooltip: {
          enabled: true,
        },
      },
      yaxis: {
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: false,
          formatter: function (val) {
            return parseInt(val);
          },
        },
      },
      title: {
        text: "Stared Repos",
        floating: true,
        offsetY: 330,
        align: "center",
        style: {
          color: "#444",
        },
      },
    },
  });

  const repo_name = useMemo(() => {
    if (!reposData || !Array.isArray(reposData)) {
      return [];
    }

    return reposData.map((item) => item.name);
  }, [reposData]);

 const star_count = useMemo(() => {
    if (!reposData || !Array.isArray(reposData)) {
      return [];
    }

    return reposData.map((item) => item.stargazers_count);
  }, [reposData]);
  const newArray = repo_name?.map((name) => name?.slice(0, 4) + "...");

  console.log(star_count);
  console.log(repo_name);

  useEffect(() => {
    setChartData({
      ...chartData,
      series: [
        {
          name: "Stars",
          data: star_count,
        },
      ],
      options: {
        ...chartData.options,
        xaxis: {
          ...chartData.options.xaxis,
          categories: newArray,
        },
      },
    });
  }, [star_count, repo_name]);

  return (
    <div className="chart">
      <h3>Started Repo Analysis</h3>
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="bar"
        height={350}
      />
    </div>
  );
};

export default DisplayStarChart;
