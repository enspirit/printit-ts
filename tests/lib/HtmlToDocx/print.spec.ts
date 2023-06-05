import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';

import HTMLtoDOCX from 'html-to-docx';

chai.use(chaiAsPromised);

describe('HTMLtoDOCX', () => {
  it('works fine', async () => {
    const p = HTMLtoDOCX('<h1>Hello</h1>','',{
    });

    expect(p).to.be.an.instanceof(Promise);
    const buffer = await p;
    await expect(buffer).to.be.an.instanceof(Buffer);
    expect(buffer.toString()).to.have.length.greaterThan(0);
  });
});
