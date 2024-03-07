import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CookieService } from 'ngx-cookie-service';
import { HttpService } from 'src/app/services/httpService/http.service';
import { UserService } from 'src/app/services/userService/user.service';
import { TransferChange, TransferItem, TransferSelectChange } from 'ng-zorro-antd/transfer';
import * as global from 'src/app/globals';

@Component({
  selector: 'app-contestadd',
  templateUrl: './contestadd.component.html',
  styleUrls: ['./contestadd.component.less']
})
export class ContestaddComponent implements OnInit {
  addContestUrl: string = global.url + '/addContest';
  getContestAddUrl: string = global.url + '/getContestAdd';
  config = global.quillConfig;

  adding: boolean = false;
  contest: { title: string, description: string, start_time: number, end_time: number, private: string, password: string, loading: boolean } = {
    title: '', description: '', start_time: 0, end_time: 0, private: '0', password: '', loading: false
  };

  ranges = { ACM: [new Date(new Date().setHours(new Date().getHours() + 1, 0, 0)), new Date(new Date().setHours(new Date().getHours() + 6, 0, 0))], '自定义': [new Date(), new Date()] };

  disabledStartDate = (startValue: Date): boolean => {
    if (!startValue) {
      return false;
    }
    return startValue.getTime() < new Date(this.contest.start_time).getTime();
  };

  loginMessage: any;

  constructor(
    private route: Router,
    private msgSer: NzMessageService,
    private cookieSer: CookieService,
    private userSer: UserService,
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

    http.get(this.getContestAddUrl).then((res: any) => {
      console.log(res);
      if (res.success) {
        this.list = res.uncheck;
      }
      else {
        this.msgSer.error(res.msg, { nzDuration: 1500 });
      }
    }, (rej: any) => {
      console.log(rej);
    });
  }

  problemlist: { problem_id: number, title: string }[] = [];


  add() {
    if (this.adding) return;
    this.adding = true;
    this.problemlist = [];
    for (let i = 0; i < this.list.length; i++) {
      if (this.list[i].direction == 'right') {
        this.problemlist.push({ problem_id: this.list[i]['problem_id'], title: this.list[i].title })
      }
    }
    this.problemlist.sort((a, b) => { return a.problem_id - b.problem_id });
    console.log(this.problemlist)
    this.http.post(this.addContestUrl, { contest: this.contest, problemlist: this.problemlist }).then((res: any) => {
      console.log(res);
      if (res.success) {
        this.msgSer.success(res.msg, { nzDuration: 1500 })
      }
      else {
        this.msgSer.error(res.msg, { nzDuration: 1500 })
      }
      this.adding = false;
    }, (rej: any) => {
      console.log(rej);
      this.msgSer.error('网络错误', { nzDuration: 1500 })
      this.adding = false;
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

  list: TransferItem[] = [];
  $asTransferItems = (data: unknown): TransferItem[] => data as TransferItem[];

  change(ret: TransferChange): void {
    console.log('nzChange', ret);
    const listKeys = ret.list.map(l => l['key']);
    const hasOwnKey = (e: TransferItem): boolean => e.hasOwnProperty('key');
    this.list = this.list.map(e => {
      if (listKeys.includes(e['key']) && hasOwnKey(e)) {
        if (ret.to === 'left') {
          delete e.hide;
        } else if (ret.to === 'right') {
          e.hide = false;
        }
      }
      return e;
    });
  }

  //启用/屏蔽比赛
  setDefunct() {
    this.contest.loading = true;
    setTimeout(() => {
      this.contest.loading = false;
      this.contest.private = this.contest.private == '1' ? '0' : '1';
      this.contest.password = '';
      console.log(this.contest.private)
    }, 500);
  }

  ngOnInit() {
  }
}
