/// <reference path="Scripts/typings/marked/marked.d.ts"/>
/// <reference path="Scripts/typings/handlebars/handlebars.d.ts"/>

module Littlei {
    export enum Post {
        Post = 0,
        Page = 1
    }

    export interface IRender {
        render(title?: string);
    }

    export class HomeRender implements IRender {
        private config: Config;
        private data: Array<any>;

        constructor(config: Config, data: Array<any>) {
            this.config = config;
            this.data = data;
        }

        public render(title: string = "") {  
            let html: HTMLHtmlElement = document.querySelector(this.config.mainContainer) as HTMLHtmlElement;
            html.innerHTML = "";
                      
            this.data.forEach((post, i) => {
                let tmpl = document.getElementById("home-template");
                let template = Handlebars.compile(tmpl.innerHTML, { noEscape: true });
                let result: string = template(post);

                html.innerHTML += result;
            });
        }
    }

    export class PostRender implements IRender {
        private config: Config;
        private data: Array<any>;

        constructor(config: Config, data: Array<any>) {
            this.config = config;
            this.data = data;
        }

        public render(title: string) {           
            let html: HTMLHtmlElement = document.querySelector(this.config.mainContainer) as HTMLHtmlElement;
            html.innerHTML = "";

            this.data.forEach((post, i) => {
                if (post.name == title) {
                    let tmpl = document.getElementById("post-template");
                    let template = Handlebars.compile(tmpl.innerHTML, { noEscape: true });
                    let result: string = template(post);

                    html.innerHTML = result;
                }
            });
        }
    }

    export class PageRender implements IRender {
        private config: Config;
        private data: Array<any>;

        constructor(config: Config, data: Array<any>) {
            this.config = config;
            this.data = data;
        }

        public render(title: string) {
            let html: HTMLHtmlElement = document.querySelector(this.config.mainContainer) as HTMLHtmlElement;
            html.innerHTML = "";

            this.data.forEach((page, i) => {
                if (page.name == title) {
                    let tmpl = document.getElementById("page-template");
                    let template = Handlebars.compile(tmpl.innerHTML, { noEscape: true });
                    let result: string = template(page);

                    html.innerHTML = result;
                }
            });
        }
    }

    export class FooterRender implements IRender {
        private config: Config;

        constructor(config: Config) {
            this.config = config;
        }

        public render(title?: string) {
            let html: HTMLHtmlElement = document.querySelector(this.config.footerContainer) as HTMLHtmlElement;
            if (html == null) {
                return;
            } else {
                html.innerHTML = "<p>&copy; " + (new Date()).getFullYear() + " Pedro Fernandes</p>";
            }            
        }
    }

    export class NavItem {
        constructor(name: string = "", href: string = "", newWindow: boolean = false) {
            this.name = name;
            this.href = href;
            this.newWindow = false;
        }

        public name: string;
        public href: string;
        public newWindow: boolean;
    }

    export class Config {
        constructor(config?: any) {
            this.siteNavItems = [];

            if (config) {
                if (config.siteTitle) this.siteTitle = config.siteTitle;
                if (config.tagLine) this.tagLine = config.tagLine;
                if (config.postsFolder) this.postsFolder = config.postsFolder;
                if (config.pagesFolder) this.pagesFolder = config.pagesFolder;
                if (config.mainContainer) this.mainContainer = config.mainContainer;
                if (config.footerContainer) this.footerContainer = config.footerContainer;
                if (config.parseSeparator) this.parseSeparator = config.parseSeparator;
                if (config.siteNavItems) this.siteNavItems = config.siteNavItems;
            }
        }

        public siteTitle: string = "My First WebSite";
        public tagLine: string = "Other simple WebSite";
        public postsFolder: string = "posts";
        public pagesFolder: string = "pages";
        public mainContainer: string = "#cms";
        public footerContainer: string = "#footer";
        public parseSeparator: string = "---";
        public siteNavItems: Array<NavItem>;
    }

    export class File {
        public name: string;
        public link: string;
        public type: Post;
    }

    export class Error {
        public status: number;
        public statusText: string;
        public text: string;

        constructor(status: number, statusText: string, text: string) {
            this.status = status;
            this.statusText = statusText;
            this.text = text;
        }
    }

    export class CMS {
        private config: Config;
        private loaded: any;
        public posts: Array<any>;
        public pages: Array<any>;
        
        /**
         */
        constructor(config: Config) {
            this.config = config;
            this.posts = [];
            this.pages = [];
            this.loaded = [];
        }
       
        public extend(target, options, callback) {
            if (typeof options == "undefined") {
                options = target;
                target = "CMS";
            }

            for (let option in options) {
                if (Object.prototype.hasOwnProperty.call(options, option)) {
                    target[option] = options[option];
                }
            }

            callback();
            return target;
        }

        public render(url) {
            let _this = this;

            let mainContainer = document.querySelector(this.config.mainContainer) as HTMLHtmlElement;           
            if (mainContainer != null) {
                mainContainer.innerHTML = "";
            }

            let footerContainer = document.querySelector(this.config.footerContainer) as HTMLHtmlElement;
            if (footerContainer != null) {
                footerContainer.style.visibility = 'hidden';
            }

            let segments: Array<string> = url.split('/');
            let type: string = segments[0];
            let name: string = segments[1];
            let render: IRender;

            let map = {
                "": function (callback: any) {
                    render = new HomeRender(_this.config, _this.posts);
                    callback(render);
                },
                "#post": function (callback: any) {
                    render = new PostRender(_this.config, _this.posts);
                    callback(render);
                },
                "#page": function (callback: any) {
                    render = new PageRender(_this.config, _this.pages);
                    callback(render);
                }
            };

            if (map[type]) {
                map[type](function (render: IRender) {
                    render.render(name);
                });
            } else {
                alert("No mapping for current type. Please install new type and reload page.");
            }

            render = new FooterRender(_this.config);
            render.render("");
        }

