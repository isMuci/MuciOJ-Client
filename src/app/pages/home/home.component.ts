import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/userService/user.service';
import * as global from 'src/app/globals';
import { NzMessageService } from 'ng-zorro-antd/message';
import { HttpService } from 'src/app/services/httpService/http.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent {
  getHomeInfoUrl: string = global.url + '/getHomeInfo';

  isLogin: boolean = false;
  isLoading: boolean = true;
  ranlistData: { user_id: string, nick: string, signature: string }[] = [];
  problemsetData: { problem_id: number, title: string, in_date: number }[] = [];
  contestsetData: { contest_id: number, title: string, start_time: number }[] = [];

  constructor(
    private msgSer: NzMessageService,
    private http: HttpService,
    public datePipe: DatePipe,
  ) {
    http.get(this.getHomeInfoUrl).then((res: any) => {
      console.log(res);
      if (res.success) {
        this.ranlistData = res.ranklist;
        this.problemsetData = res.problemset;
        this.contestsetData = res.contestset;
        this.isLoading = false;

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
