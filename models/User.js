const User = (sequelize, Sequelize) => {
  const user = sequelize.define("user", {
    id: {
      type: Sequelize.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      unique: {
        args: true,
        msg: "ID already in use!",
      },
    },
    name: {
      type: Sequelize.STRING(50),
      allowNull: true,
    },
    username: {
      type: Sequelize.STRING(255),
      allowNull: false,
      unique: {
        args: true,
        msg: "username already exist!",
      },
    },
    email: {
      type: Sequelize.STRING(255),
      allowNull: true,
      isEmail: {
        args: true,
        msg: "Please enter valid email",
      },
    },
    password: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    profilePic: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },
    coverPic: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },
    age: {
      type: Sequelize.INTEGER,
      allowNull: true, 
    }
  });
  return user;
};

export default User;
