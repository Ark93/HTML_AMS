( function myScope(){
	document.addEventListener("DOMContentLoaded",function(event){
		var app = {
			DOMapi: domApiFunc(),
			dataApi : dataApiFunc(),
			addMenu : addMenuFunc,
			addSections: addSectionsfunc,
			mainContainer: null,
			sections : null,
			menu: null,
			init: init
		}

	app.init();

	function init(){
		this.addMenu();
		this.addSections();
	}

	function addMenuFunc(){
		function constructMenu(){
			var container = this.DOMapi.getContainer("main-nav"); //contenedor de nav
			var newNav = document.createElement("nav");
			var newList = document.createElement("ul");
			newNav.appendChild("newList");
			container.appendChild(newNav);
			function addList(item,index){
				var index = index + 1;
				newList.innerHTML += "<li>"(item.title + " " + index) + "</li>";
			}
			this.DOMapi.addItems(this.menu,addList);
		}

		function addMenuToDom(obj){
			console.log(obj);
			this.sections = obj.dataApi.sections;
			this.menu = obj.data.menu;
			constructMenu.call(this);
		}
		console.log(this);
		this.dataApi.getData(addMenuToDom.bind(this))
	}

	function addSectionsfunc(){
		var _self = this;
		var observer = setInterval(function(){
			if(_self.sections){
				clearInterval(observer);
				var container = self.DOMapi().getSectionsContainer("#section-container");
				function addItems(item,index){
					var section
				}	
					var section = document.createElement('section');
					section.className = 'section' ;
					var header = document.createElement('header');
					header.className = 'section-header';
					header.textContent = item.title;
					var article = document.createElement('article');
					var img = document.createElement('img');
					img.src = item.image;
					section.appendChild(addSectionArticle());
					var p = document.createElement('p');
					p.textContent = item.article;
					section.appendChild(header);
					section.appendChild(article);
					container.appendChild(section);
			}
		},1)
			
		//sections.innerHTML = "Entry: 0 " + " <br><p>text</p>" 
	
	};

	function dataApiFunc(){
		var URLs = {
			get: "data/sections.json",
			post: "nope"
		}
		function getData(callback){
			var xmlhttp = new XMLHttpRequest();
			xmlhttp.onreadystatechange= function(){
				if(xmlhttp.readystate == 4 && xmlhttp.status==200){
					callback(JSON.parse(xmlhttp.responseText));
				}
			};
			xmlhttp.open("GET", URLs.get, true);
			xmlhttp.send();
		}

		function sendData(){

		}

		return {
			getData: getData
		}
	}

	function domApiFunc(){
		function getContainer(id){

			return document.querySelectorAll(id);
		}

		function addItems(items, callback){
			for (var i=0; i< items.length; i++){
				callback(items[i]);
			};
		}
		var publicAPI ={
			getContainer : getContainer,
			addItems: addItems
		}
		return publicAPI;
		}
	});

})();