// src/components/ColumnChart.js
import React from "react";
import Chart from "react-google-charts";

const ColumnChart = ({ mockData }) => {
  const [data, setData] = React.useState(mockData);

  React.useEffect(() => {
    if (mockData && mockData.length > 0) {
      let mockTopic = mockData
        .map((data) => ({
          label: data?.topic?.toLowerCase(),
          value: data.intensity,
        }))
        .filter((data) => data.label !== null && data.value !== null);
      const uniqueLabels = {};
      const filteredData = mockTopic.filter((item) => {
        if (!uniqueLabels[item.label]) {
          uniqueLabels[item.label] = true;
          return true;
        }
        return false;
      });

      let newData = filteredData.map((data) => [data.label, data.value]);
      newData.unshift(["Topic", "Intensity"]);
      setData(newData);
    } else {
      setData([]);
    }
  }, [mockData]);

  const options = {
    title: "Intensity of the Topic",
    chartArea: { width: "50%" }, // Adjust the chart area width as needed
    hAxis: {
      title: "Category",
    },
    vAxis: {
      title: "Intensity",
      minValue: 0,
    },
  };

  return (
    <div>
      <Chart
        width={"500px"}
        height={"300px"}
        chartType="PieChart"
        loader={<div>Loading Chart</div>}
        data={data}
        options={options}
        rootProps={{ "data-testid": "1" }}
      />
    </div>
  );
};

export default ColumnChart;
