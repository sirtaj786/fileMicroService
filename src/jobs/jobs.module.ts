import { Module, forwardRef } from '@nestjs/common'; // Add forwardRef
import { JobsService } from './jobs.service';
import { BullModule } from '@nestjs/bull';
import { ConfigService } from '@nestjs/config';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { File } from '../files/entities/file.entity';
import { FileProcessor } from './file.processor';
import { FilesModule } from '../files/files.module';

@Module({
  imports: [
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        redis: {
          host: configService.get('REDIS_HOST'),
          port: configService.get('REDIS_PORT'),
        },
      }),
      inject: [ConfigService],
    }),
    BullModule.registerQueue({
      name: 'file-processing',
    }),
    SequelizeModule.forFeature([File]),
    forwardRef(() => FilesModule), // Use forwardRef
  ],
  providers: [JobsService, FileProcessor],
  exports: [JobsService],
})
export class JobsModule {}