import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BucketDescComponent } from './bucket-desc.component';

describe('BucketDescComponent', () => {
  let component: BucketDescComponent;
  let fixture: ComponentFixture<BucketDescComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BucketDescComponent]
    });
    fixture = TestBed.createComponent(BucketDescComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
