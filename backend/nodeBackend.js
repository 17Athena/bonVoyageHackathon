var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;



var url  = require('url');
var fs   = require('fs');
var querystring = require('path');
const firebase = require('firebase');
const Firestore = require('@google-cloud/firestore')

const db = new Firestore({
    projectId: 'poetic-world-320005',
    keyFilename: '/Users/vivekisukapalli/Downloads/poetic-world-320005-b0a30e86b47c.json'
})


const http = require('http');

const requestListener = function (req, res) {

    res.writeHead(200, {
        'Content-Type': 'text/html',
        'Access-Control-Allow-Origin': '*'
    });

    var pathName = req.url;
    var query = require('url').parse(req.url,true).query;

    if(pathName.includes('/updateClicks'))
    {
        var locId = query.location
        var zip = query.zip


        const docRef = db.collection('locations').doc(locId)
        docRef.get().then((doc) => {
            if (doc.exists) {                
                console.log("updating")
                 docRef.update({
                     clicks: doc.data().clicks + 1,
                     rating: doc.data().rating,
                     ratingCount: doc.data().ratingCount
                  });
            } else {
                console.log("creating new")
                docRef.set({
                    clicks:1.0,
                    rating: 0.0,
                    ratingCount: 0.0
                });
            }
        })        
        var totalScore = 0;
        totalScore += rateWeather(zip)
        totalScore += currentSeasonRating(zip)

        docRef.get().then((doc) => {
            if (doc.exists) {                
                var totalClicks = doc.data().clicks
                totalScore += totalClicks
                totalScore += doc.data().rating
                var finalScore = totalScore/4
                res.end('{\"Rating\": ' + doc.data().rating + ', \"finalScore\": ' + finalScore + '}')                
            } else {
                res.end("Failure")
            }
        })  
    }
    else if(pathName.includes('/addRating'))
    {
        var userRating = parseInt(query.rating)
        var locId = query.location
        const docRef = db.collection('locations').doc(locId)
        docRef.get().then((doc) => {
            if (doc.exists) {                
                console.log("updating rating")
                var newRatingCount = doc.data().ratingCount + 1
                console.log("New Rating Count:" + newRatingCount)
                var x = (doc.data().ratingCount * doc.data().rating) + userRating
                console.log("Total Rating Values:" + x)
                var newRating = ((doc.data().ratingCount * doc.data().rating) + userRating) / (newRatingCount)

                 docRef.update({
                     clicks: doc.data().clicks,
                     rating: newRating,
                     ratingCount: newRatingCount
                  });
            } else {
                console.log("creating new child for rating")
                docRef.set({
                    clicks:1.0,
                    rating: userRating,
                    ratingCount: 1.0
                });
            }
        })

    }

    function getWeather(zipCode)
    {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://api.weatherapi.com/v1/current.json?key=' + weatherAPIKey + '&q=' + zipCode, false)
        xhr.send()
        if (xhr.status === 200) 
        {
            var data = JSON.parse(xhr.responseText)
            return data.current.temp_f
        }        
    }

    function rateWeather(zipCode)
    {
        var temp = getWeather(zipCode)

        var tempRating = 0
        if(temp > 50)
        {
            tempRating++
        }
        if(temp > 60)
        {
            tempRating++
        }
        if(temp> 70)
        {
            tempRating++
        }
        if(temp > 80)
        {
            tempRating++
        }
        if(temp> 90)
        {
            tempRating++
        }
        if(temp> 100)
        {
            tempRating--
        }
        return tempRating
    }

    function currentSeasonRating(zipCode)
    {
        var date = new Date();
        var monthNum = date.getMonth() + 1;
        var score = 0;
        if(monthNum==12 || monthNum > 0)
        {
            score = 3;
        }
        if(monthNum > 2)
        {
            score = 4
        }
        if(monthNum > 5)
        {
            score = 5
        }
        if(monthNum > 8)
        {
            score = 4
        }
        var temp = getWeather(zipCode)
        {
            if(temp < 50)
            {
                score = 1
            }
        }
        return score
    }

    function getRating(locationId)
    {
        const docRef = db.collection('locations').doc(locationId)
        docRef.get().then((doc) => {
            if (doc.exists) {                
                return doc.data().rating
            } else {
                return 0   
            }
        })        

    }

    function getClientClicksScore(locationId)
    {
        const docRef = db.collection('locations').doc(locationId)
        docRef.get().then((doc) => {
            if (doc.exists) {                
                var totalClicks = doc.data().clicks
                return totalClicks/10
            } else {
                return 0   
            }
        })  
    }

    function getScore(zipCode, locationId)
    {
        

        // totalScore += getRating(locationId)
        // totalScore += getClientClicksScore(locationId)
        
        
    }



}

const server = http.createServer(requestListener);
server.listen(8080);