import { Provider, Wallet } from 'fuels';
import { ContractAbi__factory } from './types';

const main = async () => {
  const provider = new Provider('http://0.0.0.0:4000/graphql');
  const wallet = Wallet.fromPrivateKey('0x01', provider);

  const TOKEN_CONTRACT_ID =
    '0x4b4557058e0f8729f47c1f51e17623f1b82cbc17062b79a68e0c86aaebab240f';
  const tokenContract = ContractAbi__factory.connect(TOKEN_CONTRACT_ID, wallet);

  await tokenContract.functions.mint_coins(500, 1).call();

  await tokenContract.functions
    .transfer_coins_to_output(
      200,
      {
        value: TOKEN_CONTRACT_ID,
      },
      {
        value: wallet.address.toB256(),
      }
    )
    .txParams({
      variableOutputs: 1,
    })
    .call();

  console.log((await wallet.getBalance(TOKEN_CONTRACT_ID)).toNumber());
};

main();
