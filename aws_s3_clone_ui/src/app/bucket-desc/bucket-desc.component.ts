import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ApiCallServiceService } from '../services/api-call-service.service';

@Component({
  selector: 'app-bucket-desc',
  templateUrl: './bucket-desc.component.html',
  styleUrls: ['./bucket-desc.component.css'],
})
export class BucketDescComponent implements OnInit {
  _route: ActivatedRoute = inject(ActivatedRoute);
  _apiService: ApiCallServiceService = inject(ApiCallServiceService);

  currentBucketId: number = 0;
  currentRelationId: number = 0;
  objectsList: any[] = [];
  isAddFolder: boolean = true;

  async ngOnInit() {
    this.getDynamicRoutes(); // Getting dynamic routes here
    await this.getBucketInfo;
  }

  // Function for getting dynamic routes
  getDynamicRoutes(): void {
    this._route.params.subscribe((params: Params) => {   // Subscribe to route parameter changes
      this.currentBucketId = params['bucket_id'];
      this.currentRelationId = params['relation_id'] ? params['relation_id'] : 0;
    });
  }

  // Function for getting bucket info
  get getBucketInfo() {
    return new Promise((res, rej) => {
      let obj = {
        bucket_id: this.currentBucketId,
        relation_id: this.currentRelationId
      }
      this._apiService.getBucketInfo(obj).subscribe({
        next: data => {
          if(data.status_code == 200) {
            this.objectsList = data.data;
          }
          else {
            console.log('Error in {getBucketInfo} in {bucket-desc-component}');
          }
        },
        error: err => {
          console.log('Error in {getBucketInfo} in {bucket-desc-component}, ERROR ----->>>>> ', err);
        }
      });
    });
  }

  // Function for getting object info
  getObjectById(object_id: number) {
    let obj = {
      object_id: object_id,
      bucket_id: this.currentBucketId,
      relation_id: this.currentRelationId
    }
    this._apiService.getObjectById(obj).subscribe({
      next: data => {
        console.log(data);
        if(data.status_code == 200) {
        }
        else {
          console.log('Error in {getBucketInfo} in {bucket-desc-component}');
        }
      },
      error: err => {
        console.log('Error in {getBucketInfo} in {bucket-desc-component}, ERROR ----->>>>> ', err);
      }
    });
  }
}
