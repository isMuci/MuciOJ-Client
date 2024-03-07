import { DatePipe } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CookieService } from 'ngx-cookie-service';
import { interval } from 'rxjs';
import { HttpService } from 'src/app/services/httpService/http.service';
import { UserService } from 'src/app/services/userService/user.service';
import * as global from 'src/app/globals';

@Component({
  selector: 'app-submit',
  templateUrl: './submit.component.html',
  styleUrls: ['./submit.component.less']
})
export class SubmitComponent implements OnDestroy {
  submitUrl: string = global.url + '/submit';
  getStatusUrl: string = global.url + '/getStatus';

  loginMessage: any;

  language = global.language;
  tag = global.tag;
  submiting: boolean = false;
  isLoading: boolean = true;
  re: any = -1;
  listOfData: { solution_id: number, user_id: string, nick: string, problem_id: number, result: number, memory: number, time: number, language: number, code_length: number, in_date: string }[] = [];
  submit: { problem_id?: number, contest_id?: number, user_id?: string, nick?: string, source: string, code_length?: number, language?: number, password?: string } = { source: '' };
  search: { page: number, user_id: string, problem_id?: number, contest_id?: number, password?: string, language: number, result: number, num: number } = { page: 0, user_id: '', language: -1, result: -1, num: 10 };
  languageList = [
    { label: 'C', value: 0 },
    { label: 'C++', value: 1 },
    { label: 'Java', value: 3 },
    { label: 'Python', value: 6 }
  ];
  selectedValue = { label: 'C', value: 0 };
  compareFn = (o1: any, o2: any): boolean => (o1 && o2 ? o1.value === o2.value : o1 === o2);
  constructor(
    private aRoute: ActivatedRoute,
    private cookieSer: CookieService,
    private msgSer: NzMessageService,
    private route: Router,
    private http: HttpService,
    private userSer: UserService,
    public datePipe: DatePipe,
  ) {
    const token = cookieSer.get('token');

    if (token) {
      if (!global.isLogin) {
        this.loginMessage = userSer.loginMassage$.subscribe((info) => {
          console.log(info)
          //取消登录信息订阅
          this.loginMessage?.unsubscribe();
          this.refreshData();
        })
      }
      else {
        this.refreshData();
      }
    }
    else {
      this.msgSer.warning('请先登录', { nzDuration: 1500 });
      this.route.navigateByUrl('login');
      return;
    }
  }

  checkProblemId() {
    if (!this.search.problem_id) {
      this.msgSer.warning('非法访问页面', { nzDuration: 1500 });
      this.route.navigateByUrl('home');
      return;
    }
  }

  refreshData() {
    this.submit.user_id = global.user_id;
    this.submit.nick = global.nick;
    this.search.user_id = global.user_id;
    this.aRoute.queryParams.subscribe(data => {
      this.submit.problem_id = data['problem_id'];
      this.submit.contest_id = data['contest_id'];
      this.submit.password = data['password'];
      this.search.contest_id = data['contest_id'];
      this.search.password = data['password'];
      this.search.problem_id = data['problem_id'];
    });
    // console.log(this.search)
    this.checkProblemId();
    this.getStatus();
  }

  ngOnDestroy(): void {
    clearInterval(this.re);

  }

  check() {
    this.submit.code_length = this.submit.source?.length;
    if (this.submit.code_length < 2) {
      this.msgSer.error('代码过短', { nzDuration: 1500 });
      return;
    }
    this.submit.language = this.selectedValue.value;
    this.submitCode();
  }

  submitCode() {
    if (this.submiting) return;
    this.submiting = true;
    const id = this.msgSer.loading('代码提交中...', { nzDuration: 0 }).messageId;
    console.log(this.submit)
    this.http.post(this.submitUrl, this.submit).then((res: any) => {
      console.log(res);
      this.msgSer.remove(id);
      if (res.success) {
        this.getStatus();
        this.msgSer.success(res.msg, { nzDuration: 1500 })
      }
      else {
        this.msgSer.error(res.msg, { nzDuration: 1500 })
      }
      this.submiting = false;
    }, (rej: any) => {
      console.log(rej);
      this.msgSer.remove(id);
      this.msgSer.error('网络错误', { nzDuration: 1500 })
      this.submiting = false;
    });
  }

  getStatus() {
    this.http.getHasData(this.getStatusUrl, this.search).then((res: any) => {
      console.log(res);
      if (res.success) {
        this.isLoading = false;
        this.listOfData = res.status;
        this.checkStatus();
      }
      else {
        this.msgSer.error(res.msg, { nzDuration: 1500 });
      }
      this.isLoading = false;
    }, (rej: any) => {
      console.log(rej);
      this.isLoading = false;
    });
  }

  checkStatus() {
    console.log(this.re)
    let flag = false;
    this.listOfData.forEach(data => {
      if (data.result < 4) {
        flag = true;
        console.log('refresh' + data.solution_id);
        if (this.re == -1) {
          this.re = setInterval(() => {
            this.getStatus();
          }, 1000);
        }
        return;
      }
    });
    if (!flag && this.re != -1) {
      console.log(this.re)
      window.clearInterval(this.re);
      this.re = -1;
    }
  }
}
