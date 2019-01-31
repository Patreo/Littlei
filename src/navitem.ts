namespace Littlei {
    export class NavItem {
        public name: string;
        public href: string;
        public newWindow: boolean;

        constructor(name: string = "", href: string = "", newWindow: boolean = false) {
            this.name = name;
            this.href = href;
            this.newWindow = newWindow;
        }
    }
}