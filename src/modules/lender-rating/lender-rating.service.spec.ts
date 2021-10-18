import { Test, TestingModule } from '@nestjs/testing';
import { LenderRatingService } from './lender-rating.service';

describe('LenderRatingService', () => {
  let service: LenderRatingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LenderRatingService],
    }).compile();

    service = module.get<LenderRatingService>(LenderRatingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
