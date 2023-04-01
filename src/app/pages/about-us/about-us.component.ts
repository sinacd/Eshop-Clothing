import { Component, OnInit, ViewEncapsulation } from '@angular/core';
declare function SmoothAnchorLink():any;
@Component({
  selector: 'app-page-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class AboutUsComponent implements OnInit {

  constructor() {  console.log("constructor");}

  ngOnInit(): void {

    SmoothAnchorLink();
    
  }

}
