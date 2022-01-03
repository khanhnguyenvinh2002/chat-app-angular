
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatService } from 'src/app/chat/chat.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[ChatService]
})
export class LoginComponent implements OnInit {
  hide = true;
  hide2 = true;
  hide1 = true;
  @Input() isLogIn = true;
  loginForm!: FormGroup;
  registerForm!: FormGroup;
  navigateUrl!: string;
  constructor(private router: Router, private fb: FormBuilder, private route: ActivatedRoute, private _chatService: ChatService) {
    this.createLoginForm();
    this.createRegisterForm();
  }

  ngOnInit() {

  }

  public createLoginForm() {
    this.loginForm = this.fb.group({
      'username': ['', Validators.required],
      'password': ['', Validators.required]
    })
  }
  public createRegisterForm() {
    this.registerForm = this.fb.group({
      'username1': ['', Validators.required],
      'password1': ['', Validators.required],
      'retypePassword': ['', Validators.required]
    })
  }

  public setCookie(name: string, value: any, days: number) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
  /**
   * login method
   */
  public login() {
    let credentials = this.loginForm.value;
      localStorage.setItem("User", JSON.stringify({ id: this.newGuid(), userName: credentials.username, room: [] }));
      this._chatService.login({ userid: this.newGuid(), userName: credentials.username, password: credentials.password, room: [] })
      // this.authService.setCookie("UserInfo", JSON.stringify(res.userInfo), 7);
      let path = '/chat';
      this.router.navigate([path]);

  }
  public newGuid() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
          var r = Math.random() * 16 | 0,
              v = c == 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
      });
  }
  public changeLogin() {
    this.isLogIn = !this.isLogIn;
    this.registerForm.controls['username1'].setValue('');
    this.registerForm.controls['password1'].setValue('');
    this.loginForm.controls['username'].setValue('');
    this.loginForm.controls['password'].setValue('');
    this.registerForm.controls['retypePassword'].setValue('');
    this.registerForm.markAsPristine();
    this.loginForm.markAsPristine();
  }
  /**
   * register
   */
  // public register() {
  //   let credentials = this.registerForm.value;
  //   let request = new UserRequestPayload();
  //   request.userName = this.registerForm.value.username1;
  //   if (credentials.password1 != credentials.retypePassword) {
  //     this.toastrService.error('Password does not match', "Error");
  //     return;
  //   }
  //   this.userService.count(request).subscribe((res: number) => {
  //     if (res == 0) {
  //       this.authService.register(credentials.username1, credentials.password1).subscribe((res: { canAccess: any; accessToken: null; userInfo: { userName: any; }; }) => {
  //         if (res.canAccess && res.accessToken != null) {
  //           this.authService.setCookie("AccessToken", res.accessToken, 7);
  //           localStorage.setItem('loggedUser', JSON.stringify({ accessToken: res.accessToken, userName: res.userInfo.userName }));
  //           // this.authService.setCookie("UserInfo", JSON.stringify(res.userInfo), 7);
  //           let path = this.route.snapshot.queryParams.returnUrl ? this.route.snapshot.queryParams.returnUrl : '/app/home';
  //           this.router.navigate([path]);
  //         } else {
  //           this.toastrService.error("An error has occured", 'Please try again');
  //         }

  //       })
  //     } else {
  //       this.toastrService.error('No data matches provided information', "Error");
  //     }
  //   }
  //   )


  // }
  returnHome() {
    this.router.navigate(['/app/home']);
  }


}
