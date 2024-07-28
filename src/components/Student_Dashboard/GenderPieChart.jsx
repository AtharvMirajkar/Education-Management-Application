import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../constants";
import { Chart } from "react-google-charts";

const GenderPieChart = () => {
  const [genderData, setGenderData] = useState(null);

  useEffect(() => {
    const fetchGenderData = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/usersData/gender-count`
        ); // Adjust URL as per your Express API route
        setGenderData(response.data);
      } catch (error) {
        console.error("Error fetching gender data:", error);
      }
    };

    fetchGenderData();
  }, []);

  const chartEvents = [
    {
      eventName: "select",
      callback: ({ chartWrapper }) => {
        const chart = chartWrapper.getChart();
        const selection = chart.getSelection();
        if (selection.length === 1) {
          const item = selection[0];
          console.log("Selected item:", item);
        }
      },
    },
  ];

  return (
    <div className="container card shadow py-3">
      <h3 className="text-center mt-2">Gender Distribution</h3>
      <div style={{ width: "100%", height: 400 }}>
        {genderData && (
          <Chart
            width={"100%"}
            height={"400px"}
            chartType="PieChart"
            loader={<div>Loading Chart</div>}
            data={[
              ["Gender", "Percentage"],
              ["Male", genderData.malePercentage],
              ["Female", genderData.femalePercentage],
            ]}
            options={{
              title: "Gender Distribution",
              pieHole: 0.5,
              //   is3D: true,
            }}
            chartEvents={chartEvents}
          />
        )}
      </div>
    </div>
  );
};

export default GenderPieChart;
