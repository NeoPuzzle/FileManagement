import { Body, Controller, Post } from "@nestjs/common";
import { FilesService } from "./files.service";
import { CreateFileDto } from "./files.dto";
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
}