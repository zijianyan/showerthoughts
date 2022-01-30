import { HooksObject } from '@feathersjs/feathers';


const credentials = {
  consumer_key:         process.env.TWITTER_API_KEY,
  consumer_secret:      process.env.TWITTER_API_KEY_SECRET,
  access_token:         process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret:  process.env.TWITTER_ACCESS_TOKEN_SECRET
}


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
