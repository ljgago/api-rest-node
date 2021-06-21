import { Response, Request } from 'express';

import { Client } from '../core/entities/client.entity';
import { ClientService } from '../core/services/client.service';

export class ClientController {
  clientService: ClientService;

  constructor(clientService: ClientService) {
    this.clientService = clientService;
  }

  listClients = async (_req: Request, res: Response) => {
    const clients = await this.clientService.findAll();
    res.json(clients);
  }

  getClient = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const client = await this.clientService.findByID(id);

    if (client == undefined) {
      // 404 Not Found
      return res.sendStatus(404);
    }

    res.json(client);
  }

  createClient = async (req: Request, res: Response) => {
    // TODO: validate fields
    const { id, name, email } = req.body;

    if (!(id && name && email)) {
      console.log("Missing paramters");
      return res.sendStatus(405);
    }

    const client: Client = {
      id: parseInt(id as string),
      name: name as string,
      email: email as string,
    };

    await this.clientService.save(client);

    // 201 Created
    res.sendStatus(201)
  }

  updateClient = async (req: Request, res: Response) => {
    // TODO: validate fields
    const id_ = parseInt(req.params.id);
    const { id, name, email } = req.body;

    if (!(id && name && email)) {
      console.log("Missing paramters");
      return res.sendStatus(405);
    }

    const client: Client = {
      id: parseInt(id as string),
      name: name as string,
      email: email as string,
    };

    await this.clientService.update(id_, client);

    // 200 OK
    res.sendStatus(200)
  }

  deleteClient = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    await this.clientService.delete(id);

    res.sendStatus(200)
  }
}

export const ProviderClientController = (clientService: ClientService): ClientController => {
  return new ClientController(clientService);
}
