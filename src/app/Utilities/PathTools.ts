import { environment } from "src/environments/environment"


export  const DomainName = environment.production ? 'http://sinacd4-001-site1.etempurl.com/':'https://localhost:44345/';


export const SliderImagePath = DomainName + 'images/sliders/origin/';
export const ImagePath = DomainName + 'images/products/origin/';
export const ImageGalleryPath=DomainName+'images/product-galleries/';
