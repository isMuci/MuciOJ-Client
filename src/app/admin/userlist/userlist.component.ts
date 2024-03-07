import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CookieService } from 'ngx-cookie-service';
import { HttpService } from 'src/app/services/httpService/http.service';
import { UserService } from 'src/app/services/userService/user.service';
import * as global from 'src/app/globals';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Md5 } from 'ts-md5';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.less']
})
export class UserlistComponent implements OnInit, OnDestroy {
  getUserlistUrl: string = global.url + '/getUserlist';
  setUserInfoUrl: string = global.url + '/setUserInfo';
  deleteUserUrl: string = global.url + '/deleteUser';
  searchUsersUrl: string = global.url + '/searchUsers';
  addUserUrl: string = global.url + '/addUser';

  loginMessage: any;

  isLogin: boolean = false;
  isLoading: boolean = true;
  search: string = '';
  listOfData: { user_id: string, nick: string, email: string, school: string, accesstime: number, reg_time: number, defunct: string, privilege: string, loadingd: boolean, loadingp: boolean }[] = [];
  setUserInfo: { user_id: string, list: string, seting: string, info: string } = { user_id: '', list: '', seting: '', info: '' };
  addUserInfo: { user_id: string, password: string } = { user_id: '', password: '' };


  constructor(
    private route: Router,
    private msgSer: NzMessageService,
    private cookieSer: CookieService,
    private userSer: UserService,
    private http: HttpService,
    private modal: NzModalService
  ) {
    let token = cookieSer.get('token');

    //鉴别访问页面权限
    if (token) {
      if (!global.isLogin) {
        this.loginMessage = userSer.loginMassage$.subscribe((info) => {
          console.log(info)
          //取消登录信息订阅
          this.loginMessage?.unsubscribe();
          this.checkPrivilege();
        })
      }
      else this.checkPrivilege();
    }
    else {
      msgSer.warning('请先登录', { nzDuration: 1500 });
      route.navigateByUrl('login');
      return;
    }

    //获取用户列表
    http.get(this.getUserlistUrl).then((res: any) => {
      console.log(res);
      if (res.success) {
        this.isLoading = false;
        this.listOfData = res.userlist;
      }
      else {
        this.msgSer.error(res.msg, { nzDuration: 1500 });
        this.isLoading = false;
      }
    }, (rej: any) => {
      console.log(rej);
    });
  }

  //鉴别当前用户权限
  checkPrivilege() {
    if (global.privilege != 'admin') {
      this.msgSer.warning('未授权的访问', { nzDuration: 1500 });
      this.route.navigateByUrl('home');
      return;
    }
  }

  password: string = '';
  repeatPassword: string = '';
  formVisible = false;
  formLoading = false;

  //弹出添加用户窗口
  showFormModal(): void {
    this.formVisible = true;
  }

  //确认添加用户
  handleFormOk(): void {
    this.formLoading = true;
    this.checkUser();
  }

  //关闭添加用户窗口
  handleFormCancel(): void {
    this.formVisible = false;
    this.addUserInfo.user_id = '';
    this.password = '';
    this.repeatPassword = '';
  }

  //检查新用户密码
  checkUser() {
    console.log(this.password + ' ----- ' + this.repeatPassword);
    if (this.password != this.repeatPassword) {
      this.msgSer.warning('请输入两次相同的密码', { nzDuration: 1500 });
      this.formLoading = false;
      return;
    }
    this.addUser();
  }

  //添加新用户
  addUser() {
    this.addUserInfo.password = Md5.hashStr(this.password);
    this.http.post(this.addUserUrl, this.addUserInfo).then((res: any) => {
      console.log(res);
      if (res.success) {
        this.msgSer.success(res.msg, { nzDuration: 1500 })
      }
      else {
        this.msgSer.error(res.msg, { nzDuration: 1500 })
      }
      this.formVisible = false;
      this.formLoading = false;
      clean();
    }, (rej: any) => {
      console.log(rej);
      this.msgSer.error('网络错误', { nzDuration: 1500 })
      this.formVisible = false;
      this.formLoading = false;
      clean();
    });

    let clean = () => {
      this.addUserInfo.user_id = '';
      this.password = '';
      this.repeatPassword = '';
    }
  }

  //启用/屏蔽用户
  setDefunct(index: number) {
    this.listOfData[index].loadingd = true;
    this.setUserInfo.user_id = this.listOfData[index].user_id;
    this.setUserInfo.list = 'users';
    this.setUserInfo.seting = 'defunct';
    this.setUserInfo.info = this.listOfData[index].defunct == 'N' ? 'Y' : 'N';
    this.http.post(this.setUserInfoUrl, this.setUserInfo).then((res: any) => {
      console.log(res);
      if (res.success) {
        this.listOfData[index].defunct = this.listOfData[index].defunct == 'N' ? 'Y' : 'N';
        console.log(this.listOfData[index])
      }
      else {
        this.msgSer.error(res.msg, { nzDuration: 1500 })
      }
      this.listOfData[index].loadingd = false;
    }, (rej: any) => {
      console.log(rej);
      this.msgSer.error('网络错误', { nzDuration: 1500 })
      this.listOfData[index].loadingd = false;
    });
  }

