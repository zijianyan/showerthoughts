import { HooksObject } from '@feathersjs/feathers';

const Twit = require('twit')

const credentials = {
  consumer_key:         process.env.TWITTER_API_KEY,
  consumer_secret:      process.env.TWITTER_API_KEY_SECRET,
  access_token:         process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret:  process.env.TWITTER_ACCESS_TOKEN_SECRET
}

const twitter = new Twit(credentials)

const publish = async (context:any) => {
  const { data } = context
  if (data.publish === true) {
    console.log('publishing')
    twitter.post('statuses/update', { status: `${data.text} ${Date.now()}`}, (err:any, data:any, response:any) => { console.log('posting to twitter. data:', data)})
  }
  return context;
}

export default {
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
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
