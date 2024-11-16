import { Test, TestingModule } from '@nestjs/testing';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { AuthGuard } from '../auth/guards/auth.guard';

const mockAuthGuard = {
  canActivate: jest.fn(() => true),
};

describe('FilesController', () => {
  let controller: FilesController;
  let service: FilesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilesController],
      providers: [
        FilesService,
        { provide: AuthGuard, useValue: mockAuthGuard },
      ],
    }).compile();

    controller = module.get<FilesController>(FilesController);
    service = module.get<FilesService>(FilesService);
  });

  it('debería estar definido', () => {
    expect(controller).toBeDefined();
  });
});
