import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import MembroCanal from "./membro-canal";
import CanalYoutube from "./canal-youtube";
@Entity()
export default class Compromisso extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  membro_exclusivo: boolean;
  @Column()
  descrição: string;

  @ManyToOne(
    () => CanalYoutube,
    (canal_youtube) => canal_youtube.compromissos,
    {
      onDelete: "CASCADE",
    }
  )
  canal_youtube: CanalYoutube;
  @ManyToOne(() => MembroCanal, (membro_canal) => membro_canal.compromissos, {
    onDelete: "CASCADE",
  })
  membro_canal: MembroCanal;
}
