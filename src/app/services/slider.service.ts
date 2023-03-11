import { Slider } from './../DTOs/Sliders/Slider';
import { HomeSliderResponse } from './../DTOs/Sliders/HomeSliderResponse';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SliderService {

  private homeSliders:BehaviorSubject<Slider[] | null> = new BehaviorSubject<Slider[] | null>(null) ;

  constructor(private http:HttpClient) { }

  public GetSliders():Observable<HomeSliderResponse>{
   return this.http.get<HomeSliderResponse>("Slider/GetActiveSliders");
   
   
  }
  public getCurrentSliders():Observable<Slider[] | null>{
    return this.homeSliders;
  }
  public setCurrentSliders(sliders:Slider[]){
this.homeSliders.next(sliders);
  }

} 
