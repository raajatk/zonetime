'use strict';

module.exports = function(regionAbbr, callback) {

  const async = require('async');
  const timeZones = require('./timezones.json');

  async.auto({
    getRegionalTimeOffset:function(next){
      var resObj = {};
      async.forEach(timeZones,function(tZoneObj,loopCallback){
        if(regionAbbr == tZoneObj.abbr){
          resObj = tZoneObj;
        }
        loopCallback();
      },function(err){
          next(null,resObj);
      })
    },
    getTimeInEnteredRegion:['getRegionalTimeOffset',function(result, next){
      if(result.getRegionalTimeOffset.offset){
        var currentTimeUTC = new Date();
        var offsetInMins = parseFloat(result.getRegionalTimeOffset.offset)*60;
        var timeInRegion = new Date(new Date().getTime() + offsetInMins*60000);

        var resObj = {
          currentTimeUTC:currentTimeUTC.toISOString().replace('Z',''),
          currentTimeInTimeZone:timeInRegion.toISOString().replace('Z','')
        }

        next(null,resObj);
      }else {
        var resObj = {
          currentTimeUTC:null,
          currentTimeInTimeZone:null
        }

        next(null,resObj);
      }
    }]
  },function(err, results){
    if(results.getRegionalTimeOffset.currentTimeInTimeZone){
      var resObj = {
        region:results.getRegionalTimeOffset,
        currentTimeInTimeZone:results.getTimeInEnteredRegion.currentTimeInTimeZone,
        currentTimeUTC:results.getTimeInEnteredRegion.currentTimeUTC,
        message:"The Current Time in queried Time-Zone has been fetched Successfully."
      };

      callback(null,resObj);
    }else {
      var resObj = {
        region:null,
        currentTimeInTimeZone:null,
        currentTimeUTC:new Date().toISOString().replace('Z',''),
        message:"The queried Time-Zone is not available."
      };

      callback(null,resObj);
    }

  })


};
