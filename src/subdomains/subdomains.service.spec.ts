import { Test, TestingModule } from '@nestjs/testing';
import { SubdomainsService } from './subdomains.service';

describe('SubdomainsService', () => {
  let service: SubdomainsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubdomainsService],
    }).compile();

    service = module.get<SubdomainsService>(SubdomainsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
