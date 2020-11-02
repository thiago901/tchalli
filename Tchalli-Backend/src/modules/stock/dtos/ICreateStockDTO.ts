export default interface ICreateStockDTO {
  amount: number;
  price: number;
  availability?: boolean;
  product_id: string;
}
