const { installPackages } = require('./index');

describe('Tests the package installer with an array of packages and dependencies', () => {
  test('Returns a string of 2 packages to be installed in order', () => {
    const packages1 = ['KittenService: CamelCaser', 'CamelCaser: '];
    expect(installPackages(packages1)).toBe('CamelCaser, KittenService');
  });

  test('Returns a string of 6 packages to be installed in order', () => {
    const packages2 = [
      'KittenService: ',
      'Leetmeme: Cyberportal',
      'Cyberportal: Ice',
      'CamelCaser: KittenService',
      'Fraudstream: Leetmeme',
      'Ice: '
    ];
    expect(installPackages(packages2)).toBe('KittenService, Ice, Cyberportal, Leetmeme, CamelCaser, Fraudstream');
  });

  test('Throws an error due to a circular reference', () => {
    const packages3 = [
      'KittenService: ',
      'Leetmeme: Cyberportal',
      'Cyberportal: Ice',
      'CamelCaser: KittenService',
      'Fraudstream: ',
      'Ice: Leetmeme'
    ];
    expect(installPackages(packages3)).toThrow(Error);
  });
});

