const Sequelize = require('sequelize')

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        comment: {
          type: Sequelize.STRING(100),
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
        modelName: 'Comment',
        tableName: 'comments',
        paranoid: false,
        // utf8mb4 이모티콘 사용가능
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      },
    )
  }

  static associate(db) {}
}
