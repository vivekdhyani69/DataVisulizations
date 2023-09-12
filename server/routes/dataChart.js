const express = require("express");
const router = express.Router();
const DataChart = require("../modal/DataChart");

// Route to get all data
router.get("/data", async (req, res) => {
  try {
    const data = (await DataChart.length) > 0;
    if (!data) {
      // Check the length of the data array
      console.log("No data found for the specified _id.");
      return res.status(404).json({ message: "No data found" });
    }

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Define more routes for filtering data based on your variables
// ...

router.get("/filterYear", async (req, res) => {
  try {
    const { start_year } = req.query;
    const query = {};

    if (start_year) {
      query.start_year = start_year;
    }

    const data = await DataChart.find(query);

    if (!data || data.length === 0) {
      console.error("No data found for the specified filter");
      return res.status(404).json({ message: "No data found" });
    }

    res.json(data);
  } catch (error) {
    console.error("Error retrieving data:", error.message); // Log the error message
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/data/filter", async (req, res) => {
  try {
    const {
      page,
      pageSize,
      start_year,
      end_year,
      city,
      topic,
      region,
      country,
      Intensity,
      relevance,
      Likelihood,
      source
    } = req.query;

    let query = {}; // Initialize an empty query

    if (
      start_year &&
      end_year &&
      start_year !== undefined &&
      end_year !== undefined &&
      start_year !== null &&
      end_year !== null &&
      start_year !== "" &&
      end_year !== "" &&
      start_year !== ""
    ) {
      // Give data where Year falls within the specified range
      query = {
        start_year: { $gte: start_year },
        end_year: { $lte: end_year },
      };
      console.log(query);
    } else if (start_year &&  start_year !== undefined && start_year !== null && start_year !== "") {
      query.start_year = start_year;
      console.log(query);
    } else if (end_year && end_year !== undefined && end_year !== null && end_year !== "") {
      query.end_year = end_year;
      console.log(query, "vivek");
    }

    if (city && city !== null && city !== "" && city !== undefined) {
      query.city = city;
    }

    if (topic && topic!== null && topic !== undefined && topic !== "") {
      query.topic = topic;
      console.log(query);
    }

    if (region && region !== null && region !=="" && region !== undefined ) {
      query.region = region;
    }

    if (country && country !== null && country !== "" && country !== undefined) {
      query.country = country;
    }

    if (Intensity && Intensity !== null && Intensity !== "" && Intensity !== undefined) {
      query.intensity = parseInt(Intensity);
    }
    if (relevance  && relevance !== null && relevance !== "" && relevance !==relevance) {
      query.relevance = parseInt(relevance);
      console.log(query, "api");
    }
    if (Likelihood && Likelihood !==null && Likelihood !==undefined && Likelihood !=="") {
      query.likelihood = parseInt(Likelihood);
    }
    if(source && source !==null && source !==undefined && source !=="") {
    query.source = source;
    }
    // Pagination logic
    const currentPage = parseInt(page) || 1; // Parse page as an integer (default to 1 if not provided)
    const itemPerPage = parseInt(pageSize) || 5; // Parse pageSize as an integer (default to 20 if not provided)

    const skip = (currentPage - 1) * itemPerPage;
    const totalItems = await DataChart.countDocuments(query);

    const totalPages = Math.ceil(totalItems / itemPerPage);

    const filteredData = await DataChart.find(query)
      .skip(skip)
      .limit(itemPerPage);
    console.log("query", query);
    if (filteredData.length === 0) {
      // No data matching the criteria
      return res
        .status(202)
        .json({ message: "No data found matching the criteria." });
    }

    res.json({
      data: filteredData,
      totalPages,
      totalItems,
      currentPage,
      pageSize: itemPerPage,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});
/////Filter Topic
router.get("/filtertopic", async (req, res) => {
  try {
    const { topic } = req.query;
    console.log(topic);
    const query = {};

    if (topic) {
      query.topic = topic;
      console.log(query);
    } else {
      res.status(401).json({ message: "No topic is found" });
    }
    const data = await DataChart.find(query);
    if (!data || data.length === 0) {
      console.error("No data found for the specified filter");
      return res.status(404).json({ message: "No data found" });
    }
    res.json(data);
  } catch (error) {
    console.error(error.message);
    res.status(401).json({ message: "Error: " + error.message });
  }
});

///Filter Sector
router.get("/filtersector", async (req, res) => {
  try {
    const { sector } = req.query;
    console.log(sector);
    const query = {};

    if (sector) {
      query.sector = sector;
      console.log(query);
    } else {
      res.status(401).json({ message: "No sector is found" });
    }
    const data = await DataChart.find(query);
    if (!data || data.length === 0) {
      console.error("No data found for the specified filter");
      return res.status(404).json({ message: "No data found" });
    }
    res.json(data);
  } catch (error) {
    console.error(error.message);
    res.status(401).json({ message: "Error: " + error.message });
  }
});
////filter Region
router.get("/filterregion", async (req, res) => {
  try {
    const { region } = req.query;
    console.log(region);
    const query = {};

    if (region) {
      query.region = region;
      console.log(query);
    } else {
      res.status(401).json({ message: "No region is found" });
    }
    const data = await DataChart.find(query);
    if (!data || data.length === 0) {
      console.error("No data found for the specified filter");
      return res.status(404).json({ message: "No data found" });
    }
    res.json(data);
  } catch (error) {
    console.error(error.message);
    res.status(401).json({ message: "Error: " + error.message });
  }
});

// router.get('/filterByYear/:startYear/:endYear', async (req, res) => {

//   const { startYear, endYear } = req.params;
//   try {
//     const filteredData = await DataChart.find({ Year: { $gte: startYear, $lte: endYear } });
//     res.json(filteredData);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server Error' });
//   }
// });

// Express API route for filtering data

module.exports = router;
