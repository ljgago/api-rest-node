import express from 'express';

// import { Client } from './core/entities/client.entity';
// import ClientJSON from './clients.json';
// import { ClientEntity } from './datasources/client.datasource.db';
// import { ProviderClientDatasourceMock } from './datasources/client.datasource.mock';

import { ProviderClientDatasourceDB } from './datasources/client.datasource.db';
import { ProviderClientService } from './core/services/client.service';
import { ProviderClientController } from './controllers/client.controller';

// Inyecto las dependencias de las diferentes capas
// const clientRepository = ProviderClientDatasourceMock(ClientJSON as Client[])
const clientRepository = ProviderClientDatasourceDB()
const clientService = ProviderClientService(clientRepository)
const clientController = ProviderClientController(clientService);

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/clients', clientController.listClients);
app.get('/clients/:id', clientController.getClient);
app.post('/clients', clientController.createClient);
app.put('/clients/:id', clientController.updateClient);
app.delete('/clients/:id', clientController.deleteClient);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("The application is listening on port", port);
})
