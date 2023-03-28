import { Slider } from './../../../DTOs/Sliders/Slider';
import { SliderService } from './../../../services/slider.service';
import { Component, OnInit } from '@angular/core';
import { SliderImagePath } from 'src/app/Utilities/PathTools';

declare function homeSlider():any;

@Component({
  selector: 'app-index-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {

public sliders:Slider[]=[];
sliderImagePath = SliderImagePath;

  constructor(private SliderService:SliderService) { }

  ngOnInit(): void {
    this.SliderService.getCurrentSliders().subscribe(sliders=>{
   
      
      if(sliders===null){
        this.SliderService.GetSliders().subscribe(res=>{
      
          if(res.status==='Success'){
            this.SliderService.setCurrentSliders(res.data);
        
           
          }
        })
      }else {
        this.sliders=sliders;
        console.log(this.sliders);
        
        setInterval(() => {
         homeSlider();
        }, 100);
       
      }
    
    })


  
  }

}
