import { IsDecimal } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity({
    name: 'files'
})

export class Files {
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column(IsDecimal)
    weight: number;

    @Column()
    type: string;

    @Column()
    quantity: number;

}