import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { FilesService } from "./files.service";
import { CreateFileDto, UpdateFileDto } from "./files.dto";
import { Files } from "./files.entity";

@Controller('files')
export class FilesController {
    constructor(
        private readonly filesService: FilesService
    ) {}

    @Post()
    async createFile(@Body() createFileDto: CreateFileDto): Promise<Files> {
        return this.filesService.createFile(createFileDto);
    }

    @Get()
    async getFiles(): Promise<Files[]> {
        return this.filesService.getFiles();
    }

    @Put(':id')
    async updateFile(
        @Param('id') id:string,
        @Body() updateFileDto: UpdateFileDto):Promise<Files> {
            return this.filesService.updateFiles(id, updateFileDto);
        }
    
    @Delete(':id')
    async deleteFile(
        @Param('id') id: string): Promise<void> {
        return this.filesService.deleteFile(id);
    }

    @Get('accumulated')
    async calculateAccumulated(){
        return this.filesService.calculateAccumulated();
    }

}