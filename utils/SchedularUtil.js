const schedule = require('node-schedule');
const {httpUtil} = require("./HttpUtil");
var scheduleUtil = {
        skipSteps: function() {
            var x = [];
            var steps = 5;
            for (var i = 0; i <= 60; i = i + steps) {
                x.push(i);
            }
            return x;
        },   

        /**
         * schedular method running every minute
         **/
        everyMinute: function() {
            schedule.scheduleJob('* * * * *', function() {
                console.log('Every minute Schedular : ' + new Date().toString());
            });
        },

        /**
         * scrap data using google api using latlng collection
         **/
        scrap: function() {
            var step = 0;
            var rule = new schedule.RecurrenceRule();
            rule.second = scheduleUtil.skipSteps();//for interval
            scheduleUtil.phaseone = schedule.scheduleJob(rule, function() {                
                console.log('Every minute Schedular : ' + new Date().toString());
            });
        }
    } //end of module

module.exports = scheduleUtil;