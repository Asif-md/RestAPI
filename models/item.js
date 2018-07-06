module.exports = (sequelize, DataTypes) => {
    const Item = sequelize.define('Item',{
        name : {
            type: DataTypes.STRING,
            allowNull : false
        }, 
        price : {
            type: DataTypes.DECIMAL,
            allowNull: false
        },

        category : {
            type: DataTypes.STRING
        }
    });

    return Item;
}; 