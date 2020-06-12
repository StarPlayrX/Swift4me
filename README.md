# Swift4me_InsertXjs
Swift4.me minimnal UI style website
built on the InsertX.JS framework

InsertX.JS Alpha v0.0.5 is included in this repo
It is a minimalistic dynamic framework for building simple websites.

InsertX uses fetch to build dynamic web pages from static html content. To use fetch you must run the page from an http web server. I use Perfect3 from PerfectlySoft, but you use any HTTP web server like Apache, NGINX, Node, Perfect, Vapor, Kitura, etc.

This is how insertX places HTML content:

```html
<!-- insert html file -->
<insert-X
	
	data-fold="snippets" 	  <!-- folder with relative path ./ -->	
	data-file="assemblyline"  <!-- name of the file -->
	data-type="html">	  <!-- type of file (txt and html is supported) -->
</insert-X>
```

InsertX can also draw minimalistic buttons via this simple markup. Button-X's buttons are fully compatible with desktop and touch devices. And both will have the same look at feel. They even have the same behaviors on a touch device as they do on the desktop!

```html
<button-X
	data-mini="default"       <!-- style of the button (currently only option is default) -->
	data-clik="text2clip"     <!-- the button action -->
	data-args="assemblyline"  <!-- arguments, this currently a String, JS variable will be added -->
	data-name="Clipboard">    <!-- name or title of the button -->
</button-X>
```

InsertX.js is open source and is currently only available through this repo.

It is designed to be a standalone framework with it's own CSS, HTML and JS. The JS is prorgammed in ES6.

Initially InsertX was going to use Bootstrap but I was not impressed that BS4.5 still has dependencies to jQuery. I also feel that BS is grown way beyond a simple CSS and HMTL framework. So, InsertX decided to go solo offering it own flavor of UI minimalism.

InsertX is designed to make simple websites fast and fun! I want this framework to be easy and and simple to add your own content.

As Swift4.me grows, which is powered by InsertX, so will InsertX.js. Thank you!

Sincerely,

Todd Bruss
