export default interface ICreateSaleDTO {
  amount: number;
  price: number;
  type: 'Boleto' | 'Dinheiro' | 'Credito';
}
