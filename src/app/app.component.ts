import { Component, ViewChild } from '@angular/core';
//import { MatMenuTrigger } from '@angular/material/menu';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { delay, filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { MenuItem } from './shared/models/ui-control';
//import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { animate, animation, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [

    trigger('expandContractMenu', [
      transition(':enter', [
        style({ opacity: 0, height: '0px' }),
        animate('500ms ease-in-out', style({ opacity: 1, height: '*' }))
      ]),
      transition(':leave', [
        animate('500ms ease-in-out', style({ opacity: 0, height: '0px' }))
      ])
    ])
  ]
})
export class AppComponent {
  title = 'TaskTrackerApp';

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  constructor(private observer: BreakpointObserver, private router: Router) { }

  expandedMenu: string | undefined;

  activeParent: MenuItem | undefined;

  toggleMenu(label: string): void {
    if (this.expandedMenu === label) {
      this.expandedMenu = undefined;
    } else {
      this.expandedMenu = label;
    }
  }
  

  isSubRouteActive(subItems: MenuItem[]): boolean {
    return subItems.some(sub => this.router.url.includes(sub.route!));
  }

  menuItem: MenuItem[] = [
    {
      icon: 'dashboard',
      label: 'Dashboard',
      route: 'dashboard'
    },
    {
      icon: 'list_alt_check',
      label: 'Tasks',
      route: 'task',
      subItems: [
        {
          icon: 'task_alt',
          label: 'All',
          route: '/all-task'
        },
        {
          icon: 'add_task',
          label: 'New',
          route: '/new-task'
        }
      ]
    },
    {
      icon: 'analytics',
      label: 'Analytics',
      route: 'analytics'
    },
    {
      icon: 'settings',
      label: 'Settings',
      route: 'settings'
    },
  ];

  ngAfterViewInit() {
    this.observer
      .observe(['(max-width: 800px)'])
      //.pipe(delay(1), untilDestroyed(this))
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });

    // Expand the correct parent menu if a subroute is active
    const activeParent = this.menuItem.find(item =>
      item.subItems?.some(sub => this.router.url.includes(sub.route!))
    );

    if (activeParent) {
      this.expandedMenu = activeParent.label;
    }

    // this.router.events
    //   .pipe(
    //     untilDestroyed(this),
    //     filter((e) => e instanceof NavigationEnd)
    //   )
    //   .subscribe(() => {
    //     if (this.sidenav.mode === 'over') {
    //       this.sidenav.close();
    //     }
    //   });
  }
}
