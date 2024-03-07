import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CookieService } from 'ngx-cookie-service';
import { HttpService } from 'src/app/services/httpService/http.service';
import { UserService } from 'src/app/services/userService/user.service';
import { Md5 } from 'ts-md5';
import * as global from 'src/app/globals';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent implements OnInit {
  registerUrl: string = global.url + '/register';

  registering: boolean = false;
  password: string = '';
  repeatPassword: string = '';
  user: { user_id: string, password: string, nick: string, signature: string, email: string, school: string } = { user_id: '', password: '', nick: '', signature: '', email: '', school: '' };

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
    console.log(this.user.user_id + ' ----- ' + this.password + ' ----- ' + this.repeatPassword);
    if (this.user.user_id.length == 0) {
      this.msgSer.warning('请输入用户名', { nzDuration: 1500 });
      return;
    }
    if (this.user.user_id.length > 15) {
      this.msgSer.warning('请输入格式正确的用户名', { nzDuration: 1500 });
      return;
    }
    for (let i = 0; i < this.user.user_id.length; i++) {
      if ((this.user.user_id[i] >= 'a' && this.user.user_id[i] <= 'z') || (this.user.user_id[i] >= 'A' && this.user.user_id[i] <= 'Z') || (this.user.user_id[i] >= '0' && this.user.user_id[i] <= '9')) {
      }
      else {
        this.msgSer.warning('请输入格式正确的用户名', { nzDuration: 1500 });
        return;
      }
    }
    if (this.user.nick.length == 0) {
      this.msgSer.warning('请输入昵称', { nzDuration: 1500 });
      return;
    }
    if (this.password.length == 0 || this.repeatPassword.length == 0) {
      this.msgSer.warning('请输入密码', { nzDuration: 1500 });
      return;
    }
    if (this.password != this.repeatPassword) {
      this.msgSer.warning('请输入两次相同的密码', { nzDuration: 1500 });
      return;
    }
    this.register();
  }

  register() {
    if (this.registering) return;
    this.registering = true;
    const id = this.msgSer.loading('注册中...', { nzDuration: 0 }).messageId;
    this.user.password = Md5.hashStr(this.password);
    let json = JSON.stringify(this.user);
    console.log(json);
    this.http.getHasData(this.registerUrl, this.user).then((res: any) => {
      console.log(res);
      this.msgSer.remove(id);
      if (res.success) {
        let expireDate = new Date();
        expireDate.setDate(expireDate.getDate() + 3);
        this.cookieSer.set('token', res.token, { expires: expireDate });
        this.userSer.setUser({ user_id: this.user.user_id, nick: res.nick, isLogin: true });
        this.route.navigateByUrl('home')
        this.msgSer.success(res.msg, { nzDuration: 1500 })
      }
      else {
        this.msgSer.error(res.msg, { nzDuration: 1500 })
      }
      this.registering = false;
    }, (rej: any) => {
      console.log(rej);
      this.msgSer.remove(id);
      this.msgSer.error('网络错误', { nzDuration: 1500 })
      this.registering = false;
    });
  }
  reset() {
    this.user.user_id = '';
    this.user.nick = '';
    this.password = '';
    this.repeatPassword = '';
    this.user.signature = '';
    this.user.email = '';
    this.user.school = '';
  }
}
