import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SliderService } from 'src/app/services/slider.service';
import { Pipe, PipeTransform, NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs/internal/observable/of';
import { SliderComponent } from './slider.component';

describe('SliderComponent', () => {
  let component: SliderComponent;
  let fixture: ComponentFixture<SliderComponent>;
  let mockSliderService:  {
   setCurrentSliders: any;
   GetSliders: any;
   getCurrentSliders:any; 
};

  beforeEach(async () => {
    mockSliderService= jasmine.createSpyObj(['getCurrentSliders','GetSliders','setCurrentSliders']);
    await TestBed.configureTestingModule({
      declarations: [ SliderComponent ],
      schemas:[NO_ERRORS_SCHEMA],
      providers:[
         { provide: SliderService, useValue: mockSliderService },
    
        
        ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SliderComponent);
   
  });

  it('should get sliders from getCurrentSliders', () => {
    mockSliderService.getCurrentSliders.and.returnValue(of([ {link: null, imageName: '1.jpg', id: 1}]));
    fixture.componentInstance.ngOnInit();
   fixture.detectChanges();
  

    expect(fixture.componentInstance.sliders.length).toBe(0);
  });
  it('should get null from getCurrentSliders and get Success from GetSliders ', () => {
 
    mockSliderService.getCurrentSliders.and.returnValue(of(null));
    
    mockSliderService.GetSliders.and.returnValue(of({status: "Success", data: [{link: null, imageName: '1.jpg', id: 1}]}));
    mockSliderService.setCurrentSliders.and.returnValue(of(true));
    fixture.componentInstance.ngOnInit();
   fixture.detectChanges();
  

    expect(fixture.componentInstance.sliders.length).toBe(0);

    expect(mockSliderService.setCurrentSliders).toHaveBeenCalledWith([{link: null, imageName: '1.jpg', id: 1}]);
   // expect(mockSliderService.setCurrentSliders).toHaveBeenCalledWith({link: null, imageName: '1.jpg', id: 1});
  });
  it('should get null from getCurrentSliders and get Error from GetSliders  ', () => {
 
    mockSliderService.getCurrentSliders.and.returnValue(of(null));
    
    mockSliderService.GetSliders.and.returnValue(of({status: "Error"}));
  
    fixture.componentInstance.ngOnInit();
   fixture.detectChanges();
  

    expect(fixture.componentInstance.sliders.length).toBe(0);

    expect(mockSliderService.setCurrentSliders).not.toHaveBeenCalledWith([{link: null, imageName: '1.jpg', id: 1}]);
   // expect(mockSliderService.setCurrentSliders).toHaveBeenCalledWith({link: null, imageName: '1.jpg', id: 1});
  });
});
