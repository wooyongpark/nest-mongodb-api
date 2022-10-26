import { Module } from '@nestjs/common';
import { AssetsService } from './assets.service';
import { AssetsController } from './assets.controller';
import { Assets, AssetsSchema } from './schemas/Assets.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: Assets.name, schema: AssetsSchema }])],
  controllers: [AssetsController],
  providers: [AssetsService]
})
export class AssetsModule {}
