import { Injectable } from '@nestjs/common';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAssetDto } from './dto/create-asset.dto';
import { Assets, AssetsDocument } from './schemas/Assets.schema';


@Injectable()
export class AssetsService {
  constructor(
    @InjectModel(Assets.name) private readonly assetsModel: Model<AssetsDocument>,
  ) {}

  async create(createAssetDto: CreateAssetDto): Promise<Assets> {
    console.log(createAssetDto);
    const createdAsset = await this.assetsModel.create(createAssetDto);
    
    return createdAsset;
  }

  async findAll(): Promise<Assets[]> {
    return this.assetsModel.find().exec();
  }

  async findOne(id: string): Promise<Assets> {
    return this.assetsModel.findOne({ _id: id }).exec();
  }

  async delete(id: string) {
    const deletedAsset = await this.assetsModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedAsset;
  }
}
