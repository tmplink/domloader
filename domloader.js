/*!
 * domloader.js
 * v1.3
 * https://github.com/tmplink/domloader/
 * 
 * Licensed GPLv3 © TMPLINK STUDIO
 */

var domloader = {
    queue: [],
    progressbar: true,
    total: 0,
    icon: false,
    id: 1,
    debug: true,
    root : '',

    html: function (dom, path) {
        domloader.id++;
        domloader.log('Include::HTML::' + path);
        domloader.queue.push(
                function () {
                    $.get(domloader.root + path, function (response) {
                        $(dom).replaceWith(response);
                        domloader.load(path);
                    }, 'text');
                }
        );
    },

    css: function (path) {
        domloader.log('Include::CSS::' + path);
        domloader.queue.push(
                function () {
                    domloader.id++;
                    $('head').append("<link async id=\"domloader_" + domloader.id + "\" rel=\"stylesheet\" href=\"" + domloader.root + path + "\" >\n");
                    $('#domloader_' + domloader.id).ready(function () {
                        domloader.load(path);
                    });
                }
        );
    },

    js: function (path) {
        domloader.log('Include::JS::' + path);
        domloader.queue.push(
                function () {
                    $.get(domloader.root + path, function (response) {
                        domloader.id++;
                        $('body').append("<script id=\"domloader_" + domloader.id + "\" type=\"text/javascript\">\n" + response + "</script>\n");
                        domloader.load(path);
                    }, 'text');
                }
        );
    },

    load: function (src) {
        $('body').css('overflow', 'hidden');
        if (domloader.queue.length === 0) {
            if (domloader.progressbar === false) {
                $('#domloader_loading_show').fadeOut(100);
                $('#domloader_loading_bg').fadeOut(100);
                $('body').css('overflow', '');
            }
        } else {
            if (domloader.progressbar) {
                domloader.total = domloader.queue.length;
                domloader.progressbar = false;
                $('#domloader_loading_bg').show();
                $('#domloader_loading_show').show();
            }
        }
        if (typeof (src) !== 'undefined') {
            var percent = Math.ceil((this.total - this.queue.length) / this.total * 100);
            $('.curRate').animate({'width': percent + '%'}, 100);
            domloader.log("Loaded::" + src);
        }
        var fn = domloader.queue.shift();
        if (typeof (fn) === 'function') {
            fn();
        }
    },

    init: function () {
        window.onload = function () {
            $('head').append('<style>*, ::after, ::before {box-sizing: border-box;}</style>');
            $('body').append('<div id="domloader_loading_bg" style="position: fixed;top: 0;left: 0;width: 100%;height: 100%;background: white;z-index: 15000;"></div>');
            $('body').append('<div id="domloader_loading_show" style="color: black;;z-index: 15001;width: 200px; height: 200px;position: absolute; left: 0;top: 0;right: 0;bottom: 0; margin: auto;"></div>');
            if (domloader.icon !== false) {
                $('#domloader_loading_show').append('<div style="text-align:center;margin-bottom:20px;"><img src="' + domloader.icon + '" style="vertical-align: middle;border-style: none;"/></div>');
            }
            $('#domloader_loading_show').append('<div class="progress round-conner"><div class="curRate round-conner"></div></div>');
            $('#domloader_loading_show').append('<style>.progress {width: 180px;background: #ddd;margin-right:auto;margin-left:auto;}.curRate {width: 0%;background: #f30;}.round-conner {height: 10px;border-radius: 15px;}</style>');
            domloader.log('Page ready.Domloader start.');
            domloader.load();
        };
    },

    log: function (msg) {
        if (this.debug) {
            console.log(msg);
        }
    }
};