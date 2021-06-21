import { Client } from '../entities/client.entity';
import { ClientRepository } from '../repositories/client.repository';

export class ClientService {
  private clientRepository: ClientRepository;

  constructor(clientRepository: ClientRepository) {
    this.clientRepository = clientRepository;
  }

  findAll = async () => {
    return await this.clientRepository.findAll()
  }

  findByID = async (id: number) => {
    return await this.clientRepository.findByID(id);
  }

  save = async (client: Client) => {
    return await this.clientRepository.save(client);
  }

  update = async (id: number, client: Client) => {
    return await this.clientRepository.update(id, client);
  }

  delete = async (id: number) => {
    return await this.clientRepository.delete(id);
  }
}

export const ProviderClientService = (clientRepository: ClientRepository): ClientService => {
	return new ClientService(clientRepository);
}
