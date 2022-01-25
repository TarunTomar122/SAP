const notification = (sequelize, DataTypes) => {
    const Notification = sequelize.define("notification", {

        isExact: {
            type: DataTypes.BOOLEAN,
        },
        exactTime: {
            type: DataTypes.STRING,
        },
        timeInterval: {
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
