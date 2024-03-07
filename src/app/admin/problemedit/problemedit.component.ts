import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CookieService } from 'ngx-cookie-service';
import { HttpService } from 'src/app/services/httpService/http.service';
import { UserService } from 'src/app/services/userService/user.service';
import * as global from 'src/app/globals';
@Component({
  selector: 'app-problemedit',
  templateUrl: './problemedit.component.html',
  styleUrls: ['./problemedit.component.less']
})
export class ProblemeditComponent implements OnInit {
  getProblemUrl: string = global.url + '/getProblem';
  modifyProblemUrl: string = global.url + '/modifyProblem';
  config = global.quillConfig;

  modifying: boolean = false;
  getProblem: { problem_id: string } = { problem_id: '' };
  problem: {
    problem_id: number, title: string, description: string, input: string, output: string, sample_input: string,
    sample_output: string, spj: number, hint: string, time_limit: number, memory_limit: number
  } = { problem_id: 0, title: '', description: '', input: '', output: '', sample_input: '', sample_output: '', spj: 0, hint: '', time_limit: 0, memory_limit: 0 };

  problem_id: number = 0
  title: string = ''
  description: string = ''
  input: string = ''
  output: string = ''
  sample_input: string = ''
  sample_output: string = ''
  spj: number = 0
  hint: string = ''
  time_limit: number = 0
  memory_limit: number = 0

  loginMessage: any;

  constructor(
    private route: Router,
    private msgSer: NzMessageService,
    private cookieSer: CookieService,
    private userSer: UserService,
    private http: HttpService,
    private aroute: ActivatedRoute,
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
      console.log(params)
      this.getProblem.problem_id = params['problem_id'];
    });

    http.getHasData(this.getProblemUrl, this.getProblem).then((res: any) => {
      console.log(res.problem);
      if (res.success) {
        this.problem = res.problem;
        this.title = res.problem.title
        this.description = res.problem.description
        this.input = res.problem.input
        this.output = res.problem.output
        this.sample_input = res.problem.sample_input
        this.sample_output = res.problem.sample_output
        this.spj = res.problem.spj
        this.hint = res.problem.hint
        this.time_limit = res.problem.time_limit
        this.memory_limit = res.problem.memory_limit
      }
      else {
        this.msgSer.error(res.msg, { nzDuration: 1500 });
      }
    }, (rej: any) => {
      console.log(rej);
    });
  }

  //修改题目信息
  modify() {
    if (this.modifying) return;
    this.modifying = true;
    this.http.post(this.modifyProblemUrl, {
      problem_id: this.problem.problem_id, title: this.title, description: this.description,
      input: this.input, output: this.output, sample_input: this.sample_input, sample_output: this.sample_output,
      spj: this.spj, hint: this.hint, time_limit: this.time_limit, memory_limit: this.memory_limit
    }).then((res: any) => {
      console.log(res);
      if (res.success) {
        this.problem.title = this.title
        this.problem.description = this.description
        this.problem.input = this.input
        this.problem.output = this.output
        this.problem.sample_input = this.sample_input
        this.problem.sample_output = this.sample_output
        this.problem.spj = this.spj
        this.problem.hint = this.hint
        this.problem.time_limit = this.time_limit
        this.problem.memory_limit = this.memory_limit
      }
      else {
        this.reset();
        this.msgSer.error(res.msg, { nzDuration: 1500 })
      }
      this.modifying = false;
    }, (rej: any) => {
      console.log(rej);
      this.msgSer.error('网络错误', { nzDuration: 1500 })
      this.modifying = false;
    });
  }

  //重置题目信息
  reset() {
    this.title = this.problem.title
    this.description = this.problem.description
    this.input = this.problem.input
    this.output = this.problem.output
    this.sample_input = this.problem.sample_input
    this.sample_output = this.problem.sample_output
    this.spj = this.problem.spj
    this.hint = this.problem.hint
    this.time_limit = this.problem.time_limit
    this.memory_limit = this.problem.memory_limit
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
