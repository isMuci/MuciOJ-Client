import { DatePipe } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { HttpService } from 'src/app/services/httpService/http.service';
import { UserService } from 'src/app/services/userService/user.service';
import * as global from 'src/app/globals';
import { Md5 } from 'ts-md5';

@Component({
  selector: 'app-contest',
  templateUrl: './contest.component.html',
  styleUrls: ['./contest.component.less'],
})
export class ContestComponent implements OnDestroy {
  getContestInfoUrl: string = global.url + '/getContestInfo';
  getContestProblemSetUserInfoUrl: string = global.url + '/getContestProblemSetUserInfo';
  getContestProblemSetUrl: string = global.url + '/getContestProblemSet';

  isLogin: boolean = false;
  isLoading: boolean = true;
  password: string = '';
  passwordVisible = false;
  problemVisable: boolean = false;
  resultVisable: boolean = false;
  resultStatus: boolean = false;
  nowTime: any = Date.now();
  timer: any;
  progerssPrecent: number = 0;
  listOfData: { ID: string, num: number, problem_id: number, title: string, defunct: string, c_accepted: number, c_submit: number; pass: string, status: string, }[] = [];
  status: Map<number, string> = new Map();
  getContest: { user_id: string, contest_id: number, password: string } = { user_id: '', contest_id: 0, password: '' };
  contest: { contest_id: number, title: string, description: string, start_time: number, end_time: number, private: number, isStart: boolean, isEnd: boolean }
    = { contest_id: 0, title: '', description: '', start_time: 0, end_time: 0, private: 0, isStart: false, isEnd: false };

  constructor(
    private aroute: ActivatedRoute,
    private msgSer: NzMessageService,
    private http: HttpService,
    public datePipe: DatePipe,
    private route: Router
  ) {
    this.aroute.params.subscribe(params => {
      this.getContest.contest_id = Number(params['contest_id']);
      console.log(this.getContest)
    });

    //当前时间
    this.timer = setInterval(() => {
      this.nowTime = Date.now();
      if (this.contest.start_time) {
        this.contest.isStart = new Date(this.contest.start_time).getTime() - new Date().getTime() < 0 ? true : false;
        this.contest.isEnd = new Date(this.contest.end_time).getTime() - new Date().getTime() < 0 ? true : false;
        if (this.contest.isStart && !this.contest.isEnd)
          this.progerssPrecent = Number(((new Date().getTime() - new Date(this.contest.start_time).getTime()) / (new Date(this.contest.end_time).getTime() - new Date(this.contest.start_time).getTime()) * 100).toFixed(2));
        else if (!this.contest.isStart) {
          this.progerssPrecent = 0;
        }
        else if (this.contest.isEnd) {
          this.progerssPrecent = 100;
        }
        // console.log(this.progerssPrecent)
      }
    }, 1000)

    //获取比赛基本信息
    http.getHasData(this.getContestInfoUrl, this.getContest).then((res: any) => {
      console.log(res);
      if (res.success) {
        this.isLoading = false;
        this.contest = res.contest;
        this.contest.isStart = new Date(this.contest.start_time).getTime() - new Date().getTime() < 0 ? true : false;
        this.contest.isEnd = new Date(this.contest.end_time).getTime() - new Date().getTime() < 0 ? true : false;
        if (this.contest.private) {
          if (global.visableContestList.has(this.contest.contest_id)) {
            this.password = global.visableContestList.get(this.contest.contest_id) || '';
            this.getPrivateProblem();
          }
          else {
            this.resultVisable = true;
            this.resultStatus = true;
          }
        }
        else {
          this.getPublicProblem();
        }
      } else {
        this.msgSer.error(res.msg, { nzDuration: 1500 });
        this.isLoading = false;
      }
    },
      (rej: any) => {
        console.log(rej);
      }
    );
  }

  getPrivateProblem() {
    this.isLogin = global.isLogin;
    if (this.isLogin) {
      this.getContest.user_id = global.user_id;
      console.log(this.getContest)
      // this.getContest.password = Md5.hashStr(this.password);
      this.getContest.password = this.password
      this.getProblem();
    }
    else {
      this.msgSer.warning('请先登录', { nzDuration: 1500 });
      this.route.navigateByUrl('home');
    }
  }

  getPublicProblem() {
    this.isLogin = global.isLogin;
    if (this.isLogin)
      this.getContest.user_id = global.user_id;
    console.log(this.getContest)
    this.getProblem();
  }

  getProblem() {
    this.http.getHasData(this.getContestProblemSetUrl, this.getContest).then(
      (res: any) => {
        console.log(res);
        if (res.success) {
          this.listOfData = res.problemset;
          for (let i = 0; i < res.submit.length; i++)
            this.status.set(res.submit[i].problem_id, 'wa');
          for (let i = 0; i < res.ac.length; i++)
            this.status.set(res.ac[i].problem_id, 'ac');
          for (let i = 0; i < this.listOfData.length; i++) {
            this.listOfData[i].pass = (this.listOfData[i].c_submit == 0 ? 0 : this.listOfData[i].c_accepted / this.listOfData[i].c_submit * 100).toFixed(2);
            this.listOfData[i].status = this.status.get(this.listOfData[i].problem_id) || '';
            this.listOfData[i].ID = global.contestProblemID[i];
          }
          this.resultVisable = false;
          this.problemVisable = true;
        } else {
          this.msgSer.error(res.msg, { nzDuration: 1500 });
          this.resultVisable = true;
        }
        this.resultStatus = false;
        if (this.contest.private) global.visableContestList.set(this.getContest.contest_id, this.getContest.password);
      },
      (rej: any) => {
        console.log(rej);
      }
    );
  }
  ngOnDestroy() {
    clearInterval(this.timer);
  }
}
