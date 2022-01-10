const todo = (sequelize, DataTypes) => {
    const Todo = sequelize.define("todo", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false
        },
    })
    return Todo;
}

export default todo;
