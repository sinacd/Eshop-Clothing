import { ProductGallery } from './ProductGallery';
import { Product } from './product';
export class ProductDetailDTO {
    constructor(
        public product: Product,
        public galleries:ProductGallery[]
    ){}
}