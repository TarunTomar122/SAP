const reminder = (sequelize, DataTypes) => {
    const Reminder = sequelize.define("reminder", {
        intervalId: {
            type: DataTypes.INTEGER,
        },
        title: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.TEXT,
        },
        timeInterval: {
            type: DataTypes.STRING,
        },
        permanent: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        }
    });

    return Reminder;
};

export default reminder;
