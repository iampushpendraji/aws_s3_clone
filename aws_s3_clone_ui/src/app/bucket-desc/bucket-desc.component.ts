import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ApiCallServiceService } from '../services/api-call-service.service';

@Component({
  selector: 'app-bucket-desc',
  templateUrl: './bucket-desc.component.html',
  styleUrls: ['./bucket-desc.component.css'],
})
export class BucketDescComponent implements OnInit {
  _route: ActivatedRoute = inject(ActivatedRoute);
  _router: Router = inject(Router);
  _apiService: ApiCallServiceService = inject(ApiCallServiceService);

  currentBucketId: number = 0;
  currentRelationId: number = 0;
  objectsList: any[] = [];
  isAddFolder: boolean = true;

  async ngOnInit() {
    this.getDynamicRoutes(); // Getting dynamic routes here
    await this.getBucketInfo;
  }

  // Function for jump to route
  jumpToRoute(path: string) {
    this._router.navigateByUrl(path);
  }

  // Function for getting dynamic routes
  getDynamicRoutes(): void {
    this._route.params.subscribe((params: Params) => {   // Subscribe to route parameter changes
      this.currentBucketId = params['bucket_id'];
      this.currentRelationId = params['relation_id'] ? params['relation_id'] : 0;
      this.getBucketInfo;
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
          if (data.status_code == 200) {
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
        if (data.status_code == 200) {
          
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

  // Function for handle click on object list
  objectClickHandler(obj: any) {
    console.log(obj);
    if (obj.is_folder) {
      this.jumpToRoute(`/${this.currentBucketId}/${obj.object_id}`);
    }
    else {
      this.getObjectById(obj.object_id);
    }
  }

  // Function for handle click on previous button
  getPreviousRoute() {
    let obj = {
      object_id: this.currentRelationId,
      bucket_id: this.currentBucketId
    }
    this._apiService.getRelationId(obj).subscribe({
      next: data => {
        if (data.status_code == 200) {
          let path = '/';
          if(data.data.length > 0) {
            let relationId = data.data[0].relation_id;
            path = `${this.currentBucketId}/${relationId}`;
          }
          this._router.navigateByUrl(`${path}`);
        }
        else {
          console.log('Error in {getPreviousRoute} in {bucket-desc-component}');
        }
      },
      error: err => {
        console.log('Error in {getPreviousRoute} in {bucket-desc-component}, ERROR ----->>>>> ', err);
      }
    })
  }

  // Function for truncat bucket
  truncatBucket() {
    let obj = {
      bucket_id: this.currentBucketId
    }
    this._apiService.truncatBucket(obj).subscribe({
      next: data => {
        if (data.status_code == 200) {
          this.getBucketInfo;
          this.jumpToRoute('/');
        }
        else {
          console.log('Error in {truncatBucket} in {bucket-desc-component}');
        }
      },
      error: err => {
        console.log('Error in {truncatBucket} in {bucket-desc-component}, ERROR ----->>>>> ', err);
      }
    });
  }

  // Function for deleting object
  deleteObject(obj: any) {
    let obj1 = {
      bucket_id: this.currentBucketId,
      object_ids: [obj.object_id],
      relation_id: obj.relation_id,
      isFolder: obj.is_folder == 1
    }
    this._apiService.deleteObjects(obj1).subscribe({
      next: data => {
        if (data.status_code == 200) {
          this.getBucketInfo;
        }
        else {
          console.log('Error in {deleteObject} in {bucket-desc-component}');
        }
      },
      error: err => {
        console.log('Error in {deleteObject} in {bucket-desc-component}, ERROR ----->>>>> ', err);
      }
    });
  }
}
