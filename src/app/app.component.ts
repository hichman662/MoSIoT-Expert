import { Component } from '@angular/core';
import { Router, NavigationStart, Event as RouterEvent } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false
})
export class AppComponent {

  NAV = [
    { name: 'Profile', link: '/profile', icon: 'person-circle' },
    { name: 'Settings', link: '/settings', icon: 'settings' },
    { name: 'Logout', link: '/login', icon: 'exit' }
  ];

  active = '';
  showModal = false;
  idleState = 'NotStarted';
  timedOut = false;
  lastPing: Date | undefined;

  constructor(
    private storage: Storage,
    private router: Router,
    private idle: Idle,
    private keepalive: Keepalive,
    private alertController: AlertController
  ) {
    this.initializeApp();
  }

  private initializeApp() {
    this.storage.create();
    this.router.events.subscribe((event: RouterEvent) => {
      if (event instanceof NavigationStart) {
        this.active = event.url;
        
        // Hide the timer modal when navigating to the logout page
        if (this.active === '/login') {
          this.showModal = false; // Hide modal on logout or login page
        }
      }
    });

    this.setupIdleTimeout();
    this.setupKeepalive();
    this.reset();
  }

  private setupIdleTimeout() {
    this.idle.setIdle(10);
    this.idle.setTimeout(300);
    this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    this.idle.onIdleEnd.subscribe(() => this.idleState = 'No longer idle.');
    this.idle.onTimeout.subscribe(() => {
      this.idleState = 'Timed out!';
      this.timedOut = true;
      this.router.navigate(['/']);
      this.showModal = false;
    });
    this.idle.onIdleStart.subscribe(() => {
      this.idleState = 'Idle state';
      this.showModal = true;
    });

    this.idle.onTimeoutWarning.subscribe((countdown) => {
      this.idleState = countdown + ' seconds!';
    });
  }

  private setupKeepalive() {
    this.keepalive.interval(15);
    this.keepalive.onPing.subscribe(() => this.lastPing = new Date());
  }

  reset() {
    this.idle.watch();
    this.idleState = 'Started.';
    this.timedOut = false;
    this.showModal = false;  // Reset modal visibility when resetting idle timer
  }

   resetIdleTimer() {
    this.idle.watch();
    console.log("Idle timer reset");
  }

  logout() {
    // Your logout logic here
    this.router.navigate(['/login']);
    this.showModal = false; // Hide modal on logout
  }
}
