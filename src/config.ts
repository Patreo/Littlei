namespace Littlei {
    export class Config {
        public siteTitle: string;
        public tagLine: string;
        public postsFolder: string;
        public pagesFolder: string;
        public mainContainer: string;
        public footerContainer: string;
        public parseSeparator: string;
        public siteNavItems: Array<Littlei.NavItem>;

        constructor(config?: any) {
            this.siteNavItems = [];

            let _default: any = {
                siteTitle: "",
                tagLine: "",
                postsFolder: "posts",
                pagesFolder: "page",
                mainContainer: "#cms",
                footerContainer: "#footer",
                parseSeparator: "---",
                siteNavItems: []
            };

            let obj = {
                ...config, ..._default
            }

            this.siteTitle = obj.siteTitle;
            this.tagLine = obj.tagLine;
            this.postsFolder = obj.postsFolder;
            this.pagesFolder = obj.pagesFolder;
            this.mainContainer = obj.mainContainer;
            this.footerContainer = obj.footerContainer;
            this.parseSeparator = obj.parseSeparator;
            this.siteNavItems = obj.siteNavItems;
        }
    }
}