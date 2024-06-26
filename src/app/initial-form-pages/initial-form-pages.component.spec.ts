import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialFormPagesComponent } from './initial-form-pages.component';

describe('InitialFormPagesComponent', () => {
  let component: InitialFormPagesComponent;
  let fixture: ComponentFixture<InitialFormPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InitialFormPagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InitialFormPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
