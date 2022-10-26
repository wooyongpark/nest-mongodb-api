import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AssetsService } from './assets.service';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { Assets } from './schemas/Assets.schema';

@Controller('assets')
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) {}

  @Post()
  async create(@Body() createAssetDto: CreateAssetDto) {
    console.log(createAssetDto);
    await this.assetsService.create(createAssetDto);
  }

  @Get()
  async findAll(): Promise<Assets[]> {
    return this.assetsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Assets> {
    return this.assetsService.findOne(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.assetsService.delete(id);
  }
}
