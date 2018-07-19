import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorBrewingComponent } from './monitor-brewing.component';

describe('MonitorBrewingComponent', () => {
  let component: MonitorBrewingComponent;
  let fixture: ComponentFixture<MonitorBrewingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitorBrewingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorBrewingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
