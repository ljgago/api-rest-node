import { Client } from '../core/entities/client.entity';
import { ClientRepository } from '../core/repositories/client.repository';

export class ClientDatasourceMock implements ClientRepository {
  private clients: Client[];

  constructor(clients: Client[]) {
    this.clients = clients;
  }

  findAll = async () => {
    console.log("All clients:", this.clients);
    return this.clients;
  }

  findByID = async (id: number) => {
    const client = this.clients.find((client) => client.id == id);
    console.log("Client:", id, client);
    return client;
  }

  save = async (client: Client) => {
    console.log("Client saved:", client);
  }

  update = async (id: number, client: Client) => {
    console.log("Client updated", client);
  }

  delete = async (id: number) => {
    console.log(`Client ${id} deleted`)
  }
}

export const ProviderClientDatasourceMock = (clients: Client[]): ClientDatasourceMock => {
  return new ClientDatasourceMock(clients);
}

