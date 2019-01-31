namespace Littlei {
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
}