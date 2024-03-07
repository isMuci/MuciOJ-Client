import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzCalendarMode } from 'ng-zorro-antd/calendar';
import { NzMessageService } from 'ng-zorro-antd/message';
import { HttpService } from 'src/app/services/httpService/http.service';
import { Pie, G2 } from '@antv/g2plot';
import * as global from 'src/app/globals';

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.less']
})
export class UserinfoComponent {
  getUserInfoUrl: string = global.url + '/getUserInfo'
  getSolutionInDateUrl: string = global.url + '/getSolutionInDate';

  color = global.color;
  calendarMode: NzCalendarMode = 'month';
  isVisible = false;
  isMobile = true;
  lastDate: Date = new Date();
  isEmpty: boolean = false;
  problemId: any[] = [];
  user: { user_id: string, date?: string, nick: string, signature: string, email: string, school: string, solved: string, rank: string } = { user_id: '', date: '', nick: '', signature: '', email: '', school: '', solved: '', rank: '' };
  qq: string = '';

  constructor(
    private datePipe: DatePipe,
    private http: HttpService,
    private msgSer: NzMessageService,
    private route: ActivatedRoute
  ) {
    this.isMobile = window.innerWidth >= 1300 ? false : true;
    this.route.params.subscribe(params => {
      this.user.user_id = params['user_id'];
      console.log(this.user.user_id)
    });
    const id = this.msgSer.loading('获取用户信息中...', { nzDuration: 0 }).messageId;
    this.http.getHasData(this.getUserInfoUrl, { user_id: this.user.user_id }).then((res: any) => {
      console.log(res);
      this.msgSer.remove(id);
      if (res.success) {
        this.user.user_id = res.userInfo.user_id;
        this.user.nick = res.userInfo.nick;
        this.user.signature = res.userInfo.signature;
        this.user.email = res.userInfo.email;
        if (res.userInfo.email != '' && res.userInfo.email != null)
          this.qq = res.userInfo.email.split("@")[0];
        this.user.school = res.userInfo.school;
        this.user.solved = res.userInfo.solved;
        this.user.rank = res.rank;
        this.data[0].value = res.userInfo.solved;
        this.data[1].value = res.userInfo.submit - res.userInfo.solved;
        this.draw();
        this.msgSer.success(res.msg, { nzDuration: 1500 })
      }
      else {
        this.msgSer.error(res.msg, { nzDuration: 1500 })
      }
    }, (rej: any) => {
      console.log(rej);
      this.msgSer.remove(id);
      this.msgSer.error('网络错误', { nzDuration: 1500 })
    });

  }
  data: { type: string, value: number }[] = [
    { type: '答案正确', value: 0 },
    { type: '答案错误', value: 0 },
  ];
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
        return '#FF0000';
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

  onValueChange(value: Date) {
    if (this.calendarMode == 'month' && this.lastDate.getMonth() == value.getMonth()) {
      this.isVisible = true;
      this.user.date = this.datePipe.transform(value, 'yyyy-MM-dd')?.toString();
      this.http.getHasData(this.getSolutionInDateUrl, { user_id: this.user.user_id, date: this.user.date }).then((res: any) => {
        console.log(res);
        if (res.success) {
          if (res.problemId.length == 0) {
            this.isEmpty = true;

          }
          else {
            this.isEmpty = false;
            this.problemId = res.problemId;
            console.log(this.problemId[0].problem_id)
          }
        }
        else {
          this.msgSer.error(res.msg, { nzDuration: 1500 })
        }
      }, (rej: any) => {
        console.log(rej);
        this.msgSer.error('网络错误', { nzDuration: 1500 })
      });
      console.log(this.user);
    }
    this.lastDate = value;
  }

  onPanelChange(change: { date: Date; mode: string }) {
    console.log(change)
  }

  handleCancel() {
    this.isVisible = false;
  }
}
