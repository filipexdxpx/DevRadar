const { Router } = require('express');
const routes = Router();
const DevController  =  require('./controller/DevController');
const SearchController  =  require('./controller/SearchController');

/*Retorno do servidor ao acessar a aplicação. Isso é uma rota
  TIPOS DE PARAMETROS:
    QueryParams: request.query(filtros, ordenação e paginação)
    RoutParams: request.params(identificar um recurso na alteração ou remoção)
    Body:  request.body(dados para criação e ou alteração de um registro)
 */

routes.post('/devs', DevController.store);
routes.delete('/devs', DevController.destroy);
routes.get('/devs', DevController.index);
routes.put('/devs', DevController.update);

routes.get('/search', SearchController.index)
module.exports =  routes;