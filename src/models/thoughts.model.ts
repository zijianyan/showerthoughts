// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
import { Sequelize, DataTypes, Model } from 'sequelize';
import { Application } from '../declarations';
import { HookReturn } from 'sequelize/types/lib/hooks';

export default function (app: Application): typeof Model {
  const sequelizeClient: Sequelize = app.get('sequelizeClient');
  const thoughts = sequelizeClient.define('thoughts', {
    text: {
      type: DataTypes.STRING,
      allowNull: false
    },
    publish: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    twitterId: {
      type: DataTypes.STRING
    },
    author: {
      type: DataTypes.STRING
    },
  }, {
    hooks: {
      beforeCount(options: any): HookReturn {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (thoughts as any).associate = function (models: any): void {
    // Define associations here
    // See https://sequelize.org/master/manual/assocs.html
  };

  return thoughts;
}
