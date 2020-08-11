import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoginModalService } from 'app/core/login/login-modal.service';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/user/account.model';
import { Router } from '@angular/router';
import { ArchivoService } from '../entities/archivo/archivo.service';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const AWS = require('aws-sdk');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const uuid = require('node-uuid');

// const region = 'us-west-2'; // Region
// Initialize the Amazon Cognito credentials provider
AWS.config.region = 'us-west-2'; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: 'us-west-2:502913e8-37b5-45d4-aedf-b98fd98f2523'
});

// AWS.config.update({
//   region: 'us-west-2',
//   credentials: cred
// });
// Create an S3 client
const s3 = new AWS.S3(AWS.config);

// eslint-disable-next-line no-console
console.log('cognito: ', s3);

// Create a bucket and upload something into it
const bucketName = 'node-sdk-sample-' + uuid.v4();
const keyName = 'hello_world.txt';

@Component({
  selector: 'jhi-home',
  templateUrl: './home.component.html',
  styleUrls: ['home.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  account: Account | null = null;
  authSubscription?: Subscription;
  @ViewChild('fileInput')
  inputEl!: ElementRef;

  constructor(
    private accountService: AccountService,
    private loginModalService: LoginModalService,
    private router: Router,
    private archivo: ArchivoService
  ) {}

  ngOnInit(): void {
    this.authSubscription = this.accountService.getAuthenticationState().subscribe(account => (this.account = account));
  }

  addArchivo(event: any): void {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      const formData: FormData = new FormData();
      formData.append('file', file, file.name);
      // this.archivo.uploadS3(formData).subscribe((res: any) => {
      //   // eslint-disable-next-line no-console
      //   console.log(res);
      // });
    }
  }

  isAuthenticated(): boolean {
    return this.accountService.isAuthenticated();
  }

  login(): void {
    this.loginModalService.open();
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  abrirBuscarTrabajo(): void {
    this.router.navigate(['/agregar-usuario']);
  }

  ventanaInicioSesion(): void {
    this.router.navigate(['/inicio-sesion']);
  }
}
