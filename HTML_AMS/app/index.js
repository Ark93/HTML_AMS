( function myScope(){
	document.addEventListener("DOMContentLoaded",function(event){
		var app = {
			DOMapi: domApiFunc(),
			dataApi : dataApiFunc(),
			addMenu : addMenuFunc,
			addSections: addSectionsfunc,
			registerEvent: registerEventsFunc,
			mainContainer: null,
			sections : null,
			menu: null,
			init: init
		}

	app.init();

	function init(){
		this.addMenu();
		this.addSections();
		this.registerEvent();
		
	}

	function addMenuFunc(){

		function constructMenu(){
			var container = this.DOMapi.getContainer("#aside-section"); //contenedor de nav
			var newNav = document.createElement("nav");
			var newList = document.createElement("ul");
			newNav.appendChild(newList);
			newNav.id="main-nav";
			container.appendChild(newNav);
			function addList(item,index){
				var index = index + 1;
				newList.innerHTML += "<li><a href='#'>"+(item.title + " " + item.id) + "</a></li>";
			}
			this.DOMapi.addItems(this.menu,addList);
		}

		function addMenuToDom(obj){
			this.sections = obj.data.sections;
			this.menu = obj.data.menu;
			constructMenu.call(this);
		}		
		this.dataApi.getData(addMenuToDom.bind(this))
	};

	function addSectionsfunc(){
		var _self = this;
		var observer = setInterval(function(){
			if(_self.sections){
				clearInterval(observer);
				var container = _self.DOMapi.getContainer("#section-container");

				function addSection(item,index){
					var section = document.createElement('section');
					section.className = 'section' ;
					var header = document.createElement('header');
					header.className = 'section-header';
					var h2 = document.createElement('h2');
					h2.textContent =item.title + " " + item.id;
					var button = document.createElement('button');
					button.textContent="push"
					header.appendChild(h2);
					header.appendChild(button);

					var article = document.createElement('article');
					var img = document.createElement('img');
					img.src = item.image;
					img.className="section-image"
					var p = document.createElement('p');
					p.textContent = item.article;
					article.appendChild(img);
					article.appendChild(p);
					section.appendChild(header);
					section.appendChild(article);
					container.appendChild(section);
					}

				_self.DOMapi.addItems(_self.sections,addSection);
				
			}
		},1)
				
	};

	function registerEventsFunc () {
		var menuMobileBtn = document.querySelector("#menu-mobile-btn"),
		menuMobileContainer = document.querySelector("#menu-mobile-container"),
		bodyTag = document.getElementsByTagName('body')[0],
		target = null;
		menuMobileBtn.addEventListener("touchstart", function (event) {
			target = event.target.localName === 'span' ? event.target.parentElement : event.target
			if (target.classList.length === 0) {
				bodyTag.classList.add('no-scroll');
				menuMobileContainer.classList.add('open');
				target.classList.add('open');
			}else {
				bodyTag.classList.remove('no-scroll');
				menuMobileContainer.classList.remove('open');
				target.classList.remove('open');
			};
		}, false);
	}



	function dataApiFunc(){
		var URLs = {
			get: "app/data/sections.json",
			post: "nope"
		}
		function getData(callBack){
			var xmlhttp = new XMLHttpRequest();
			xmlhttp.onreadystatechange= function(){

				if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
					console.log(xmlhttp.responseText);
					callBack(JSON.parse(xmlhttp.responseText));
				};
			};
			xmlhttp.open('GET', URLs.get, true);
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
			return document.querySelector(id);
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