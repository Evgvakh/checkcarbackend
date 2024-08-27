import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import User from "../DB/models/User.js";

export const addUser = async (req, res) => {
  const userCheck = await User.find({ user: req.body.user })
  if (userCheck.length == 0) {
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const userDocument = new User({
      user: req.body.user,
      password: hashPassword,
      access: req.body.access
    })

    const data = await userDocument.save()
    res.status(200).json(data)
  } else { res.json('User exists') }
}

export const adminLogin = async (req, res) => {
  const user = await User.findOne({ user: req.body.user })

  if (!user) {
    return res.json({ errorMessage: "No such user or the password is invalid" })
  }
  const token = jwt.sign(
    {
      id: user._id,
      role: user.access
    },
    "OkCheckCarToken",
    {
      expiresIn: "24h"
    }
  )

  const isValidPass = await bcrypt.compare(
    req.body.password,
    user.password
  )

  if (isValidPass) {
    res.status(200).send({ userData: { id: user._id, username: user.user, role: user.access }, token })
  } else { return res.json({ errorMessage: "No such user or the password is invalid" }) }
}