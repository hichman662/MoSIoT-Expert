import { Component } from '@angular/core';
import { Router, NavigationStart, Event as RouterEvent } from '@angular/router';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false
})
export class AppComponent {

  active = '';
  // Define NAV as an array for the menu items
  NAV = [
    { name: 'Profile', link: '/profile', icon: 'person-circle' },
    { name: 'Settings', link: '/settings', icon: 'settings' },
    { name: 'Logout', link: '/login', icon: 'exit' }
  ];

  public idleState = 'NotStarted';
  timedOut = false;
  lastPing: Date | undefined;
  showModal = false;
  handlerMessage = '';
  roleMessage = '';

  constructor(
    private storage: Storage,
    private router: Router,
    private idle: Idle,
    private keepalive: Keepalive
  ) {
    this.initializeApp();
  }

  private initializeApp() {
    this.storage.create();
    this.router.events.subscribe((event: RouterEvent) => {
      if (event instanceof NavigationStart) {
        this.active = event.url;
      }
    });

    this.setupIdleTimeout();
    this.setupKeepalive();
    this.reset();
  }

  private setupIdleTimeout() {
    this.idle.setIdle(10);  // Idle time before timeout starts (10 seconds for demo)
    this.idle.setTimeout(300); // Timeout after 20 seconds of inactivity
    this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES); // Set interrupts for user activity

    this.idle.onIdleEnd.subscribe(() => this.idleState = 'No longer idle.');
    this.idle.onTimeout.subscribe(() => {
      this.idleState = 'Timed out!';
      this.timedOut = true;
      this.router.navigate(['/']);
      this.showModal = false;
    });

    this.idle.onIdleStart.subscribe(() => {
      this.idleState = 'Idle state';
      this.showModal = true;  // Show the modal when idle state starts
    });

    this.idle.onTimeoutWarning.subscribe((countdown) => {
      this.idleState = countdown + ' seconds!';
    });
  }

  private setupKeepalive() {
    this.keepalive.interval(15); // Ping every 15 seconds
    this.keepalive.onPing.subscribe(() => this.lastPing = new Date());
  }

  // Call this method to reset idle timer on login
  resetIdleTimer() {
    this.reset(); // Reset the idle watch timer
  }

  reset() {
    this.idle.watch();  // Start idle watch
    this.idleState = 'Started.';
    this.timedOut = false;
    this.showModal = false;  // Hide modal when resetting
  }

  // New logout method
  logout() {
    console.log("Logging out...");
    this.router.navigate(['/login']); // Redirect to login page
    this.showModal = false; // Hide the modal
  }

  setOpen(isOpen: boolean) {
    this.showModal = isOpen;
  }
}
