namespace Littlei {
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
}