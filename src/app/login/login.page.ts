import { TranslateService } from '@ngx-translate/core';
import { ToastController } from '@ionic/angular';
/* eslint-disable @typescript-eslint/naming-convention */
import { ScenarioService } from './../services/scenario.service';
import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';


@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
    standalone: false
})
export class LoginPage implements OnInit {
  public formSubmit = false;
  public waiting = false;
  textAlertActionNotComplete: string = '';

  public loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    pass: ['', Validators.required ]
  });
  constructor(private router: Router,
    private storage: Storage,
    private fb: FormBuilder,
    private userService: UserService,
    private scenarioService: ScenarioService,
    private translateService: TranslateService,
    public toastController: ToastController)
    {

      translateService.get('TOASTALERT.actionCouldNotBeCompleted').subscribe(value => {
        this.textAlertActionNotComplete = value;
      });
    }

async  ngOnInit() {
  await this.storage.clear();
  }
  /* async start() {
    this.router.navigateByUrl('/scenarios', { replaceUrl:true });
  } */

  login(): any {
    this.formSubmit = true;
    if (!this.loginForm.valid) {
      console.warn('error in the form');
      return;
    }
    this.waiting = true;
    this.userService.login(this.loginForm.value)
      .subscribe( (res: any) => {
        this.waiting = false;
        this.storage.set('email', this.loginForm.get('email')?.value);
        this.router.navigateByUrl('/scenarios', { replaceUrl:true });
      }, (err: any) => {
        console.warn('Error respuesta api', err);
        if(err.status === 401) {
          this.presentToast('danger',`${this.textAlertActionNotComplete}`);

        } else {
          this.presentToast('danger',`${this.textAlertActionNotComplete}`);
        }
        this.waiting = false;
      });

    }


    async presentToast(color: string, message: string) {
      const toast = await this.toastController.create({
        color: `${color}`,
        message: ` ${message}`,
        duration: 2500,
        position: 'bottom'
      });
      await toast.present();
    }

campoValido(campo: string) {
  return this.loginForm.get(campo)?.valid || !this.formSubmit;
}



}
