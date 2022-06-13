import { Ticket } from '../../shared/database';
import { redis } from '../../shared/libraries';

export class MainService {

  async Input(number: number) {
    const lastTicket = await Ticket.model.findOne({}, {}, { limit: 1, sort: { ticket: -1 } });

    const newTicket = new Ticket.model({ inputValue: number, ticket: lastTicket ? lastTicket.ticket + 1 : 1 });

    await redis.connect();
    await redis.set(`tickets.${newTicket.ticket}`, newTicket.inputValue);
    await redis.disconnect();

    await newTicket.save();

    return { ticket: newTicket.ticket };
  }

  async Output(ticket: number) {
    const foundTicket = await Ticket.model.findOne({ ticket: ticket, outputValue: { $ne: null } });
    if (!foundTicket) {
      // better to create own exception
      throw new Error('Ticket was not found or in process!');
    }

    return { fibonacci: foundTicket.outputValue };
  }
}
