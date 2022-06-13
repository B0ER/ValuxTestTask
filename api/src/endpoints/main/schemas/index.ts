
export const inputSchema = {
  body: {
    type: 'object',
    properties: {
      number: {
        type: 'number',
      },
    },
  },
  response: {
    200: {
      type: 'object',
      properties: {
        ticket: {
          type: 'number',
        },
      },
    },
  }
};

export const outputSchema = {
  querystring: {
    type: 'object',
    properties: {
      ticket: {
        type: 'number',
      },
    },
  },
  response: {
    200: {
      type: 'object',
      properties: {
        fibonacci: {
          type: 'number',
        },
      },
    },
    404: {
      type: 'object',
      properties: {
        status: {
          type: 'string',
        },
      },
    },
  },
};
