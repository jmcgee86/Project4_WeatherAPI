/* global $ APIKEY */

$(document).ready(function() {
	$.ajax({
		method: "GET",
		url: "https://api.openweathermap.org/data/2.5/forecast?",
		data: {
			//q: "London, UK",
			id: "524901",	
			appid: APIKEY
		},
		success: function(data) {
			//if (data.status === "ok") {
				console.log(data);
			}
		
	});
	
	
	
	
});