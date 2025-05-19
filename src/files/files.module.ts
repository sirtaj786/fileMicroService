import { Module, forwardRef } from '@nestjs/common'; // Add forwardRef
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { File } from './entities/file.entity';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ConfigService } from '@nestjs/config';
import { JobsModule } from '../jobs/jobs.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    SequelizeModule.forFeature([File]),
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        storage: diskStorage({
          destination: './uploads',
          filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            cb(null, `${file.fieldname}-${uniqueSuffix}-${file.originalname}`);
          },
        }),
        limits: {
          fileSize: configService.get('UPLOAD_MAX_SIZE'),
        },
      }),
      inject: [ConfigService],
    }),
    forwardRef(() => JobsModule), // Use forwardRef
  ],
  providers: [FilesService],
  controllers: [FilesController],
  exports: [FilesService], // Ensure FilesService is exported
})
export class FilesModule {}