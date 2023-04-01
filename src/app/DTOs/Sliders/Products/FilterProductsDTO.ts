import { Product } from './product';
import { ProductsOrderBy } from './ProductsOrderBy';
export class FilterProductsDTO {
    constructor(
        public title:string | null,
        public startPrice:number|null,
        public endPrice:number|null,
        public pageId:number,
        public pageCount:number,
        public startPage:number,
        public endPage:number,
        public takeEntity:number,
        public skipEntity:number,
        public activePage:number,
        public orderBy:ProductsOrderBy|null=null,
        public categories:number[],
        public products:Product[]
    ){}
}