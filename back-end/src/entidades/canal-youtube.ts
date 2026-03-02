import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import GeradorConteúdo from "./gerador-conteúdo";
import Compromisso from "./compromisso";
export enum PúblicoPrincipal {
  INFANTIL = "Infantil",
  ADOLECENTES = "Adolecentes",
  ADULTO = "Adulto",
  FAMÍLIAS = "Famílias",
}
@Entity()
export default class CanalYoutube extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  nome: string;
  @Column({ type: "enum", enum: PúblicoPrincipal })
  público_principal: PúblicoPrincipal;
  @Column({ type: "date" })
  data_criação: Date;
  @Column()
  número_inscritos: number;
  @Column()
  monetizado: boolean;
  @ManyToOne(
    () => GeradorConteúdo,
    (gerador_conteúdo) => gerador_conteúdo.canal_youtube,
    {
      onDelete: "CASCADE",
    }
  )
  gerador_conteúdo: GeradorConteúdo;
  @OneToMany(() => Compromisso, (compromisso) => compromisso.canal_youtube)
  compromissos: Compromisso[];
}
