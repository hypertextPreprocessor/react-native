		window.addEventListener('load',func,false);
		function func(){
		var tds = document.querySelectorAll('td');
		for(var i=0;i<tds.length;i++){
			if(tds[i].childNodes[0] == undefined){
				tds[i].setAttribute("contenteditable",true);
			}else if(/\S/.test(tds[i].childNodes.item(0).nodeValue)){
				if(tds[i].childNodes[0].nodeType == 3){
					tds[i].setAttribute("contenteditable",true);
				}
			}
			
		}
		}