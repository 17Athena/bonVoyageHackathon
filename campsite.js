

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


         var serverXhr = new XMLHttpRequest()
         serverXhr.open('GET', 'http://localhost:8080/updateClicks?location=' + id + "&zip=" + data.data[0].addresses[0].postalCode, true)
         serverXhr.send()
         serverXhr.onload = function() {
            var serverData = JSON.parse(serverXhr.responseText)
            var crowdedRating = serverData.finalScore
            var rightBox = document.getElementById('imgContainer');
            var meterImage = document.createElement('img')
            if(crowdedRating < 2)
            {
                meterImage.src = 'website/meters/lowMeter.png'
            }
            else if(crowdedRating > 3)
            {
                meterImage.src = 'website/meters/highMeter.png'
            }
            else
            {
                meterImage.src = 'website/meters/middleMeter.png'
            }
            rightBox.appendChild(meterImage)
         }



    }
}







