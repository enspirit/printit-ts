import chai from 'chai';
import { expect } from 'chai';
import sinonChai from 'sinon-chai';
chai.use(sinonChai);

import { WeasyprintParams } from '../../../src/lib/Weasyprint';

describe('WeasyprintParams#toArgs', () => {

  it('works', () => {
    const wsp = new WeasyprintParams({ m: 'print' });
    expect(wsp.toArgs()).to.eql(['-m', 'print', '-', '-']);
  });

  it('supports arrays', () => {
    const wsp = new WeasyprintParams({ s: ['one.css', 'two.css'] });
    expect(wsp.toArgs()).to.eql(['-s', 'one.css', '-s', 'two.css', '-', '-']);
  });

});
