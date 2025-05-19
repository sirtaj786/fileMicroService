import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from './auth/auth.module';
import { FilesModule } from './files/files.module';
import { JobsModule } from './jobs/jobs.module';
import { RateLimiterModule } from 'nestjs-rate-limiter'; // Ensure correct import
import { User } from './auth/entities/user.entity';
import { File } from './files/entities/file.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: () => ({
        dialect: 'sqlite',
        storage: './database.sqlite',
        models: [User, File],
        autoLoadModels: true,
        synchronize: false,
      }),
    }),
    RateLimiterModule.register({ // Change forRoot to register
      points: 10,
      duration: 60,
      keyPrefix: 'global',
    }),
    AuthModule,
    FilesModule,
    JobsModule,
  ],
})
export class AppModule {}