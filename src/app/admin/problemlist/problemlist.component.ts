import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CookieService } from 'ngx-cookie-service';
import { HttpService } from 'src/app/services/httpService/http.service';
import { UserService } from 'src/app/services/userService/user.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import * as global from 'src/app/globals';

@Component({
  selector: 'app-problemlist',
  templateUrl: './problemlist.component.html',
  styleUrls: ['./problemlist.component.less']
})
export class ProblemlistComponent implements OnInit {
  getProblemlistUrl: string = global.url + '/getProblemlist';
  setProblemInfoUrl: string = global.url + '/setProblemInfo';
  deleteProblemUrl: string = global.url + '/deleteProblem';
  searchProblemsUrl: string = global.url + '/searchProblems';

  loginMessage: any;

  isLogin: boolean = false;
  isLoading: boolean = true;
  search: string = '';
  listOfData: { problem_id: string, title: string, accepted: number, in_date: number, defunct: string, loading: boolean }[] = [];
  setProblemInfo: { problem_id: string, list: string, seting: string, info: string } = { problem_id: '', list: '', seting: '', info: '' };

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

    //获取题目列表
    http.get(this.getProblemlistUrl).then((res: any) => {
      console.log(res);
      if (res.success) {
        this.isLoading = false;
        this.listOfData = res.poblemlist;
      }
      else {
        this.msgSer.error(res.msg, { nzDuration: 1500 });
        this.isLoading = false;
      }
    }, (rej: any) => {
      console.log(rej);
    });
  }

  //启用/屏蔽题目
  setDefunct(index: number) {
    this.listOfData[index].loading = true;
    this.setProblemInfo.problem_id = this.listOfData[index].problem_id;
    this.setProblemInfo.list = 'problem';
    this.setProblemInfo.seting = 'defunct';
    this.setProblemInfo.info = this.listOfData[index].defunct == 'N' ? 'Y' : 'N';
    this.http.post(this.setProblemInfoUrl, this.setProblemInfo).then((res: any) => {
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

  //用户管理员权限
  setPrivilege(index: number) {
    this.listOfData[index].loading = true;

    setTimeout(() => {
      this.listOfData[index].loading = false;
    }, 1000);
  }

  //删除题目
  showDeleteConfirm(problem_id: string) {
    this.modal.confirm({
      nzTitle: '你确定要删除这个题目吗?',
      nzContent: '<b style="color: red;">删除题目后将无法恢复</b>',
      nzOkText: '确定',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.http.post(this.deleteProblemUrl, { problem_id: problem_id }).then((res: any) => {
          console.log(res);
          if (res.success) {
            this.msgSer.success(res.msg, { nzDuration: 1500 })
            this.listOfData = this.listOfData.filter(d => d.problem_id !== problem_id);
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
  searchProblems() {
    if (this.isLoading) return;
    this.isLoading = true;
    console.log(this.search)
    this.http.getHasData(this.searchProblemsUrl, { search: this.search }).then((res: any) => {
      console.log(res);
      if (res.success) {
        this.isLoading = false;
        this.listOfData = res.problemlist;
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
