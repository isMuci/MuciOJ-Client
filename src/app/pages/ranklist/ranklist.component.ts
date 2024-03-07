import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { HttpService } from 'src/app/services/httpService/http.service';
import * as global from 'src/app/globals';

@Component({
  selector: 'app-ranklist',
  templateUrl: './ranklist.component.html',
  styleUrls: ['./ranklist.component.less']
})
export class RanklistComponent {
  getRanklistUrl: string = global.url + '/getRanklist';

  isLoading: boolean = true;
  searchTitle: string = '';
  searchID: string = '';
  listOfData: { user_id: string, nick: string, defunct: string, solved: number, submit: number, pass: string, status: string }[] = [];
  submit: { problem_id: number }[] = [];
  accepted: { problem_id: number }[] = [];
  status: Map<number, string> = new Map();

  constructor(
    private msgSer: NzMessageService,
    private http: HttpService,
  ) {
    http.get(this.getRanklistUrl).then((res: any) => {
      console.log(res);
      if (res.success) {
        this.isLoading = false;
        this.listOfData = res.ranklist;
        for (let i = 0; i < this.listOfData.length; i++) {
          this.listOfData[i].pass = (this.listOfData[i].submit == 0 ? 0 : this.listOfData[i].solved / this.listOfData[i].submit * 100).toFixed(2);
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
}
