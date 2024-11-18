import { Test, TestingModule } from '@nestjs/testing';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { INestApplication } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthGuard } from '../auth/guards/auth.guard';


describe('FilesController', () => {
  let app: INestApplication;
  let service: FilesService;
  let jwtService: JwtService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilesController],
      providers: [
        { provide: FilesService, 
          useValue: {

          }
        },
        JwtService,
        AuthGuard,
      ],
      imports: [
        JwtModule.register({
          secret: 'unaclavesecreta',
          signOptions: {expiresIn: '1h'}
        }),
      ]
    }).compile();

    app = module.createNestApplication();
    await app.init();
    service = module.get<FilesService>(FilesService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('debería estar definido', () => {
    const controller = app.get<FilesController>(FilesController);
    expect(controller).toBeDefined();
  });
});
