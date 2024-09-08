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
export class ProgressShowComponent  implements OnChanges,OnDestroy {
  @Input() salary:Salary[] = [] as Salary[];
  progress:Aggregation[] = [];
  @Output() refreshData = new EventEmitter<Refresh>();
  public groupedByMonth: _.Dictionary<Salary[]> = {}
  putSheetsSub:Subscription = null as unknown as Subscription;


  constructor(private sheetsService:SheetsService) { }

  ngOnChanges(changes: SimpleChanges): void  {
    console.log("salary",this.salary);
    const {result,groupedByMonth} = groupSalaryByMonth(this.salary);
    this.progress = result;
    this.groupedByMonth = groupedByMonth;

    console.log("This progress",this.progress);

  }

  async toggleChange(e:ToggleCustomEvent,index:number){
    const paymentDone = e?.detail?.checked;
    const paymentPayload:PaymentPayload ={
      row: index+2,
      status: paymentDone? "ok":""
    };

    const response = await this.sheetsService.putSheets(paymentPayload);
    if(response == "okay"){
      this.refreshData.emit("refresh")
    }else{
      this.refreshData.emit('leave');
    }


  }

  ngOnDestroy(): void {
    this.putSheetsSub.unsubscribe();
  }



}
