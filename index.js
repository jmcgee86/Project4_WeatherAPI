/* global $ APIKEY navigator*/

$(document).ready(function() {
  
  var fail = document.getElementById("failed");

  if (!navigator.geolocation){
    fail.style.visibility = "visible";
    console.log("no geo location");
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
				 document.getElementById("temp").innerHTML= Math.round (valNum1-273.15) + "C°";
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
			}
    	
    	});
    
	});
  }
 
 navigator.geolocation.getCurrentPosition(success, error);
  
  
});



/*
change background img base on id - not currently working
				
				function changeTheme(){
					console.log("changeimg");
					if (data.weather[0].id === 804){
						document.getElementById("displayimg").style.backgroundImage = "url('https://images.unsplash.com/photo-1469282311538-c8b591f67d2e?auto=format&fit=crop&w=1951&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D')";//cloudy
					}
				if (200 <= data.weather[0].id < 300 ){
					document.getElementById("displayimg").style.backgroundImage = "url('https://images.unsplash.com/photo-1506432734318-4bf212257692?auto=format&fit=crop&w=1950&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D')";//thunder
				}
				else if (300 <= data.weather[0].id < 400 ){
					document.getElementById("displayimg").style.backgroundImage = "url('https://images.unsplash.com/photo-1498946765439-9c2480c63e19?auto=format&fit=crop&w=934&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D')";//rain
				}
				else if (500 <= data.weather[0].id < 600 ){
					document.getElementById("displayimg").style.backgroundImage = "url('https://images.unsplash.com/photo-1498946765439-9c2480c63e19?auto=format&fit=crop&w=934&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D')";//rain
				}
				else if (600 <= data.weather[0].id < 700 ){
					document.getElementById("weatherdisplay").style.backgroundImage = "url('https://images.unsplash.com/photo-1483719728008-b73ef3e9956b?auto=format&fit=crop&w=934&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D')";//snow
				}else if (data.weather[0].id === 800 ){
					document.getElementById("displayimg").style.backgroundImage = "url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=2689&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D')";//nice
				}
				else if (801 <= data.weather[0].id < 810 ){
					document.getElementById("displayimg").style.backgroundImage = "url('https://images.unsplash.com/photo-1469282311538-c8b591f67d2e?auto=format&fit=crop&w=1951&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D')";//cloudy
				}
				else if (900 <= data.weather[0].id < 910 ){
					document.getElementById("bg").innerHTML = "";//extreme
				}
				}
changeTheme();

*/