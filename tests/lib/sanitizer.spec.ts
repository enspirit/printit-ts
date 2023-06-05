import chai from 'chai';
import { expect } from 'chai';
import sinonChai from 'sinon-chai';
chai.use(sinonChai);

import sanitizer from '../../src/lib/sanitizer';

describe('sanitizer', () => {
  describe('#sanitize', () => {

    it('works', () => {
      const got = sanitizer.sanitize('<p>Hello</p>');
      expect(got).to.eql('<p>Hello</p>');
    });

    it('allows links to images', () => {
      const got = sanitizer.sanitize('<img src="https://klaro.cards/logo.png">');
      expect(got).to.eql('<img src="https://klaro.cards/logo.png" />');
    });

    it('disallow style attributes', () => {
      const got = sanitizer.sanitize('<p style="font-size: 12px">Hello</p>');
      expect(got).to.eql('<p>Hello</p>');
    });

    it('disallow file:// hrefs', () => {
      const got = sanitizer.sanitize('<img src="file:///etc/password">Hello');
      expect(got).to.eql('<img />Hello');
    });

    it('disallow <script> tags', () => {
      const got = sanitizer.sanitize('<script src="somewhere.js">Inside</script>Hello');
      expect(got).to.eql('Hello');
    });

    it('strips the whole content but the body', () => {
      const got = sanitizer.sanitize('<html><head><script src="somewhere.js">Inside</script></head><body>Hello</body></html>');
      expect(got).to.eql('Hello');
    });
  });
});
