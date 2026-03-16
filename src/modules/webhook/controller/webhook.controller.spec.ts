import { Test, TestingModule } from '@nestjs/testing';
import { WebhoockController } from './webhook.controller';

describe('WebhoockController', () => {
  let controller: WebhoockController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WebhoockController],
    }).compile();

    controller = module.get<WebhoockController>(WebhoockController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
