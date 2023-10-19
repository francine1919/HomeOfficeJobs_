import { Test, TestingModule } from '@nestjs/testing';
import { JobsController } from './jobs.controller';
import { JobsService } from './jobs.service';

describe('JobsController', () => {
  let JobsController: JobsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [JobsController],
      providers: [JobsService],
    }).compile();

    JobsController = app.get<JobsController>(JobsController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(JobsController.getHello()).toBe('Hello World!');
    });
  });
});
