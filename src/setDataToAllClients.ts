import { clients } from "./db";

const setDataToAllClients = (message: string) => {
  clients.forEach(function each(client) {
    client.send(message);
  });
};

export default setDataToAllClients;
