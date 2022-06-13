
export interface inputSchema {
  body: {
    number: number;
  }
}

export const inputSchema = {
  body: {
    type: 'object',
    properties: {
      number: {
        type: 'number',
        minimum: 1,
        maximum: 200,
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


// better to separate this file
export interface outputSchema {
  querystring: {
    ticket: number;
  }
}

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
