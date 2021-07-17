    
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var weatherAPIKey = '58402fb2f7344bad89824757211707'

const Firestore = require('@google-cloud/firestore')

const db = new Firestore({
    projectId: 'poetic-world-320005',
    keyFilename: '/Users/vivekisukapalli/Downloads/poetic-world-320005-b0a30e86b47c.json'
})


main()

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

async function getRating(locationId)
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

async function getClientClicksScore(locationId)
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

async function getScore(zipCode, locationId)
{
    var totalScore = 0;
    totalScore += rateWeather(zipCode)
    totalScore +=  currentSeasonRating(zipCode)
    // totalScore += await getRating(locationId)
    // totalScore += await getClientClicksScore(locationId)
    return totalScore/4
    
}

    function main()
    {
        var x = await getScore('08820', 'A2170E17-8751-4CAA-9446-9BD582AF50F7')
        console.log();


    }