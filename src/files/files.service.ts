import { Injectable, ForbiddenException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { File } from './entities/file.entity';
import { JobsService } from '../jobs/jobs.service';
import { Op } from 'sequelize';

@Injectable()
export class FilesService {
  constructor(
    @InjectModel(File)
    private fileModel: typeof File,
    private jobsService: JobsService,
  ) {}

  async uploadFile(userId: number, file: Express.Multer.File, metadata: { title?: string; description?: string }) {
    if (!file) {
      throw new BadRequestException('File is required');
    }
    const fileEntity = this.fileModel.build({
      userId,
      originalFilename: file.originalname,
      storagePath: file.path,
      title: metadata.title,
      description: metadata.description,
      status: 'uploaded',
    });
    const savedFile = await fileEntity.save();
    await this.jobsService.addFileProcessingJob(savedFile.id);
    return { fileId: savedFile.id, status: 'uploaded' };
  }

  async getFile(userId: number, fileId: number) {
    const file = await this.fileModel.findOne({ where: { id: fileId, userId } });
    if (!file) {
      throw new ForbiddenException('File not found or access denied');
    }
    return file;
  }

  async getFiles(userId: number, page: number, limit: number) {
    const offset = (page - 1) * limit;
    const { rows: data, count: total } = await this.fileModel.findAndCountAll({
      where: { userId },
      limit,
      offset,
    });
    return { data, meta: { page, limit, total } };
  }

  async getFileById(fileId: number) {
    return this.fileModel.findByPk(fileId);
  }

  async updateFileStatus(fileId: number, status: File['status'], extractedData?: string) {
    await this.fileModel.update({ status, extractedData }, { where: { id: fileId } });
  }
}