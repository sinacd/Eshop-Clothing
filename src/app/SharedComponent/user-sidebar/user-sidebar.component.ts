import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.scss']
})
export class UserSidebarComponent implements OnInit {
  @Input() selectedTab!: any;
  constructor() { }

  ngOnInit(): void {
   
  }

  selectTab(value:number){
    this.selectedTab = value;
  console.log(this.selectedTab);
  
  }
}
