import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CookieService } from 'ngx-cookie-service';
import { HttpService } from 'src/app/services/httpService/http.service';
import { UserService } from 'src/app/services/userService/user.service';
import { Md5 } from 'ts-md5';
import * as global from 'src/app/globals';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  loginUrl: string = global.url + '/login';

  loging: boolean = false;
  password: string = '';
  passwordVisible = false;
  user: { user_id: string, password: string } = { user_id: '', password: '' };

  constructor(
    private userSer: UserService,
    private route: Router,
    private msgSer: NzMessageService,
    private http: HttpService,
    private cookieSer: CookieService
  ) {
    const token = cookieSer.get('token');
    if (token != '' && global.isLogin) {
      route.navigateByUrl('home');
      return;
    }
  }

  ngOnInit(): void {
  }

  check() {
    console.log(this.user.user_id + ' ----- ' + this.password);
    if (this.user.user_id.length == 0) {
      this.msgSer.warning('请输入用户名', { nzDuration: 1500 });
      return;
    }
    if (this.user.user_id.length > 15) {
      this.msgSer.warning('请输入正确的用户名', { nzDuration: 1500 });
      return;
    }
    for (let i = 0; i < this.user.user_id.length; i++) {
      if ((this.user.user_id[i] >= 'a' && this.user.user_id[i] <= 'z') || (this.user.user_id[i] >= 'A' && this.user.user_id[i] <= 'Z') || (this.user.user_id[i] >= '0' && this.user.user_id[i] <= '9')) {
      }
      else {
        this.msgSer.warning('请输入正确的用户名', { nzDuration: 1500 });
        return;
      }
    }
    if (this.password.length == 0) {
      this.msgSer.warning('请输入密码', { nzDuration: 1500 });
      return;
    }
    this.login();
  }

  login() {
    if (this.loging) return;
    this.loging = true;
    const id = this.msgSer.loading('登录中...', { nzDuration: 0 }).messageId;
    this.user.password = Md5.hashStr(this.password);
    let json = JSON.stringify(this.user);
    // console.log(json);
    this.http.getHasData(this.loginUrl, this.user).then((res: any) => {
      // console.log(res);
      this.msgSer.remove(id);
      if (res.success) {
        let expireDate = new Date();
        expireDate.setDate(expireDate.getDate() + 3);
        this.cookieSer.set('token', res.token, { expires: expireDate });
        this.userSer.setUser({ user_id: res.user_id, nick: res.nick, isLogin: true, privilege: res.privilege });
        history.go(-1);
        this.msgSer.success(res.msg, { nzDuration: 1500 })
      }
      else {
        this.msgSer.error(res.msg, { nzDuration: 1500 })
      }
      this.loging = false;
    }, (rej: any) => {
      // console.log(rej);
      this.msgSer.remove(id);
      this.msgSer.error('网络错误', { nzDuration: 1500 })
      this.loging = false;
    });
  }
}
