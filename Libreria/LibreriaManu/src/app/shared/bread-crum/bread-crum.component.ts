import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Subscription, filter, map } from 'rxjs';

@Component({
  selector: 'app-bread-crum',
  templateUrl: './bread-crum.component.html',
  styleUrl: './bread-crum.component.css'
})
export class BreadCrumComponent implements OnInit, OnDestroy{

  items: MenuItem[] = [];
  home: any = {icon: 'pi pi-home', routerLink:"/"};
  position: 'top' = 'top';

  private titleSub$: Subscription;
  
  constructor(private router: Router) {
      this.titleSub$ = this.getDataRouter().subscribe(({title}) => {
        this.items = []
        this.items.push({label: title});
      });
   }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    if (this.titleSub$) {
      this.titleSub$.unsubscribe();
    }
  }

  getDataRouter(){
    return this.router.events.pipe(
      filter((event:any) => {
      // console.log(event);
      return event instanceof ActivationEnd}),
      filter((event: ActivationEnd) => event.snapshot.firstChild === null),
      map((event: ActivationEnd) => event.snapshot.data)
    );
  }
}
