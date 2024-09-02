import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SheetsService } from '../api/sheets.service';
import { Salary } from 'src/models/salary.model';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss']
})
export class FolderPage implements OnInit,AfterViewInit {
  public folder!: string;
  private activatedRoute = inject(ActivatedRoute);
  public salaryData:Salary[]= null as unknown as Salary[];
  constructor(
    private sheetservice:SheetsService,
    private changeDetect:ChangeDetectorRef
  ) {}
  ngAfterViewInit(): void {
    console.log('folder: ', this.folder);
    if(this.folder == "weeksalary"){
    this.getSheets().then((data:Salary[])=>{
      this.salaryData=data;
      console.log('this.salaryData: ', this.salaryData);

    });

    }
  }


  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;

  }

  getSheets():Promise<Salary[]> {
    return new Promise((resolve,reject)=>{
      this.sheetservice.getSheets().subscribe((data:any)=>{
        return resolve(data['data']);

      })

    })
  }
}