        /**
         */
        public build() {
            let _this = this;
            _this.setSiteAttributes();

            [Post.Post, Post.Page].forEach((el, i) => {
                _this.getFiles(el);
            });

            window.onhashchange = function () {
                _this.render(window.location.hash);
            };
        }

        /**
         */
        private createNavigation() {
            let _this = this;
            let html = "<ul>";

            _this.config.siteNavItems.forEach((navItem, i) => {
                if (navItem.hasOwnProperty("href")) {
                    if (navItem.href.length != 0) {
                        html += "<li><a class=\"cms_nav_link\" href=\"" + navItem.href + "\"";
                        if (navItem.newWindow == true) {
                            html += " target=\"_blank\"";
                        }
                        html += ">" + navItem.name + "</a></li>";
                    }
                } else {
                    _this.pages.forEach((page, i) => {
                        if (navItem.name == page.name) {
                            html += "<li><a id=\"" + navItem.name + "\" class=\"cms_nav_link\" href=\"#page/" + page.name + "\">" + page.title + "</a></li>";                            
                        }
                    });
                }
            });

            html += "</ul>";
            document.getElementById("cms_nav").innerHTML = html;

            let navLinks: NodeListOf<Element> = document.getElementsByClassName("cms_nav_link");
            let item: HTMLAnchorElement;

            for (let i: number; i < navLinks.length; i++) {
                item = navLinks[i] as HTMLAnchorElement;

                let title = item.getAttribute("id");
                item.onclick = function (e) {
                    e.preventDefault();
                    window.location.hash = 'page/' + title;
                }
            }
        }

        private setSiteAttributes() {
            document.title = this.config.siteTitle;
        }

        /**        
         */
        private load(file: File, index: Number, totalFiles: Number) {
            let _this = this;
            let urlFolder: string;

            switch (file.type) {
                case Post.Post:
                    urlFolder = this.config.postsFolder;
                    break;
                case Post.Page:
                    urlFolder = this.config.pagesFolder;
                    break;
            }

            let url: string = urlFolder + '/' + file.name;

            this.xhr(null, url, function (response, error) {
                if (error) {
                    alert(error.statusText);
                } else {
                    _this.parse(response, file, index, totalFiles);
                }                
            });
        }

        /**
         */         
        private parse(content: string, file: File, index: Number, totalFiles: Number) {
            let data: Array<string> = content.split(this.config.parseSeparator);
            let metadata: Array<string>;
            let obj: any;
            obj = [];
            
            if (data.length > 1) {
                metadata = data[1].split("\n");
                metadata.forEach((item, i) => {
                    if (item.trim() != "") {
                        item.replace(/^\s+|\s+$/g, '').trim();

                        let x: Array<string> = item.split(':');
                        let val = x[1];
                        let xi = x[0];
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

            if (index == ((totalFiles as number) - 1)) {
                this.contentLoaded(file.type);
            }            
        }

        /**
         */
        private contentLoaded(type: Post) {
            this.loaded[Post[type]] = true;

            if (this.loaded.Post && this.loaded.Page) {
                this.createNavigation();
            }

            let event: Event = document.createEvent("HTMLEvents");
            event.initEvent("hashchange", true, true);
            window.dispatchEvent(event);
        }

        /**        
         */
        private getFiles(type: Post) {
            let _this = this;
            let urlFolder: string;

            switch (type) {
                case Post.Post:
                    urlFolder = this.config.postsFolder;
                    break;
                case Post.Page:
                    urlFolder = this.config.pagesFolder;
                    break;
            }

            let url: string = urlFolder;

            this.xhr("xml", url, function (response, error) {
                if (error) {
                    alert(error);
                    return;
                }

                let links: NodeListOf<HTMLAnchorElement> = response.getElementsByTagName("a")
                let files: Array<File> = [];

                for (let i: number = 0; i < links.length; i++) {
                    let fileName: string;
                    let name: string;

                    fileName = links.item(i).getAttribute("href");
                    if (fileName == "/") {
                        continue;
                    }

                    name = fileName.substr(fileName.lastIndexOf("/") + 1, fileName.length - (fileName.lastIndexOf("/") + 1));

                    if (fileName.match(".md$").length != 0) {
                        let file = new File();
                        file.type = type;
                        file.name = name;
                        file.link = fileName;

                        files.push(file);
                    }

                    if (files.length > 0) {
                        files.forEach((f, x) => {
                            _this.load(f, x, files.length);
                        });
                    } else {
                        alert("No " + Post[type] + "s founded. Please create a new document and reload page again."); 
                    }
                }
            });
        }

        /**        
         */
        private xhr(responseType: string, url: string, data: any, callback: any = null) {
            if (callback == null) {
                callback = data;
            }

            let xhr = new XMLHttpRequest();
            xhr.onreadystatechange = (function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    if (responseType == "json" || responseType == "xml") {
                        callback(xhr.response, null);
                    } else {
                        callback(xhr.responseText, null);
                    }
                } else {
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
        }

    }
} 



