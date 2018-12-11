<p align="center">
<img src="https://github.com/tmplink/domloader/blob/master/images/struct.png?raw=true"/>
</p>

# 概述
domloader是一个模版加载小工具，帮助你简单地构建前后端分离的web前端程序。  
无需太多复杂的学习成本，看完本页即可上手，甚至可以立即应用到你现有的项目。  
你可以像使用其他混合html的后端语言一样，对你的前端项目文件进行模块化处理。   
比如将页头和页脚与页面主体内容单独抽取出来，形成模块，批量应用到其他类似页面。  

另外，domloader在加载时会显示一个进度界面。 
进度界面会遮盖加载过程, 这类似于iOS上app启动界面机制。  
因此可以缓解因网速慢，或者页面资源较多而导致显示不完全问题。   
加载进度是真实的加载进度，并非模拟。  

你可以到这里浏览domloader的实际应用。  
同时也欢迎应用了domloader的作品在此展示。  

[TMP.link - 一个临时文件中转站](http://tmp.link) 

目前已经实现的功能：
* 加载html，css以及js
* 可以设置一个加载进度界面的图标（可以是你网站的Logo）
* 加载时显示进度条

<p align="center">
<img src="https://github.com/tmplink/domloader/blob/master/images/demo.png?raw=true"/>
</p>

# 队列加载
为了确保页面功能不混乱，domloader会队列加载预设的内容（浏览器通常是并发加载页面资源）。   
这种方式在首次访问时可能会稍微降低页面的加载速度，而在之后瞬间完成。  
计划在后期优化加载速度以及动画效果。

# 包含
domloader的核心功能需要jQuery支持才能实现，因此在使用domloader时请务必加载jQuery。

# 用法
首先，建议先加载jQuery。

```html
<script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
````

然后，加载domloader。

```html
<script src="domloader.js"></script>
````

通常建议在页面的head部分加入domload的执行代码，以确保domloader可以优先运行。  
domloader会在页面准备就绪时自动执行设定的加载指令。

```javascript
domloader.init()
```

加载一个HTML块
```javascript
domloader.html(dom,path);
//参数dom指的是domloader该向哪个ID注入html块的内容。这是使用了jQuery的选择器。
//参数path指的是domloader从哪里获取html块。
```
举一个例子
下面的这段代码，会在页面就绪时，由domloader下载header.html的内容，并替换掉id="head"的区块。
```html
<html>
  <head>
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

加载CSS和JS文件  
对于CSS文件，domloader会按顺序将其插入到head的尾部，以外部样式表的方式。  
而对于JS文件，domloader会按顺序下载好JS的内容后，以script标签内嵌的方式，将js内容插入到body的尾部。   
```javascript
domloader.css(path);
domloader.js(path);
```

设置加载页面的icon    
如果你不设置这个，那么在加载时只会显示进度条   
```javascript
domloader.icon = '/yourlogo.png';
```

显示控制台调试信息  
domloader.debug 控制是否在控制台输出加载调试信息。默认是打开的，你可以设置为false来屏蔽这些信息。  
```javascript
domloader.debug = false;
```
