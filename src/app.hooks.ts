// Application hooks that run for every service
// Don't remove this comment. It's needed to format import lines nicely.

const { validate } = require('feathers-hooks-common');

interface Thought {
  text: string;
  author: string;
  publish: boolean;
}

const validateLength = (values:Thought, cb:any) => {
  if (values.text.length > 280) {
    throw new Error('Thoughts must be 280 characters or less');
  }
};

export default {
  before: {
    all: [],
    find: [],
    get: [],
    create: [validate(validateLength)],
    update: [validate(validateLength)],
    patch: [validate(validateLength)],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
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
