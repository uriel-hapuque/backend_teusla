import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn} from "typeorm"
import { Station } from "./station.entity";

@Entity("sensors")
export class Sensor{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "varchar", length: 50 })
    name: string;
  
    @Column({ type: "varchar", length: 50})
    value: string;
  
    @CreateDateColumn({ type: "timestamp without time zone"})
    createdAt: Date;

    @ManyToOne(() => Station, (station) => station.sensors, {onDelete: "CASCADE"})
    @JoinColumn({name: "stationName"})
    station: Station;
}