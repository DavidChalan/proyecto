import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Contract {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: string; // coche o casa

  @Column()
  webViewLink: string;

  @CreateDateColumn()
  createdAt: Date;
}

