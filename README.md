# Swift4me_InsertXjs (MeshUI)
Swift4.me Fast Fun Free Swift5+ Snippets built on the InsertX.JS framework

InsertX.js is now called MeshUI

v0.0.7a is included in this repo
It is a minimalistic dynamic framework for building simple websites

It uses fetch to build dynamic web pages from static html content.

To use fetch you must run the page from an http web server.

There many out there. I use Perfect3 from PerfectlySoft, but you use any HTTP web server like Apache, NGINX, Node, Perfect, Vapor, Kitura, etc.

This is how MeshUI places HTML content:

<!-- insert html file -->
<insert-X
	data-fold="snippets" 		<!-- folder with relative path ./ -->
	data-file="assemblyline"     <!-- name of the file -->
	data-type="html">	       <!-- type of file (txt and html is supported) -->
</insert-X>

MeshUI can also draw minimalistic buttons via this simple markup. Button-X's buttons are fully compatible with desktop and touch devices. And both will have the same look at feel. They even have the same behaviors on a touch device as they do on the desktop!

<button-X
	data-mini="default" 		 <!-- style of the button (currently only option is default) -->
	data-clik="text2clip"             <!-- the button action -->
	data-args="assemblyline"    <!-- arguments, this currently a String,
                                                            JS variable support is under way -->
	data-name="Clipboard">     <!-- name or title of the button -->
</button-X>

MeshUI.js is open source and is currently only available through this repo. Once it's in beta, we will make a separate repo dedicated to MeshUI

It is designed to be a standalone framework with it's own CSS, HTML and JS. The JS is prorgammed in ES6.

Initially MeshUI was going to use Bootstrap but I was not impressed that BS4.5 still has dependencies to jQuery. I also feel that BS is grown way beyond a simple CSS and HMTL framework. So, MeshUI and I decided to go solo offering its own flavor of UI minimalism.

MeshUI is designed to make simple websites fast and fun! I want this framework to be easy and and simple to add your own content.

Sincerely,

Todd Bruss
starplayrx.com
swift4.me


Updates:
>> Supports iPhoneX and iPhone style phones.
>>Working on scrolling improvements on iPhone, periodically gets stuck. working to resolve this issue.
>>Smooth Scroll polyfil added, iPhone support added to polyfil and refactored Polyfil to ES6
