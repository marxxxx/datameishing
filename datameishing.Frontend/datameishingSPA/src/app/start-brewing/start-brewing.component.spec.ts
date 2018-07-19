import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartBrewingComponent } from './start-brewing.component';

describe('StartBrewingComponent', () => {
  let component: StartBrewingComponent;
  let fixture: ComponentFixture<StartBrewingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartBrewingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartBrewingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
