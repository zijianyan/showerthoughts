import { HooksObject } from '@feathersjs/feathers';

const { TwitterApi } = require('twitter-api-v2');

const twitterClient = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_KEY_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET
})

const rwClient = twitterClient.readWrite

const publish = async (context:any) => {
  const { data } = context
  if (data.publish === true) {
    console.log('publishing')

  }
  return context;
}

const addCreatedTimestamp = (context:any) => { // may be worth adding timestamps via Sequelize instead of as a FeathersJS hook
  context.data.createdAt = Date.now()
  return context
}

const addUpdatedTimestamp = (context:any) => { // may be worth adding timestamps via Sequelize instead of as a FeathersJS hook
  context.data.updatedAt = Date.now()
  return context
}

export default {
  before: {
    all: [],
    find: [],
    get: [],
    create: [addCreatedTimestamp],
    update: [addUpdatedTimestamp],
    patch: [addUpdatedTimestamp],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [publish],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
