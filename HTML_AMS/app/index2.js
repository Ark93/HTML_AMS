( function myScope(){
	
	var app = {
		myDOMapi: domApiFunc,
		addSections: addSectionsfunc,
		updateArticle : updateArticleText,
		mainContainer: null,
		init: init
	}

	app.init();

	function init(){
		this.addSections();
	}

	//funcion que reciba 1.- arreglo, 2.- funcion (callback)

	function addSectionsfunc(){

		this.mainContainer = this.myDOMapi().getSectionsContainer("#section-container");
		var sections = [
		'<section>section 1</section>'
		];
		console.log(this.mainContainer);
		function addItemHTML(item){
			this.mainContainer.innerHTML += item;
		}

		this.myDOMapi().addItems(sections,addItemHTML.bind(this));
	}

	function updateArticleText(){
		console.log('i');
		var sections = this.myDOMapi().getSections('section');
		for(var i=0;i<sections.length;i++){
			var els = sections[i].children[1].getElementsByTagName('p');
			console.log(els);
			for (var j = 0; j < els.length; j++){
					els[j].textContent = "New text for article";
			};
		};
	}
	
	function domApiFunc(){
		function getSectionsContainer(id){

			return document.querySelectorAll(id);
		}

		function addItems(items, callback){
			for (var i=0; i< items.length; i++){
				callback(items[i]);
			};
		}
		var publicAPI ={
			getSectionsContainer : getSectionsContainer,
			addItems: addItems
		}
		return publicAPI;
	};

})();