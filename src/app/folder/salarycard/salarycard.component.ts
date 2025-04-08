

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { BodySendRoutine, Datum, routinetimeSlots, Schedule, SubjectAbbr } from 'src/models/salary.model';
import { AlertController, IonicSlides } from '@ionic/angular';
import type { AlertInput } from '@ionic/core';
import { register } from 'swiper/element/bundle';
import { getSubjectAbbr, removeSubjectFromSchedule } from 'src/tools/tools';
import { keepAwake,allowDeviceSleep } from 'src/tools/plugins.tools';
import { Capacitor } from '@capacitor/core';

register();

@Component({
  selector: 'app-salarycard',
  templateUrl: './salarycard.component.html',
  styleUrls: ['./salarycard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SalarycardComponent implements OnInit,OnChanges,OnDestroy  {
  @Input() schedule: Datum = {} as Datum ;
  @Output() progressRoutine: EventEmitter<any> = new EventEmitter<any>();

  timeSlots:routinetimeSlots[] = []
  displayTime ='00:00:00';
  running = false;
  private startTime!: number;
  private elapsedTime = 0;
  private timerInterval!: any;
  AllSubjects:string[] =[] ;
  currentSubjectSelected: string | null=null;
  cleanedSchedule: Datum = {} as Datum;

  constructor( private alertCtrl: AlertController, private change:ChangeDetectorRef) {
  }
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
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


  onSubjectSelect(subjectAdded:string){
    this.currentSubjectSelected = subjectAdded;
    this.cleanedSchedule = removeSubjectFromSchedule(this.schedule,subjectAdded);

  }

  startTimer() {
    if (!this.running) {
      this.running = true;
      if (Capacitor.getPlatform() === 'android') {
        // To keep the screen awake
        keepAwake()
            .then(() => console.log('Screen will not dim or lock on Android'))
            .catch((error:any) => console.error('Error preventing sleep:', error));

      }
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

  convertToSeconds(timeString:string) :number{
    const timeParts = timeString.split(':'); // Split the string by ':'
    const hours = parseInt(timeParts[0], 10); // Get hours
    const minutes = parseInt(timeParts[1], 10); // Get minutes
    const seconds = parseInt(timeParts[2], 10); // Get seconds

    // Calculate total seconds
    return (hours * 3600) + (minutes * 60) + seconds;
}

  async saveTime(time:string) {
    if(Capacitor.getPlatform() === 'android'){
       // To allow the screen to dim or lock again
       allowDeviceSleep()
       .then(() => console.log('Screen can dim or lock again on Android'))
       .catch((error:any) => console.error('Error allowing sleep:', error));
    }

    const alert = await this.alertCtrl.create({
      header: 'Confirm Schedule',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'OK',
          handler: (data:any) => {
            const bodyForSavingProgress: BodySendRoutine = {
              timeTaken: this.convertToSeconds(time),
              subjectSelected: this.currentSubjectSelected ?? ""
            };
            this.schedule = JSON.parse(JSON.stringify(this.cleanedSchedule));
            this.progressRoutine.emit(bodyForSavingProgress);
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
