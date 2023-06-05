import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import sanitizer from '../../../src/lib/sanitizer';
import printRoute from '../../../src/api/routes/print';
import { NextFunction, Request, Response } from 'express';
import { Config, Converter, Handler } from '../../../src/types';

chai.use(sinonChai);
chai.use(chaiAsPromised);

describe.only('the print api route handler', () => {

  let fakeHandler: Handler;
  let config: Partial<Config>;
  let req: Partial<Request>, res: Partial<Response>, next: NextFunction;
  let sanitize: any;
  let fakeConverter: any;

  afterEach(() => {
    sanitize.restore();
  });

  beforeEach(() => {
    sanitize = sinon.spy(sanitizer, 'sanitize');
    fakeConverter = sinon.stub();
    fakeHandler = {
      accepts: sinon.stub().returns(true),
      getConverter: sinon.stub().returns(fakeConverter),
    };
    config = {
      handlers: [
        fakeHandler,
      ],
    };
    req = {
      accepts: sinon.stub().returns(true),
      body: {
        html: '<h1>foo bar</h1>',
      },
      config: config as Config,
    };
    res = {
      setHeader: sinon.stub(),
      status: sinon.stub(),
      sendStatus: sinon.stub(),
      send: sinon.stub(),
    };
    next = sinon.stub() as any;
  });

  it('returns a promise', () => {
    const p = printRoute(req as Request, res as Response, next as NextFunction);
    expect(p).to.be.an.instanceOf(Promise);
  });

  it('fails with 400 when request body is invalid', async () => {
    delete req.body.html;
    await printRoute(req as Request, res as Response, next as NextFunction);
    expect(res.sendStatus).to.be.calledOnceWith(400);
  });

  it('interrogates handlers to find the appropriate one', async () => {
    await printRoute(req as Request, res as Response, next as NextFunction);
    expect(fakeHandler.accepts).to.be.calledOnceWith(req);
  });

  it('fails with 415 when not finding an appropriate handler', async () => {
    config.handlers = [];
    await printRoute(req as Request, res as Response, next as NextFunction);
    expect(res.sendStatus).to.be.calledOnceWith(415);
  });

  it('calls sanitize on every input', async () => {
    await printRoute(req as Request, res as Response, next as NextFunction);
    expect(sanitize).to.be.calledOnceWith(req.body.html);
  });

  // TODO: improve and mock sanitizer.sanitize to control what is returned
  // and potentially error management
  it('passes the sanitized input to the converters', async () => {
    req.body.html = '<p style="background: red">Foo</p>';
    await printRoute(req as Request, res as Response, next as NextFunction);
    expect(fakeConverter).to.be.calledOnceWith({
      html: '<p>Foo</p>',
    });
  });

  it('gets a converter from the handler', async () => {
    await printRoute(req as Request, res as Response, next as NextFunction);
    expect(fakeHandler.getConverter).to.be.calledOnceWith(
      req.config,
      req,
      res,
    );
  });

  it('handles errors when getting a converter and passes them to the error handler', async () => {
    const oops = new Error('oops');
    (fakeHandler.getConverter as any).throws(oops);
    await printRoute(req as Request, res as Response, next as NextFunction);
    expect(next).to.be.calledOnceWith(oops);
  });

  it('handles conversion errors and passes them to the error handler', async () => {
    const oops = new Error('oops');
    fakeConverter.rejects(oops);
    await printRoute(req as Request, res as Response, next as NextFunction);
    expect(next).to.be.calledOnceWith(oops);
  });

  describe('when provided with the optional attachement parameter', () => {

    it('sets the header accordingly', async () => {
      req.body.attachment = 'filename.pdf';
      await printRoute(req as Request, res as Response, next as NextFunction);
      expect(res.setHeader).to.be.calledOnceWith('content-disposition', 'attachment; filename="filename.pdf"');
    });

    it('properly url encode the filename', async () => {
      req.body.attachment = 'très-chère-grand-mère.pdf';
      await printRoute(req as Request, res as Response, next as NextFunction);
      const expectedHeader = `attachment; filename="${encodeURIComponent(req.body.attachment)}"`;
      expect(res.setHeader).to.be.calledOnceWith('content-disposition', expectedHeader);
    });

  });

});
