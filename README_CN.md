<p align="center">
<img src="https://github.com/tmplink/domloader/blob/master/images/struct.png?raw=true"/>
</p>

# 概述
domloader是一个模版加载小工具，帮助你简单地构建前后端分离的web前端程序。  
无需太多复杂的学习成本，看完本页即可上手，甚至可以立即应用到你现有的项目。  
你可以像使用其他混合 html 的后端语言一样，对你的前端项目文件进行模块化处理。   
比如将页头和页脚与页面主体内容单独抽取出来，形成模块，批量应用到其他类似页面。  

另外，domloader在加载时会显示一个进度界面。 
进度界面会遮盖加载过程, 这类似于 iOS 上 app 启动界面机制。  
因此可以缓解因网速慢，或者页面资源较多而导致显示不完全问题。   
加载进度是真实的加载进度，并非模拟。  

你可以到这里浏览domloader的实际应用。  
同时也欢迎应用了domloader的作品在此展示。  

* [TMP.link - 一个临时文件中转站](http://tmp.link)   
* [Bootstrap 4 简体中文文档](http://bs4.vx.link) 

目前已经实现的功能：
* 加载html，css以及js
* 可以设置一个加载进度界面的图标
* 加载时显示进度条
* 自动前缀修正，解决项目中的各种路径问题
* 回调设置，加载资源文件完成后执行回调

<p align="center">
<img src="https://github.com/tmplink/domloader/blob/master/images/demo.png?raw=true"/>
</p>

# 升级版本
domloader 由一个 js 文件和一个 css 文件组成，合计约 12 kb。  
每次升级版本，您只需要将最新版本的两个文件覆盖即可。

# 队列加载
为了确保页面功能不混乱，domloader 会队列加载预设的内容（浏览器通常是并发加载页面资源）。   
这种方式在首次访问时可能会稍微降低页面的加载速度，而在之后瞬间完成。  
计划在后期优化加载速度以及动画效果。

# 包含
domloader 的核心功能需要 jQuery 支持才能实现，因此在使用 domloader 时请务必加载 jQuery 。

# 用法
## 首先，建议先加载 jQuery 。

```html
<script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
````

## 然后，加载 domloader 。

```html
<script src="domloader.js"></script>
<link href="domloader.css" rel="stylesheet"/>
````

通常建议在页面的head部分加入 domloader 的执行代码，以确保 domloader 可以优先运行。  
domloader会在页面准备就绪时自动执行设定的加载指令。

```javascript
domloader.init()
```

## 加载一个 HTML 块
```javascript
domloader.html(dom,path);
//参数 dom 指的是 domloader 该向哪个 ID 注入 html 块的内容。这是使用了 jQuery 的选择器。
//参数 path 指的是 domloader 从哪里获取 html 块。
```
举一个例子
下面的这段代码，会在页面就绪时，由 domloader 下载 header.html 的内容，并替换掉 d="head" 的区块。
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

## 预加载文件
预加载功能优先于所有资源文件，会在页面加载后立即执行预加载功能，将代码插入到 head 后方。  
所有预加载资源不会受到浏览器缓存的影响，均为无缓存（重点）。  
因此预加载功能通常用来加载一些配置信息，比如定义了 version 参数的配置文件。
```javascript
domloader.preload(path);
```

## 加载CSS和JS文件  
对于 CSS 文件，domloader 会按顺序将其插入到 head 的尾部，以外部样式表的方式。  
而对于 JS 文件，domloader 会按顺序下载好 JS 的内容后，以 script 标签内嵌的方式，将 js 内容插入到 body 的尾部。   
```javascript
domloader.css(path);
domloader.js(path);
```

## 设置网站根目录  
如果你要把整个前端项目放在子目录，那么这个设置可以确保正确加载资源。    
一旦设置了此参数，每次加载时都会在地址前附加此参数。   
```javascript
domloader.root = 'https://yourwebsite.com/subdir/';
```

## 自动前缀修正  
此功能需要配合设置网站根目录一起使用。
当通过 domloader.root 设置了网站根目录时，在任意含有 src 或 href 的元素中增加 data-dl-root 属性，并设置为 true时，这个元素的 src 或 href 属性的值，会在 domloader 加载资源文件完成时得到自动修正。
```html
<script>
domloader.root = 'https://yourwebsite.com/subdir/';
</script>
<a data-dl-root="true" href="page/about.html">关于我们</a>
<!--[下面的代码是自动前缀修正后的代码]-->
<a data-dl-root="false" href="https://yourwebsite.com/subdir/page/about.html">关于我们</a>
```

## 设置资源文件版本号  
可以解决由于浏览器缓存导致的资源更新不及时问题。    
一旦设置了此参数，每次加载时都会在地址后附加此参数。   
```javascript
domloader.version = 'v1.0';
```

## 设置加载完成后的回调操作  
有一些操作必须要在所有资源加载完成之后进行。    
onload 方法允许你设置一系列回调，将会在 domloader 加载完所有资源文件后启动这个回调。   
```javascript
domloader.onload(
    function(){ xxx.xxx(); }
); 
```

## 设置加载页面的icon    
如果你不设置这个，那么在加载时只会显示进度条   
```javascript
domloader.icon = '/yourlogo.png';
```

## 控制加载页面的进度条时间    
此参数控制进度条动画总时间，即如果所有文件都为就绪状态，进度条跑完的时间。   
默认值为 500 ms   
```javascript
domloader.animation_time = 500;
```

## 关闭进度条    
此参数可以直接关闭进度条。   
默认值为 true   
```javascript
domloader.animation = false;
```

## 显示控制台调试信息  
domloader.debug 控制是否在控制台输出加载调试信息。默认是打开的，你可以设置为false来屏蔽这些信息。  
```javascript
domloader.debug = false;
```
