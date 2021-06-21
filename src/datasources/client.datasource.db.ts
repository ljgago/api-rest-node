import "reflect-metadata";
import { Entity, Column, PrimaryColumn, createConnection, ConnectionOptions, Repository } from 'typeorm';

import { Client } from '../core/entities/client.entity';
import { ClientRepository } from '../core/repositories/client.repository';

@Entity()
export class ClientEntity implements Client {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;
}

export class ClientDatasourceDB implements ClientRepository {
  db: Repository<ClientEntity>;

  constructor() {
    this.start()
  }

  start = async () => {
    const options: ConnectionOptions = {
      type: "sqlite",
      database: ":memory:",
      dropSchema: true,
      entities: [ ClientEntity ],
      synchronize: true,
      logging: false
    }

    const connection = await createConnection(options)
    this.db = connection.getRepository(ClientEntity)
  }

  findAll = async () => {
    const clients = await this.db.find();
    return clients;
  }

  findByID = async (id: number) => {
    const client = await this.db.findOne({ id });
    return client;
  }

  save = async (client: Client) => {
    await this.db.save(client);
  }

  update = async (id: number, client: Client) => {
    await this.db.update(id, client);
  }

  delete = async (id: number) => {
    await this.db.delete(id);
  }
}

export const ProviderClientDatasourceDB = (): ClientRepository => {
  return new ClientDatasourceDB();
}

