import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HydraComponent } from './hydra.component';

describe('HydraComponent', () => {
  let component: HydraComponent;
  let fixture: ComponentFixture<HydraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HydraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HydraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
