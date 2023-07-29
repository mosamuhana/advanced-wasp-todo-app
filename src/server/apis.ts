import { RequestHandler, raw } from 'express';
import { MiddlewareConfigFn } from '@wasp/middleware';
import { BarBaz, FooBar, WebhookCallback } from '@wasp/apis/types';

export const fooBar: FooBar = (_req, res, context) => {
  res.json({ msg: `Hello, ${context?.user?.email}!` });
};

export const barBaz: BarBaz = (_req, res, _context) => {
  res.json({ msg: `Hello, stranger!` });
};

export const fooBarMiddlewareFn: MiddlewareConfigFn = (middlewareConfig) => {
  // console.log('fooBarMiddlewareFn: Adding custom middleware for route.')

  const customMiddleware: RequestHandler = (_req, _res, next) => {
    console.log('fooBarMiddlewareFn: custom route middleware');
    next();
  };

  middlewareConfig.set('custom.route', customMiddleware);

  return middlewareConfig;
};

export const barNamespaceMiddlewareFn: MiddlewareConfigFn = (middlewareConfig) => {
  console.log('barNamespaceMiddlewareFn: Ignoring all default middleware.');

  middlewareConfig.set('custom.apiNamespace', (req, _res, next) => {
    console.log(
      `barNamespaceMiddlewareFn: custom middleware (path: ${req.path})`
    );
    next();
  });

  return middlewareConfig;
};

export const webhookCallbackMiddlewareFn: MiddlewareConfigFn = (middlewareConfig) => {
  middlewareConfig.delete('express.json');
  middlewareConfig.set('express.raw', raw({ type: '*/*' }));

  return middlewareConfig;
};

export const webhookCallback: WebhookCallback = (req, res, _context) => {
  res.json({ msg: req.body.length });
};
