export class Stock {
    favorite: boolean = false;
    constructor(
        public name: string = '',
        public price: number = 0,
        public code: string = '',
        public previousPrice: number = 0,
        public exchange: string = ''
    ){}
    isPositiveChange(): boolean {
        return this.price >= this.previousPrice;
    }
}
