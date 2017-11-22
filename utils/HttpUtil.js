const http = require('http');
const https = require('https');
const { URL } = require('url');

module.exports = {

    fetch: function(url){       
        const myURL = new URL(url);        
        if("http:" == myURL.protocol){// Prints http:
            // console.log(myURL.protocol);
            return 0;
        }else if("https:" == myURL.protocol){// Prints https:
            // console.log(myURL.protocol);
            return 1;
        }else{
            console.log(myURL.protocol);
            return -1;
        }
    },
    get: function(url, callback, _id) {       
        http.get(url, (res) => {
            const statusCode = res.statusCode;
            const contentType = res.headers['content-type'];

            let error;
            if (statusCode !== 200) {
                error = new Error(`Request Failed.\n` +
                    `Status Code: ${statusCode}`);
            }
            res.setEncoding('utf8');
            let rawData = '';
            res.on('data', (chunk) => rawData += chunk);
            res.on('end', () => {
                try {
                    callback(rawData.toString('utf8'), _id);
                } catch (e) {
                    console.log(e.message);
                }
            });
        }).on('error', (e) => {
            console.log(`Got error: ${e.message}`);
        });


    },
    secure: function(url, callback, _id) {

        https.get(url, (res) => {
            var response = '';
            if (res.statusCode == 200) {
                res.on('data', (d) => {
                    response+=d;
                });
                res.on('end', () => {
                    callback(response.toString('utf8'), _id);
                });
            }
        }).on('error', (e) => {
            console.log(`Got error: ${e.message}`);
        });

        
    }

}
