import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAssetDto {

    @IsString()
    name: string;
    @IsNumber()
    cost: number;
    @IsString()
    type: string;
}
