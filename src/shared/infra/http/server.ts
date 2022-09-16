import { env } from '@config/env';

import { serverHttp } from './app';

const port = env.port;

serverHttp.listen(port, () => console.log(`Servidor ativo na porta ${port}.`));
