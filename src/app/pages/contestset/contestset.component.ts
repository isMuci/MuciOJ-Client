import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { HttpService } from 'src/app/services/httpService/http.service';
import * as global from 'src/app/globals';

@Component({
  selector: 'app-contestset',
  templateUrl: './contestset.component.html',
  styleUrls: ['./contestset.component.less']
})
export class ContestsetComponent {
  getContestSettUrl: string = global.url + '/getContestSet';
  searchContestSetByTitleUrl: string = global.url + '/searchContestSetByTitle';
  searchContestSetByIDUrl: string = global.url + '/searchContestSetByID';

  password: string = '';
  passwordVisible = false;
  isLogin: boolean = false;
  isLoading: boolean = true;

  searchTitle: string = '';
  searchID: string = '';
  listOfData: { contest_id: number, title: string, start_time: number, end_time: number, private: string, user_id: string, isStart: boolean, isEnd: boolean }[] = [];
  problemset: Map<number, number> = new Map();
  submit: { problem_id: number }[] = [];
  accepted: { problem_id: number }[] = [];
  status: Map<number, string> = new Map();
  contest: { contest_id: number, password: string } = { contest_id: 0, password: '' };

  constructor(
    private msgSer: NzMessageService,
    private http: HttpService,
    public datePipe: DatePipe,
    private route: Router,
  ) {
    http.get(this.getContestSettUrl).then((res: any) => {
      console.log(res);
      if (res.success) {
        this.isLoading = false;
        this.listOfData = res.contestset;
        this.manage();
        console.log(this.listOfData)
      }
      else {
        this.msgSer.error(res.msg, { nzDuration: 1500 });
        this.isLoading = false;
      }
    }, (rej: any) => {
      console.log(rej);
    });
  }
  searchByTitle() {
    if (this.isLoading) return;
    this.isLoading = true;
    console.log(this.searchTitle)
    this.http.getHasData(this.searchContestSetByTitleUrl, { title: this.searchTitle }).then((res: any) => {
      console.log(res);
      if (res.success) {
        this.listOfData = res.contestset;
        this.manage();
        this.isLoading = false;
        this.searchTitle = '';
      }
      else {
        this.msgSer.error(res.msg, { nzDuration: 1500 });
        this.isLoading = false;
        this.searchTitle = '';
      }
    }, (rej: any) => {
      console.log(rej);
    });
  }
  searchByID() {
    if (this.isLoading) return;
    this.isLoading = true;
    console.log(this.searchID)
    this.http.getHasData(this.searchContestSetByIDUrl, { ID: this.searchID }).then((res: any) => {
      console.log(res);
      if (res.success) {
        this.listOfData = res.contestset;
        this.manage();
        this.isLoading = false;
        this.searchID = '';
      }
      else {
        this.msgSer.error(res.msg, { nzDuration: 1500 });
        this.isLoading = false;
        this.searchID = '';
      }
    }, (rej: any) => {
      console.log(rej);
    });
  }
  manage() {
    for (let i = 0; i < this.listOfData.length; i++) {
      this.listOfData[i].isStart = new Date(this.listOfData[i].start_time).getTime() - new Date().getTime() < 0 ? true : false;
      this.listOfData[i].isEnd = new Date(this.listOfData[i].end_time).getTime() - new Date().getTime() < 0 ? true : false;
    }
    console.log(this.listOfData)
  }
  date(date: number) {
    return new Date(date).getTime()
  }
}
