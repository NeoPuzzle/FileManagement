import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Files } from "./files.entity";
import { Repository } from "typeorm";
import { CreateFileDto, UpdateFileDto } from "./files.dto";

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

    async updateFiles(id: string, updateFileDto: UpdateFileDto): Promise<Files> {
        const file = await this.filesRepository.findOne({where: {id}});
        if (file){
            Object.assign(file, updateFileDto);
            return this.filesRepository.save(file);
        }
        return null;
    }

    async deleteFile(id: string): Promise<void> {
        await this.filesRepository.delete(id);
    }

    async calculateAccumulated() {
        const files = await this.filesRepository.find();
        const totalWeight = files.reduce((sum, file) => sum + file.weight, 0)
        const totalQuantity = files.reduce((sum, file) => sum + file.quantity, 0)
        return { totalWeight, totalQuantity };
    }
}