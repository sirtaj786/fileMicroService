import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UploadFileDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ required: false, example: 'Sample File' })
  title?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false, example: 'This is a test file' })
  description?: string;
}