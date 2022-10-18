import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity()
export class HealthChk {
  @PrimaryGeneratedColumn('uuid')
  public id!: string

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt!: Date

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt!: Date
}
