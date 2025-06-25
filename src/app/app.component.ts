import { LoadingController } from '@ionic/angular';
/* eslint-disable max-len */
/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { NavigationStart, Router, Event as RouterEvent } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  active = '';

  textProfile: string = '';
  textLogout: string = '';
  isModalOpen = false;
  NAV = [
    {
      name: `Profile`,
      link: '/profile',
      icon: 'person-circle'
    },
    {
      name: `Settings`,
      link: '/settings',
      icon: 'settings'
    },
    {
      name: 'Logout',
      link: '/login',
      icon: 'exit'
    }
  ];

  public idleState = 'NotStarted';
  timedOut = false;
  lastPing:Date | undefined;
  showModal = false;
  handlerMessage = '';
  roleMessage = '';

  constructor(
    public storage: Storage,
    private router: Router,
    public idle: Idle,
    private keepalive: Keepalive,
    private alertController: AlertController,


    ) {

    this.storage.create();
    this.router.events.subscribe((event: RouterEvent) => {
      if (event instanceof NavigationStart) {
        this.active = event.url;
      }
    });


    // sets an idle timeout of 10 seconds.
    idle.setIdle(1000);

    // sets a timeout period of 10 seconds. after 20 seconds of inactivity, the user will timed out.
    idle.setTimeout(10000);

    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

idle.onIdleEnd.subscribe(() => this.idleState = 'No longer idle.');

idle.onTimeout.subscribe(() => {
       this.idleState = 'Timed out!';
      this.timedOut = true;
      console.log(this.idleState);
      this.router.navigate(['/']);
      this.showModal = false;
});
idle.onIdleStart.subscribe(() => {this.idleState = 'idle state';
  this.showModal = true;
  this.presentAlert();
});


idle.onTimeoutWarning.subscribe((countdown) => {

  //this.idleState = 'You will time out in ' + countdown + ' seconds!';
  this.idleState =  countdown + ' seconds!';
} );     // sets the ping interval to 15 seconds

// sets the ping interval to 15 seconds
keepalive.interval(15);

keepalive.onPing.subscribe(() => this.lastPing = new Date());
console.log(this.lastPing);
this.reset();
 }

reset() {
    this.idle.watch();

    this.idleState = 'Started.';
    this.timedOut = false;
    this.showModal = false;
  }

  async presentAlert() {

    const alert = await this.alertController.create({

      header:  `Idle timer expired; Session has been idle over its time limit. Plaese press continue to continue session.`,
      buttons: [
        {
          text: 'Continue',
          role: 'cancel',
          handler: () => {
            this.handlerMessage = 'Alert canceled';
            this.reset();
            this.showModal = false;
          },
        },
        {
          text: 'Logout',
          role: 'confirm',
          handler: () => {
            this.handlerMessage = 'Alert confirmed';
            this.router.navigate(['/']);
          },
        },
      ],
    });

    await alert.present();
    setTimeout(()=>{
      alert.dismiss();
  }, 10000);

    const { role } = await alert.onDidDismiss();
    this.roleMessage = `Dismissed with role: ${role}`;


  }

  setOpen(isOpen: boolean) {
    this.showModal = isOpen;
  }


}

