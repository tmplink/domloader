<p align="center">
<img src="https://github.com/tmplink/domloader/blob/master/images/struct.png?raw=true"/>
</p>

# Introduction
Domloader is a template tool that helps you to easily build front-end website.   
you can get started after reading this page, or even apply it to your existing project immediately.    
You can modularize your front-end project just like any other hybrid html backend language(etc.. php).  
For example, the page header and footer are extracted separately from the page body content to form a module and reference to other pages.    

In addition, the domloader will display a loading interface when it loads.   
The loading interface will cover the default loading process, like the app launcher interface on iOS.   
Solve the problem of incomplete display due to slow network speed or a lot of page resources.   
The loading progress is the real loading progress, not the simulation.  

You can browse the applications built with domloader here.  
Also welcome applications built with domloader are shown here.  

* [TMP.link - temporary file transfer](http://tmp.link)   
* [Bootstrap 4 simplified chinese document](http://bs4.vx.link) 

Features：
* Load html, css and js
* Set an icon for loading progress
* Show progress bar when loading
* Autofixer, Solve path problems in projects
* Callback function, perform callback after loading resource file

<p align="center">
<img src="https://github.com/tmplink/domloader/blob/master/images/demo.png?raw=true"/>
</p>

# Upgrade
The domloader consists of domloader.js  and domloader.css , totaling about 12 kb.  
Each time you upgrade your version, you only need to overwrite the two files in the latest version.  

# Queue loading
In order to ensure that the page function is not confusing, the domloader will queue the preset content (the browser usually loads the page resources concurrently).  
This method may slightly slow down the page loading time on the first visit, and then complete it in a short time.   
Plan to optimize loading speed later.   

# Requirements
The core functionality of domloader requires jQuery support to be implemented, so be sure to load jQuery before using domloader.

# Usage
## First, load jQuery.

```html
<script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
````

## Then，load domloader.

```html
<script src="domloader.js"></script>
<link href="domloader.css" rel="stylesheet"/>
````

It is recommended to add the initialization code of domloader to the head of the page to ensure that the domloader can run first.   
The domloader will automatically execute the set load command when the page is ready.

```javascript
domloader.init()
```

## Load an HTML file 

```javascript
domloader.html(dom,path);
//The parameter dom refers to the content to which the domloader injects the html block. A jQuery selector was used.
//The parameter path refers to where the domloader gets the html file.
```
example:   
The following code will download the contents of header.html when the page is ready, and replace the block with id="head".  

```html
<html>
  "head"
    <title>domloader demo</title>
    <script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
    <script src="domloader.js"></script>
    <script>
      domloader.init();
      domloader.html('#head','/header.html');
    </script>
  </head>
  <body>
    <div id="head"></div>
  </body>
</html>
```

## Preload file   
The preload feature takes precedence over all resource files and performs a preload function immediately after the page loads, inserting the code behind the "head".  
All preloaded resources are not cached by the browser.  
The preload function is used to load some configuration files, such as a configuration file that defines the version parameter.  

```javascript
domloader.preload(path);
```

## Load CSS and JS files   
For CSS files, the domloader inserts it into the end of the "head" in order, as an external style sheet.  
For JS files, the domloader will download the JS content in order, and insert the js content into the end of the <body> in the way of the script tag embedding.  

```javascript
domloader.css(path);
domloader.js(path);
```

## Set the website root directory   
If you want to put the entire front-end project in a subdirectory, this setting ensures that the resource is loaded correctly.    
Once this parameter is set, this parameter is appended to the address each time it is loaded.
 
```javascript
domloader.root = 'https://yourwebsite.com/subdir/';
```

## Autofixer  
This feature needs to be used in conjunction with setting up the website root.   
When the website root is set via domloader.root, the data-dl-root attribute is added to any element that contains src or href, and when set to true, the value of the element's src or href attribute is automatically corrected.

```html
<script>
domloader.root = 'https://yourwebsite.com/subdir/';
</script>
<a data-dl-root="true" href="page/about.html">about us</a>
<!--[The following code is the automatic prefix corrected code]-->
<a data-dl-root="false" href="https://yourwebsite.com/subdir/page/about.html">about us</a>
```

## Set the version
It can solve the problem that the resource update is not timely due to browser cache.  
Once this parameter is set, this parameter is appended to the resource file address each time it is loaded.   
```javascript
domloader.version = 'v1.0';
```

## Set the callback after loading is complete   
There are some functions that must be done after all resources have been loaded.   
The onload method allows you to set a queue of callbacks that will be started after the domloader has loaded all the resource files.   
```javascript
domloader.onload(
    function(){ xxx.xxx(); }
); 
```

## Set loading page icon
If you don't set this, only the progress bar will be displayed when loading. 
```javascript
domloader.icon = '/yourlogo.png';
```

## Set total animation time of loading progress bar
If all files have been loaded, the time of the progress bar animation will be limited to this value.  
Default : 500ms   
```javascript
domloader.animation_time = 500;
```

## Disable  animation
The progress bar is not displayed when the resource is loading.  
Default : true   
```javascript
domloader.animation = true;
```

## Display console debugging information
Domloader.debug Controls whether debugging information is loaded in the console output. The default is on, you can set this to false to block this information.
 
```javascript
domloader.debug = false;
```
