/// <reference path="Scripts/typings/marked/marked.d.ts"/>
/// <reference path="Scripts/typings/handlebars/handlebars.d.ts"/>
var Littlei;
(function (Littlei) {
    (function (Post) {
        Post[Post["Post"] = 0] = "Post";
        Post[Post["Page"] = 1] = "Page";
    })(Littlei.Post || (Littlei.Post = {}));
    var Post = Littlei.Post;
    var HomeRender = (function () {
        function HomeRender(config, data) {
            this.config = config;
            this.data = data;
        }
        HomeRender.prototype.render = function (title) {
            if (title === void 0) { title = ""; }
            var tmpl = document.getElementById("home-template");
            var html = document.querySelector(this.config.mainContainer);
            this.data.forEach(function (post, i) {
                var template = Handlebars.compile(tmpl.innerHTML, { noEscape: true });
                var result = template(post);
                html.innerHTML += result;
            });
        };
        return HomeRender;
    })();
    Littlei.HomeRender = HomeRender;
    var PostRender = (function () {
        function PostRender(config, data) {
            this.config = config;
            this.data = data;
        }
        PostRender.prototype.render = function (title) {
            var html = document.querySelector(this.config.mainContainer);
            html.innerHTML = "";
            this.data.forEach(function (post, i) {
                if (post.name == title) {
                    var tmpl = document.getElementById("post-template");
                    var template = Handlebars.compile(tmpl.innerHTML, { noEscape: true });
                    var result = template(post);
                    html.innerHTML = result;
                }
            });
        };
        return PostRender;
    })();
    Littlei.PostRender = PostRender;
    var PageRender = (function () {
        function PageRender(config, data) {
            this.config = config;
            this.data = data;
        }
        PageRender.prototype.render = function (title) {
            var html = document.querySelector(this.config.mainContainer);
            html.innerHTML = "";
            this.data.forEach(function (page, i) {
                if (page.name == title) {
                    var tmpl = document.getElementById("page-template");
                    var template = Handlebars.compile(tmpl.innerHTML, { noEscape: true });
                    var result = template(page);
                    html.innerHTML = result;
                }
            });
        };
        return PageRender;
    })();
    Littlei.PageRender = PageRender;
    var FooterRender = (function () {
        function FooterRender(config) {
            this.config = config;
        }
        FooterRender.prototype.render = function (title) {
            var html = document.querySelector(this.config.footerContainer);
            if (html == null) {
                return;
            }
            else {
                html.innerHTML = "<p>&copy; " + (new Date()).getFullYear() + " Pedro Fernandes</p>";
            }
        };
        return FooterRender;
    })();
    Littlei.FooterRender = FooterRender;
    var NavItem = (function () {
        function NavItem(name, href, newWindow) {
            if (name === void 0) { name = ""; }
            if (href === void 0) { href = ""; }
            if (newWindow === void 0) { newWindow = false; }
            this.name = name;
            this.href = href;
            this.newWindow = false;
        }
        return NavItem;
    })();
    Littlei.NavItem = NavItem;
    var Config = (function () {
        function Config(config) {
            this.siteTitle = "My First WebSite";
            this.tagLine = "Other simple WebSite";
            this.postsFolder = "posts";
            this.pagesFolder = "pages";
            this.mainContainer = "#cms";
            this.footerContainer = "#footer";
            this.parseSeparator = "---";
            this.siteNavItems = [];
            if (config) {
                if (config.siteTitle)
                    this.siteTitle = config.siteTitle;
                if (config.tagLine)
                    this.tagLine = config.tagLine;
                if (config.postsFolder)
                    this.postsFolder = config.postsFolder;
                if (config.pagesFolder)
                    this.pagesFolder = config.pagesFolder;
                if (config.mainContainer)
                    this.mainContainer = config.mainContainer;
                if (config.footerContainer)
                    this.footerContainer = config.footerContainer;
                if (config.parseSeparator)
                    this.parseSeparator = config.parseSeparator;
                if (config.siteNavItems)
                    this.siteNavItems = config.siteNavItems;
            }
        }
        return Config;
    })();
    Littlei.Config = Config;
    var File = (function () {
        function File() {
        }
        return File;
    })();
    Littlei.File = File;
    var Error = (function () {
        function Error(status, statusText, text) {
            this.status = status;
            this.statusText = statusText;
            this.text = text;
        }
        return Error;
    })();
    Littlei.Error = Error;
    var CMS = (function () {
        /**
         */
        function CMS(config) {
            this.config = config;
            this.posts = [];
            this.pages = [];
            this.loaded = [];
        }
        CMS.prototype.extend = function (target, options, callback) {
            if (typeof options == "undefined") {
                options = target;
                target = "CMS";
            }
            for (var option in options) {
                if (Object.prototype.hasOwnProperty.call(options, option)) {
                    target[option] = options[option];
                }
            }
            callback();
            return target;
        };
        CMS.prototype.render = function (url, pageCallBack) {
            var _this = this;
            var mainContainer = document.querySelector(this.config.mainContainer);
            if (mainContainer != null) {
                mainContainer.innerHTML = "";
            }
            var footerContainer = document.querySelector(this.config.footerContainer);
            if (footerContainer != null) {
                footerContainer.style.visibility = 'hidden';
            }
            var segments = url.split('/');
            var type = segments[0];
            var name = segments[1];
            var render;
            var map = {
                "": function (callback, pageCallBack) {
                    render = new HomeRender(_this.config, _this.posts);
                    callback(render);
                    if (pageCallBack) {
                        pageCallBack("home");
                    }
                },
                "#post": function (callback) {
                    render = new PostRender(_this.config, _this.posts);
                    callback(render);
                    if (pageCallBack) {
                        pageCallBack(url);
                    }
                },
                "#page": function (callback) {
                    render = new PageRender(_this.config, _this.pages);
                    callback(render);
                    if (pageCallBack) {
                        pageCallBack(url);
                    }
                }
            };
            if (map[type]) {
                map[type](function (render) {
                    render.render(name);
                }, pageCallBack);
            }
            else {
                alert("No mapping for current type. Please install new type and reload page.");
            }
            render = new FooterRender(_this.config);
            render.render("");
            this.fadeIn(mainContainer);
            window.scrollTo(0, 0);
        };
        /**
         */
        CMS.prototype.build = function (callback, pageCallBack) {
            var _this = this;
            _this.setSiteAttributes();
            [Post.Post, Post.Page].forEach(function (el, i) {
                _this.getFiles(el);
            });
            window.onhashchange = function () {
                _this.render(window.location.hash, pageCallBack);
            };
            if (callback) {
                callback();
            }
        };
        /**
         */
        CMS.prototype.createNavigation = function () {
            var _this = this;
            var html = "<ul>";
            _this.config.siteNavItems.forEach(function (navItem, i) {
                if (navItem.hasOwnProperty("href")) {
                    if (navItem.href.length != 0) {
                        html += "<li><a class=\"cms_nav_link\" href=\"" + navItem.href + "\"";
                        if (navItem.newWindow == true) {
                            html += " target=\"_blank\"";
                        }
                        html += ">" + navItem.name + "</a></li>";
                    }
                }
                else {
                    _this.pages.forEach(function (page, i) {
                        if (navItem.name == page.name) {
                            html += "<li><a id=\"" + navItem.name + "\" class=\"cms_nav_link\" href=\"#page/" + page.name + "\">" + page.title + "</a></li>";
                        }
                    });
                }
            });
            html += "</ul>";
            document.getElementById("cms_nav").innerHTML = html;
            var navLinks = document.getElementsByClassName("cms_nav_link");
            var item;
            var _loop_1 = function(i) {
                item = navLinks[i];
                var title = item.getAttribute("id");
                item.onclick = function (e) {
                    e.preventDefault();
                    window.location.hash = 'page/' + title;
                };
            };
            for (var i = void 0; i < navLinks.length; i++) {
                _loop_1(i);
            }
        };
        CMS.prototype.setSiteAttributes = function () {
            document.title = this.config.siteTitle;
        };
        /**
         */
        CMS.prototype.load = function (file, index, totalFiles) {
            var _this = this;
            var urlFolder;
            switch (file.type) {
                case Post.Post:
                    urlFolder = this.config.postsFolder;
                    break;
                case Post.Page:
                    urlFolder = this.config.pagesFolder;
                    break;
            }
            var url = urlFolder + '/' + file.name;
            this.xhr(null, url, function (response, error) {
                if (error) {
                    alert(error.statusText);
                }
                else {
                    _this.parse(response, file, index, totalFiles);
                }
            });
        };
        /**
         */
        CMS.prototype.parse = function (content, file, index, totalFiles) {
            var data = content.split(this.config.parseSeparator);
            var metadata;
            var obj;
            obj = [];
            if (data.length > 1) {
                metadata = data[1].split("\n");
                metadata.forEach(function (item, i) {
                    if (item.trim() != "") {
                        item.replace(/^\s+|\s+$/g, '').trim();
                        var x = item.split(':');
                        var xi = x[0];
                        x.shift();
                        var val = x.join(":");
                        obj[xi] = val.trim();
                    }
                });
            }
            data.splice(0, 2);
            obj.id = index;
            obj.name = file.name;
            obj.content = data.join();
            obj.content = marked(obj.content);
            switch (file.type) {
                case Post.Post:
                    this.posts.push(obj);
                    break;
                case Post.Page:
                    this.pages.push(obj);
                    break;
            }
            if (index == (totalFiles - 1)) {
                this.contentLoaded(file.type);
            }
        };
        /**
         */
        CMS.prototype.contentLoaded = function (type) {
            this.loaded[Post[type]] = true;
            if (this.loaded.Post && this.loaded.Page) {
                this.createNavigation();
            }
            var event = document.createEvent("HTMLEvents");
            event.initEvent("hashchange", true, true);
            window.dispatchEvent(event);
        };
        /**
         */
        CMS.prototype.getFiles = function (type) {
            var _this = this;
            var urlFolder;
            switch (type) {
                case Post.Post:
                    urlFolder = this.config.postsFolder;
                    break;
                case Post.Page:
                    urlFolder = this.config.pagesFolder;
                    break;
            }
            var url = urlFolder;
            this.xhr("xml", url, function (response, error) {
                if (error) {
                    alert(error);
                    return;
                }
                var links = response.getElementsByTagName("a");
                var files = [];
                for (var i = 0; i < links.length; i++) {
                    var fileName = void 0;
                    var name_1 = void 0;
                    fileName = links.item(i).getAttribute("href");
                    if (fileName == "/") {
                        continue;
                    }
                    name_1 = fileName.substr(fileName.lastIndexOf("/") + 1, fileName.length - (fileName.lastIndexOf("/") + 1));
                    if (fileName.match(".md$").length != 0) {
                        var file = new File();
                        file.type = type;
                        file.name = name_1;
                        file.link = fileName;
                        files.push(file);
                    }
                    if (files.length > 0) {
                        files.forEach(function (f, x) {
                            _this.load(f, x, files.length);
                        });
                    }
                    else {
                        alert("No " + Post[type] + "s founded. Please create a new document and reload page again.");
                    }
                }
            });
        };
        /**
         */
        CMS.prototype.xhr = function (responseType, url, data, callback) {
            if (callback === void 0) { callback = null; }
            if (callback == null) {
                callback = data;
            }
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = (function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    if (responseType == "json" || responseType == "xml") {
                        callback(xhr.response, null);
                    }
                    else {
                        callback(xhr.responseText, null);
                    }
                }
                else {
                    if (xhr.readyState === 4 && xhr.status !== 200) {
                        var response = new Error(xhr.status, xhr.statusText, "");
                        if (xhr.responseType === '' || xhr.responseType === 'text') {
                            response.text = xhr.responseText;
                        }
                        callback(null, response);
                    }
                }
            });
            if (responseType) {
                xhr.responseType = "document";
            }
            xhr.open("GET", url);
            xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
            if (!data) {
                xhr.send();
            }
            else {
                xhr.send(data);
            }
        };
        CMS.prototype.fadeIn = function (element) {
            element.style.opacity = "0";
            var tick = function () {
                element.style.opacity = (parseFloat(element.style.opacity) + 0.01).toString();
                if (parseFloat(element.style.opacity) < 1) {
                    (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
                }
            };
            tick();
        };
        return CMS;
    })();
    Littlei.CMS = CMS;
})(Littlei || (Littlei = {}));
//# sourceMappingURL=Littlei.js.map