  //用户管理员权限
  setPrivilege(index: number) {
    this.listOfData[index].loadingp = true;
    this.setUserInfo.user_id = this.listOfData[index].user_id;
    this.setUserInfo.list = 'privilege';
    this.setUserInfo.seting = 'privilege';
    this.setUserInfo.info = this.listOfData[index].privilege == 'admin' ? 'normal' : 'admin';
    this.http.post(this.setUserInfoUrl, this.setUserInfo).then((res: any) => {
      console.log(res);
      if (res.success) {
        this.listOfData[index].privilege = this.listOfData[index].privilege == 'admin' ? 'normal' : 'admin';
        console.log(this.listOfData[index])
      }
      else {
        this.msgSer.error(res.msg, { nzDuration: 1500 })
      }
      this.listOfData[index].loadingp = false;
    }, (rej: any) => {
      console.log(rej);
      this.msgSer.error('网络错误', { nzDuration: 1500 })
      this.listOfData[index].loadingp = false;
    });
  }

  //删除用户
  showDeleteConfirm(user_id: string) {
    this.modal.confirm({
      nzTitle: '你确定要删除这个用户吗?',
      nzContent: '<b style="color: red;">删除用户后将无法恢复</b>',
      nzOkText: '确定',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.http.post(this.deleteUserUrl, { user_id: user_id }).then((res: any) => {
          console.log(res);
          if (res.success) {
            this.msgSer.success(res.msg, { nzDuration: 1500 })
            this.listOfData = this.listOfData.filter(d => d.user_id !== user_id);
          }
          else {
            this.msgSer.error(res.msg, { nzDuration: 1500 })
          }
        }, (rej: any) => {
          console.log(rej);
          this.msgSer.error('网络错误', { nzDuration: 1500 })
        });
      },
      nzCancelText: '取消',
      nzOnCancel: () => console.log('Cancel')
    });
  }

  confVisible = false;
  confLoading = false;
  newPassword: string = '';
  repeatNewPassword: string = '';

  //弹出重置密码窗口
  showConfModal(index: number): void {
    this.confVisible = true;
    this.setUserInfo.user_id = this.listOfData[index].user_id;
  }

  //检查重置的密码
  check() {
    console.log(this.setUserInfo.user_id + ' ----- ' + this.newPassword + ' ----- ' + this.repeatNewPassword);
    if (this.newPassword != this.repeatNewPassword) {
      this.msgSer.warning('请输入两次相同的新密码', { nzDuration: 1500 });
      this.confLoading = false;
      return;
    }
    this.setPWD();
  }

  //确认重置密码
  handleConfOk(): void {
    this.confLoading = true;
    this.check();
  }

  //关闭重置密码窗口
  handleConfCancel(): void {
    this.confVisible = false;
    this.setUserInfo.user_id = '';
    this.newPassword = '';
    this.repeatNewPassword = '';
  }

  //重置用户密码
  setPWD() {
    this.setUserInfo.list = 'users';
    this.setUserInfo.seting = 'password';
    this.setUserInfo.info = Md5.hashStr(this.newPassword);
    this.http.post(this.setUserInfoUrl, this.setUserInfo).then((res: any) => {
      console.log(res);
      if (res.success) {
        this.msgSer.success(res.msg, { nzDuration: 1500 })
      }
      else {
        this.msgSer.error(res.msg, { nzDuration: 1500 })
      }
      this.confVisible = false;
      this.confLoading = false;
      clean();
    }, (rej: any) => {
      console.log(rej);
      this.msgSer.error('网络错误', { nzDuration: 1500 })
      this.confVisible = false;
      this.confLoading = false;
      clean();
    });

    let clean = () => {
      this.setUserInfo.user_id = '';
      this.newPassword = '';
      this.repeatNewPassword = '';
    }
  }

  //搜索用户
  searchUsers() {
    if (this.isLoading) return;
    this.isLoading = true;
    console.log(this.search)
    this.http.getHasData(this.searchUsersUrl, { search: this.search }).then((res: any) => {
      console.log(res);
      if (res.success) {
        this.isLoading = false;
        this.listOfData = res.userlist;
        this.search = '';
      }
      else {
        this.msgSer.error(res.msg, { nzDuration: 1500 });
        this.isLoading = false;
        this.search = '';
      }
    }, (rej: any) => {
      console.log(rej);
    });
  }

  ngOnInit() {

  }

  ngOnDestroy() {

  }
}
