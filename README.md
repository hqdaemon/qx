# QX
Lightweight JavaScript library for manipulating with HTML<br />
Swap Slider & Swap'n'Loop'n'Fullscreen Gallery On Board

[![DeepScan grade](https://deepscan.io/api/teams/12165/projects/15148/branches/299007/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=12165&pid=15148&bid=299007)

<br />

## Initialization
Just add the script into your HTML
```html
<script src="/path_to_script/qx.min.js"></script>
```
## Or install via npm
```
npm install @hqdaemon/qx
```
<br />

## Using
$(selector) - Like JQuery. Using **querySelectorAll** [documentation](https://developer.mozilla.org/ru/docs/Web/API/Document/querySelectorAll)

<br />

## Methods

### $.isTouch()
Return True if it is a Touch Device or False if not.
```javascript
$.isTouch();
```

### $.isDark()
Return True if the Client uses Dark Mode or False if not
```javascript
$.isDark();
```

### $.isPassive()
Return {passive:false} if Passive is available or False if not
```javascript
$.isPassive();
```

### on(eventNames, function)
Add Event Listeners to elements.
```javascript
$(selector).on(eventNames,functionName);
```

### off(eventNames, function)
Remove Event Listeners from elements.
```javascript
$(selector).off(eventNames,functionName);
```

### click(function)
Adding Click Or Tap Listener to elements depending on TouchScreen Device Detected.
```javascript
$(selector).click(functionName);
```

### addClass(classNames)
Adding the class name or list of class names to the element.
```javascript
$(selector).addClass('className1 className2');
```

### removeClass(classNames)
Remove the class name or list of class names from elements classList.
```javascript
$(selector).removeClass('className1 className2');
```

### hasClass(classNames)
Checking elements for class name available. Returning array of values if it needed.
```javascript
$(selector).hasClass(className);
```

### css({properties})
Set css to elements.
```javascript
$(selector).css({prop:value});
```

### getAttr(attributeName)
Get Attribute value of elements
```javascript
$(selector).getAttr(attributeName);
```

### setAttr(attributeName)
Set Attribute to elements
```javascript
$(selector).setAttr(attributeName,value);
```

### removeAttr(attributeName)
Remove Attribute from elements
```javascript
$(selector).removeAttr(attributeName);
```

### hover()
Add a behavior that switches the class "hover" when you hover the mouse or tap on the element.
```javascript
$(selector).hover();
```

### remove()
Removes an element from the DOM
```javascript
$(selector).remove();
```

### replace(HTML)
Replace element with new HTML
```javascript
$(selector).replace(HTML);
```

### append(HTML)
Append HTML before End Of Elements
```javascript
$(selector).append(HTML);
```

### prepend(HTML)
Insert HTML before the Beging Of Elements
```javascript
$(selector).prepend(HTML);
```

### after(HTML)
Insert HTML after the End Of Elements
```javascript
$(selector).after(HTML);
```

### val(value)
Get or Set value of inputs.
Return typed values, e.g. (string) "1.23" becomes (float) 1.23, "true" > true and "false" > false
```javascript
$(selector).val(newValue); // Set value
$(selector).val(); // Get value
```

### hide()
Hide elements. Set display to "none".
```javascript
$(selector).hide();
```

### show()
Show elements. Set display to "block".
```javascript
$(selector).show();
```

### text()
Get or Set plain text of elements
```javascript
$(selector).text(newText); // Set text
$(selector).text(); // Get text
```

### html()
Get or Set HTML of elements
```javascript
$(selector).html(newHtml); // Set HTML inner elements
$(selector).html(); // Get Outer HTML
```

### fadeIn(duration, callback)
Fade-in element using the transparency.
```javascript
$(selector).fadeIn(duration=600,callback=false);
```

### fadeOut(duration, callback)
Fade-out element using the transparency.
```javascript
$(selector).fadeOut(duration=600,callback=false);
```

### width(value)
Get or Set Width of elements
```javascript
$(selector).width(value=false);
```

### height(value)
Get or Set Height of elements
```javascript
$(selector).height(value=false);
```

### each(function)
Executing function for each of elements
```javascript
$(selector).each(functionName);
```

### slideUp(duration, callback)
Slide Up Elements and fade-out
```javascript
$(selector).slideUp(duration=500, callback=false);
```

### slideDown(duration, callback)
Slide Down Elements and fade-in
```javascript
$(selector).slideDown(duration=500, callback=false);
```

### getBounds()
Return the size and position of elements
```javascript
$(selector).getBounds();
```

### parent()
Return the list of parent elements
```javascript
$(selector).parent();
```

### textWidth()
Return the list of elements width
```javascript
$(selector).textWidth();
```

### top()
Return Offset Top Of Elements
```javascript
$(selector).top();
```

### find(selector)
Find elements inside the list of selected elements
```javascript
$(selector).find(selector);
```

### focus()
Set focus at the first element of the list
```javascript
$(selector).focus();
```

### copy()
Return deep copies of elements
```javascript
$(selector).copy();
```

<br />
<br />
<br />

# Loop Sliders
Create a Adaptive Loop Slider that works on desktop and touch devices.<br/>
To work correctly add the qx.min.css file.<br/>
Return an array of created sliders.
```html
<link rel="stylesheet" type="text/css" href="/path_to_css/qx.min.css" />
<div class="slider">
	<div class="slides">
		<div class="wrap">
			<div class="item">1</div>
			<div class="item">2</div>
			<div class="item">3</div>
			<div class="item">4</div>
		</div>
	</div>
	<div class="circles"></div>
	<div class="nav prev">◀</div>
	<div class="nav next">▶</div>
</div>
```
```javascript
let sliders = $(".slider").slider();
let slider = sliders[0];
// Return [QX.slider]
```
### slider.goTo()
Change the slider to the specified one. Accepts the slide number, "prev" or "next" values.
```javascript
slider.goTo(index);
```

<br/>
<br/>
<br/>

# Gallery
Create Swap'n'Loop'n'Fullscreen Gallery
```html
<link rel="stylesheet" type="text/css" href="/path_to_css/qx.min.css" />
<div class="gallery">
	<div data-img="path_to_img_1"></div>
	<div data-img="path_to_img_2"></div>
	<div data-img="path_to_img_3"></div>
	<!-- ... -->
	<div data-img="path_to_img_n"></div>
</div>
```
```javascript
$(".gallery > div").gallery();
````

<br />
<br />
<br />
<br />

## MIT License

Copyright (c) HQ • [hqmode.com](https://hqmode.com)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.