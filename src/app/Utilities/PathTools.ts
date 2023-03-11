import { environment } from "src/environments/environment"


export  const DomainName = environment.production ? 'https://google.com/':'https://localhost:44345/';

export const ImagePath = DomainName + 'images/products/origin/';
export const ImageGalleryPath=DomainName+'images/product-galleries/';
