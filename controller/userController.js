import User from "../models/userModel.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json({
      status: "Success",
      users,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: "internal server error",
    });
  }
};

export const createUser = async (req, res) => {
  const account = req.body.account;
  try {
    if (account) {
      const user = await User.findOne({ account: account });

      if (!user) {
        const newUser = await User.create({ account: account });

        res.status(200).send({
          status: "success",
          message: "User created successfully",
        });
      } else {
        res.status(200).send({
          status: "failed",
          message: "User alrealdy exist",
        });
      }
    } else {
      res
        .status(500)
        .json({ status: "failed", message: "User account not specified" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ status: "failed", message: "Internal Server Error" });
  }
};

export const getSingleUser = async (req, res) => {
  const account = req.params.account;

  try {
    if (account) {
      const user = await User.findOne({ account });

      res.status(200).json({
        status: "Success",
        user,
      });
    } else {
      res.status(200).json({
        status: "Success",
        messsage: "account does not match with user account",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: "internal server error",
    });
  }
};

export const updateUser = async (req, res) => {
  const { username, bio, image, banner, email } = req.body;
  const account = req.params.account;
  try {
    if (req.user.account === account) {
      if (account) {
        const updatedUser = await User.findOneAndUpdate(
          { account: account },
          { username, bio, image, banner, email },
          {
            new: true,
            runValidators: true,
          }
        );

        res.status(200).send({
          status: "success",
          message: "User updated successfully",
        });
      }
    } else {
      res
        .status(400)
        .json({ status: "failed", message: "User account not specified" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ status: "failed", message: "Internal Server Error" });
  }
};

export const deleteUser = (req, res) => {
  res.status(200).json({
    message: "successfully User deleted",
  });
};
