/*
 * Copyright 2016 Resin.io
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

const m = require('mochainon');
const template = require('../lib/template');

describe('Template', function() {

  describe('.render()', function() {

    it('should be able to render a logic-less template', function() {
      const result = template.render('Hello, {{name}}', {
        name: 'John'
      });

      m.chai.expect(result).to.equal('Hello, John');
    });

    it('should not HTML escape special characters', function() {
      const result = template.render('{{message}}', {
        message: 'Lorem `ipsum` \'dolor\' "sit" @amet@'
      });

      m.chai.expect(result).to.equal('Lorem `ipsum` \'dolor\' "sit" @amet@');
    });

    it('should be able to render a complex template', function() {
      const result = template.render([
        '{{#each items}}',
        '{{this.key}} = {{this.value}}',
        '{{/each}}'
      ].join('\n'), {
        items: [
          {
            key: 'foo',
            value: 'bar'
          },
          {
            key: 'bar',
            value: 'baz'
          },
          {
            key: 'baz',
            value: 'qux'
          }
        ]
      });

      m.chai.expect(result).to.equal([
        'foo = bar',
        'bar = baz',
        'baz = qux',
        ''
      ].join('\n'));
    });

  });

});
