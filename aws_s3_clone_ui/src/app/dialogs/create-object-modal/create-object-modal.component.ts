import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { ApiCallServiceService } from 'src/app/services/api-call-service.service';

@Component({
  selector: 'app-create-object-modal',
  templateUrl: './create-object-modal.component.html',
  styleUrls: ['./create-object-modal.component.css'],
})
export class CreateObjectModalComponent {
  @Input() isAddFolder: boolean = false;
  @Input() bucket_id: any;
  @Input() relation_id: any;
  @Output() afterUploadObject: EventEmitter<void> = new EventEmitter<void>();

  selectedFile: File | null = null;

  _apiService: ApiCallServiceService = inject(ApiCallServiceService);

  // Function for select file
  handleFileInput(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  // Function for submit object modal
  submitHandler() {
    let folder_name: any = document.getElementById('folder-name');
    let obj = {
      bucket_id: this.bucket_id,
      relation_id: this.relation_id,
      folder_name: folder_name?.value,
    }
    if (this.isAddFolder) {
      this.createFolder(obj);
    }
    else {
      this.createFile(obj);
    }
  }

  // Function for create folder
  createFolder(obj: { bucket_id: number, relation_id: number, folder_name: string }) {
    this._apiService.createFolder(obj).subscribe({
      next: data => {
        if (data.status_code == 200) {
          this.resetModal();
          this.afterUploadObject.emit();
          document.getElementById('close-button')?.click();
        }
        else {
          console.log('Error in {submitHandler} in {create-object-modal-component}');
        }
      },
      error: err => {
        console.log('Error in {submitHandler} in {create-object-modal-component}, ERROR ----->>>>> ', err);
      }
    });
  }

  // Function for create file
  createFile(obj: { bucket_id: number, relation_id: number, folder_name: string }) {
    if (!this.selectedFile) {
      console.error('No file selected');
      return;
    }
    const formData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('data', JSON.stringify(obj));
    this._apiService.createObject(formData).subscribe({
      next: data => {
        if (data.status_code == 200) {
          this.afterUploadObject.emit();
          this.resetModal();
          document.getElementById('close-button')?.click();
        }
        else {
          console.log('Error in {submitHandler} in {create-object-modal-component}');
        }
      },
      error: err => {
        console.log('Error in {submitHandler} in {create-object-modal-component}, ERROR ----->>>>> ', err);
      }
    });
  }

  // Function for reset
  resetModal() {
    this.selectedFile = null;
    if (this.isAddFolder) {
      let folder_name: any = document.getElementById('folder-name');
      folder_name.value = '';
    }
    else {
      this.resetFileInput();
    }
  }

  // Function for resetting input type
  resetFileInput() {
    var fileInput: any = document.getElementById('fileInput');
    fileInput.value = null;
  }
}
