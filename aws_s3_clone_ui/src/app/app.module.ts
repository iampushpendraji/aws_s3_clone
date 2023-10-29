import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { CreateBucketModalComponent } from './dialogs/create-bucket-modal/create-bucket-modal.component';
import { CreateObjectModalComponent } from './dialogs/create-object-modal/create-object-modal.component';
import { FormsModule } from '@angular/forms';
import { BucketDescComponent } from './bucket-desc/bucket-desc.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CreateBucketModalComponent,
    CreateObjectModalComponent,
    BucketDescComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
