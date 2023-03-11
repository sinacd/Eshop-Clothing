import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, NO_ERRORS_SCHEMA } from '@angular/core';
import { ActiveAccountComponent } from './active-account.component';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { of } from 'rxjs/internal/observable/of';
import { Observable } from 'rxjs';

describe('ActiveAccountComponent', () => {
  let component: ActiveAccountComponent;
  let fixture: ComponentFixture<ActiveAccountComponent>;
  let mockactivatedRoute;
  let mockauthService: { activateUser: { and: { returnValue: (arg0: Observable<{ status: string; data: {}; }>) => void; }; }; };
 // let mockrouter;
  beforeEach(async () => {
    mockactivatedRoute = {
      snapshot: {params: {'activeCode': '716da65d-076a-4f68-aa65-be6e53b5a58d'}}
    }
    mockauthService= jasmine.createSpyObj(['activateUser']);
//    mockrouter= jasmine.createSpyObj(['getHeroes']);
    await TestBed.configureTestingModule({
      declarations: [ ActiveAccountComponent ],
      schemas:[NO_ERRORS_SCHEMA],
      providers:[
         { provide: ActivatedRoute, useValue: mockactivatedRoute },
         { provide: AuthService, useValue: mockauthService },
    //     { provide: HeroService, useValue: mockrouter },
        
        ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActiveAccountComponent);
  
  
  });

  it('should get correct active code', () => {
    mockauthService.activateUser.and.returnValue(of({status: "Success", data: {}}));
    fixture.componentInstance.ngOnInit();
   fixture.detectChanges();
  

    expect(mockauthService.activateUser).toHaveBeenCalledWith('716da65d-076a-4f68-aa65-be6e53b5a58d');
    expect(fixture.componentInstance.isloading).toBe(false);


  });
  it('should get wrong active code', () => {
    
    mockauthService.activateUser.and.returnValue(of({status: "NotFound", data: {}}));
    fixture.componentInstance.ngOnInit();
   fixture.detectChanges();
  

    expect(mockauthService.activateUser).toHaveBeenCalled();
    expect(fixture.componentInstance.isloading).toBe(true);

  });





});
