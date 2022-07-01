import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AppConstant } from 'src/app/shared/app-constant';
import { CollectionService } from 'src/app/shared/services/collection.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {
  @ViewChild('loginform', { read: NgForm, static: false })
  loginform: NgForm;
  invalid_cred: boolean;
  constructor(private authService: AuthService,
    private collectionService: CollectionService,
    private router: Router) {
    this.invalid_cred = false;
  }

  ngOnInit(): void { }
  ngAfterViewInit() {
    this.loginform.statusChanges.subscribe(e => {
      if (e == 'VALID') this.invalid_cred = false;
    });
  }

  login(obj) {
    console.log(obj)
    this.authService.validateLogin(obj).subscribe(
      res => {
        if (res["status"] == "success") {
          if (res["data"].length) {
            this.authService.setLoggedIn();
            this.router.navigate(['/pages/client-manager/list-client']);
            this.collectionService.userName.next(res["data"][0]);
            sessionStorage.setItem('log_user', JSON.stringify(res["data"]))
            console.log(res["data"])
          } else this.invalid_cred = true;
        } else {
          console.log(AppConstant.ERROR_MSG);
        }
      },
      err => console.log(err)
    )
  }


}
