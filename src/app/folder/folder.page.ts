import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SheetsService } from '../api/sheets.service';
import { Refresh, Salary } from 'src/models/salary.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss']
})
export class FolderPage implements OnInit,AfterViewInit,OnDestroy {



  public folder!: string;
  private activatedRoute = inject(ActivatedRoute);
  public salaryData:Salary[]= null as unknown as Salary[];
  private sheetSub:Subscription= null as unknown as Subscription;
  constructor(
    private sheetservice:SheetsService,
    private changeDetect:ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {

    this.getSheets().then((data:Salary[])=>{
      this.salaryData=data;
      console.log('this.salaryData: ', this.salaryData);

    });
  }


  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;

  }

  getSheets():Promise<Salary[]> {
    return new Promise((resolve,reject)=>{
      this.sheetSub =this.sheetservice.getSheets().subscribe((data:any)=>{
        return resolve(data['data']);

      })

    })
  }

  refreshData($event: Refresh) {
    if($event === "refresh"){
      this.getSheets().then((data:Salary[])=>{
        this.salaryData=data;
        console.log('this.salaryData: ', this.salaryData);

      });
    }
  }




  ngOnDestroy(): void {
    this.sheetSub.unsubscribe();
  }
}
