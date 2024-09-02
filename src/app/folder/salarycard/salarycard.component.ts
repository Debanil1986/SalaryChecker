import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Salary } from 'src/models/salary.model';
import { IonicSlides } from '@ionic/angular';
import { register } from 'swiper/element/bundle';

register();

@Component({
  selector: 'app-salarycard',
  templateUrl: './salarycard.component.html',
  styleUrls: ['./salarycard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SalarycardComponent  implements OnInit {
  swiperModules = [IonicSlides];
  @Input() salary:Salary[] = [] as Salary[];
  constructor() { }
  ngOnInit() {
    console.log("salary",this.salary);
  }

}
