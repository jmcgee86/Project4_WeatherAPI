/* global $ APIKEY navigator*/

$(document).ready(function() {
  
  var fail = document.getElementById("failed");

  if (!navigator.geolocation){
    //fail.style.visibility = "visible";
    console.log("no geo location");
    error();
    return;
  }

  function success(position) {
    var latitude  = position.coords.latitude;
    var longitude = position.coords.longitude;
	
	$.ajax({
		method: "GET",
		url: "https://api.openweathermap.org/data/2.5/weather",
		data: {
			lat: latitude,
			lon: longitude,
			appid: APIKEY
		},
		success: function(data) {
			//if (data.status === "ok") {
				console.log(data);
				
				function fConverter(valNum1) {
				document.getElementById("temp").innerHTML = Math.round(((valNum1-273.15)*1.8)+32) + "°F";
				}
				
				fConverter (data.main.temp);

				function cConverter(valNum1){
				 document.getElementById("temp").innerHTML= Math.round(valNum1-273.15) + "°C";
				}
				
				var weatherIcon = "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
				document.getElementById("icon").innerHTML = '<img src = "' + weatherIcon + '">';
				document.getElementById("description").innerHTML = data.weather[0].description;
				document.getElementById("city").innerHTML = data.name;
				
				$('#changetemp').click(function() {
					if (document.getElementById("changetemp").innerHTML === "F°"){
						cConverter(data.main.temp);
						document.getElementById("changetemp").innerHTML = "C°";
						return;
					}
					else {
						fConverter(data.main.temp);
						document.getElementById("changetemp").innerHTML = "F°";
					}
					
	});	
					function changeTheme(){
					if (data.weather[0].main == "Clouds"){//clouds
						document.getElementById("displayimg").innerHTML = "<img src = 'https://images.pexels.com/photos/158163/clouds-cloudporn-weather-lookup-158163.jpeg?w=1260&h=750&dpr=2&auto=compress&cs=tinysrgb'>";
					}
					else if (data.weather[0].main == "Rain"){//rain
						document.getElementById("displayimg").innerHTML = "<img src = 'https://images.pexels.com/photos/110874/pexels-photo-110874.jpeg?w=260&h=260&dpr=2&auto=compress&cs=tinysrgb'>";
					}
					else if (data.weather[0].main == "Snow"){//snow
					document.getElementById("displayimg").innerHTML = "<img src = 'https://images.pexels.com/photos/60561/winter-snow-nature-60561.jpeg?w=1260&h=750&dpr=2&auto=compress&cs=tinysrgb'>";
				}
				else if (data.weather[0].main == "Clear"){//clear
					document.getElementById("displayimg").innerHTML = "<img src = 'https://images.pexels.com/photos/3768/sky-sunny-clouds-cloudy.jpg?w=1260&h=750&dpr=2&auto=compress&cs=tinysrgb'>"
				}
				else if (data.weather[0].main == "Mist"){//mist
					document.getElementById("displayimg").innerHTML = "<img src = 'https://images.pexels.com/photos/5230/road-fog-foggy-mist.jpg?w=1260&h=750&dpr=2&auto=compress&cs=tinysrgb'>"
				}
				else if (data.weather[0].main == "Thunder"){//thunder
					document.getElementById("displayimg").innerHTML = "<img src = 'https://static.pexels.com/photos/53459/lightning-storm-weather-sky-53459.jpeg'>"
				}
		}
		
		function warning(){
			console.log("warning check");
			if (data.weather[0].main == "Extreme"){
				document.getElementById("warn").innerHTML = '<h3>**Warning, extreme weather expected in your area.**</h3>';
			}
		}
changeTheme();
warning();
			}
			
			
	});
  	
  }
  
  function error() {
    fail.style.visibility = "visible";
    console.log("fail");
    var zipcode = document.getElementById("failed").value; +",US";
 
    $("#failed").submit(function(event){
		event.preventDefault();
		console.log("ziptest");
    	var zipcode = document.getElementById("zc").value; +",US";
    	$.ajax({
		method: "GET",
		url: "https://api.openweathermap.org/data/2.5/weather",
		data: {
			zip: zipcode, 
			appid: APIKEY
		},
		success: function(data) {
				console.log(data);
				
				function fConverter(valNum1) {
				document.getElementById("temp").innerHTML = Math.round(((valNum1-273.15)*1.8)+32) + "°F";
				}
				
				fConverter (data.main.temp);

				function cConverter(valNum1){
				 document.getElementById("temp").innerHTML= Math.round(valNum1-273.15) + "°C";
				}
				
				var weatherIcon = "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
				document.getElementById("icon").innerHTML = '<img src = "' + weatherIcon + '">';
				document.getElementById("description").innerHTML = data.weather[0].description;
				document.getElementById("city").innerHTML = data.name;
				
				$('#changetemp').click(function() {
					if (document.getElementById("changetemp").innerHTML === "F°"){
						cConverter(data.main.temp);
						document.getElementById("changetemp").innerHTML = "C°";
						return;
					}
					else {
						fConverter(data.main.temp);
						document.getElementById("changetemp").innerHTML = "F°";
					}
					
	});	
					function changeTheme(){
					if (data.weather[0].main == "Clouds"){//clouds
						document.getElementById("displayimg").innerHTML = "<img src = 'https://images.pexels.com/photos/158163/clouds-cloudporn-weather-lookup-158163.jpeg?w=1260&h=750&dpr=2&auto=compress&cs=tinysrgb'>";
					}
					else if (data.weather[0].main == "Rain"){//rain
						document.getElementById("displayimg").innerHTML = "<img src = 'https://images.pexels.com/photos/110874/pexels-photo-110874.jpeg?w=260&h=260&dpr=2&auto=compress&cs=tinysrgb'>";
					}
					else if (data.weather[0].main == "Snow"){//snow
					document.getElementById("displayimg").innerHTML = "<img src = 'https://images.pexels.com/photos/60561/winter-snow-nature-60561.jpeg?w=1260&h=750&dpr=2&auto=compress&cs=tinysrgb'>";
				}
				else if (data.weather[0].main == "Clear"){//clear
					document.getElementById("displayimg").innerHTML = "<img src = 'https://images.pexels.com/photos/3768/sky-sunny-clouds-cloudy.jpg?w=1260&h=750&dpr=2&auto=compress&cs=tinysrgb'>"
				}
				else if (data.weather[0].main == "Mist"){//mist
					document.getElementById("displayimg").innerHTML = "<img src = 'https://images.pexels.com/photos/5230/road-fog-foggy-mist.jpg?w=1260&h=750&dpr=2&auto=compress&cs=tinysrgb'>"
				}
				else if (data.weather[0].main == "Thunder"){//thunder
					document.getElementById("displayimg").innerHTML = "<img src = 'https://static.pexels.com/photos/53459/lightning-storm-weather-sky-53459.jpeg'>"
				}
		}
		
		function warning(){
			console.log("warning check");
			if (data.weather[0].main == "Extreme"){
				document.getElementById("warn").innerHTML = '<h3>**Warning, extreme weather expected in your area.**</h3>';
			}
		}
changeTheme();
warning();
			}
			
			
	//});
    
	//		}
    	
    	});
    
	});
  }
 
 navigator.geolocation.getCurrentPosition(success,error);
  
  
});