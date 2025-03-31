import { PaymentPayload, Refresh } from './../../../models/salary.model';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Aggregation, Salary } from 'src/models/salary.model';
import  * as _ from 'lodash';
import { groupSalaryByMonth } from 'src/tools/tools';
import { ToggleCustomEvent } from '@ionic/angular';
import { SheetsService } from 'src/app/api/sheets.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-progress-show',
  templateUrl: './progress-show.component.html',
  styleUrls: ['./progress-show.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgressShowComponent implements OnInit  {

  ngOnInit(): void {
    console.log('');

  }


}
