import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { FilesService } from '../files/files.service';
import { InjectModel } from '@nestjs/sequelize';
import { File } from '../files/entities/file.entity';
import * as crypto from 'crypto';
import * as fs from 'fs/promises';

@Processor('file-processing')
export class FileProcessor {
  constructor(
    private filesService: FilesService,
    @InjectModel(File)
    private fileModel: typeof File,
  ) {}

  @Process('process-file')
  async processFile(job: Job<{ fileId: number }>) {
    const { fileId } = job.data;
    try {
      await this.filesService.updateFileStatus(fileId, 'processing');
      const file = await this.fileModel.findByPk(fileId);
      if (!file) {
        throw new Error('File not found');
      }
      const fileContent = await fs.readFile(file.storagePath);
      const hash = crypto.createHash('sha256').update(fileContent).digest('hex');
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate processing
      await this.filesService.updateFileStatus(fileId, 'processed', `SHA256: ${hash}`);
    } catch (error) {
      await this.filesService.updateFileStatus(fileId, 'failed', `Error: ${error.message}`);
      throw error;
    }
  }
}