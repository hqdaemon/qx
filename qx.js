(() => {
var qx = (selector) =>{
	if(typeof selector === "object"){
		return new qxo([selector]);
	}
	var itemsList = [];
	var elements = document.querySelectorAll(selector);
	elements.forEach((currentValue) => {
		itemsList.push(currentValue);
	});
	return new qxo(itemsList);
};

var qxo = function(items){
	this.elmts = items;
};

qxo.fn = qxo.prototype = {
	// Get
	get(index = false){
		if(index === false){
			return this.elmts;
		} else if(typeof this.elmts[index] !== 'undefined'){
			return this.elmts[index];
		}
		return false;
	},
	// Adding Event Listeners to elements.
	on(events,fn){
		let passive = qx.fn.getPassive();

		// Split events list and add Event Listener for each
		let eventsList = events.split(' ');

		for(var i=0,l=this.elmts.length;i<l;i++){
			let item = this.elmts[i];
			for(var e in eventsList){
				item.addEventListener(eventsList[e],fn,passive);
			}
		}
		return this;
	},
	// Adding Click Or Tap Listener to elements depending on TouchScreen Device Detected.
	click(fn){
		let passive = qx.fn.getPassive();
		for(var i=0,l=this.elmts.length;i<l;i++){
			this.elmts[i].addEventListener("click",fn,passive);
		}
		return this;
	},
	// Adding the class name or list of class names to the element
	addClass(classNames){
		qx.fn.parseClasses(this.elmts,classNames,(item,classNames,currentClassNames) => {
			classNames = Array.from(new Set([...currentClassNames,...classNames])).join(" ");
			item.className = classNames;
		});
		return this;
	},
	// Remove the class name or list of class names from elements classList
	removeClass(classNames){
		qx.fn.parseClasses(this.elmts,classNames,(item,classNames,currentClassNames) => {
			currentClassNames = currentClassNames.filter( (el) => !classNames.includes(el) );
			item.className = currentClassNames.join(" ");
		});
		return this;
	},
	// Checking elements for class name available. Returning array of values if it needed.
	hasClass(className){
		let checkedList = [];
		for(var i=0,l=this.elmts.length;i<l;i++){
			if(this.elmts[i].classList.contains(className)){
				checkedList.push(true)
			} else {
				checkedList.push(false);
			}
		}

		if(checkedList.length > 1){
			return checkedList;
		} else if(checkedList[0]){
			return true;
		}
		return false;
	},
	// Set css to elements
	css(css){
		for(var i=0,l=this.elmts.length;i<l;i++){
			let item = this.elmts[i];
			for(let c in css){
				item.style[c] = css[c];
			}
		}
		return this;
	},
	// Get Attribute value of elements
	getAttr(attrName){
		let list = [];
		for(var i=0,l=this.elmts.length;i<l;i++){
			let attr = this.elmts[i].getAttribute(attrName);
			if(attr != null){
				if(attr === ""){
					attr = true;
				}
				list.push(attr);
			}
		}

		if(list.length > 1){
			return list;
		} else if(list.length){
			return list[0];
		}
		return false;
	},
	// Set Attribute to elements
	setAttr(attrName,value=""){
		for(var i=0,l=this.elmts.length;i<l;i++){
			this.elmts[i].setAttribute(attrName,value);
		}
		return this;
	},
	// Remove Attribute from elements
	removeAttr(attrName){
		for(var i=0,l=this.elmts.length;i<l;i++){
			this.elmts[i].removeAttribute(attrName);
		}
		return this;
	},
	// Add a behavior that switches the class "hover" when you hover the mouse or tap on the element.
	hover(){
		let passive = qx.fn.getPassive();
		for(var i=0,l=this.elmts.length;i<l;i++){
			let item = this.elmts[i];
			for(var e in qx.ui.hover){
				item.addEventListener(qx.ui.hover[e],qx.fn.over,passive);
			}
		}
	},
	// Removes an element from the DOM
	remove(){
		for(var i=0,l=this.elmts.length;i<l;i++){
			let item = this.elmts[i];
			item.parentNode.removeChild(item);
		}
		return true;
	},
	// Replace element with new HTML
	replace(html){
		for(var i=0,l=this.elmts.length;i<l;i++){
			this.elmts[i].outerHTML = html;
		}
		return this;
	},
	// Append HTML before End Of Elements
	append(html){
		for(var i=0,l=this.elmts.length;i<l;i++){
			this.elmts[i].insertAdjacentHTML("beforeEnd", html);
		}
		return this;
	},
	// Insert HTML before Beging Of Elements
	prepend(html){
		for(var i=0,l=this.elmts.length;i<l;i++){
			this.elmts[i].insertAdjacentHTML("beforeBegin", html);
		}
		return this;
	},
	// Insert HTML after the End Of Elements
	after(html){
		for(var i=0,l=this.elmts.length;i<l;i++){
			this.elmts[i].insertAdjacentHTML("afterEnd", html);
		}
		return this;
	},
	// Get or Set value of inputs
	val(v=false){
		var i,l;
		if(v !== false){
			for(i=0,l=this.elmts.length;i<l;i++){
				this.elmts[i].value = v;
			}
			return this;
		} else {
			let list = [];
			for(i=0,l=this.elmts.length;i<l;i++){
				let value = this.elmts[i].value;
				list.push((value)?value:false);
			}
			if(list.length > 1){
				return list;
			} else if(list.length){
				return list[0];
			}
			return false;
		}
	},
	// Hide elements. Set display to "none".
	hide(){
		for(var i=0,l=this.elmts.length;i<l;i++){
			this.elmts[i].style.display = "none";
		}
		return this;
	},
	// Show elements. Set display to "block".
	show(){
		for(var i=0,l=this.elmts.length;i<l;i++){
			this.elmts[i].style.display = "block";
		}
		return this;
	},
	// Get or Set plain text of elements
	text(str=false){
		let r = qx.fn.textHtml(this.elmts,str,'text');
		if(r === 'set'){
			return this;
		}
		return r;
	},
	// Get or Set HTML of elements
	html(str=false){
		let r = qx.fn.textHtml(this.elmts,str,'html');
		if(r === 'set'){
			return this;
		}
		return r;
	},
	// Fade-in element using the transparency
	fadeIn(duration=1000, cb=false){
		for(var i=0,l=this.elmts.length;i<l;i++){
			let target = this.elmts[i];
			target.style.removeProperty("display");
			let computedStyle = window.getComputedStyle(target);
			let display = computedStyle.display;

			if (display === "none"){
				display = "block";
			}

			target.style.opacity = 0;
			target.style.display = display;

			setTimeout(function(){
				target.style.transition = `opacity ${duration}ms`;
				target.style.opacity = 1;
			}, 10);
			
			window.setTimeout(() => {
				target.style.removeProperty("transition");
				target.style.removeProperty("opacity");
				if(typeof cb === "function"){
					cb(target);
				}
			}, duration);
		}
	},
	// Fade-out element using the transparency
	fadeOut(duration=600, cb=false){
		for(var i=0,l=this.elmts.length;i<l;i++){
			let target = this.elmts[i];
			target.style.removeProperty("display");
			let computedStyle = window.getComputedStyle(target);
			let display = computedStyle.display;

			if (display === "none"){
				display = "block";
			}

			target.style.opacity = 1;
			target.style.display = display;

			setTimeout(function(){
				target.style.transition = `opacity ${duration}ms`;
				target.style.opacity = 0;
			}, 10);
			
			window.setTimeout(() => {
				target.style.removeProperty("transition");
				if(typeof cb === "function"){
					cb(target);
				}
			}, duration);
		}
	},
	// Get or Set Width of elements
	width(value=false){
		let r = qx.fn.widthHeight(this.elmts,value,'width');
		if(r === 'set'){
			return this;
		}
		return r;
	},
	// Get or Set Height of elements
	height(value=false){
		let r = qx.fn.widthHeight(this.elmts,value,'height');
		if(r === 'set'){
			return this;
		}
		return r;
	},
	// Executing function for each of elements
	each(callback){
		for(var i=0,l=this.elmts.length;i<l;i++){
			callback(this.elmts[i]);
		}
		return this;
	},
	// Slide Up Elements and fade-out
	slideUp(duration=500, callback=false){
		let removeOnComplete = false;
		if(typeof duration === "function"){
			callback = duration;
			duration = 500;
		} else if(duration === "remove"){
			removeOnComplete = true;
			duration = 500;
		}
		for(var i=0,l=this.elmts.length;i<l;i++){
			let target = this.elmts[i];
			clearTimeout(target.tmo);
			target.style.transitionProperty = "height, margin, padding, opacity";
			target.style.transitionDuration = duration + "ms";
			target.style.boxSizing = "border-box";
			target.style.height = target.offsetHeight + "px";
			target.style.overflow = "hidden";

			setTimeout(() => {
				target.style.opacity = 0;
				target.style.height = 0;
				target.style.paddingTop = 0;
				target.style.paddingBottom = 0;
				target.style.marginTop = 0;
				target.style.marginBottom = 0;
			},50);
			target.tmo = setTimeout( () => {
				target.style.display = "none";
				qx.fn.removeProps(target,["opacity","box-sizing","height","padding-top","padding-bottom","margin-top","margin-bottom","overflow","transition-duration","transition-property"]);
				if(callback){
					callback(target);
				}
				if(removeOnComplete){
					target.parentNode.removeChild(target);
				}
			}, duration+50);
		}
		return this;
	},
	// Slide Down Elements and fade-in
	slideDown(duration=500, callback=false){
		if(typeof duration === "string"){
			duration = 500;
		} else if(typeof duration === "function"){
			callback = duration;
			duration = 500;
		}
		for(var i=0,l=this.elmts.length;i<l;i++){
			let target = this.elmts[i];
			clearTimeout(target.tmo);
			// target.style.removeProperty("display");
			qx.fn.removeProps(target,["display"]);
			let computedStyle = window.getComputedStyle(target);
			let display = computedStyle.display;

			if(display === "none"){
				display = "block";
			}

			let padding = parseInt(computedStyle.paddingTop) + parseInt(computedStyle.paddingBottom);

			let opacity = computedStyle.opacity;

			target.style.overflow = "hidden";
			target.style.opacity = 0;
			target.style.height = 0;
			target.style.paddingTop = 0;
			target.style.paddingBottom = 0;
			target.style.marginTop = 0;
			target.style.marginBottom = 0;
			target.style.boxSizing = "border-box";
			target.style.transitionProperty = "height, margin, padding";
			target.style.transitionDuration = duration + "ms";
			target.style.display = display;

			let height = target.scrollHeight + padding;

			setTimeout(() => {
				target.style.opacity = opacity;
				target.style.height = height + "px";
				qx.fn.removeProps(target,["padding-top","padding-bottom","margin-top","margin-bottom"]);
			}, 50);
			target.tmo = setTimeout( () => {
				qx.fn.removeProps(target,["opacity","box-sizing","height","overflow","transition-duration","transition-property"]);
				if(callback){
					callback(target);
				}
			}, duration+50);
		}
		return this;
	},
	// Returns the size and position of elements
	getBounds(){
		let list = [];
		for(var i=0,l=this.elmts.length;i<l;i++){
			let target = this.elmts[i];
			let bound = {};
			if ("getBoundingClientRect" in target){
				bound = target.getBoundingClientRect();
				if(typeof bound.x === "undefined"){
					bound.x = bound.left;
					bound.y = bound.top;
				}
			} else {
				bound.x = target.offsetLeft;
				bound.y = target.offsetTop;
				bound.width = target.offsetWidth;
				bound.height = target.offsetHeight;
			}
			list.push(bound);
		}
		if(list.length > 1){
			return list;
		} else if(list.length){
			return list[0];
		}
		return false;
	},
	// Return the list of parent elements
	parent(){
		let items = [];
		for(var i=0,l=this.elmts.length;i<l;i++){
			items.push(this.elmts[i].parentNode);
		}
		return qx.bind(items);
	},
	// Return the list of elements width
	textWidth(){
		let list = [];
		for(var i=0,l=this.elmts.length;i<l;i++){
			let item = this.elmts[i];
			let str = item.innerText;
			let text = document.createElement("span");
			let computedStyle = window.getComputedStyle(item);
			text.innerHTML = str;
			text.style.position = "absolute";
			text.style.visibility = "hidden";
			text.style.font = computedStyle.font;
			document.body.appendChild(text); 
			let width = text.offsetWidth;
			document.body.removeChild(text);

			list.push(width);
		}

		if(list.length > 1){
			return list;
		} else if(list.length){
			return list[0];
		}
		return false;
	},
	// Return Offset Top Of Elements
	top(){
		let list = [];
		for(var i=0,l=this.elmts.length;i<l;i++){
			list.push(this.elmts[i].offsetTop);
		}
		if(list.length > 1){
			return list;
		} else if(list.length){
			return list[0];
		}
		return false;
	},
	// Find elements inside the list of selected elements
	find(selector){
		let items = [];
		for(var i=0,l=this.elmts.length;i<l;i++){
			let elmts = this.elmts[i].querySelectorAll(selector);
			elmts.forEach((currentValue) => {
				items.push(currentValue);
			});
		}
		return new qxo(items);
	},
	// Set focus at the first element of the list
	focus(){
		if(this.elmts.length){
			this.elmts[0].focus();
		}
		return this;
	},
	counter(options){
		let go = false;
		for(var i=0,l=this.elmts.length;i<l;i++){
			let item = this.elmts[i];
			if(typeof options.count != "object"){
				options.count = [parseFloat(item.innerText), options.count];
			}
			
			if(typeof options.duration === "undefined"){
				options.duration = 1000;
			}
			var steps = options.duration/50;
			let offset = (options.count[1] - options.count[0])/steps;
			// console.log(options.count)
			if(typeof options.current === "undefined"){
				if(item.tmo){
					clearTimeout(item.tmo);
				}
				options.current = options.count[0];
			} else {
				options.current += offset;
			}
			let v = options.current;
			if(options.current >= options.count[1]){
				v = options.count[1];
			}
			if(options.round){
				v = v.toFixed(options.round);
			}
			if(options.mask){
				v = options.mask.replace(/n/,v);
			}
			
			if(options.current >= options.count[1]){
				item.innerText = v;
			} else {
				item.innerText = v;
				go = true;
			}
		}

		if(go){
			let that = this;
			setTimeout(() => {
				that.counter(options);
			}, 50)
		}
		return this;
	}
};
qx.ui = {
	hover: ["mouseenter", "mouseleave", "mousecancel", "touchstart", "touchend", "touchcancel"]
};
qx.fn = {
	getPassive: () => {
		// Determine passive
		let passiveSupported = false;
		try {
			Object.defineProperty({}, "passive", {
				get: () => {
					passiveSupported = true;
					return true;
				}
			});
		} catch(e) {
			// continue regardless of error
		}
		
		return passiveSupported?{passive:true}:false;
	},
	isTouch: () => {
		return ("ontouchstart" in document.documentElement);
	},
	over(e){
		switch(e.type){
			case "mouseenter": case "touchstart":
				qx(this).addClass("hover");
				break;
			case "mouseleave": case "mousecancel": case "touchend": case "touchcancel":
				qx(this).removeClass("hover");
				break;
		}
	},
	parseClasses: (items,classNames,cb) => {
		classNames = classNames.split(" ");
		for(var i=0,l=items.length;i<l;i++){
			let item = items[i];
			let currentClassNames = (item.className.length)?item.className.split(/\s+/):[];
			cb(item,classNames,currentClassNames);
		}				
	},
	textHtml: (items,str,type='html') => {
		let i,l;
		let get,set;
		if(type==='html'){
			get = 'outerHTML';
			set = 'innerHTML';
		} else {
			get = set = 'innerText';
		}

		if(str === false){
			return qx.fn.prop(items,get);
		} else {
			for(i=0,l=items.length;i<l;i++){
				items[i][set] = str;
			}
			return 'set';
		}
	},
	widthHeight: (items,value=false,type='width') => {
		let i,l;
		let get,set;
		if(type === 'width'){
			get = 'offsetWidth';
			set = 'width';
		} else {
			get = 'offsetHeight';
			set = 'height';
		}
		if(value !== false){
			let dim = (typeof value === "number")?"px":"";
			for(i=0,l=items.length;i<l;i++){
				items[i].style[set] = value+dim;
			}
			return 'set';
		} else {
			return qx.fn.prop(items,get);
		}
	},
	prop: (items,get) => {
		let list = [];
		for(let i=0,l=items.length;i<l;i++){
			list.push(items[i][get]);
		}
		if(list.length > 1){
			return list;
		} else if(list.length){
			return list[0];
		}
		return false;
	},
	removeProps: (target,props=[]) => {
		for(let i=0,l=props.length;i<l;i++){
			target.style.removeProperty(props[i]);
		}
	}
}

Object.defineProperty(qxo.fn, 'length', {
	get(){
		return this.elmts.length;
	}
});
window.$ = qx;
})();