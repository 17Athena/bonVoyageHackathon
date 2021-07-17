var token = ''


function searchCampsiteById(id, stateCode)
{
    var xhr = new XMLHttpRequest()
    xhr.open('GET', 'https://developer.nps.gov/api/v1/campgrounds?q=' + id + '&api_key=' + token, true)
    xhr.send()        
    xhr.onload = function() {   
        var data = JSON.parse(xhr.responseText)




        var titleSection = document.getElementById('titleInfo')
        var locationTitle = document.createElement('h1')
        locationTitle.innerHTML = data.data[0].name
        titleSection.appendChild(locationTitle)

        if(data.data[0].images[0]!=undefined)
        {
            var resultImage = document.createElement('img')
            resultImage.src = data.data[0].images[0].url
            document.getElementById('imageSection').appendChild(resultImage)
        }

        var informationContainer = document.getElementById('informationContainer')
        var description = document.createElement('p')        
        description.innerHTML = 'Description: ' + data.data[0].description
        informationContainer.appendChild(description)

        var lat = data.data[0].latitude
        var long = data.data[0].longitude
        document.getElementById('map').src='https://maps.google.com/maps?q=' + lat + ',' + long + '&t=&z=15&ie=UTF8&iwloc=&output=embed'
    }
}






function flightData(firstState, secondState, date)
{
    console.log("Searching for flights")
    var tempToken = 'WCRFWTT3drxHgzaJcEdMaDKEo2eT';
    //var url = "https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=" + firstState + "&destinationLocationCode=" + secondState + "&departureDate=" + date + "&adults=1&nonStop=false&max=5"
    var tempURL = "https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=SYD&destinationLocationCode=BKK&departureDate=2021-11-01&adults=1&nonStop=false&max=4&Authorization=" + tempToken

    var xhr = new XMLHttpRequest()
    xhr.open('GET', tempURL, true)
    xhr.send()
    xhr.onload = function() {
        console.log(xhr.responseText)
    }
}

