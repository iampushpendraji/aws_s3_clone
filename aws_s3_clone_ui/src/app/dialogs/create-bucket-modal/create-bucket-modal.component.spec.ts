import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBucketModalComponent } from './create-bucket-modal.component';

describe('CreateBucketModalComponent', () => {
  let component: CreateBucketModalComponent;
  let fixture: ComponentFixture<CreateBucketModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateBucketModalComponent]
    });
    fixture = TestBed.createComponent(CreateBucketModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
