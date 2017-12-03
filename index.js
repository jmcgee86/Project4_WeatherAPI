/* global $ APIKEY navigator*/

$(document).ready(function() {
  
  var failed = document.getElementById("fail");

  if (!navigator.geolocation){
    failed.style.visibility = "visible";
    console.log("no geo location");
    return;
  }

  // navigator.geolocation.getCurrentPosition(success, error);


  function success(position) {
    var latitude  = position.coords.latitude;
    var longitude = position.coords.longitude;
    console.log(latitude);
    console.log("location success");

	
	$.ajax({
		method: "GET",
		url: "https://api.openweathermap.org/data/2.5/forecast?",
		data: {
			//q: "London, UK",
			//zip: "02915,us",
			lat: latitude,
			lon: longitude,
			appid: APIKEY
		},
		success: function(data) {
			//if (data.status === "ok") {
				console.log(data);
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