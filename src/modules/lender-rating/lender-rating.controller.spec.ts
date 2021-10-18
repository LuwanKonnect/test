import { Test, TestingModule } from '@nestjs/testing';
import { LenderRatingController } from './lender-rating.controller';

describe('LenderRatingController', () => {
  let controller: LenderRatingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LenderRatingController],
    }).compile();

    controller = module.get<LenderRatingController>(LenderRatingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
