import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as global from 'src/app/globals';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  //订阅内容
  private loginSource = new Subject<{ user_id?: string, nick?: string, isLogin?: boolean, privilege?: string }>();

  //订阅
  loginMassage$ = this.loginSource.asObservable();

  //发布

  setUser(info: { user_id?: string, nick?: string, isLogin?: boolean, privilege?: string }) {
    if (info.user_id) global.setUserId(info.user_id);
    if (info.nick) global.setNick(info.nick);
    if (info.isLogin != undefined) global.setLogin(info.isLogin);
    if (info.privilege) global.setPrivilege(info.privilege);
    this.loginSource.next(info);
  }

  constructor() { }
}
