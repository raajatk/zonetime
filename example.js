var time = require('./index.js');
var async = require('async');

async.auto({
  fetchRegionalTime:function(next){
    time('IST',next)}
  },function(err,results){
    console.log(results.fetchRegionalTime)
})
