import { Component, EventEmitter, Output, inject } from '@angular/core';
import { ApiCallServiceService } from '../../services/api-call-service.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-bucket-modal',
  templateUrl: './create-bucket-modal.component.html',
  styleUrls: ['./create-bucket-modal.component.css'],
})
export class CreateBucketModalComponent {
  _apiService: ApiCallServiceService = inject(ApiCallServiceService);

  @Output() afterCreateBucket: EventEmitter<void> = new EventEmitter<void>;

  isBucketNameEmpty: boolean = false;

  // Function to handle click on submit create bucket
  async submitHandler(bucketForm: NgForm) {
    this.isBucketNameEmpty = bucketForm.valid ? false : true;
    if (bucketForm.valid) {
      await this.createBucket(bucketForm.value);
      bucketForm.resetForm();
      this.afterCreateBucket.emit();
      document.getElementById('close-button')?.click();
    }
  }

  // Function to handle the creation of a new bucket
  createBucket(obj: { bucket_name: string; bucket_description?: string }) {
    return new Promise((res, rej) => {
      this._apiService.createBucket(obj).subscribe({
        next: data => {
          if (data.status_code == 200) {
            res(data.data);
          }
          else {
            console.log('Error in ${createBucket} in ${create-bucket-modal-component}');
            rej();
          }
        },
        error: err => {
          console.log('Error in ${createBucket} in ${create-bucket-modal-component}, ERROR ----->>>>> ', err);
          rej(err);
        }
      });
    });
  }

}
