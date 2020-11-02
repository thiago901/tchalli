import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import Product from '@modules/products/infra/typeorm/entities/Product';

@Entity('stock')
class Stock {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  amount: number;

  @Column('double precision')
  price: number;

  @Column('boolean', { default: true })
  availability?: boolean;

  @Column('uuid')
  product_id: string;

  @OneToOne(() => Product, product => product)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @CreateDateColumn()
  @Exclude()
  created_at: Date;

  @UpdateDateColumn()
  @Exclude()
  updated_at: Date;
}

export default Stock;
