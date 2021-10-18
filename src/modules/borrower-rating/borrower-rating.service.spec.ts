import { Test, TestingModule } from '@nestjs/testing';
import { BorrowerRatingService } from './borrower-rating.service';

describe('UserRatingService', () => {
  let service: BorrowerRatingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BorrowerRatingService],
    }).compile();

    service = module.get<BorrowerRatingService>(BorrowerRatingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
