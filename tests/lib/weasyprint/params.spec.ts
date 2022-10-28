import chai from 'chai';
import { expect } from 'chai';
import sinonChai from 'sinon-chai';
chai.use(sinonChai);

import { WeasyprintParams } from '../../../src/lib/Weasyprint';

describe('WeasyprintParams#toArgs', () => {
  const wsp = new WeasyprintParams({ m: 'print' });

  it('works', () => {
    expect(wsp.toArgs()).to.eql(['-m print', '-', '-']);
  });
});
