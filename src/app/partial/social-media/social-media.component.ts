import { Component, Output, EventEmitter } from '@angular/core';
import {socialMedia} from './social-media.json';
@Component({
  selector: 'app-social-media',
  templateUrl: './social-media.component.html',
  styleUrls: ['./social-media.component.scss']
})
export class SocialMediaComponent  {

  socialIconAll:any=[]
  selectedIndex:number;
  @Output() iconTitle = new EventEmitter<any>();
  constructor() {
    this.socialIconAll = socialMedia;
    this.selectedIndex = 4;
   }
   addActive(index, title){
    this.selectedIndex = index;
    this.iconTitle.emit(title);
   }

}
