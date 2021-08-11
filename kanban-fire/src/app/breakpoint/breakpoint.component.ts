import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-breakpoint',
  templateUrl: './breakpoint.component.html',
  styleUrls: ['./breakpoint.component.css']
})
export class BreakpointComponent implements OnInit , OnDestroy{
   destroyed = new Subject<void>();
   currentScreenSize: string;
   displayNameMap = new Map([
     [Breakpoints.XSmall, 'XSmall'],
     [Breakpoints.Small, 'Small'],
     [Breakpoints.Medium, 'Medium'],
     [Breakpoints.Large, 'Large'],
     [Breakpoints.XLarge, 'XLarge'],
   ]);
   constructor(breakpointObserver: BreakpointObserver) {
     breakpointObserver.observe([
       Breakpoints.XSmall,
       Breakpoints.Small,
       Breakpoints.Medium,
       Breakpoints.Large,
       Breakpoints.XLarge,
     ]).pipe(
       takeUntil(this.destroyed)
     ).subscribe(result => {
       for (const query of Object.keys(result.breakpoints)) {
         if (result.breakpoints[query]) {
           this.currentScreenSize = this.displayNameMap.get(query) ?? 'Unknown';
         }
       }
     });
   }

  ngOnInit() {
  }

  ngOnDestroy(): void {
     this.destroyed.next();
     this.destroyed.complete();
  }

}
