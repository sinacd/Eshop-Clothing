import { AddProductComment } from './../DTOs/Sliders/Products/AddProductComment';
import { Product } from './../DTOs/Sliders/Products/product';
import { ProductDetailDTO } from './../DTOs/Sliders/Products/ProductDetailDTO';

import { ProductCategory } from './../DTOs/Sliders/Products/ProductCategory';
import { IResponseResult } from './../DTOs/Sliders/Common/IResponseResult';
import { FilterProductsDTO } from './../DTOs/Sliders/Products/FilterProductsDTO';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductCommentDTO } from '../DTOs/Sliders/Products/ProductCommentDTO';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http:HttpClient) { }
  getFilteredProducts(filter:FilterProductsDTO | null):Observable<IResponseResult<FilterProductsDTO>>{
    let params;
    if (filter!==null)
    {
      if(filter.title===null)
      {
        filter.title='';
      }
      params= new HttpParams()
      .set('pageId',filter.pageId.toString())
      .set('title',filter.title)
      .set('takeEntity',filter.takeEntity.toString())
      for(const category of filter.categories)
      {
        params=params.append('categories',category.toString());
      }
      if(filter.orderBy!=null)
      {
        params=params.append('orderBy',filter.orderBy?.toString());
      }
      if(filter.startPrice!=null)
      {
      
        params=params.append('startPrice',filter.startPrice?.toString());
      }
      if(filter.endPrice!=null)
      {
        params=params.append('endPrice',filter.endPrice?.toString());
      }
    }
    return this.http.get<IResponseResult<FilterProductsDTO>>('products/filter-products',{params});
  }
  getProductActiveCategories():Observable<IResponseResult<ProductCategory[]>>
  {
    return this.http.get<IResponseResult<ProductCategory[]>>('products/product-active-categories');
  }
  getSingleProduct(productId:number):Observable<IResponseResult<ProductDetailDTO>>{
    return this.http.get<IResponseResult<ProductDetailDTO>>('products/single-product/'+productId);
  }
  getRelatedProducts(productId:number):Observable<IResponseResult<Product[]>>{
    return this.http.get<IResponseResult<Product[]>>('products/related-products/'+productId);
  }
  getProductComments(productId:number):Observable<IResponseResult<ProductCommentDTO[]>>{
    return this.http.get<IResponseResult<ProductCommentDTO[]>>('products/product-comments/'+productId);
  }
  addProductComment(comment: AddProductComment): Observable<IResponseResult<ProductCommentDTO>> {
    return this.http.post<IResponseResult<ProductCommentDTO>>('products/add-product-comment', comment);
  }
}
