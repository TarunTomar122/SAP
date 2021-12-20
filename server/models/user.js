const user = (sequelize, DataTypes) => {
    const User = sequelize.define("user", {
        notificationToken: {
            type: DataTypes.STRING,
            unique: true
        },
        userType: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
    return User;
}

export default user;
