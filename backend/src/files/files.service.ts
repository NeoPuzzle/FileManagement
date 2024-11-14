import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Files } from "./files.entity";
import { Repository } from "typeorm";
import { CreateFileDto } from "./files.dto";

@Injectable()
export class FilesService {
    constructor(
        @InjectRepository(Files) private filesRepository: Repository<Files>,
    ){}

    async createFile(createFileDto: CreateFileDto): Promise<Files> {
        const newFile = this.filesRepository.create(createFileDto);
        return this.filesRepository.save(newFile);
    }
    
    async getFiles(): Promise<Files[]> {
        return this.filesRepository.find();
    }
}