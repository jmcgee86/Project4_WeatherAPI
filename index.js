/* global $ APIKEY navigator*/

$(document).ready(function() {
	
	
  
  var failed = document.getElementById("fail");

  if (!navigator.geolocation){
    failed.style.visibility = "visible";
    console.log("no geo location");
    return;
  }

  function success(position) {
    var latitude  = position.coords.latitude;
    var longitude = position.coords.longitude;
	
	$.ajax({
		method: "GET",
		url: "https://api.openweathermap.org/data/2.5/forecast?",
		data: {
			lat: latitude,
			lon: longitude,
			appid: APIKEY
		},
		success: function(data) {
			//if (data.status === "ok") {
				console.log(data);
				var weatherIcon = "http://openweathermap.org/img/w/" + data.list[0].weather[0].icon + ".png";
				document.getElementById("icon").innerHTML = '<img src = "' + weatherIcon + '">';
				
				function fConverter(valNum1,valNum2, valNum3) {
				document.getElementById("temp").innerHTML = Math.round(((valNum1-273.15)*1.8)+32) + "°F";
				document.getElementById("min").innerHTML = Math.round(((valNum2-273.15)*1.8)+32) + "°F";
				document.getElementById("max").innerHTML = Math.round(((valNum3-273.15)*1.8)+32) + "°F";
				}
				
				fConverter (data.list[0].main.temp, data.list[0].main.temp_min, data.list[0].main.temp_max);

				function cConverter(valNum1, valNum2, valNum3){
				 document.getElementById("temp").innerHTML= Math.round (valNum1-273.15) + "C°";
				 document.getElementById("min").innerHTML= Math.round (valNum2-273.15) + "C°";
				 document.getElementById("max").innerHTML= Math.round (valNum3-273.15) + "C°";
				}
				
				$('#changetemp').click(function() {
					if (document.getElementById("changetemp").innerHTML === "F°"){
						cConverter(data.list[0].main.temp, data.list[0].main.temp_min, data.list[0].main.temp_max);
						document.getElementById("changetemp").innerHTML = "C°";
						return;
					}
					else {
						fConverter(data.list[0].main.temp, data.list[0].main.temp_min, data.list[0].main.temp_max);
						document.getElementById("changetemp").innerHTML = "F°";
					}
	});	
				
				//var tempf = fConverter(data.list[0].main.temp);
				//var tempfmin  = fConverter(data.list[0].main.temp_min);
				//var tempfmax = fConverter(data.list[0].main.temp_max);
				//document.getElementById("temp").innerHTML = tempf + "°F";
				//document.getElementById("min").innerHTML = tempfmin +"°F";
				//document.getElementById("max").innerHTML = tempfmax +"°F";
				
				//cConverter(data.list[0].main.temp, data.list[0].main.temp_min, data.list[0].main.temp_max);
			}
			
			
	});
	
  }
  function error() {
    failed.style.visibility = "visible";
    console.log("fail");
    var zipcode = document.getElementById("failed").value; +",US";
 
    $("#failed").submit(function(event){
		event.preventDefault();
		console.log("ziptest");
    	var zipcode = document.getElementById("zc").value; +",US";
    	$.ajax({
		method: "GET",
		url: "https://api.openweathermap.org/data/2.5/forecast?",
		data: {
			zip: zipcode, 
			appid: APIKEY
		},
		success: function(data) {
			//if (data.status === "ok") {
				console.log(data);
			}
    	
    	});
    
	});
  }
  //}
  navigator.geolocation.getCurrentPosition(success, error);
  
  
});


/*$('#changetemp').click(function() {
					if (document.getElementById("changetemp").innerHTML === "F°"){
						cConverter;
						document.getElementById("changetemp").innerHTML = "C°";
						return;
					}
					else {
						fConverter;
						document.getElementById("changetemp").innerHTML = "F°";
					}
	});	*/