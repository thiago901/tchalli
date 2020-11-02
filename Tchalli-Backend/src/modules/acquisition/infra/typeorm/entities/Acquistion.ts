import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

import Product from '@modules/products/infra/typeorm/entities/Product';

@Entity('acquisitions')
class Acquistion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  amount: number;

  @Column('double precision')
  cost_price: number;

  @Column()
  product_id: string;

  @ManyToOne(() => Product, product => product)
  @JoinColumn({ name: 'product_id' })
  products: Product;

  @CreateDateColumn()
  @Exclude()
  created_at: Date;

  @UpdateDateColumn()
  @Exclude()
  updated_at: Date;
}

export default Acquistion;
