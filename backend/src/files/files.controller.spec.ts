import { Test, TestingModule } from '@nestjs/testing';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { INestApplication } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CreateFileDto } from './files.dto';
import * as request from 'supertest';


describe('FilesController', () => {
  let app: INestApplication;
  let service: FilesService;
  let jwtService: JwtService;
  let validToken: string;

  beforeAll(async () => {
    process.env.JWT_SECRET = 'unaclavesecreta';

    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilesController],
      providers: [
        { provide: FilesService, 
          useValue: {
            // canActivate: jest.fn(() => true),
            createFile: jest.fn(),
            getFiles: jest.fn()
          }
        },
        JwtService,
        AuthGuard
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

    validToken = jwtService.sign({ userId: '1'});
  });

  it('debería estar definido', () => {
    const controller = app.get<FilesController>(FilesController);
    expect(controller).toBeDefined();
  });

  it('deberia crear un nuevo archivo, con token de autorizacion', async() => {
    const createFileDto: CreateFileDto = { weight: 3.2, quantity: 5, type: 'pdf' };
    const result = { ...createFileDto, id: '1'};

    jest.spyOn(service, 'createFile').mockResolvedValue(result);

    return request(app.getHttpServer())
    .post('/files')
    .set('authorization', `Bearer ${validToken}`)
    .send(createFileDto)
    .expect(201, result);

  });

  it('deberia retornar una lista de archivos', async () => {
    const result = [{id:'1', type:'pdf', weight: 2.1, quantity:2}];
    jest.spyOn(service, 'getFiles').mockResolvedValue(result);

    return request(app.getHttpServer())
    .get('/files')
    .set('authorization', `Bearer ${validToken}`)
    .expect(200, result);
  });

  afterAll(async () => {
    await app.close();
  });
});
