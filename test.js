const assert = require('assert');
const { expect } = require('chai');
const { main, processData } = require('./app.js');

describe('Process function', () => {
  describe('Filter argument', () => {
    it('should return all when undefined', () => {
      assert.equal(
        processData('').length,
        5,
      );
    });
    it('should return the filtered data', () => {
      expect(processData('ry'))
        .deep.to.equal(
          [{
            name: 'Uzuzozne',
            people: [{
              name: 'Lillie Abbott',
              animals: [{
                name: 'John Dory',
              }],
            }],
          },
          {
            name: 'Satanwi',
            people: [{
              name: 'Anthony Bruno',
              animals: [{
                name: 'Oryx',
              }],
            }],
          }],
        );
    });
  });
  describe('Count argument', () => {
    it('should return the filtered data w/ count', () => {
      expect(processData('ats', true))
        .deep.to.equal(
          [{
            name: 'Uzuzozne [2]',
            people: [
              {
                name: 'Lillian Calamandrei [1]',
                animals: [{ name: 'Rats' }],
              },
              { name: 'Lina Allen [1]', animals: [{ name: 'Cats' }] },
            ],
          }],
        );
    });
  });
});

describe('Main function', () => {
  it('should return the filtered data', () => {
    expect(main(['--filter=ry']))
      .deep.to.equal(
        [{
          name: 'Uzuzozne',
          people: [{
            name: 'Lillie Abbott',
            animals: [{
              name: 'John Dory',
            }],
          }],
        },
        {
          name: 'Satanwi',
          people: [{
            name: 'Anthony Bruno',
            animals: [{
              name: 'Oryx',
            }],
          }],
        }],
      );
  });
  it('should return the filtered data w/ count', () => {
    expect(main(['--filter=ats', '--count']))
      .deep.to.equal(
        [{
          name: 'Uzuzozne [2]',
          people: [
            {
              name: 'Lillian Calamandrei [1]',
              animals: [{ name: 'Rats' }],
            },
            { name: 'Lina Allen [1]', animals: [{ name: 'Cats' }] },
          ],
        }],
      );
  });
});
