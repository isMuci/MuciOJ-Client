import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CookieService } from 'ngx-cookie-service';
import { HttpService } from 'src/app/services/httpService/http.service';
import { UserService } from 'src/app/services/userService/user.service';
import * as global from 'src/app/globals';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-contestlist',
  templateUrl: './contestlist.component.html',
  styleUrls: ['./contestlist.component.less']
})
export class ContestlistComponent implements OnInit {
  getContestlistUrl: string = global.url + '/getContestlist';
  searchContestsUrl: string = global.url + '/searchContests';
  deleteContestUrl: string = global.url + '/deleteContest';
  setContestInfoUrl: string = global.url + '/setContestInfo';

  loginMessage: any;

  isLoading: boolean = true;
  search: string = '';
  listOfData: { contest_id: number, title: string, start_time: number, end_time: number, private: string, defunct: string, loading: boolean }[] = [];
  setContestInfo: { contest_id: number, list: string, seting: string, info: string } = { contest_id: 0, list: '', seting: '', info: '' };

  constructor(
    private route: Router,
    private msgSer: NzMessageService,
    private cookieSer: CookieService,
    private userSer: UserService,
    private modal: NzModalService,
    private http: HttpService,
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
    http.get(this.getContestlistUrl).then((res: any) => {
      console.log(res);
      if (res.success) {
        this.isLoading = false;
        this.listOfData = res.contestlist;
      }
      else {
        this.msgSer.error(res.msg, { nzDuration: 1500 });
        this.isLoading = false;
      }
    }, (rej: any) => {
      console.log(rej);
    });
  }
  //启用/屏蔽用户
  setDefunct(index: number) {
    this.listOfData[index].loading = true;
    this.setContestInfo.contest_id = this.listOfData[index].contest_id;
    this.setContestInfo.list = 'contest';
    this.setContestInfo.seting = 'defunct';
    this.setContestInfo.info = this.listOfData[index].defunct == 'N' ? 'Y' : 'N';
    this.http.post(this.setContestInfoUrl, this.setContestInfo).then((res: any) => {
      console.log(res);
      if (res.success) {
        this.listOfData[index].defunct = this.listOfData[index].defunct == 'N' ? 'Y' : 'N';
        console.log(this.listOfData[index])
      }
      else {
        this.msgSer.error(res.msg, { nzDuration: 1500 })
      }
      this.listOfData[index].loading = false;
    }, (rej: any) => {
      console.log(rej);
      this.msgSer.error('网络错误', { nzDuration: 1500 })
      this.listOfData[index].loading = false;
    });
  }

  //删除比赛
  showDeleteConfirm(contest_id: number) {
    this.modal.confirm({
      nzTitle: '你确定要删除这个比赛吗?',
      nzContent: '<b style="color: red;">删除比赛后将无法恢复</b>',
      nzOkText: '确定',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.http.post(this.deleteContestUrl, { contest_id: contest_id }).then((res: any) => {
          console.log(res);
          if (res.success) {
            this.msgSer.success(res.msg, { nzDuration: 1500 })
            this.listOfData = this.listOfData.filter(d => d.contest_id !== contest_id);
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

  //鉴别当前用户权限
  checkPrivilege() {
    if (global.privilege != 'admin') {
      this.msgSer.warning('未授权的访问', { nzDuration: 1500 });
      this.route.navigateByUrl('home');
      return;
    }
  }

  //搜索题目
  searchContests() {
    if (this.isLoading) return;
    this.isLoading = true;
    console.log(this.search)
    this.http.getHasData(this.searchContestsUrl, { search: this.search }).then((res: any) => {
      console.log(res);
      if (res.success) {
        this.isLoading = false;
        this.listOfData = res.contestlist;
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
