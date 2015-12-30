( function myScope(){
	
	var API= function(){
		function getSections(id){
			return document.querySelectorAll(id);
		}	
		var publicAPI = {
			getSections: getSections
		}
		return publicAPI;
	}();
	
	var updateArticleText = function updateArticleText(){
		var sections = API.getSections('section');
		for(var i=0;i<sections.length;i++){
			var els = sections[i].children[1].getElementsByTagName('p');
			console.log(els);
			for (var j = 0; j < els.length; j++){
					els[j].textContent = "New text for article";
			};
		};


	}

	updateArticleText();
	
})();