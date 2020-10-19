import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import Orphanege from './Orphanege'; 

@Entity('images')
export default class Image {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    path: string;

    @ManyToOne(()=> Orphanege, orphanege => orphanege.images)
    @JoinColumn({name:'orphanege_id'})
    orphanege: Orphanege;
}