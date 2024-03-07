import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CookieService } from 'ngx-cookie-service';
import { HttpService } from 'src/app/services/httpService/http.service';
import { UserService } from 'src/app/services/userService/user.service';
import * as global from 'src/app/globals';

@Component({
  selector: 'app-problemadd',
  templateUrl: './problemadd.component.html',
  styleUrls: ['./problemadd.component.less']
})
export class ProblemaddComponent implements OnInit {
  addProblemUrl: string = global.url + '/addProblem';
  config = global.quillConfig;

  adding: boolean = false;
  problem: {
    title: string, description: string, input: string, output: string, sample_input: string,
    sample_output: string, spj: number, hint: string, time_limit: number, memory_limit: number
  } = { title: '', description: '', input: '', output: '', sample_input: '', sample_output: '', spj: 0, hint: '', time_limit: 0, memory_limit: 0 };

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
  }

  //添加题目
  add() {
    if (this.adding) return;
    this.adding = true;
    this.http.post(this.addProblemUrl, this.problem).then((res: any) => {
      console.log(res);
      if (res.success) {
        this.reset();
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

  //重置表单
  reset() {
    this.problem = { title: '', description: '', input: '', output: '', sample_input: '', sample_output: '', spj: 0, hint: '', time_limit: 0, memory_limit: 0 };
  }

  //鉴别当前用户权限
  checkPrivilege() {
    if (global.privilege != 'admin') {
      this.msgSer.warning('未授权的访问', { nzDuration: 1500 });
      this.route.navigateByUrl('home');
      return;
    }
  }

  ngOnInit() {
  }

}
