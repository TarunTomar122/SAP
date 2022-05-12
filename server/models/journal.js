const journal = (sequelize, DataTypes) => {
    const Journal = sequelize.define("journal", {
        answers: {
            type: DataTypes.ARRAY(DataTypes.TEXT),
            allowNull: false,
            defaultValue: [],
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    });
    return Journal;
};

export default journal;
