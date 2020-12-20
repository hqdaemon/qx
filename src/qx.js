((win,doc) => {
function QXo(items){
	this.elmts = items;
}
var QX = (selector) =>{
	if(typeof selector === "object"){
		return new QXo([selector]);
	}
	var itemsList = [];
	var elements = doc.querySelectorAll(selector);
	elements.forEach((currentValue) => {
		itemsList.push(currentValue);
	});
	return new QXo(itemsList);
};
QX.sliders = {
	ready: false,
	list: [],
	resize: () => {
		if(typeof QX.sliders.tmo !== "undefined"){
			clearTimeout(QX.sliders.tmo);
		}
		QX.sliders.tmo = setTimeout(() => {
			// console.log(win.innerWidth, win.innerHeight);
			for(let i=0,l=QX.sliders.list.length;i<l;i++){
				let s = QX.sliders.list[i];
				s.goTo(s.index);
			}
		},400);
	}
};

QXo.fn = QXo.prototype = {
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
		let passive = QX.fn.getPassive();

		// Split events list and add Event Listener for each
		let eventsList = events.split(' ');
		this.each((el) => {
			for(let i=0,l=eventsList.length;i<l;i++){
				el.addEventListener(eventsList[i],fn,passive);
			}
		});
		return this;
	},
	// Adding Click Or Tap Listener to elements depending on TouchScreen Device Detected.
	click(fn){
		let passive = QX.fn.getPassive();
		this.each((el) => {
			el.addEventListener("click",fn,passive);
		});
		return this;
	},
	// Adding the class name or list of class names to the element
	addClass(classNames){
		QX.fn.parseClasses(this.elmts,classNames,(item,classes,currentClassNames) => {
			classes = Array.from(new Set([...currentClassNames,...classes])).join(" ");
			item.className = classes;
		});
		return this;
	},
	// Remove the class name or list of class names from elements classList
	removeClass(classNames){
		QX.fn.parseClasses(this.elmts,classNames,(item,classes,currentClassNames) => {
			currentClassNames = currentClassNames.filter( (el) => !classes.includes(el) );
			item.className = currentClassNames.join(" ");
		});
		return this;
	},
	// Checking elements for class name available. Returning array of values if it needed.
	hasClass(className){
		let checkedList = [];
		this.each((el) => {
			if(el.classList.contains(className)){
				checkedList.push(true)
			} else {
				checkedList.push(false);
			}
		});

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
		this.each((el) => {
			let attr = el.getAttribute(attrName);
			if(attr != null){
				attr = (attr === "")?true:attr;
			} else if(attr === null){
				attr = false;
			}
			list.push(attr);
		});

		if(list.length > 1){
			return list;
		} else if(list.length){
			return list[0];
		}
		return false;
	},
	// Set Attribute to elements
	setAttr(attrName,value=""){
		this.each((el) => {
			el.setAttribute(attrName,value);
		});
		return this;
	},
	// Remove Attribute from elements
	removeAttr(attrName){
		this.each((el) => {
			el.removeAttribute(attrName);
		});
		return this;
	},
	// Add a behavior that switches the class "hover" when you hover the mouse or tap on the element.
	hover(){
		let passive = QX.fn.getPassive();
		this.each((el) => {
			for(let i=0,l=QX.ui.hover.length;i<l;i++){
				el.addEventListener(QX.ui.hover[i],QX.fn.over,passive);
			}
		});
		return this;
	},
	// Removes an element from the DOM
	remove(){
		this.each((el) => {
			el.parentNode.removeChild(el);
		});
		return true;
	},
	// Replace element with new HTML
	replace(html){
		this.each((el) => {
			el.outerHTML = html;
		});
		return this;
	},
	// Append HTML before End Of Elements
	append(html){
		this.each((el) => {
			el.insertAdjacentHTML("beforeEnd", html);
		});
		return this;
	},
	// Insert HTML before Beging Of Elements
	prepend(html){
		this.each((el) => {
			el.insertAdjacentHTML("beforeBegin", html);
		});
		return this;
	},
	// Insert HTML After Beging Of Elements
	afterbegin(html){
		this.each((el) => {
			el.insertAdjacentHTML("afterbegin", html);
		});
		return this;
	},
	// Insert HTML after the End Of Elements
	after(html){
		this.each((el) => {
			el.insertAdjacentHTML("afterEnd", html);
		});
		return this;
	},
	// Get or Set value of inputs
	val(v=false){
		if(v !== false){
			this.each((el) => {
				el.value = v;
			});
			return this;
		} else {
			let list = [];
			this.each((el) => {
				list.push((el.value)?el.value:false);
			});
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
		this.each((el) => {
			el.style.display = "none";
		});
		return this;
	},
	// Show elements. Set display to "block".
	show(){
		this.each((el) => {
			el.style.display = "block";
		});
		return this;
	},
	// Get or Set plain text of elements
	text(str=false){
		let r = QX.fn.textHtml(this.elmts,str,'text');
		if(r === 'set'){
			return this;
		}
		return r;
	},
	// Get or Set HTML of elements
	html(str=false){
		let r = QX.fn.textHtml(this.elmts,str,'html');
		if(r === 'set'){
			return this;
		}
		return r;
	},
	// Fade-in element using the transparency
	fadeIn(duration=1000, cb=false){
		QX.fn.fadeInOut(this,duration,"fadeIn",cb);
		return this;
	},
	// Fade-out element using the transparency
	fadeOut(duration=600, cb=false){
		QX.fn.fadeInOut(this,duration,"fadeOut",cb);
		return this;
	},
	// Get or Set Width of elements
	width(value=false){
		let r = QX.fn.widthHeight(this.elmts,value,'width');
		if(r === 'set'){
			return this;
		}
		return r;
	},
	// Get or Set Height of elements
	height(value=false){
		let r = QX.fn.widthHeight(this.elmts,value,'height');
		if(r === 'set'){
			return this;
		}
		return r;
	},
	// Executing function for each of elements
	each(cb){
		for(let i=0,l=this.elmts.length;i<l;i++){
			cb(this.elmts[i]);
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
		this.each((el) => {
			clearTimeout(el.tmo);
			el.style.transitionProperty = "height, margin, padding, opacity";
			el.style.transitionDuration = duration + "ms";
			el.style.boxSizing = "border-box";
			el.style.height = el.offsetHeight + "px";
			el.style.overflow = "hidden";

			setTimeout(() => {
				el.style.opacity = 0;
				el.style.height = 0;
				el.style.paddingTop = 0;
				el.style.paddingBottom = 0;
				el.style.marginTop = 0;
				el.style.marginBottom = 0;
			},50);
			el.tmo = setTimeout( () => {
				el.style.display = "none";
				QX.fn.removeProps(el,["opacity","box-sizing","height","padding-top","padding-bottom","margin-top","margin-bottom","overflow","transition-duration","transition-property"]);
				if(callback){
					callback(el);
				}
				if(removeOnComplete){
					el.parentNode.removeChild(el);
				}
			}, duration+50);
		});
		return this;
	},
	// Slide Down Elements and fade-in
	slideDown(duration=500, callback=false){
		console.log('?')
		if(typeof duration === "string"){
			duration = 500;
		} else if(typeof duration === "function"){
			callback = duration;
			duration = 500;
		}
		this.each((el) => {
			clearTimeout(el.tmo);
			QX.fn.removeProps(el,["display"]);
			let computedStyle = win.getComputedStyle(el);
			let display = computedStyle.display;

			if(display === "none"){
				display = "block";
			}

			let padding = parseInt(computedStyle.paddingTop,10) + parseInt(computedStyle.paddingBottom,10);

			let opacity = computedStyle.opacity;

			el.style.overflow = "hidden";
			el.style.opacity = 0;
			el.style.height = 0;
			el.style.paddingTop = 0;
			el.style.paddingBottom = 0;
			el.style.marginTop = 0;
			el.style.marginBottom = 0;
			el.style.boxSizing = "border-box";
			el.style.transitionProperty = "height, margin, padding";
			el.style.transitionDuration = duration + "ms";
			el.style.display = display;

			let height = el.scrollHeight + padding;

			setTimeout(() => {
				el.style.opacity = opacity;
				el.style.height = height + "px";
				QX.fn.removeProps(el,["padding-top","padding-bottom","margin-top","margin-bottom"]);
			}, 50);
			el.tmo = setTimeout( () => {
				QX.fn.removeProps(el,["opacity","box-sizing","height","overflow","transition-duration","transition-property"]);
				if(callback){
					callback(el);
				}
			}, duration+50);
		})
		return this;
	},
	// Returns the size and position of elements
	getBounds(){
		let list = [];
		this.each((el) => {
			let bound = {};
			if ("getBoundingClientRect" in el){
				bound = el.getBoundingClientRect();
				if(typeof bound.x === "undefined"){
					bound.x = bound.left;
					bound.y = bound.top;
				}
			} else {
				bound.x = el.offsetLeft;
				bound.y = el.offsetTop;
				bound.width = el.offsetWidth;
				bound.height = el.offsetHeight;
			}
			list.push(bound);
		});
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
		this.each((el) => {
			items.push(el.parentNode);
		});
		return new QXo(items);
	},
	// Return the list of elements width
	textWidth(){
		let list = [];

		this.each((el) => {
			let str = el.innerText;
			let text = doc.createElement("span");
			let computedStyle = win.getComputedStyle(el);
			text.innerHTML = str;
			text.style.position = "absolute";
			text.style.visibility = "hidden";
			text.style.font = computedStyle.font;
			doc.body.appendChild(text); 
			let width = text.offsetWidth;
			doc.body.removeChild(text);

			list.push(width);
		});

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
		this.each((el) => {
			list.push(el.offsetTop);
		});
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
		this.each((el) => {
			let elmts = el.querySelectorAll(selector);
			elmts.forEach((currentValue) => {
				items.push(currentValue);
			});
		});
		return new QXo(items);
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
		this.each((el) => {
			if(typeof options.count !== "object"){
				options.count = [parseFloat(el.innerText), options.count];
			}
			
			if(typeof options.duration === "undefined"){
				options.duration = 1000;
			}
			var steps = options.duration/50;
			let offset = (options.count[1] - options.count[0])/steps;
			if(typeof options.current === "undefined"){
				if(el.tmo){
					clearTimeout(el.tmo);
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
			
			if(options.current < options.count[1]){
				go = true;
			}
			el.innerText = v;
		});

		if(go){
			let that = this;
			setTimeout(() => {
				that.counter(options);
			}, 50)
		}
		return this;
	},
	// Returns copies of elements
	copy(){
		let list = [];
		this.each((el) => {
			list.push(el.cloneNode(true));
		});
		if(list.length > 1){
			return list;
		} else if(list.length){
			return list[0];
		}
		return false;
	},
	slider(options){
		let list = [];
		this.each((el) => {
			let slider = new QX.slider(el,options);
			QX.sliders.list.push(slider);
			list.push(slider);
		});
		let passive = QX.fn.getPassive();
		if(!QX.sliders.ready){
			win.addEventListener("resize",QX.sliders.resize,passive);
			QX.sliders.ready = true;
		}
		if(list.length > 1){
			return list;
		} else if(list.length){
			return list[0];
		}
		return false;
	}
};

QX.slider = function(el,options){
	let passive = QX.fn.getPassive();

	this.target = QX(el);
	this.target.get(0).slider = this;

	this.options = options || {};

	this.slides = this.target.find('.slides');
	this.slides.get(0).slider = this;
	
	this.wrap = this.target.find('.slides>.wrap');
	let wrapEl = this.wrap.get(0);
	wrapEl.slider = this;
	wrapEl.addEventListener("transitionend", QX.slider.fn.end, passive);

	this.items = this.target.find('.slides>.wrap>.item');
	this.amount = this.items.length;
	this.target.addClass('qxSlider');
	this.nav = this.target.find('.nav');

	this.createCircles();
	this.index = 1;
	this.currentIndex = 1;

	this.extend();
	this.navBind();
	this.drag.bind(this.slides);

	this.goTo(this.currentIndex);
};
QX.slider.fn = QX.slider.prototype = {
	drag: {
		bind(slides){
			let passive = QX.fn.getPassive();
			slides = slides.get(0);
			for(let i=0,l=QX.ui.drag.length;i<l;i++){
				slides.addEventListener(QX.ui.drag[i],slides.slider.drag.on,passive);
			}
		},
		startTime: false,
		move: false,
		posX: 0,
		wrapX: 0,
		offsetX: 0,
		on(e){
			let target = e.currentTarget;
			let slider = target.slider;
			let passive, direction, posX, velocity, offsetX;
			switch(e.type){
				case 'mousedown': case 'touchstart':
					slider.drag.startTime = new Date();
					slider.drag.move = true;
					slider.drag.posX = e.clientX || e.touches[0].clientX;

					slider.drag.wrapX = slider.wrap.getBounds().x;
					slider.slides.addClass("drag");

					passive = QX.fn.getPassive();
					target.addEventListener("mousemove",slider.drag.on,passive);
					target.addEventListener("touchmove",slider.drag.on,passive);
					break;
				case 'mousemove': case 'touchmove':
					posX = e.clientX || e.touches[0].clientX;
					slider.drag.offsetX = posX - slider.drag.posX;
					posX = slider.drag.wrapX + slider.drag.offsetX;
					slider.wrap.css({
						transform:`translate3d(${posX}px,0,0)`,
						webkitTransition:`translate3d(${posX}px,0,0)`
					});
					e.preventDefault();
					break;
				case 'mouseup': case 'touchend': case 'touchcancel':
					slider.drag.move = false;
					target.removeEventListener("mousemove",slider.drag.on,passive);
					target.removeEventListener("touchmove",slider.drag.on,passive);
					slider.slides.removeClass("drag");

					velocity = (slider.drag.startTime)?new Date() - slider.drag.startTime:1000;
					offsetX = Math.abs(slider.drag.offsetX/slider.target.width());
					if(offsetX > .2 || (Math.abs(slider.drag.offsetX) > 20 && velocity < 100)){
						direction = (slider.drag.offsetX < 0)?"next":"prev";
					} else {
						direction = slider.currentIndex;
					}
					console.log('End', direction, e.type)
					slider.drag.startTime = false;
					slider.drag.offsetX = 0;
					slider.drag.posX = 0;
					slider.drag.wrapX = 0;
					slider.goTo(direction);
					e.stopPropagation();
					break;
			}
		}
	},
	navBind(){
		this.nav.on('click',QX.slider.fn.goTo);
		this.nav.each((el) => {
			el.slider = this;
		});
	},
	createCircles(){
		// Circles
		let circlesEl = this.target.find('.circles');
		if(circlesEl.length){
			let circle = `<div class="i"></div>`;
			let circles = [];
			for(let i=0;i<this.amount;i++){
				circles.push(circle);
			}
			circlesEl.html(circles.join(""));
			this.circles = circlesEl.find('.i');
		}
	},
	extend(){
		let slider = this;
		slider.slides.addClass("drag");
		let lastEl = slider.items.get(slider.amount-1);
		slider.wrap.afterbegin(lastEl.outerHTML);

		let firstEl = slider.items.get(0);
		slider.wrap.append(firstEl.outerHTML);

		let posX = -slider.slides.width();
		slider.wrap.css({
			transform:`translate3d(${posX}px,0,0)`,
			webkitTransition:`translate3d(${posX}px,0,0)`
		});
		// slider.wrap.removeAttr("style");
		setTimeout(() => {
			slider.slides.removeClass("drag");
		},0);
	},
	goTo(target){
		let slider, index;
		if(typeof target === 'object'){
			let t = target.target;
			slider = t.slider;
			index = (QX(t).hasClass("prev"))?"prev":"next";
			target.preventDefault();
			target.stopPropagation();
		} else {
			slider = this;
			index = target;
		}
		if(typeof index === 'number'){
			// index = 
		} else if(index === 'prev'){
			index = slider.index - 1;
		} else if(index === 'next'){
			index = slider.index + 1;
		}

		slider.circles.removeClass('active');

		slider.index = index;
		slider.currentIndex = (slider.index > slider.amount)?1:(slider.index === 0)?slider.amount:slider.index;

		let circleTarget = slider.circles.get(slider.currentIndex-1);
		QX(circleTarget).addClass('active');

		slider.move();
	},
	move(){
		let slider = this;
		let posX = -slider.index*slider.slides.width();
		slider.wrap.css({
			transform:`translate3d(${posX}px,0,0)`,
			webkitTransform:`translate3d(${posX}px,0,0)`
		});
	},
	end(e){
		let slider = e.target.slider;
		let needGo = false;
		let posX;
		if(slider.index === 0){
			slider.index = slider.amount;
			posX = -slider.amount*slider.slides.width();
			needGo = true;
			
		} else if(slider.index > slider.amount){
			slider.index = 1;
			posX = -slider.slides.width();
			needGo = true;
		}
		if(needGo){
			slider.slides.addClass("drag");
			
			slider.wrap.css({
				transform:`translate3d(${posX}px,0,0)`,
				"webkitTransform":`translate3d(${posX}px,0,0)`
			});
			setTimeout(() => {
				slider.slides.removeClass("drag");
			},0);
		}
	}
};


QX.ui = {
	hover: ["mouseenter", "mouseleave", "mousecancel", "touchstart", "touchend", "touchcancel"],
	drag: ["mousedown","mouseup","touchstart","touchend","touchcancel"]
};
QX.fn = {
	getPassive: () => {
		// Determine passive
		if(typeof QX.fn.isPassive === "undefined"){
			QX.fn.isPassive = false;
			try {
				Object.defineProperty({}, "passive", {
					get: () => {
						QX.fn.isPassive = true;
						return true;
					}
				});
			} catch(e) {
				// continue regardless of error
			}
		}

		return QX.fn.isPassive?{passive:false}:false;
	},
	isTouch: () => {
		return ("ontouchstart" in doc.documentElement);
	},
	over(e){
		switch(e.type){
			case "mouseenter": case "touchstart":
				QX(this).addClass("hover");
				break;
			case "mouseleave": case "mousecancel": case "touchend": case "touchcancel":
				QX(this).removeClass("hover");
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
			return QX.fn.prop(items,get);
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
			return QX.fn.prop(items,get);
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
	},
	fadeInOut: (target,duration,type="fadeIn",cb) => {
		target.each((el) => {
			el.style.removeProperty("display");
			let computedStyle = win.getComputedStyle(el);
			let display = computedStyle.display;

			if (display === "none"){
				display = "block";
			}

			el.style.opacity = (type==="fadeOut")?1:0;
			el.style.display = display;

			setTimeout(function(){
				el.style.transition = `opacity ${duration}ms`;
				el.style.opacity = (type==="fadeOut")?0:1;
			}, 10);
			
			win.setTimeout(() => {
				let r = ["transition"];
				if(type==="fadeIn"){
					r.push("opacity");
				}
				QX.fn.removeProps(el,r)

				if(typeof cb === "function"){
					cb(el);
				}
			}, duration);
		});
	}
};

Object.defineProperty(QXo.fn, 'length', {
	get(){
		return this.elmts.length;
	}
});
win.$ = QX;
})(window,document);