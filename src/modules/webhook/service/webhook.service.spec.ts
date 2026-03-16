import { Test, TestingModule } from '@nestjs/testing';
import { WebhoockService } from './webhoock/webhoock.service';

describe('WebhoockService', () => {
  let service: WebhoockService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WebhoockService],
    }).compile();

    service = module.get<WebhoockService>(WebhoockService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
