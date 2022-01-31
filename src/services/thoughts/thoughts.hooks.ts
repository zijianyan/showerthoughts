import { HooksObject } from '@feathersjs/feathers';
import { HookContext } from '@feathersjs/feathers';

const { TwitterApi } = require('twitter-api-v2');

const twitterClient = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_KEY_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

const rwClient = twitterClient.readWrite;

const publish = async (context:HookContext) => {
  const { data } = context;
  if (data.publish === true) {
    const tweet = await rwClient.v1.tweet(`${data.text} ${Date.now()}`);
    context.data.tweetId = tweet.id_str;
    const url = `https://twitter.com/${context.data.author}/status/${context.data.tweetId}`;
    context.data.url = url;
    return context;
  } else {
    return context;
  }
};

const unpublish = async (context:HookContext) => {
  try {
    if (context.result.tweetId !== null) {
      const deletedTweet = await rwClient.v1.deleteTweet(context.result.tweetId);
      return context;
    } else {
      return context;
    } 
  }
  catch(error) {
    console.log('unpublish error:', error);
  }
};

const addCreatedTimestamp = (context:HookContext) => {
  context.data.createdAt = Date.now();
  return context;
};

const addUpdatedTimestamp = (context:HookContext) => {
  context.data.updatedAt = Date.now();
  return context;
};

export default {
  before: {
    all: [],
    find: [],
    get: [],
    create: [publish, addCreatedTimestamp],
    update: [addUpdatedTimestamp],
    patch: [addUpdatedTimestamp],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [unpublish]
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
