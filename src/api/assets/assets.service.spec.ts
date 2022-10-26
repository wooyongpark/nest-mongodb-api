import { Test, TestingModule } from '@nestjs/testing';
import { AssetsService } from './assets.service';
import { getModelToken } from '@nestjs/mongoose';
import { Assets } from './schemas/Assets.schema';
import { Model } from 'mongoose';


const mockAsset = {
  name: 'Cat #1',
  type: 'Breed #1',
  cost: 4,
};

describe('AssetsService', () => {
  let service: AssetsService;
  let model: Model<Assets>;

  const assetsArray = [
    {
      name: 'Cat #1',
      type: 'Breed #1',
      cost: 4,
    },
    {
      name: 'Cat #2',
      type: 'Breed #2',
      cost: 2,
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AssetsService,
        {
          provide: getModelToken('Assets'),
          useValue: {
            new: jest.fn().mockResolvedValue(mockAsset),
            constructor: jest.fn().mockResolvedValue(mockAsset),
            find: jest.fn(),
            create: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    model = module.get<Model<Assets>>(getModelToken('Assets'));
    service = module.get<AssetsService>(AssetsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should return all assets', async () => {
    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(assetsArray),
    } as any);
    const assets = await service.findAll();
    expect(assets).toEqual(assetsArray);
  });

  it('should insert a new asset', async () => {
    jest.spyOn(model, 'create').mockImplementationOnce(() =>
      Promise.resolve({
        name: 'Cat #1',
        type: 'Breed #1',
        cost: 4,
      }),
    );
    const newAsset = await service.create({
      name: 'Cat #1',
      type: 'Breed #1',
      cost: 4,
    });
    expect(newAsset).toEqual(mockAsset);
  });
});
