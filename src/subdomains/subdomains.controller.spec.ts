import { Test, TestingModule } from '@nestjs/testing';
import { SubdomainsController } from './subdomains.controller';
import { SubdomainsService } from './subdomains.service';

describe('SubdomainsController', () => {
  let controller: SubdomainsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubdomainsController],
      providers: [SubdomainsService],
    }).compile();

    controller = module.get<SubdomainsController>(SubdomainsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
