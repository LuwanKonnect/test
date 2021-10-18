import { Test, TestingModule } from '@nestjs/testing';
import { BorrowerRatingController } from './borrower-rating.controller';

describe('UserRatingController', () => {
  let controller: BorrowerRatingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BorrowerRatingController],
    }).compile();

    controller = module.get<BorrowerRatingController>(BorrowerRatingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
