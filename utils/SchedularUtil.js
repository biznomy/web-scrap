const schedule = require('node-schedule');
const httpUtil = require("./HttpUtil");
const WebpageModel = require("../models/WebpageModel");
var scheduleUtil = {
        phaseone : {},
        skipSteps: function() {
            var x = [];
            var steps = 15;
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
        scrapStage1: function() {
            var step = 0;
            var rule = new schedule.RecurrenceRule();
            rule.second = scheduleUtil.skipSteps();//for interval
            scheduleUtil.phaseone = schedule.scheduleJob(rule, function() {                
                console.log('Every minute Schedular : ' + new Date().toString());
                
                const query = { $or: [{ 'status': false }, { 'status': null }] };                
                // const query = { $and: [ { "tag": { $not: { $in: ["recheck"] } } }, { $or: [ { "status": false }, { "status": null } ] } ] };                
                const fields = [];
                const skipSteps = { skip: step }
                WebpageModel.findOne(query, fields, skipSteps, function(err, info) {                    
                    if (err) {
                        console.log(err);
                    } else if (info != null) {
                        console.log('for : ', info._id, ', Date : ', new Date());
                        console.log('for : ', info.url, ', Date : ', new Date());                      
                        httpUtil.fetch(info.url, scheduleUtil.checkURLStatus, info._id);
                    }//close fetch
                    else if(info == null){
                            console.log('for no result: scrapper (phase one) is signout , result : ', info , new Date());
                            scheduleUtil.scrapStage1.cancel();
                    } 

                });
            });
        },
        checkURLStatus : function(status, url, id){
            if(status == 0){
                httpUtil.get(url, scheduleUtil.webpageScraped, id);    
            }else if(status == 1){
                httpUtil.secure(url, scheduleUtil.webpageScraped, id);    
            }else{
                scheduleUtil.webpageScraped(null, id);
            }
        },
        webpageScraped : function(data, id){
            // console.log(data);
            console.log(id);
            WebpageModel.findById(id , function(err, info) {
                if (!err) {
                    if(data ==  null){
                        info.tags.push("invalidUrl");
                    }else{
                        info.tags.push("stage1");
                        info.detail = data;
                    }                    
                    info.status = true;                    
                    info.save();
                } else {
                    console.log(err);
                }
            });
        }
        
    }
module.exports = scheduleUtil;