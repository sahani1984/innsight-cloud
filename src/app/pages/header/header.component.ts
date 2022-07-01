import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CollectionService } from 'src/app/shared/services/collection.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  selectedTabs:any;
  clickedTab:string='';
  showAction:string=''

  login_user:any;
  constructor(
    public collectionService:CollectionService,
    private router:Router,
    private authService:AuthService
    ) { 
    this.collectionService.userName.subscribe(res=> this.login_user = res);
    this.selectedTabs = 'topbar_notifications_notifications'
  }

  ngOnInit(): void {
  }
logoutpanel:boolean = false
  showLogout(){
    this.logoutpanel = !this.logoutpanel;
  }

  logout(){    
    this.router.navigate(['/login']);
    this.collectionService.userName.next({});
    this.authService.loggedOut();
  }

}
