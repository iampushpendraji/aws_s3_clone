import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateObjectModalComponent } from './create-object-modal.component';

describe('CreateObjectModalComponent', () => {
  let component: CreateObjectModalComponent;
  let fixture: ComponentFixture<CreateObjectModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateObjectModalComponent]
    });
    fixture = TestBed.createComponent(CreateObjectModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
