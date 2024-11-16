import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";

export class CreateFileDto {
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    weight: number;

    @IsNotEmpty()
    @IsString()
    type: string;

    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    quantity: number;
}

export class UpdateFileDto {
    // @IsOptional()
    // @IsNumber()
    // @Min(0)
    weight?: number;

    // @IsOptional()
    // @IsString()
    type?: string;

    // @IsOptional()
    // @IsNumber()
    // @Min(1)
    quantity?:number;
}