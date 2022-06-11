const Sequelize = require('sequelize')

// static init(db.sequelize) { 테이블에 관한 설정
//  return super.init( {테이블 컬럼에 대한 설정} , {테이블 자체에 대한 설정} )
// }
// static associate(db) { 다른 모델과의 관계 }
module.exports = class User extends Sequelize.Model {
  // static init(sequelize):
  static init(sequelize) {
    return super.init(
      {
        name: {
          type: Sequelize.STRING(20),
          allowNull: false,
          unique: true,
        },
        age: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
        },
        married: {
          type: Sequelize.BOOLEAN,
          allowNull: true,
        },
        comment: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: 'User',
        tableName: 'users',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      },
    )
  }

  static associate(db) {}
}
