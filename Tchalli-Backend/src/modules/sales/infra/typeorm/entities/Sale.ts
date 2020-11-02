import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import SaleDetail from '@modules/salesDetail/infra/typeorm/entities/SaleDetail';

@Entity('sales')
class Sale {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  amount: number;

  @Column('double precision')
  price: number;

  @Column()
  type: string;

  @OneToMany(() => SaleDetail, salesDetail => salesDetail.sale)
  saleDetail: SaleDetail[];

  @CreateDateColumn()
  @Exclude()
  created_at: Date;

  @UpdateDateColumn()
  @Exclude()
  updated_at: Date;
}

export default Sale;
