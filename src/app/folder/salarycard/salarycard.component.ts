import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Datum, routinetimeSlots, Schedule, SubjectAbbr } from 'src/models/salary.model';
import { AlertController, IonicSlides } from '@ionic/angular';
import type { AlertInput } from '@ionic/core';
import { register } from 'swiper/element/bundle';
import { Observable, of } from 'rxjs';
import { getSubjectAbbr } from 'src/tools/tools';

register();

@Component({
  selector: 'app-salarycard',
  templateUrl: './salarycard.component.html',
  styleUrls: ['./salarycard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SalarycardComponent implements OnInit,OnChanges  {
  @Input() schedule: Datum = {} as Datum ;

  timeSlots:routinetimeSlots[] = []
  displayTime ='00:00:00';
  running = false;
  private startTime!: number;
  private elapsedTime = 0;
  private timerInterval!: any;
  AllSubjects:string[] =[] ;

  constructor( private alertCtrl: AlertController, private change:ChangeDetectorRef) {
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log("Schedule",this.schedule);
    this.timeSlots = Object.keys(this.schedule).filter(key => key !== "days") as routinetimeSlots[];
    const AllValues:any[] = [];
    const timeSlotsValues = [...Object.values(this.schedule)];
    for(let i=0; i< timeSlotsValues.length;i++){
      if(typeof(timeSlotsValues[i]) == 'string'){
        timeSlotsValues.splice(i,1)
      }
      AllValues.push(...timeSlotsValues[i])
    }
    console.log('AllValues: ', AllValues)
    this.AllSubjects = [...new Set(AllValues)]

  }
  ngOnInit(): void {
    console.log();

  }


  getSubjectAbbr(subject:string){
    return getSubjectAbbr(subject)
  }

  startTimer() {
    if (!this.running) {
      this.running = true;
      this.startTime = Date.now() - this.elapsedTime;
      this.timerInterval = setInterval(() => {
        this.elapsedTime = Date.now() - this.startTime;
        const displayTime = this.formatTime(this.elapsedTime);
        this.updateTime(displayTime);
      }, 1000);
    }
  }

  updateTime(displayTime:string) {
    this.displayTime = displayTime;


    this.change.detectChanges()
  }
  pauseTimer() {
    this.running = false;
    clearInterval(this.timerInterval);
  }

  resetTimer() {
    this.running = false;
    clearInterval(this.timerInterval);
    this.elapsedTime = 0;
    this.displayTime = '00:00:00';
  }

  async saveTime(time:string) {


  let alertInput: AlertInput[] = [];

  for(let i=0;i<this.AllSubjects.length;i++){
    alertInput.push( {
      name:this.AllSubjects[i],
      label: this.getSubjectAbbr(this.AllSubjects[i]),
      type:'radio',
      value: this.AllSubjects[i] })
  }

    const alert = await this.alertCtrl.create({
      header: 'Select a Subject',
      inputs: alertInput,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'OK',
          handler: (data:any) => {
            const bodyForSavingProgress = {
              timeTaken: time,
              subjectSelected: data
            };

          }
        }
      ]
    });
    await alert.present();
  }

  private formatTime(ms: number): string {
    let totalSeconds = Math.floor(ms / 1000);
    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds % 3600) / 60);
    let seconds = totalSeconds % 60;
    return `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(seconds)}`;
  }

  private pad(num: number): string {
    return num.toString().padStart(2, '0');
  }

}
