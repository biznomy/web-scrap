const http = require('http');
const https = require('https');
const { URL } = require('url');

module.exports = {

    fetch: function(url){       
        const myURL = new URL(url);
        console.log(myURL.protocol);
        // Prints https:

    },
    get: function(url) {

        //'http://nodejs.org/dist/index.json'
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
                    console.log(rawData);
                } catch (e) {
                    console.log(e.message);
                }
            });
        }).on('error', (e) => {
            console.log(`Got error: ${e.message}`);
        });


    },
    secure: function(url, callback, id, keyword) {

        https.get(url, (res) => {
            // console.log('url : ' , url);
            // console.log('statusCode:', res.statusCode);
            var response = '';
            if (res.statusCode == 200) {
                res.on('data', (d) => {
                    response+=d;
                });
                res.on('end', () => {
                    // console.log(response.toString());
                    callback(response.toString('utf8'), id, keyword);
                });
            }
        }).on('error', (e) => {
            console.error(e);
        });

        
    }

}
