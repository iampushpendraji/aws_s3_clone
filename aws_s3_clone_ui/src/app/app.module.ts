import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { CreateBucketModalComponent } from './dialogs/create-bucket-modal/create-bucket-modal.component';
import { CreateObjectModalComponent } from './dialogs/create-object-modal/create-object-modal.component';
import { FormsModule } from '@angular/forms';
import { BucketDescComponent } from './bucket-desc/bucket-desc.component';

@NgModule({ declarations: [
        AppComponent,
        HomeComponent,
        CreateBucketModalComponent,
        CreateObjectModalComponent,
        BucketDescComponent,
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        FormsModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
