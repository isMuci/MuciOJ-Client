import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CookieService } from 'ngx-cookie-service';
import { HttpService } from 'src/app/services/httpService/http.service';
import { UserService } from 'src/app/services/userService/user.service';
import { Md5 } from 'ts-md5';
import * as global from 'src/app/globals';

@Component({
  selector: 'app-setinfo',
  templateUrl: './setinfo.component.html',
  styleUrls: ['./setinfo.component.less']
})
export class SetinfoComponent implements OnInit {
  setInfoUrl: string = global.url + '/setInfo';
  getInfoUrl: string = global.url + '/getInfo';

  setInfoing: boolean = false;
  password: string = '';
  newPassword: string = '';
  repeatNewPassword: string = '';
  user: { user_id: string, password: string, newPassword: string, nick: string, signature: string, email: string, school: string }
    = { user_id: '', password: '', newPassword: '', nick: '', signature: '', email: '', school: '' };

  constructor(
    private userSer: UserService,
    private route: Router,
    private msgSer: NzMessageService,
    private http: HttpService,
    private cookieSer: CookieService
  ) {
    const token = cookieSer.get('token');
    if (token == '') {
      this.msgSer.warning('请先登录', { nzDuration: 1500 });
      route.navigateByUrl('home');
      return;
    }
    const id = this.msgSer.loading('获取用户信息中...', { nzDuration: 0 }).messageId;
    this.http.get(this.getInfoUrl).then((res: any) => {
      console.log(res);
      this.msgSer.remove(id);
      if (res.success) {
        this.user.user_id = res.userInfo.user_id;
        this.user.nick = res.userInfo.nick;
        this.user.signature = res.userInfo.signature;
        this.user.email = res.userInfo.email;
        this.user.school = res.userInfo.school;
        this.msgSer.success(res.msg, { nzDuration: 1500 })
      }
      else {
        this.msgSer.error(res.msg, { nzDuration: 1500 })
      }
    }, (rej: any) => {
      console.log(rej);
      this.msgSer.remove(id);
      this.msgSer.error('网络错误', { nzDuration: 1500 })
    });
  }

  ngOnInit(): void {
  }
  check() {
    console.log(this.user.user_id + ' ----- ' + this.password + ' ----- ' + this.repeatNewPassword);
    if (this.user.nick.length == 0) {
      this.msgSer.warning('请输入昵称', { nzDuration: 1500 });
      return;
    }
    if (this.newPassword != this.repeatNewPassword) {
      this.msgSer.warning('请输入两次相同的新密码', { nzDuration: 1500 });
      return;
    }
    if (this.password.length == 0) {
      this.msgSer.warning('请输入密码', { nzDuration: 1500 });
      return;
    }
    if (this.password == this.newPassword) {
      this.msgSer.warning('新密码不应与旧密码相同', { nzDuration: 1500 });
      return;
    }
    this.setInfo();
  }

  setInfo() {
    if (this.setInfoing) return;
    this.setInfoing = true;
    const id = this.msgSer.loading('修改用户信息中...', { nzDuration: 0 }).messageId;
    this.user.password = Md5.hashStr(this.password);
    if (this.newPassword != '')
      this.user.newPassword = Md5.hashStr(this.newPassword);
    console.log(this.user.newPassword + '--' + this.newPassword)
    this.http.post(this.setInfoUrl, this.user).then((res: any) => {
      console.log(res);
      this.msgSer.remove(id);
      if (res.success) {
        this.userSer.setUser({ user_id: this.user.user_id, nick: this.user.nick, isLogin: true });
        this.cookieSer.set('token', res.token);
        this.route.navigateByUrl('home')
        this.msgSer.success(res.msg, { nzDuration: 1500 })
      }
      else {
        this.msgSer.error(res.msg, { nzDuration: 1500 })
      }
      this.setInfoing = false;
    }, (rej: any) => {
      console.log(rej);
      this.msgSer.remove(id);
      this.msgSer.error('网络错误', { nzDuration: 1500 })
      this.setInfoing = false;
    });
  }
  reset() {
    this.user.user_id = '';
    this.user.nick = '';
    this.password = '';
    this.newPassword = '';
    this.repeatNewPassword = '';
    this.user.signature = '';
    this.user.email = '';
    this.user.school = '';
  }
}
