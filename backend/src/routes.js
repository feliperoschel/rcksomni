const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');
const { catchErrors } = require('./handlers/errorHandlers');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.get(
  '/ongs',
  catchErrors(OngController.index),
);

routes.post(
  '/ongs',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      whatsapp: Joi.string().required().min(10).max(11),
      city: Joi.string().required(),
      uf: Joi.string().required().length(2),
    }),
  }),
  catchErrors(OngController.create),
);

routes.get(
  '/incidents',
  celebrate({
    [Segments.QUERY]: Joi.object().keys({
      page: Joi.number(),
    }),
  }),
  catchErrors(IncidentController.index),
);

routes.post(
  '/incidents',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      title: Joi.string().required().min(2),
      description: Joi.string().required().min(6),
      value: Joi.number().required().min(1),
    }),
    [Segments.HEADERS]: Joi.object().keys({
      authorization: Joi.string().required().min(1),
    }).unknown(),
  }),
  catchErrors(IncidentController.create),
);

routes.delete(
  '/incidents/:id',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().required(),
    }),
  }),
  catchErrors(IncidentController.delete),
);

routes.get(
  '/profile',
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
  }),
  catchErrors(ProfileController.index),
);

routes.post(
  '/sessions',
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
  }),
  catchErrors(SessionController.create),
);

module.exports = routes;
