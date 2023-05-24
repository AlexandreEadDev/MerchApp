import bcrypt from "bcryptjs";

const users = [
  {
    name: "Alexandre",
    email: "alexandre.gerard.dev@gmail.com",
    password: bcrypt.hashSync("nameless", 10),
    isAdmin: true,
  },
  {
    name: "Louis",
    email: "louis.gerard.acc@gmail.com",
    password: bcrypt.hashSync("12345678", 10),
  },
];

export default users;
