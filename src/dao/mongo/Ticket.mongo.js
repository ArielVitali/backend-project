import ticketModel from "../mongo/models/Ticket.models.js";

class TicketDAO {
  constructor() {}

  async createTicket(ticketData) {
    try {
      const response = await ticketModel.create(ticketData);
      return response;
    } catch (error) {
      return error;
    }
  }
}

export default TicketDAO;
