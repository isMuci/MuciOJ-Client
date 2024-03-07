import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { HttpService } from 'src/app/services/httpService/http.service';
import { UserService } from 'src/app/services/userService/user.service';
import * as global from 'src/app/globals';

@Component({
  selector: 'app-problemset',
  templateUrl: './problemset.component.html',
  styleUrls: ['./problemset.component.less']
})

export class ProblemsetComponent implements OnInit {
  getProblemSetUrl: string = global.url + '/getProblemSet';
  getProblemSetUserInfoUrl: string = global.url + '/getProblemSetUserInfo';
  searchProblemSetByTitleUrl: string = global.url + '/searchProblemSetByTitle';
  searchProblemSetByIDUrl: string = global.url + '/searchProblemSetByID';


  isLogin: boolean = false;
  isLoading: boolean = true;
  searchTitle: string = '';
  searchID: string = '';
  listOfData: { problem_id: number, title: string, defunct: string, accepted: number, submit: number, pass: string, status: string }[] = [];
  status: Map<number, string> = new Map();

  constructor(
    private userSer: UserService,
    private msgSer: NzMessageService,
    private http: HttpService,
  ) {
    this.isLogin = global.isLogin;
    if (this.isLogin)
      http.get(this.getProblemSetUserInfoUrl).then((res: any) => {
        console.log(res);
        if (res.success) {
          for (let i = 0; i < res.submit.length; i++)
            this.status.set(res.submit[i].problem_id, 'wa');
          for (let i = 0; i < res.ac.length; i++)
            this.status.set(res.ac[i].problem_id, 'ac');
          for (let i = 0; i < this.listOfData.length; i++) {
            this.listOfData[i].status = this.status.get(this.listOfData[i].problem_id) || '';
          }
        }
        else {
          this.msgSer.error(res.msg, { nzDuration: 1500 });
        }
      }, (rej: any) => {
        console.log(rej);
      });
    http.get(this.getProblemSetUrl).then((res: any) => {
      console.log(res);
      if (res.success) {
        this.isLoading = false;
        this.listOfData = res.problemset;
        for (let i = 0; i < this.listOfData.length; i++) {
          this.listOfData[i].pass = (this.listOfData[i].accepted / this.listOfData[i].submit * 100).toFixed(2);
          this.listOfData[i].status = this.status.get(this.listOfData[i].problem_id) || '';
        }
      }
      else {
        this.msgSer.error(res.msg, { nzDuration: 1500 });
        this.isLoading = false;
      }
    }, (rej: any) => {
      console.log(rej);
    });
  }

  ngOnInit(): void {
  }
  searchByTitle() {
    if (this.isLoading) return;
    this.isLoading = true;
    console.log(this.searchTitle)
    this.http.getHasData(this.searchProblemSetByTitleUrl, { title: this.searchTitle }).then((res: any) => {
      console.log(res);
      if (res.success) {
        this.isLoading = false;
        this.listOfData = res.problemset;
        for (let i = 0; i < this.listOfData.length; i++) {
          this.listOfData[i].pass = (this.listOfData[i].accepted / this.listOfData[i].submit * 100).toFixed(2);
          this.listOfData[i].status = this.status.get(this.listOfData[i].problem_id) || '';
        }
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
    this.http.getHasData(this.searchProblemSetByIDUrl, { ID: this.searchID }).then((res: any) => {
      console.log(res);
      if (res.success) {
        this.isLoading = false;
        this.listOfData = res.problemset;
        for (let i = 0; i < this.listOfData.length; i++) {
          this.listOfData[i].pass = (this.listOfData[i].accepted / this.listOfData[i].submit * 100).toFixed(2);
          this.listOfData[i].status = this.status.get(this.listOfData[i].problem_id) || '';
        }
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
}
