//javaScript Library
;(function(window,undefined){

	var	Document = document
	,	Window = window
	,	body = Document.body
	,	div = document.createElement('div')
	,	emptyElement = document.createElement('div')
	,	emptyFunction = function(){}
	,	prototypeElement = ( window.Element || window.HTMLElement || window.Node || window.NodeList ).prototype;
	
	emptyElement.textContent = 'Empty';
		
	//(windows IE lower varsion);
	if( !Document.getElementsByClassName ){
		Document.getElementsByClassName = function(selector){
			var
			correct = {},
			i,j;
		    if (Document.all){
		        var all = document.all;
		    }
		    else {
		       var all = Document.getElementsByTagName("*");
		    }
		    for (i=0,j=0;i<all.length;i++) {
		        if (all[i].className == selector) {
		            correct[j] = all[i];
		            j++;
		        }
		    };
		}
	    return correct;
	};
	if( !Document.querySelector ){
		prototypeElement.querySelector = Document.querySelector = function(selector){
			//to use Sizzle.js, if not found method "querySelector".
			return sizzle(selector);
		};
	};
	
	
	//selectorFunction core
	var selectorFunction = emptyFunction;
	
	selectorFunction.prototype = {
		id : function(selector){
			if(typeof selector === 'string'){
				var elem = Document.getElementById(selector);
				return elem!==undefined = elem ? elem : emptyElement;
			}else{
				return emptyElement;
			};
		},
		class : function(selector){
			if(typeof selector === 'string'){
				var elem = Document.getElementsByClassName(selector);
				return elem!==undefined ? elem : emptyElement;
			}else{
				return emptyElement;
			};
		},
		Tag : function(selector){
			if(typeof selector === 'string'){
				var elem = Document.getElementsByTagName(selector);
				return elem!==undefined ? elem : emptyElement;
			}else{
				return emptyElement;
			};
		},
		query : function(selector){
			if(typeof selector === 'string'){
				var elem = Document.querySelector(selector);
				return elem!==undefined ? elem : emptyElement;
			}else{
				return emptyElement;
			};
		}
		queryAll : function(selector){
			if(typeof selector === 'string'){
				var elem!==undefined = Document.querySelectorAll(selector);
				return elem ? elem : emptyElement;
			}else{
				return emptyElement;
			};
		}
	};
	
	Document.createHTML	= function(html){
		div.innerHTML = html;
		return div.children[0];
	};
	
	Window.getElmBy = new selectorFunction;
	
	//methods
	var methods = {
		'find' : function find(selector){
			var self = this;
			if(typeof selector === 'string'){
				var elem = self.querySelectorAll(selector);
				return elem!==undefined ? elem : emptyElement;
			}else{
				return emptyElement;
			}
		},
		'append' : function append(object){
			var	elem = this;
			elem.appendChild(object);
			return elem;
		},
		'appendTo' : function appendTo(object){
			var	elem = this;
			object.appendChild(elem);
			return elem;
		},
		'prepend' : function prepend(object){
			var	self = this
			,	elem = self.parent;
			elem.insertBefore(object, self.childNodes[0]);
			return elem;
		},
		'before' : function before(object){
			var self = this
			,	elem = this.parentNode;
			elem.insertBefore(object, self);
			return self;
		},
		'after' : function after(object){
			var self = this.next()
			,	elem = self.parentNode;
			elem.insertBefore(object, self);
			return self;
		},
		'remove' : function remove(){
			var self = this
			,	elem	
			,	elems = Array.prototype.slice.call(elem)
			,	i = 0;
			for(;(elem=elems[i])!=null;i++){
				elem.parentNode.removeChild(elem);
			};
			return elem;
		},
		'next' : function next(){
			var elem = this
			,	nextElem = elem.nextSibling;
			while(nextElem && nextElem.nodeType != 1) {
			    nextElem = nextElem.nextSibling
			};
			return nextElem?nextElem:emptyElement;
		},
		'on' : function on( type, callback ){
			var callback = callback ? callback : emptyFunction;
			this.addEventListener(
				type,
				function(e){
					var calleeEvent = arguments.callee;
					this.offEvent = function(){
						this.removeEventListener(type,calleeEvent,false);
					};
					e.stopPropagation();
					if( !callback.call(this,e)
					){
						e.preventDefault();
					};
				},false);
			return this;
		}	
	};
	
	for(var keys in methods){
		if(!prototypeElement[keys])prototypeElement[keys] = methods[keys];
	};
	
})(window);