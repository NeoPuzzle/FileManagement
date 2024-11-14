import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

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