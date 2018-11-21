/*!
 * domloader.js
 * v1.0
 * https://github.com/tmplink/domloader/
 * 
 * Licensed GPLv3 © TMPLINK STUDIO
 */

var domloader = {
    queue: [],
    progressbar: true,
    total:0,
    icon : false,
    id: 1,

    html: function (dom, path) {
        this.id++;
        console.log('Include::HTML::' + path);
        this.queue.push(
                function () {
                    $.get(path, function (response) {
                        $(dom).replaceWith(response);
                        domloader.load(path);
                    }, 'text');
                }
        );
    },

    css: function (path) {
        console.log('Include::CSS::' + path);
        this.queue.push(
                function () {
                    domloader.id++;
                    $('head').append("<link async id=\"domloader_" + domloader.id + "\" rel=\"stylesheet\" href=\"" + path + "\" >\n");
                    $('#domloader_' + domloader.id).ready(function () {
                        domloader.load(path);
                    });
                }
        );
    },

    js: function (path) {
        console.log('Include::JS::' + path);
        this.queue.push(
                function () {
                    $.get(path, function (response) {
                        domloader.id++;
                        $('body').append("<script id=\"domloader_" + domloader.id + "\" type=\"text/javascript\">\n" + response + "</script>\n");
                        domloader.load(path);
                    }, 'text');
                }
        );
    },

    load: function (src) {
        if (typeof (src) !== 'undefined') {
            var percent = Math.ceil((this.total-this.queue.length)/this.total*100);
            $('.curRate').animate({'width': percent+'%'},"fast");
            console.log("Loaded::" + src);
        }
        if (this.queue.length === 0) {
            if (this.progressbar === false) {
                $('#domloader_loading_bg').fadeOut();
                $('#domloader_loading_show').fadeOut();
            }
        } else {
            if (this.progressbar) {
                this.total = this.queue.length;
                this.progressbar = false;
                $('#domloader_loading_bg').show();
                $('#domloader_loading_show').show();
            }
        }
        var fn = this.queue.shift();
        if (typeof (fn) === 'function') {
            fn();
        }
    },

    init: function () {
        window.onload = function () {
            $('body').append('<div id="domloader_loading_bg" style="position: fixed;top: 0;left: 0;width: 100%;height: 100%;background: rgba(255, 255, 255);z-index: 15000;"></div>');
            $('body').append('<div id="domloader_loading_show" style="color: black;;z-index: 15001;width: 200px; height: 200px;position: absolute; left: 0;top: 0;right: 0;bottom: 0; margin: auto;"></div>');
            if(domloader.icon!==false){
                $('#domloader_loading_show').append('<div style="text-align:center;margin-bottom:20px;"><img src="'+domloader.icon+'" /></div>');
            }
            $('#domloader_loading_show').append('<div class="progress round-conner"><div class="curRate round-conner"></div></div>');
            $('#domloader_loading_show').append('<style>.progress {width: 200px;background: #ddd;}.curRate {width: 0%;background: #f30;}.round-conner {height: 10px;border-radius: 15px;}</style>');
            console.log('Page ready.Domloader start.');
            domloader.load();
        }
    }
}
