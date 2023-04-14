import { TestBed, inject } from '@angular/core/testing';

import { ServiceInvokerService } from './service-invoker.service';

describe('ServiceInvokerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServiceInvokerService]
    });
  });

  it('should be created', inject([ServiceInvokerService], (service: ServiceInvokerService) => {
    expect(service).toBeTruthy();
  }));
});
