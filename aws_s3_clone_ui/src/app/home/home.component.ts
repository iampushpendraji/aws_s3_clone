import { Component, OnInit, inject } from '@angular/core';
import { ApiCallServiceService } from '../services/api-call-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  _apiService: ApiCallServiceService = inject(ApiCallServiceService);
  _router: Router = inject(Router);

  buckets: any[] = [];

  async ngOnInit() {
    await this.getBucketList;
  }

  get getBucketList(): Promise<boolean> {
    return new Promise((res, rej) => {
      this._apiService.getBuckets.subscribe({
        next: data => {
          if (data.status_code == 200) {
            this.buckets = data.data;
            res(true);
          }
          else {
            console.log('Error in ${createBucket} in ${create-bucket-modal-component}');
            rej(false);
          }
        },
        error: err => {
          console.log('Error in ${createBucket} in ${create-bucket-modal-component}, ERROR ----->>>>> ', err);
          rej(false);
        }
      });
    });
  }

  jumpToPage(bucket_id: number): void {
    this._router.navigateByUrl(`${bucket_id}`);
  }

}
