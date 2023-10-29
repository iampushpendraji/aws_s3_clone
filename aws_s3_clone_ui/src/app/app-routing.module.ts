import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BucketDescComponent } from './bucket-desc/bucket-desc.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: ':bucket_id',
    component: BucketDescComponent,
  },
  {
    path: ':bucket_id/:relation_id',
    component: BucketDescComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
