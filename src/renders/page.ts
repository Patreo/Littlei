namespace Littlei {
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
}