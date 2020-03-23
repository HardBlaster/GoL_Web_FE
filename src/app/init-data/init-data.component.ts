import {Component, OnInit} from '@angular/core';
import {InitData} from '../shared/InitData';
import {Utils} from '../shared/Utils';
import {InitDataService} from './init-data.service';

@Component({
  selector: 'app-init-data',
  templateUrl: './init-data.component.html',
  styleUrls: ['./init-data.component.css']
})
export class InitDataComponent implements OnInit {
  aliveRatio = 0;
  bornIf = '';
  stableIf = '';
  deadIf = '';

  constructor(private initDataService: InitDataService) {
  }

  sendInitData() {
    const bi = Utils.formatRule(this.bornIf.split(/[ ,]+/).filter(Boolean));
    const si = Utils.formatRule(this.stableIf.split(/[ ,]+/).filter(Boolean));
    const di = Utils.formatRule(this.deadIf.split(/[ ,]+/).filter(Boolean));
    const initData = new InitData(103, 50, this.aliveRatio, bi, si, di);
    console.log(JSON.stringify(initData));

    this.initDataService.postInitData(initData).subscribe(data => console.log(data));
  }

  isCorrectInitData() {
    return this.aliveRatio !== 0
    && this.isCorrectRule(this.bornIf)
    && this.isCorrectRule(this.stableIf)
    && this.isCorrectRule(this.deadIf);
  }

  isCorrectRule(rule: string): boolean {
    if (rule === '') {
      return false;
    }

    const array = rule.split(',');

    array.forEach(function(num) {
      if (num.match(/^\d+\.\d+$/)) {
        return false;
      }
    });

    return true;
  }

  ngOnInit() {
  }

}
