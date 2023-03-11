import { OrderCartDetail } from './../DTOs/Sliders/Orders/OrderCartDetail';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResponseResult } from '../DTOs/Sliders/Common/IResponseResult';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  private orderDetails:BehaviorSubject<OrderCartDetail[] |null> = new BehaviorSubject<OrderCartDetail[] |null>(null);

  getOrderDetails(){
    return this.orderDetails;
  }
  setOrderDetails(details:OrderCartDetail[] | null){
    this.orderDetails.next(details);
  }

  addProductToOrder(productId:number,count:number):Observable<IResponseResult<any>>{
    const params = new HttpParams().set('productId',productId.toString()).set('count',count.toString());
    return this.http.get<IResponseResult<any>>('order/add-order',{params});
  }
  getUserCartDetails():Observable<IResponseResult<OrderCartDetail[]>>{
    return this.http.get<IResponseResult<OrderCartDetail[]>>("order/get-order-details");
  }
  removeOrderDetail(detailId:number):Observable<IResponseResult<OrderCartDetail[]>>{
    return this.http.get<IResponseResult<OrderCartDetail[]>>("order/remove-order-detail/"+detailId);
  }
}



