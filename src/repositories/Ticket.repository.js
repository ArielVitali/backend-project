class TicketRepository {
  constructor(dao) {
    this.dao = dao;
  }

  async createTicket(data) {
    try {
      const response = await this.dao.createTicket(data);
      return response;
    } catch (error) {
      throw error;
    }
  }
}

export default TicketRepository;
