/*var search
function showCurrentValue(event)
{
    const value = event.target.value;
    search = value;    
    searchForResults(search)
}*/

function addParameterName()
{
    window.location.href = 'index.html?k=' + document.getElementById('keywordField').value
}




function searchForResults(keyword)
{
    
    var resultContainer = document.getElementById('resultsContainer')

    console.log("searching")
    if(keyword.includes('campsite'))
    {
        resultContainer.innerHTML = '';
        var xhr = new XMLHttpRequest()
        xhr.open('GET', 'https://developer.nps.gov/api/v1/campgrounds?limit=50&api_key=*****', true)
        xhr.send()        
        xhr.onload = function() {   
            var data = JSON.parse(xhr.responseText)

            for(var i = 0; i < data.data.length; i++)
            {
                var thisResult = document.createElement('div')
                thisResult.classList.add('result')
                var locationName = document.createElement('h1')
                var description = document.createElement('p')
                


                
                
                
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
                resultContainer.appendChild(thisResult);
            }
        }        
    }
    else if(keyword.includes('activities'))
    {

    }
}


