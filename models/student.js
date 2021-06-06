/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('extractedFields', {
      id: {
        field:'id',
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: true
      },
      dob: {
        type: DataTypes.DATE,
        allowNull: true
      } ,
      comments: {
        type: DataTypes.STRING,
        allowNull: true
      },
      course: {
        type: DataTypes.STRING,
        allowNull: true
      },
      terms: {
        type: DataTypes.STRING,
        allowNull: true
      }
    }, {
      tableName: 'student',
      schema:'document_schema',
      timestamps:false
    });
  };
  