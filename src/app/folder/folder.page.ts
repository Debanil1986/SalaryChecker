import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SheetsService } from '../api/sheets.service';
import { Subscription } from 'rxjs';
import { Datum, ProgressResponseData, Schedule } from 'src/models/salary.model';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss']
})
export class FolderPage implements OnInit,AfterViewInit,OnDestroy {



  public folder!: string;
  private activatedRoute = inject(ActivatedRoute);

  private sheetSub:Subscription= null as unknown as Subscription;
  RoutineData: Datum[] = [] as Datum[];
  currentRoutine: Datum = {} as Datum;
  ProgressData: ProgressResponseData[] = [] ;
  routineSub: Subscription= new Subscription();
  progressSub: Subscription= new Subscription();
  constructor(
    private sheetservice:SheetsService,
    private changeDetect:ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    this.getRoutine();
    this.getProgress();

    console.log('NoShow')
  }
  getRoutine() {
    this.routineSub = this.sheetservice.getRoutine().subscribe(res=>{
      this.RoutineData = res['data'];
      const today = new Date();
      const dayIndex = today.getDay();
      const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      const currentDay = days[dayIndex];
      console.log("CURRENT DAY",currentDay,"ROUTINE DATA",this.RoutineData);
      this.currentRoutine = this.RoutineData.find(element=> (element.days).toLowerCase() === currentDay.toLowerCase() ) || ({} as Datum)

    })
  }
  getProgress() {
    this.progressSub = this.sheetservice.getProgress().subscribe(res=>{
      this.ProgressData = res['data'];
    })
  }

  sendProgress(data:any){
    this.sheetservice.addRoutine(data).then(res=>{
      console.log("Response received",res);
    })
  }


  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
    console.log('this.folder : ', this.folder )

  }








  ngOnDestroy(): void {
    this.routineSub.unsubscribe();
    this.progressSub.unsubscribe();
    this.sheetSub.unsubscribe();
  }
}
