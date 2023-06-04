import Web3Token from "web3-token";

export const generateAuthToken = async (signer, account) => {
  const token = await Web3Token.sign(
    async (msg) => await signer.signMessage(msg, account.toLowerCase(), "1d"),
    "1d"
  );

  return token;
};
