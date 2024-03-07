import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { HttpService } from 'src/app/services/httpService/http.service';
import { UserService } from 'src/app/services/userService/user.service';
import * as global from 'src/app/globals';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.less']
})
export class StatusComponent implements OnDestroy {
  getStatusUrl: string = global.url + '/getStatus';
  selectedLanguage = { label: '全部', value: -1 };
  selectedTag = { label: '全部', value: -1 };
  compareFn = (o1: any, o2: any): boolean => (o1 && o2 ? o1.value === o2.value : o1 === o2);

  language = global.language;
  tag = global.tag;
  languageList = global.languageList;
  tagList = global.tagList;
  isSearch = false;
  re: any = -1;
  user_id: string = '';
  isLoading: boolean = true;
  listOfData: { solution_id: number, user_id: string, nick: string, problem_id: number, result: number, memory: number, time: number, language: number, code_length: number, in_date: string }[] = [];
  search: { page: number, user_id: string, problem_id?: number, contest_id?: number, password?: string, language: number, result: number, num: number } = { page: 0, user_id: '', language: -1, result: -1, num: 50 };
  constructor(
    private msgSer: NzMessageService,
    private http: HttpService,
    public datePipe: DatePipe,
    private aRoute: ActivatedRoute,
  ) {
    this.aRoute.queryParams.subscribe(data => {
      this.search.problem_id = data['problem_id'];
      this.search.contest_id = data['contest_id'];
      this.search.password = data['password'];
      this.search.user_id = data['user_id'];
      this.search.result = data['result']
      this.selectedTag = this.tagList[this.search.result == undefined ? 0 : this.search.result - 3];
    });
    console.log(this.search)
    http.getHasData(this.getStatusUrl, this.search).then((res: any) => {
      console.log(res);
      if (res.success) {
        this.isLoading = false;
        this.listOfData = res.status;
        this.user_id = global.user_id;
        this.check();
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
  ngOnDestroy(): void {
    clearInterval(this.re);
  }

  searchStatus() {
    if (this.isSearch) return;
    this.isSearch = true;
    this.search.language = this.selectedLanguage.value;
    this.search.result = this.selectedTag.value;
    this.search.page = 0;
    this.http.getHasData(this.getStatusUrl, this.search).then((res: any) => {
      console.log(res);
      if (res.success) {
        this.isLoading = false;
        this.listOfData = res.status;
        this.user_id = global.user_id;
        this.check();
      }
      else {
        this.msgSer.warning(res.msg, { nzDuration: 1500 });
      }
      this.isSearch = false;
    }, (rej: any) => {
      console.log(rej);
      this.isSearch = false;
    });
  }

  nextPage() {
    if (this.isSearch) return;
    this.isSearch = true;
    this.search.language = this.selectedLanguage.value;
    this.search.result = this.selectedTag.value;
    this.http.getHasData(this.getStatusUrl, this.search).then((res: any) => {
      console.log(res);
      if (res.success) {
        this.isLoading = false;
        this.listOfData = res.status;
        this.user_id = global.user_id;
        this.check();
      }
      else {
        if (res.msg == '不能再往后了') this.search.page = this.search.page - 1 >= 0 ? this.search.page - 1 : 0;
        this.msgSer.warning(res.msg, { nzDuration: 1500 });
      }
      this.isSearch = false;
    }, (rej: any) => {
      console.log(rej);
      this.isSearch = false;
    });
  }

  check() {
    console.log(this.re)
    let flag = false;
    this.listOfData.forEach(data => {
      if (data.result < 4) {
        flag = true;
        console.log('refresh' + data.solution_id);
        if (this.re == -1) {
          this.re = setInterval(() => {
            this.searchStatus();
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
