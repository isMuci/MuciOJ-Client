import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { G2, Pie } from '@antv/g2plot';
import { NzMessageService } from 'ng-zorro-antd/message';
import { HttpService } from 'src/app/services/httpService/http.service';
import * as global from 'src/app/globals';

@Component({
  selector: 'app-problemstatus',
  templateUrl: './problemstatus.component.html',
  styleUrls: ['./problemstatus.component.less']
})
export class ProblemstatusComponent implements OnInit {
  getProblemStatusUrl: string = global.url + '/getProblemStatus';

  isSearch = false;
  language = global.language;
  submit: number = 0;
  users: number = 0;
  acusers: number = 0;
  isLoading: boolean = true;
  listOfData: { solution_id: number, user_id: string, memory: number, time: number, language: number, code_length: number, in_date: string, att: number }[] = [];
  search: { page: number, user_id: string, problem_id?: number, language: number, result: number, num: number } = { page: 0, user_id: '', language: -1, result: -1, num: 10 };
  status: [] = [];
  data: { type: string, value: number }[] = [
    { type: '答案正确', value: 0 },
    { type: '格式错误', value: 0 },
    { type: '答案错误', value: 0 },
    { type: '时间超限', value: 0 },
    { type: '内存超限', value: 0 },
    { type: '输出超限', value: 0 },
    { type: '运行错误', value: 0 },
    { type: '编译错误', value: 0 },
  ];
  constructor(
    private http: HttpService,
    private msgSer: NzMessageService,
    private aRoute: ActivatedRoute,
    public datePipe: DatePipe,
  ) {
    this.aRoute.queryParams.subscribe(data => {
      this.search.problem_id = data['problem_id'];
    });
    http.getHasData(this.getProblemStatusUrl, this.search).then((res: any) => {
      console.log(res);
      if (res.success) {
        this.isLoading = false;
        this.listOfData = res.list;
        for (let i = 0; i < this.listOfData.length; i++) {
          this.listOfData[i].time = Math.round(res.list[i].score % 1000000000000000 / 10000000000);
          this.listOfData[i].memory = Math.round(res.list[i].score % 10000000000 / 100000);
          this.listOfData[i].code_length = Math.round(res.list[i].score % 100000);
        }
        this.submit = res.submit;
        this.users = res.users;
        this.acusers = res.acusers
        this.data[0].value = res.status.ac;
        this.data[1].value = res.status.pe;
        this.data[2].value = res.status.wa;
        this.data[3].value = res.status.tle;
        this.data[4].value = res.status.ole;
        this.data[5].value = res.status.mle;
        this.data[6].value = res.status.re;
        this.data[7].value = res.status.ce;
        this.draw();
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

  ngOnInit(): void {
  }

  draw() {
    const G = G2.getEngine('canvas');
    const piePlot = new Pie('container', {
      appendPadding: 10,
      data: this.data,
      angleField: 'value',
      colorField: 'type',
      color: ({ type }) => {
        if (type === '答案正确') {
          return '#00CD00';
        }
        else if (type === '格式错误') {
          return '#6699cc';
        }
        else if (type === '答案错误') {
          return '#FF0000';
        }
        else if (type === '时间超限') {
          return '#cc6699';
        }
        else if (type === '内存超限') {
          return '#8B1C62';
        }
        else if (type === '输出超限') {
          return '#B23AEE';
        }
        else if (type === '运行错误') {
          return '#CD6600';
        }
        return '#FFD700';
      },
      radius: 0.9,
      label: {
        type: 'inner',
        offset: '-30%',
        content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
        style: {
          fontSize: 14,
          textAlign: 'center',
        },
      },
      interactions: [{ type: 'element-active' }],
    });
    piePlot.render();
  }

  searchStatus() {
    if (this.isSearch) return;
    this.isSearch = true;
    this.http.getHasData(this.getProblemStatusUrl, this.search).then((res: any) => {
      console.log(res);
      if (res.success) {
        this.isLoading = false;
        this.listOfData = res.list;
        for (let i = 0; i < this.listOfData.length; i++) {
          this.listOfData[i].time = Math.round(res.list[i].score % 1000000000000000 / 10000000000);
          this.listOfData[i].memory = Math.round(res.list[i].score % 10000000000 / 100000);
          this.listOfData[i].code_length = Math.round(res.list[i].score % 100000);
        }
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
}
