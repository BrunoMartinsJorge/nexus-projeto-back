import { Test, TestingModule } from '@nestjs/testing';
import { SaqueController } from './saque.controller';

describe('SaqueController', () => {
  let saque: SaqueController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SaqueController],
    }).compile();

    saque = module.get<SaqueController>(SaqueController);
  });

  it('should be defined', () => {
    expect(saque).toBeDefined();
  });
});
