import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  public searchStr: string="adele";
 
  aImg?: string;
  constructor() {

  }
 
  ngOnInit(): void {
   this.searchArtists();
   this.searchStr=''; 
    }
    public searchArtists()
    {
     console.log(this.searchStr);
     
  
    } 
    onsubmit() {
    }
  }
  
