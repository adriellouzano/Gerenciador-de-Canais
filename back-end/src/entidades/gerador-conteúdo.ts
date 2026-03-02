import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import Usuário from "./usuário";
import CanalYoutube from "./canal-youtube";
export enum Especialidade {
  JOGOS = "jogos",
  VLOGS = "vlogs",
  TECNOLOGIA = "tecnologia",
  EDUCAÇÃO = "educação",
  ARTE = "arte",
  MÚSICA = "música",
  CÚLINARIA = "cúlinaria",
  AGRICULTURA = "agricultura",
}
@Entity()
export default class GeradorConteúdo extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: "enum", enum: Especialidade })
  especialidade: Especialidade;
  @Column()
  anos_experiência: number;
  @OneToMany(
    () => CanalYoutube,
    (canal_youtube) => canal_youtube.gerador_conteúdo
  )
  canal_youtube: CanalYoutube[];
  @OneToOne(() => Usuário, (usuário) => usuário.gerador_conteúdo, {
    onDelete: "CASCADE",
  })
  @JoinColumn()
  usuário: Usuário;
}
