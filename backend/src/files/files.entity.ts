import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity({
    name: 'files'
})

export class Files {
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    weight: number;

    @Column()
    type: string;

    @Column()
    quantity: number;

}