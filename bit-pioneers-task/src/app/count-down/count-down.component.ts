import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-count-down',
  templateUrl: './count-down.component.html',
  styleUrls: ['./count-down.component.css'],
})
export class CountDownComponent implements OnInit, OnDestroy {
  private subscription?: Subscription;

  // variables for the end date
  public firstDate?:Date;
  public finalDay?:Date;
  public theEndDay?:  Date;
  
  /*
  //variables for the first marker
  public firstMarker?: Date;
  public markerFirst?: Date;
  public fMarker?: Date;

  //variables for the second marker
  public secondMarker?: Date;
  public markerSecond?: Date;
  public sMarker?: Date;
  */ 

  // public dDay: Date = new Date('Feb 22 2021 18:56:00'); This variable holds my mock data
  milliSecondsInASecond: number = 1000;
  hoursInADay: number = 24;
  minutesInAnHour: number = 60;
  SecondsInAMinute: number = 60;

  public timeDifference?: number; // for the end reach
  // public timeDiffFirstMarkerToEndReach?: number; // comparing with the first reach
  // public timeDiffSecondMarkerToEndReach?: number; // comparing with the first reach
  public secondsToDday?: number;
  public minutesToDday?: number;
  public hoursToDday?: number;
  public daysToDday?: number;

  private getTimeDifferenceForLastEvent(): void {
    this.timeDifference = this.theEndDay.getTime() /*this.dDay.getTime() */ - new Date().getTime();
    this.allocateTimeUnits(this.timeDifference);
    /*
    this.timeDiffFirstMarkerToEndReach = this.timeDifference - this.fMarker.getTime();
    this.timeDiffSecondMarkerToEndReach = this.this.timeDiffFirstMarkerToEndReach - this.sMarker.getTime();
    this.checkIfTheSecondAndThirdTimeHavePassed(this.timeDiffFirstMarkerToEndReach);
    this.checkIfTheSecondAndThirdTimeHavePassed(this.timeDiffSecondMarkerToEndReach);
    */
  }

  /*
  private checkIfTheSecondAndThirdTimeHavePassed(timeDifference: number)  {
    let timeDiffSeconds:number = Math.floor(
      (timeDifference / this.milliSecondsInASecond) % this.SecondsInAMinute
    );
    let timeDiffMinutes: number = Math.floor(
      (timeDifference / (this.milliSecondsInASecond * this.minutesInAnHour)) %
        this.SecondsInAMinute
    );
    let timeDiffHours: number = Math.floor(
      (timeDifference /
        (this.milliSecondsInASecond *
          this.minutesInAnHour *
          this.SecondsInAMinute)) %
        this.hoursInADay
    );
    let timeDiffDays: number = Math.floor(
      timeDifference /
        (this.milliSecondsInASecond *
          this.minutesInAnHour *
          this.SecondsInAMinute *
          this.hoursInADay)
    );
    if (timeDiffSeconds === 0 && timeDiffMinutes === 0 && timeDiffHours === 0 && timeDiffDays === 0) {
      console.log("The marker is reached");
    }    
    
  }

  */

  private allocateTimeUnits(timeDifference: number): void {
    this.secondsToDday = Math.floor(
      (timeDifference / this.milliSecondsInASecond) % this.SecondsInAMinute
    );
    this.minutesToDday = Math.floor(
      (timeDifference / (this.milliSecondsInASecond * this.minutesInAnHour)) %
        this.SecondsInAMinute
    );
    this.hoursToDday = Math.floor(
      (timeDifference /
        (this.milliSecondsInASecond *
          this.minutesInAnHour *
          this.SecondsInAMinute)) %
        this.hoursInADay
    );
    this.daysToDday = Math.floor(
      timeDifference /
        (this.milliSecondsInASecond *
          this.minutesInAnHour *
          this.SecondsInAMinute *
          this.hoursInADay)
    );
    
    if (this.secondsToDday === 0 && this.minutesToDday === 0 && this.hoursToDday === 0 && this.daysToDday === 0) {
      console.log("The timer is out!");
      this.subscription?.unsubscribe();
    }
    
  }

  constructor() {
    
  }

  startTimer(): void {
   
    // end reached
    this.finalDay = new DatePipe('en-US').transform(this.firstDate, 'MM-dd-yyyy 00:00:00'); 
    this.theEndDay = new Date(this.finalDay); 
    /*
    // first marker
    this.markerFirst = new DatePipe('en-US').transform(this.firstMarker, 'MM-dd-yyyy 00:00:00');
    this.fMarker = new Date(this.markerFirst);

    // second marker
    this.markerSecond = new DatePipe('en-US').transform(this.secondMarker, 'MM-dd-yyyy 00:00:00');
    this.sMarker = new Date(this.markerSecond);
    */
    this.subscription = interval(1000).subscribe(() => {
      this.getTimeDifferenceForLastEvent();
    });
  }


  ngOnInit() {
    // This was to test if it works with mock data
    /*
    this.subscription = interval(1000).subscribe(() => {
      this.getTimeDifferenceForLastEvent();
    });
    */
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

 
}
