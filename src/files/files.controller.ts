import { Controller, Post, UseGuards, UseInterceptors, UploadedFile, Body, Get, Param, Query, ParseIntPipe } from '@nestjs/common';
import { FilesService } from './files.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { ApiTags, ApiBearerAuth, ApiConsumes, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { UploadFileDto } from './dto/uplod-file.dto';

@ApiTags('files')
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Upload a file' })
  @ApiResponse({ status: 200, description: 'File uploaded successfully' })
  async uploadFile(
    @CurrentUser() user: { sub: number },
    @UploadedFile() file: Express.Multer.File,
    @Body() metadata: UploadFileDto,
  ) {
    return this.filesService.uploadFile(user.sub, file, metadata);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get file details' })
  @ApiResponse({ status: 200, description: 'File details' })
  async getFile(
    @CurrentUser() user: { sub: number },
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.filesService.getFile(user.sub, id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'List files with pagination' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async getFiles(
    @CurrentUser() user: { sub: number },
    @Query('page', new ParseIntPipe({ optional: true })) page = 1,
    @Query('limit', new ParseIntPipe({ optional: true })) limit = 10,
  ) {
    return this.filesService.getFiles(user.sub, page, limit);
  }
}