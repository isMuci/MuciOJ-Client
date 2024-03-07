import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CookieService } from 'ngx-cookie-service';
import { HttpService } from 'src/app/services/httpService/http.service';
import { TransferChange, TransferItem, TransferSelectChange } from 'ng-zorro-antd/transfer';
import * as global from 'src/app/globals';
import { UserService } from 'src/app/services/userService/user.service';
@Component({
  selector: 'app-contestedit',
  templateUrl: './contestedit.component.html',
  styleUrls: ['./contestedit.component.less']
})
export class ContesteditComponent implements OnInit {
  getContestEditUrl: string = global.url + '/getContestEdit';
  modifyContestUrl: string = global.url + '/modifyContest';
  config = global.quillConfig;

  modifying: boolean = false;
  getContest: { contest_id: number } = { contest_id: 0 };
  contest: { contest_id: number, title: string, description: string, start_time: number, end_time: number, private: string, password: string, loading: boolean } = {
    contest_id: 0, title: '', description: '', start_time: 0, end_time: 0, private: '0', password: '', loading: false
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
    private aroute: ActivatedRoute,
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

    this.aroute.queryParams.subscribe(params => {
      this.getContest.contest_id = Number(params['contest_id']);
      console.log(this.getContest)
    });

    http.getHasData(this.getContestEditUrl, this.getContest).then((res: any) => {
      console.log(res);
      if (res.success) {
        this.contest = res.contest;
        this.list = res.uncheck;
        for (let i = 0; i < res.checked.length; i++) {
          this.list.push({
            problem_id: res.checked[i].problem_id,
            title: `${res.checked[i].title}`,
            direction: 'right'
          });
        }
      } else {
        this.msgSer.error(res.msg, { nzDuration: 1500 });
      }
    },
      (rej: any) => {
        console.log(rej);
      }
    );
  }

  problemlist: { problem_id: number, title: string }[] = [];

  modify() {
    if (this.modifying) return;
    this.modifying = true;
    this.problemlist = [];
    for (let i = 0; i < this.list.length; i++) {
      if (this.list[i].direction == 'right') {
        this.problemlist.push({ problem_id: this.list[i]['problem_id'], title: this.list[i].title })
      }
    }
    this.problemlist.sort((a, b) => { return a.problem_id - b.problem_id });
    console.log(this.problemlist)
    this.http.post(this.modifyContestUrl, { contest: this.contest, problemlist: this.problemlist }).then((res: any) => {
      console.log(res);
      if (res.success) {
        this.msgSer.success(res.msg, { nzDuration: 1500 })
      }
      else {
        this.msgSer.error(res.msg, { nzDuration: 1500 })
      }
      this.modifying = false;
    }, (rej: any) => {
      console.log(rej);
      this.msgSer.error('网络错误', { nzDuration: 1500 })
      this.modifying = false;
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
