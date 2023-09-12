import React from 'react'
import { Chart } from "react-google-charts";

export const CountryChart = ({mockData}) => {
    const [data, setdata] = React.useState([]);
    

      React.useEffect(()=>{
        if(mockData && mockData.length >  0){
        let mockCountry=mockData.map(data=>({label:data?.country,value:data.intensity})).filter(data=>data.label !==null && data.value !==null)
         const uniqueLabels = {};
         const filteredData = mockCountry.filter(item => {
           if (!uniqueLabels[item.label]) {
             uniqueLabels[item.label] = true;
             return true;
           }
           return false;
         })
         let data1=filteredData.map(data=>[data.label,data.value])
         data1.unshift(["Country", "Intensity"])
         setdata(data1)
        }
        else{
          setdata([])
        }
      },[mockData])

      const options = {
        title: "Country Intensity",
        legend: "label",
        pieSliceText: "label",
        slices: {
          4: { offset: 0.2 },
          12: { offset: 0.3 },
          14: { offset: 0.4 },
          15: { offset: 0.5 },
        },
      };
  return (
    <div>
      <Chart
    chartType="PieChart"
    data={data}
    options={options}
    width={"100%"}
    height={"400px"}
  />
  </div>
  )
}
