import React, { useEffect, useState, useMemo } from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';

const DisplayGraph = ({repo_name, owner_name}) => {
  const [chartData, setChartData] = useState({
    series: [44, 55, 13, 43, 22],
    options: {
      chart: {
        width: 380,
        type: 'pie',
      },
      labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 400,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    },
  });


    const [languages, setLanguages] = useState([]);

    const baseurl = "https://api.github.com/";
    const series = useMemo(() => Object.values(languages), [languages]);
    const labels = useMemo(() => Object.keys(languages), [languages]);

    useEffect(() => {
        axios.get(`${baseurl}repos/${owner_name}/${repo_name}/languages`).then((response) => {
            setLanguages(response?.data);
            console.log(response?.data);
        });
    }, []);

    useEffect(() => {
        setChartData({
            ...chartData,
            series,
            options: {
                ...chartData.options,
                labels,
            },
        });
    }, [series, labels]);

  return (
    <div id="chart">
      <ReactApexChart options={chartData.options} series={chartData.series} type="pie" width={380} />
    </div>
  );
};

export default DisplayGraph;
