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
import Compromisso from "./compromisso";
export enum TipoParticipação {
  ASSINANTE = "Assinante",
  MODERADOR = "Moderador",
  COLABORADOR = "colaborador",
}
@Entity()
export default class MembroCanal extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: "enum", enum: TipoParticipação })
  tipo_participação: TipoParticipação;
  @Column()
  data_entrada: number;
  @Column({ type: "date" })
  data_nascimento: Date;
  @Column()
  telefone: string;
  @OneToMany(() => Compromisso, (compromisso) => compromisso.membro_canal)
  compromissos: Compromisso[];
  @OneToOne(() => Usuário, (usuário) => usuário.membro_canal, {
    onDelete: "CASCADE",
  })
  @JoinColumn()
  usuário: Usuário;
}
