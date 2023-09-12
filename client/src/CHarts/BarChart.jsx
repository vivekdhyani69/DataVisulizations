import React from 'react';
import Chart from 'react-google-charts';


const BarChart = ({originalData}) => {
     const [data, setData] = React.useState([]);

      React.useEffect( () => {
        if(originalData && originalData.length > 0){
        let final= originalData.filter(data=>data.start_year !==null && data.end_year !==null && data.relevance !==null && data.likelihood !==null && data.source !==null)
        let data1 =final?.map(data=>[data.start_year,data.relevance,data.likelihood,data.source])
        data1?.unshift(["Start Year", "Relevance", "likelihood", "Source"])
        setData(data1)
        }else{
          setData([])
        }
      }, [originalData]);
console.log(data)
const options = {
  chart: {
    title: "Company Performance",
    subtitle: "Start Year, Relevance,likelihood, and Source",
  },
}
  return (
    <div>
     <Chart
      chartType="Bar"
       width="100%"
       height="400px"
       data={data}
       options={options}
     /> 
    </div>
  );
};

export default BarChart;
