import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import * as global from 'src/app/globals';
import { HttpService } from 'src/app/services/httpService/http.service';

@Component({
  selector: 'app-contestrank',
  templateUrl: './contestrank.component.html',
  styleUrls: ['./contestrank.component.less']
})
export class ContestrankComponent implements OnInit {
  getContestRankUrl: string = global.url + '/getContestRank';

  listOfData = [
    {
      user_id: 'aaa',
      nick: 'bbbb',
      accept: 3,
      time: '00:15:28',
      problema: '+3',
      problemat: '00:00:13',
      problemb: '1',
      problembt: '02:23:15',
      problemc: '-2'
    }
  ];
  contest_id = 0;

  getSubmits: { contest_id: number } = { contest_id: 0 };
  contest: { start_time: string, end_time: string, num: number } = { start_time: '', end_time: '', num: 0 };
  submits: { user_id: string, nick: string, num: number, result: number, in_date: string }[] = [];
  num: { value: string }[] = [];


  constructor(
    private http: HttpService,
    private msgSer: NzMessageService,
    public datePipe: DatePipe,
    private route: ActivatedRoute,

  ) {
    this.route.queryParams.subscribe(params => {
      console.log(params)
      this.getSubmits.contest_id = params['contest_id'];
    });

    http.getHasData(this.getContestRankUrl, this.getSubmits).then((res: any) => {
      console.log(res);
      if (res.success) {
        this.submits = res.submits;
        this.contest = res.contest;
        this.handle();
      } else {
        this.msgSer.error(res.msg, { nzDuration: 1500 });
      }
    },
      (rej: any) => {
        console.log(rej);
      }
    );
  }

  rank: { user_id: string, nick: string, solve: number, time: number, list: { cnt: number, solve: number, time: number }[] }[] = [];
  map: Map<string, number> = new Map();

  handle() {
    for (let i = 0; i < this.contest.num; i++)
      this.num.push({ value: String.fromCharCode(65 + i) });
    let userCnt = 0;
    for (let i = 0; i < this.submits.length; i++) {
      if (this.map.get(this.submits[i].user_id) == undefined) {
        this.map.set(this.submits[i].user_id, userCnt);
        this.init(userCnt++, i);
      }
      this.count(this.map.get(this.submits[i].user_id) || 0, i);
    }
    this.sort();
    console.log(this.rank)
  }

  init(idx: number, subid: number) {
    this.rank = [...this.rank, { user_id: this.submits[subid].user_id, nick: this.submits[subid].nick, solve: 0, time: 0, list: [] }];
    for (let i = 0; i < this.contest.num; i++) {
      this.rank[idx].list.push({ cnt: 0, solve: 0, time: 0 })
    }
  }

  count(idx: number, subid: number) {
    if (!this.rank[idx].list[this.submits[subid].num].solve) {
      if (this.submits[subid].result == 4) {
        this.rank[idx].solve++;
        this.rank[idx].list[this.submits[subid].num].solve++;
        let time = Math.floor((new Date(this.submits[subid].in_date).getTime() - new Date(this.contest.start_time).getTime()) / 1000 / 60) + this.rank[idx].list[this.submits[subid].num].cnt * 20;
        this.rank[idx].time += time;
        this.rank[idx].list[this.submits[subid].num].time = time;
      }
      else
        this.rank[idx].list[this.submits[subid].num].cnt++;

    }
  }

  sort() {
    this.rank.sort((a, b) => {
      if (a.solve == b.solve)
        return a.time - b.time;
      return b.solve - a.solve;
    })
  }

  ngOnInit() {
  }
}
