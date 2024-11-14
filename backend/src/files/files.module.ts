import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Files } from "./files.entity";
import { FilesService } from "./files.service";
import { FilesController } from "./files.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([Files])
    ],
    providers: [FilesService],
    controllers: [FilesController],
})

export class FilesModule {}