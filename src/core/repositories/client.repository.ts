import { Client } from "../entities/client.entity";

export interface ClientRepository {
  findAll(): Promise<Client[] | undefined>;
  findByID(id: number): Promise<Client | undefined>;
  save(client: Client): Promise<void>;
  update(id: number, client: Client): Promise<void>;
  delete(id: number): Promise<void>;
}
