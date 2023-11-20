import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn} from "typeorm"
import { Station } from "./station.entity";

@Entity("sensors")
export class Sensor{
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column({ type: "varchar", length: 50 })
    name: string;
  
    @Column({ type: "float"})
    value: number;
  
    @CreateDateColumn({ type: "date" })
    createdAt: Date | string;

    @ManyToOne(() => Station, (station) => station.sensor, {onDelete: "CASCADE"})
    @JoinColumn()
    station: Station;
}