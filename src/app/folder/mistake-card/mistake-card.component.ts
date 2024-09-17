import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Salary } from 'src/models/salary.model';

@Component({
  selector: 'app-mistake-card',
  templateUrl: './mistake-card.component.html',
  styleUrls: ['./mistake-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MistakeCardComponent implements OnChanges {
  @Input() salary: Salary[] = [] as Salary[];
  category1Count = 0;
  category2Count = 0;

  category1Mistakes = 84898;
  category2Mistakes = 68629;
  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    console.log('salary in mistake', this.salary);
    console.log(changes);
  }

  // This will control the graph animation.
  startGraph() {
    this.animateCategory1();
  }

  animateCategory1() {
    let interval = setInterval(() => {
      if (this.category1Count < this.category1Mistakes) {
        this.category1Count += 1000; // Increment by 1000 (adjust this value as needed)
      } else {
        clearInterval(interval);
        this.animateCategory2(); // Start the next animation
      }
    }, 50);
  }

  animateCategory2() {
    let interval = setInterval(() => {
      if (this.category2Count < this.category2Mistakes) {
        this.category2Count += 1000; // Increment by 1000 (adjust this value as needed)
      } else {
        clearInterval(interval);
        this.triggerGrowth(); // Trigger the bar growth after counts finish
      }
    }, 50);
  }

  triggerGrowth() {
    const graphElement = document.querySelector('.graph');
    graphElement?.classList.add('grow'); // Add 'grow' class to trigger the CSS animation
  }
}
