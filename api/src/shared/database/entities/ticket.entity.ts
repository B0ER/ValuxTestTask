import mongoose from 'mongoose';

export namespace Ticket {
  export interface Entity {
    ticket: number;
    inputValue: number;
    outputValue: number | null;
  }

  export type Document = Entity & mongoose.Document;

  export const collectionName = 'tickets';

  export const schema = new mongoose.Schema<Entity>({
    ticket: {
      type: Number,
      required: true,
    },
    inputValue: {
      type: Number,
      required: true,
    },
    outputValue: {
      type: Number,
      default: null,
    },
  });

  export const model = mongoose.model<Entity>(collectionName, schema);
}
