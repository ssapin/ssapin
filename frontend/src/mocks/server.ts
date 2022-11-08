import { setupServer, SetupServerApi } from "msw/node";
import { handlers } from "./handlers";

export const server: SetupServerApi = setupServer(...handlers);
