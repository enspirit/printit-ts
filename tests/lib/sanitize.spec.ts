import chai from 'chai';
import { expect } from 'chai';
import sinonChai from 'sinon-chai';
chai.use(sinonChai);

import sanitize from '../../src/lib/sanitize';

describe('sanitize', () => {
  it('works', () => {
    const got = sanitize('<p>Hello</p>');
    expect(got).to.eql('<p>Hello</p>');
  });

  it('allows links to images', () => {
    const got = sanitize('<img src="https://klaro.cards/logo.png">');
    expect(got).to.eql('<img src="https://klaro.cards/logo.png" />');
  });

  it('disallow style attributes', () => {
    const got = sanitize('<p style="font-size: 12px">Hello</p>');
    expect(got).to.eql('<p>Hello</p>');
  });

  it('disallow file:// hrefs', () => {
    const got = sanitize('<img src="file:///etc/password">Hello');
    expect(got).to.eql('<img />Hello');
  });

  it('disallow <script> tags', () => {
    const got = sanitize('<script src="somewhere.js">Inside</script>Hello');
    expect(got).to.eql('Hello');
  });

  it('strips the whole content but the body', () => {
    const got = sanitize('<html><head><script src="somewhere.js">Inside</script></head><body>Hello</body></html>');
    expect(got).to.eql('Hello');
  });
});
