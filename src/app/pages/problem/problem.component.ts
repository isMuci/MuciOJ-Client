import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { HttpService } from 'src/app/services/httpService/http.service';
import * as global from 'src/app/globals';

@Component({
  selector: 'app-problem',
  templateUrl: './problem.component.html',
  styleUrls: ['./problem.component.less']
})
export class ProblemComponent {
  getProblemUrl: string = global.url + '/getProblem';

  isLoading: boolean = true;
  inContest: boolean = false;
  ID: string = '';
  getProblem: { problem_id: string, contest_id: number, password: string } = { problem_id: '', contest_id: 0, password: '' };
  problem: {
    problem_id: number, title: string, description: string, input: string, output: string, sample_input: string,
    sample_output: string, spj: number, hint: string, time_limit: number, memory_limit: number, accepted: number, submit: number,
  } = { problem_id: 0, title: '', description: '', input: '', output: '', sample_input: '', sample_output: '', spj: 0, hint: '', time_limit: 0, memory_limit: 0, accepted: 0, submit: 0 };
  constructor(
    private route: ActivatedRoute,
    private http: HttpService,
    private msgSer: NzMessageService,
  ) {
    this.route.queryParams.subscribe(params => {
      console.log(params)
      this.getProblem.problem_id = params['problem_id'];
      this.getProblem.contest_id = params['contest_id'];
      this.getProblem.password = params['password'];
      if (this.getProblem.contest_id != undefined) {
        this.inContest = true;
        this.ID = params['ID'];
      }
    });
    http.getHasData(this.getProblemUrl, this.getProblem).then((res: any) => {
      console.log(res);
      if (res.success) {
        this.isLoading = false;
        this.problem = res.problem;
      }
      else {
        this.msgSer.error(res.msg, { nzDuration: 1500 });
        this.isLoading = false;
      }
    }, (rej: any) => {
      console.log(rej);
    });
  }
}
