/* global $ APIKEY */

$(document).ready(function() {
	$.ajax({
		method: "GET",
		url: "",
		data: {

			apiKey: APIKEY
		},
		success: function(data) {
			if (data.status === "ok") {
				console.log(data);
				
			}
		}
	});
	
	
	
	
});