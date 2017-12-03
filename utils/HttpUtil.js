const http = require('http');
const https = require('https');
const { URL } = require('url');
const dn = require('dn');

module.exports = {

    fetch: function(url, callback, id){       
        
        try{
            if(url.indexOf('http') == -1){url= 'http://'+ url;}
            const myURL = new URL(url);        
            if("http:" == myURL.protocol){// Prints http:
                callback(0, url, id);                
            }else if("https:" == myURL.protocol){// Prints https:
                callback(1, url, id);
            }else{
                callback(-1, null, id);
            }
        }catch(err){
            console.log(err);
            callback(-1, null, id);
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
            callback(e.message, _id);
        });


    },
    secure: function(url, callback, _id) {

        https.get(url, (res) => {
            let response = '';
            if (res.statusCode == 200) {
                res.on('data', (d) => {
                    response+=d;
                });
                res.on('end', () => {
                    callback(response.toString('utf8'), _id);
                });
            }else{
                callback(res.statusCode, _id);
            }
        }).on('error', (e) => {
            callback(e.message.toString('utf8'), _id);
            
        });

        
    }

}
