import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, Event as RouterEvent } from '@angular/router';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false
})
export class AppComponent implements OnInit, OnDestroy {

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
    private keepalive: Keepalive
  ) {
    this.initializeApp();
  }

  ngOnInit() {
    this.router.events.subscribe((event: RouterEvent) => {
      if (event instanceof NavigationStart || event instanceof NavigationEnd) {
        this.active = event.url;
        
        // Explicitly hide the modal when navigating to /login (ensure view is fully loaded)
        if (this.router.url === '/login') {
          setTimeout(() => {
            this.showModal = false; // Hide modal after the view is loaded
          }, 0); // Wait for the next event loop to ensure the view is fully initialized
        }
      }
    });

    // Setup Idle timeout logic
    this.setupIdleTimeout();
    this.setupKeepalive();
    this.reset();
  }

  ngOnDestroy() {
    // Cleanup when component is destroyed
    this.showModal = false; // Explicitly reset modal visibility when destroying component
  }

  private initializeApp() {
    this.storage.create();
  }

  private setupIdleTimeout() {
    this.idle.setIdle(300);
    this.idle.setTimeout(10); // Session will timeout after 5 minutes (300 seconds)
    this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    this.idle.onIdleEnd.subscribe(() => this.idleState = 'No longer idle.');
    this.idle.onTimeout.subscribe(() => {
      this.idleState = 'Timed out!';
      this.timedOut = true;
      this.router.navigate(['/login']);  // Navigate to login after timeout
      this.showModal = false; // Hide the modal on timeout
    });
    this.idle.onIdleStart.subscribe(() => {
      this.idleState = 'Idle state';
      this.showModal = true; // Show the modal when the user goes idle
    });

    this.idle.onTimeoutWarning.subscribe((countdown) => {
      this.idleState = countdown + ' seconds!'; // Display countdown warning
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
    console.log('Idle timer reset');
  }

  logout() {
    // Your logout logic here
    this.router.navigate(['/login']);
    this.showModal = false; // Hide modal on logout
  }
}
