/* To display content on whether user is logged in or not*/

var item = localStorage.getItem("sessionKey");
loadHeader(item);
loadContent(item);

function loadHeader(item) {
	if (hasKey(item)) {
		document.getElementById("headerW").style.display = "block";
		document.getElementById("headerWO").style.display = "none";
	} else {
		document.getElementById("headerWO").style.display = "block";
		document.getElementById("headerW").style.display = "none";
	}
}

function hasKey(item) {
	
	//var keyList = ["CCO-1", "CC0-2", "A-1", "A-2"];
	//var found = false;
	//for (var i =0; i < keyList.length; i ++) {
	//	if (item == keyList[i]) {
	//		found = true;
	//		break;
	//	}
	//}
	
	var found = 
		$.ajax({
			type: "POST",
			url: "content_validation_handler.php",
			data: item,
			success: function(results){
				alert(results);
			}
		});

	return found;
}

function loadContent(item) {
	if (document.getElementById("no-log-display")) {
		if (hasKey(item)) {
			document.getElementById("no-log-display").style.display = "none";
			document.getElementById("content").style.display = "block";
		} else {
			document.getElementById("no-log-display").style.display = "block";
			document.getElementById("content").style.display = "none";
		}
	}
}