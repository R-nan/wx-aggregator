"use strict";
const https = require("https")
const fs = require("fs")
const AWS = require("aws-sdk")
const Promise = require("bluebird")

const s3 = new AWS.S3()
const params = {params: {Bucket: "wx-aggregator", Key: "darkSkyWeatherData"}}

module.exports.getDarkSkyWeatherAPIData = (event, context, callback) => {
  try {
    Promise.resolve(
      const requestParameters = {
        hostname: "https://api.forecast.io/forecast/685c9d1d716b0a7c8775c222ae809f4f/37.8267,-122.423"
      } 
      https.get(requestParameters, () => {
        console.log("API fetch succeeded, with " + result.statusCode)
        return result
      }) 
    )
    .then((weatherJSONData) => {
      return s3.getObject(params, () => (err, data) {
        let s3Params = {
          Bucket: "wx-aggregator",
          Key: "forecastResults.json",
          Body: weatherJSONData
        }

        if (err) {
          // weather data json file doesn"t exist, create it and write to it
          createNewJSONOfLatestWeatherDataInS3(s3Params, weatherJSONData)
        } else {
          // Delete outdated weather data
          s3Params.Body = undefined
          s3.deleteObject(s3Params, (err) => {
            if (err) {
              console.log("Error removing old weather API data from S3 json file")
            } else {
              console.log("Successfully removed old weather data from S3")
            }
          })
          // Insert latest data in a new file on the s3 bucket
          createNewJSONOfLatestWeatherDataInS3(s3Params, weatherJSONData)
        }
      }
    })
  }
  catch(err) {
    callback(err)
  }
};

function createNewJSONOfLatestWeatherDataInS3(s3Params, weatherJSONData) {
  let fileBuffer;
  fs.writeFile("/tmp/forecastResults.json", weatherJSONData, (file) => {
    fileBuffer = file
  })
  s3.putObject(fileBuffer, (err) => { 
    if (err) {
      console.log("Error uploading weather API data to S3 json file")
      throw err
    } else {
      console.log("Successfully uploaded latest weather data to JSON")
    }
  }
}
