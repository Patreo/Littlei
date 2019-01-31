namespace Littlei {
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
}