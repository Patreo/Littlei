namespace Littlei {
    export class HomeRender implements IRender {
        private config: Config;
        private data: Array<any>;

        constructor(config: Config, data: Array<any>) {
            this.config = config;
            this.data = data;
        }

        public render(title: string = "") {
            let tmpl = document.getElementById("home-template");
            let html: HTMLHtmlElement = document.querySelector(this.config.mainContainer) as HTMLHtmlElement;

            this.data.forEach((post, i) => {
                let template = Handlebars.compile(tmpl.innerHTML, { noEscape: true });
                let result: string = template(post);

                html.innerHTML += result;
            });
        }
    }
}