import Web3Token from "web3-token";
import User from "../models/userModel.js";

export const verify = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      res.status(401).json({
        status: "failed",
        message: "token is not specified",
      });
    }

    const { address, body } = Web3Token.verify(token);
    req.user = await User.findOne({ account: address });

    next();
  } catch (error) {}
};
