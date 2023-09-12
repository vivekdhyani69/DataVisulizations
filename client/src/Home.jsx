import React, { useEffect } from 'react'
import Select from 'react-select';
import DataTable from 'react-data-table-component';
import ColumnChart from './CHarts/Piechart';
import BarChart from './CHarts/BarChart';
import { CountryChart } from './CHarts/CountryChart';
import axios from 'axios';
import { useState } from 'react';


export const Home = () => {
    const [startYear, setStartYear] = React.useState([]);
    const [endYear, setEndYear] = React.useState([]);
    const [topic, setTopic] = React.useState([]);
    const [sector, setSector] = React.useState([]);
    const [likelihood, setLikeliHood] = React.useState([]);
    const [source, setSource] = React.useState([]);
    const [country, setCountry] = React.useState([]);
    const [region, setRegion] = React.useState([]);
    const [relevance, setRelevance] = React.useState([]);
    const [Intensity, setIntensity] = React.useState([]);
    const [page,setPage]=React.useState(1)
    const [pageSize,setPageSize]=React.useState(10)
    const[userData,setUserData]=React.useState([])
    const[filter,filterData]=React.useState([])
    const [loading, setLoading] = useState(true);
    const [totalRows,setTotalrows] =useState(1)
    const [filterQuery,setFilterQuery]=useState({start_year:null,end_year:null,topic:null,intensity:null,relevance:null,likelihood:null,source:null,country:null,region:null})
    const [url,setUrl] = useState(null);

 const apiUrl = `http://localhost:3001/api/data/filter?page=${page}&pageSize=${pageSize}${url}`;
 const apiUrlForFilter = `http://localhost:3001/api/data/filter?page=${1}&pageSize=${1000}`;

   useEffect(()=>{
   let filterUrl="";
    if(filterQuery.start_year && filterQuery.start_year !==null && filterQuery.start_year !==null){
       filterUrl=filterUrl+"&start_year="+filterQuery.start_year
    }
    if(filterQuery.end_year && filterQuery.end_year !==null && filterQuery.end_year !==null){
      filterUrl=filterUrl+"&end_year="+filterQuery.end_year
   }
   if(filterQuery.topic && filterQuery.topic !==null && filterQuery.topic !==null){
    filterUrl=filterUrl+"&topic="+filterQuery.topic
 }
 if(filterQuery.intensity && filterQuery.intensity !==null && filterQuery.intensity !==null){
  filterUrl=filterUrl+"&intensity="+filterQuery.intensity
}
if(filterQuery.relevance && filterQuery.relevance !==null && filterQuery.relevance !==null){
  filterUrl=filterUrl+"&relevance="+filterQuery.relevance
}
if(filterQuery.likelihood && filterQuery.likelihood !==null && filterQuery.likelihood !==null){
  filterUrl=filterUrl+"&likelihood="+filterQuery.relevance
}
if(filterQuery.source && filterQuery.source !==null && filterQuery.source !==null){
  filterUrl=filterUrl+"&source="+filterQuery.source
}if(filterQuery.country && filterQuery.country !==null && filterQuery.country !==null){
  filterUrl=filterUrl+"&country="+filterQuery.country
}if(filterQuery.region && filterQuery.region !==null && filterQuery.region !==null){
  filterUrl=filterUrl+"&region="+filterQuery.region
}
   setUrl(filterUrl)
   },[filterQuery])

   
    const  getAllUsersData=()=>{
      setLoading(true)
      axios.get(apiUrl).then(res=>{
         const data=res?.data?.data
         setUserData(data)
         setTotalrows(res?.data?.totalItems)
         setLoading(false)
      }).catch(err=>{
        console.error(err)
      })
      setLoading(false)
    }

    const  getAllFilterData=()=>{
      axios.get(apiUrlForFilter).then(res=>{
         const data=res?.data?.data
         filterData(data)
      }).catch(err=>{
        console.error(err)
      })
    }

    React.useEffect(()=>{
        getAllUsersData()
        getAllFilterData()
    },[])

    React.useEffect(()=>{
      getAllUsersData()
  },[page,pageSize,url])
    
    React.useEffect(()=>{
      if(filter && filter.length){
        let mockStartYear=filter.map(data=>(data.start_year)).filter(data=>data !==null)
        let mockEndYear=filter.map(data=>(data.end_year)).filter(data=>data !==null)
        let mockTopic=filter.map(data=>(data?.topic)).filter(data=>data !==null)
        let mockIntensity=filter.map(data=>(+data?.intensity)).filter(data=>data !==null)
        let mockSector=filter.map(data=>(data?.sector)).filter(data=>data !==null)
        let mockLikeliHood=filter.map(data=>(data?.likelihood)).filter(data=>data !==null)
        let mockSource=filter.map(data=>(data?.source)).filter(data=>data !==null)
        let mockCountry=filter.map(data=>(data?.country)).filter(data=>data !==null)
        let mockRegion=filter.map(data=>(data?.region)).filter(data=>data !==null)
        let mockRelevance=filter.map(data=>(data?.relevance)).filter(data=>data !==null)
        setStartYear([...new Set(mockStartYear.sort())].map(data=>({label:data,value:data})))
        setEndYear([...new Set(mockEndYear.sort())].map(data=>({label:data,value:data})))
        setTopic([...new Set(mockTopic.sort())].map(data=>({label:data,value:data})))
        setIntensity([...new Set(mockIntensity.sort())].map(data=>({label:data,value:data})) )
        setSector([...new Set(mockSector.sort())].map(data=>({label:data,value:data})) )
        setLikeliHood([...new Set(mockLikeliHood.sort())].map(data=>({label:data,value:data})) )
        setSource([...new Set(mockSource.sort())].map(data=>({label:data.substring(1,5),value:data})) )
        setCountry([...new Set(mockCountry.sort())].map(data=>({label:data,value:data})))
        setRegion([...new Set(mockRegion.sort())].map(data=>({label:data,value:data})) )
        setRelevance([...new Set(mockRelevance.sort())].map(data=>({label:data,value:data})) )
      }
    },[filter])

    const handlePerRowsChange = async (newPerPage, page) => {
      setPageSize(newPerPage);
      setPage(page)
    };

    const handlePageChange = page => {
      console.log(page)
      setPage(page)
    };
  
    
    const columns=[
          {
            name: 'Intensity',
            selector:(row) => row.intensity !==null?row.intensity:"N/A",
            sortable: true,
          },
          {
            name: 'Source',
            selector:(row) => row.source !==null?row.source:"N/A",
            sortable: true,
          },
          {
            name: 'Likelihood',
            selector:(row) =>row.likelihood !==null?row.likelihood:"N/A",
            sortable: true,
          },{
            name: 'Relevance',
            selector:(row)=>row.relevance !==null?row.relevance:"N/A",
            sortable: true,
          },{
            name: 'Start Year',
            selector: (row)=> row.start_year !==null?row.start_year:'N/A',
            sortable: true,
          },{
            name: 'End Year',
            selector:(row)=>row.end_year !==null?row.end_year: 'N/A',
            sortable: true,
          },{
            name: 'Country',
            selector:(row)=>row.country !== null?row.country: 'N/A',
            sortable: true,
          },{
            name: 'Topic',
            selector:(row)=>row.topic !==null?row.topic: 'N/A',
            sortable: true,
          },{
            name: 'Region',
            selector: (row)=> row.region !==null?row.region:"N/A",
            sortable: true,
          },
    ]

    return (
        <div>
        <div className=' m-0 p-0'>
            <div className='row'>
            <div className='col-md-1.5 pl-5 '>
                   <Select
        classNamePrefix="select"
        options={startYear }
        isClearable={true}
        onChange={event=>setFilterQuery({...filterQuery,"start_year":event?.value})}
        placeholder={"Select start year"}
      />
             </div>
             <div className='col-md-1.5 pl-3 '>
                   <Select
        classNamePrefix="select"
        options={endYear }
        isClearable={true}
        onChange={event=>setFilterQuery({...filterQuery,"end_year":event?.value})}
        placeholder={"Select end year"}
      />
             </div>
             <div className='col-md-1.5 pl-3 '>
                   <Select
        classNamePrefix="select"
        options={topic}
        isClearable={true}
        onChange={event=>setFilterQuery({...filterQuery,"topic":event?.value})}
        placeholder={"Select topic "}
      />
             </div>
             <div className='col-md-1.5 pl-3 '>
                   <Select
        classNamePrefix="select"
        options={Intensity }
        isClearable={true}
        onChange={event=>setFilterQuery({...filterQuery,"Intensity":event?.value})}
        placeholder={"Select Intensity"}
      />
             </div>
             <div className='col-md-1.5 pl-3 '>
                   <Select
        classNamePrefix="select"
        options={relevance }
        isClearable={true}
        onChange={event=>setFilterQuery({...filterQuery,"relevance":event?.value})}
        placeholder={"Select relevance"}
      />
             </div>
             <div className='col-md-1.5 pl-3 '>
                   <Select
        classNamePrefix="select"
        options={likelihood }
        isClearable={true}
        onChange={event=>setFilterQuery({...filterQuery,"likelihood":event?.value})}
        placeholder={"Select LikelyHood"}
      />
             </div>
             <div className='col-md-1.5 pl-3 '>
                   <Select
        classNamePrefix="select"
        options={source }
        isClearable={true}
        onChange={event=>setFilterQuery({...filterQuery,"source":event?.value})}
        placeholder={"Select source"}
      />
             </div>
             <div className='col-md-1.5 pl-3 '>
                   <Select
        classNamePrefix="select"                                                             
        options={country }
        isClearable={true}
        onChange={event=>setFilterQuery({...filterQuery,"country":event?.value})}
        placeholder={"Select country"}
      />
             </div>
             <div className='col-md-1.5 pl-3 '>
                   <Select
        classNamePrefix="select"
        options={region }
        isClearable={true}
        onChange={event=>setFilterQuery({...filterQuery,"region":event?.value})}
        placeholder={"Select region"}
      />
            </div>
             <div className='col-md-10 offset-md-1'>
              <div className='card mt-5'>
               <div className='card-body '>
      <DataTable
        title="User Data"
        columns={columns}
        data={userData}
        progressPending={loading}
        pagination
        paginationPerPage={10} // Number of rows per page
        paginationRowsPerPageOptions={[10, 15 ,20,50,100]} // Rows per page options
        paginationServer // Set to true if you're implementing server-side pagination
        paginationTotalRows={totalRows}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
        />

               </div>
              </div>
    
             </div>
            </div>
            <ColumnChart  mockData={userData}></ColumnChart>
            <BarChart originalData={userData}></BarChart>
            <CountryChart mockData={userData}></CountryChart>
        </div>
        </div >
    )
}
