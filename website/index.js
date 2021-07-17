var token = ''


function addParameterName()
{
    window.location.href = 'index.html?k=' + document.getElementById('keywordField').value + "&state=" + document.getElementById('stateField').value
}


const x = document.getElementById("demo");

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else { 
    alert("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
    var lat = position.coords.latitude
    var long = position.coords.longitude
    var location = new XMLHttpRequest()
    location.open('GET', 'https://api.bigdatacloud.net/data/reverse-geocode-client?latitude='+ lat +'&longitude='+ long +'&localityLanguage=en', true)
    location.send() 
    location.onload = function() {
        var data = JSON.parse(location.latitude);
        console.log()
        alert(data);
    }

}

function initMenu()
{
    $.getJSON("airports.json", function(data) {
        for(var i = 0; i < data.length; i++)
        {
            console.log(data)
        }
    })
    
}





function getCampsiteInfo(id)
{
    
}


function searchForResults(keyword, stateCode)
{
    
    var resultContainer = document.getElementById('resultsContainer')

    console.log("searching")
    if(keyword.includes('camp'))
    {
        resultContainer.innerHTML = '';
        var xhr = new XMLHttpRequest()
        xhr.open('GET', 'https://developer.nps.gov/api/v1/campgrounds?' + '&stateCode=' + stateCode + '&limit=50&api_key=' + token, true)
        xhr.send()        
        xhr.onload = function() {   
            var data = JSON.parse(xhr.responseText)

            for(var i = 0; i < data.data.length; i++)
            {
                var thisResult = document.createElement('div')
                thisResult.classList.add('result')
                var locationName = document.createElement('h1')
                var description = document.createElement('p')
                
                var locationID = data.data[i].id
                var url = "/campsite.html?id=" + locationID + '&stateCode=' + stateCode
        
                var aTag = document.createElement('a');
                aTag.setAttribute('href', url)

                
                
                
                locationName.innerHTML = data.data[i].name
                description.innerHTML = data.data[i].description
                thisResult.appendChild(locationName)
                thisResult.appendChild(description)
                if(data.data[i].images[0]!=undefined)
                {
                    var resultImage = document.createElement('img')
                    //console.log("Undefined")
                    resultImage.src = data.data[i].images[0].url
                    thisResult.appendChild(resultImage)
                }
                

                //thisResult.setAttribute('data-aos', 'fade-up')
                aTag.appendChild(thisResult)
                resultContainer.appendChild(aTag);
            }
        }        
    }
    else if(keyword.includes('activities'))
    {

    }
}


