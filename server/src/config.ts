import config from 'config';
import { TypeDbConfig, TypeRPC, TypeServer } from './types';

const rpc_config: TypeRPC = config.get('rpc');
const server_config: TypeServer = config.get('server');

export const db_config: TypeDbConfig = config.get('db');
export const infura_url_mainnet = `https://mainnet.infura.io/v3/${rpc_config.infuraId}`;
export const time_to_request = rpc_config.timeToRequest;
export const { port } = server_config;
