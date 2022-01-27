const notification = (sequelize, DataTypes) => {
    const Notification = sequelize.define("notification", {
        exactTime: {
            type: DataTypes.STRING,
        },
        title: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.TEXT,
        },
    });

    return Notification;
};

export default notification;
