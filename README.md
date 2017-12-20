# zonetime
The NPM module which will provide current time in different time zones.

## Installation
> npm install zonetime

## Running Example File
> node example.js

## Example Code
>var time = require('./index.js');

>var async = require('async');

>async.auto({

>  fetchRegionalTime:function(next){

>    time('IST',next)}  //pass the timezone abbreviation and callback in the function

>  },function(err,results){

>    console.log(results.fetchRegionalTime)

>})

## Abbreviation for TimeZone
Please find the timezones.json file for fetching the abbreviation for different timezones and then use in your code accordingly.

## License
This project is licensed under the MIT License - see the LICENSE file for details

