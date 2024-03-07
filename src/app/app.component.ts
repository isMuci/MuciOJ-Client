import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CookieService } from 'ngx-cookie-service';
import { HttpService } from './services/httpService/http.service';
import { UserService } from './services/userService/user.service';
import * as global from './globals';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnDestroy, OnInit {
  autoLoginUrl: string = global.url + '/autoLogin';

  winLeft: number = 0;
  loginMessage: any;
  isCollapsed = false;
  privilege = '';
  isLogin = false;
  visible = false;
  user_id: string = '';
  nick: string = '';
  constructor(
    private cookieSer: CookieService,
    private http: HttpService,
    private msgSer: NzMessageService,
    private userSer: UserService,
    private route: Router
  ) {
    let token = cookieSer.get('token');
    this.isLogin = global.isLogin;

    //自动登录
    if (token != '') {
      console.log("autoLogin " + token);
      http.get(this.autoLoginUrl).then(
        (res: any) => {
          console.log(res);
          if (res.success) {
            this.isLogin = true;
            this.user_id = res.user_id;
            this.nick = res.nick;
            this.privilege = res.privilege;
            this.checkLoginWinLeft();
            this.userSer.setUser({ user_id: res.user_id, nick: res.nick, isLogin: true, privilege: res.privilege });
          } else {
            if (res.delete) {
              console.log('deleting...');
              cookieSer.delete('token');
            }
            this.msgSer.error(res.msg, { nzDuration: 1500 });
          }
        },
        (rej: any) => {
          console.log(rej);
        }
      );
    }
  }

  changeWindow(data: any) {
    console.log(data)
    if (this.isCollapsed) {
      this.winLeft = 64;
    }
    else {
      this.winLeft = 256;
    }
  }

  open() {
    this.visible = true;
  }
  close() {
    this.visible = false;
  }

  //登出
  logOut() {
    console.log('logOut...');
    this.isLogin = false;
    this.cookieSer.delete('token');
    this.privilege = 'normal';
    this.userSer.setUser({ user_id: '', nick: '', isLogin: false, privilege: 'normal' });
    this.winLeft = 0;
    this.route.navigateByUrl('/home');
  }

  ngOnInit() {
    //订阅登录信息
    this.loginMessage = this.userSer.loginMassage$.subscribe((info) => {
      this.user_id = global.user_id;
      this.nick = global.nick;
      this.isLogin = global.isLogin;
      this.privilege = global.privilege;
      this.checkLoginWinLeft();
      console.log(info)
    })
  }

  checkLoginWinLeft() {
    if (this.privilege == 'admin') this.winLeft = 256;
  }

  ngOnDestroy() {
    //取消登录信息订阅
    this.loginMessage?.unsubscribe();
  }
}
