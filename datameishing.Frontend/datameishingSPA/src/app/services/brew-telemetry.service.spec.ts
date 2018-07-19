import { TestBed, inject } from '@angular/core/testing';

import { BrewTelemetryService } from './brew-telemetry.service';

describe('BrewTelemetryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BrewTelemetryService]
    });
  });

  it('should be created', inject([BrewTelemetryService], (service: BrewTelemetryService) => {
    expect(service).toBeTruthy();
  }));
});
