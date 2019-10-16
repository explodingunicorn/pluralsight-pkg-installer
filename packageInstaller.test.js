const { parsePackageArray, orderPackageObj, installPackages } = require('./index');

describe('Test package installer dependencies.', () => {
  test('Parses the packages array correctly.', () => {
    const packages1 = ['KittenService: CamelCaser', 'CamelCaser: '];
    expect(parsePackageArray(packages1)).toMatchObject({ KittenService: 'CamelCaser', CamelCaser: false });
  });

  test('Packages object is ordered into an array of packages to be installed.', () => {
    const packagesObj = { KittenService: 'CamelCaser', CamelCaser: false };
    expect(new Set(orderPackageObj(packagesObj))).toEqual(new Set(['CamelCaser', 'KittenService']));
  });
})

describe('Tests the package installer with an array of packages and dependencies.', () => {

  test('Returns a string of packages (2) to be installed in order.', () => {
    const packages = ['KittenService: CamelCaser', 'CamelCaser: '];
    expect(installPackages(packages)).toBe('CamelCaser, KittenService');
  });

  test('Returns a string of packages (6) to be installed in order.', () => {
    const packages = [
      'KittenService: ',
      'Leetmeme: Cyberportal',
      'Cyberportal: Ice',
      'CamelCaser: KittenService',
      'Fraudstream: Leetmeme',
      'Ice: '
    ];
    expect(installPackages(packages)).toBe('KittenService, Ice, Cyberportal, Leetmeme, CamelCaser, Fraudstream');
  });

  test('Returns a string of packages (8) to be installed in order.', () => {
    const packages = [
      'KittenService: ',
      'Leetmeme: Cyberportal',
      'Cyberportal: Ice',
      'CamelCaser: KittenService',
      'CoreysCastle: Fraudstream',
      'Fraudstream: Leetmeme',
      'Charmander: CoreysCastle',
      'Ice: '
    ];
    expect(installPackages(packages)).toBe('KittenService, Ice, Cyberportal, Leetmeme, CamelCaser, Fraudstream, CoreysCastle, Charmander');
  })

  test('Throws an error due to a circular reference.', () => {
    const packages = [
      'KittenService: ',
      'Leetmeme: Cyberportal',
      'Cyberportal: Ice',
      'CamelCaser: KittenService',
      'Fraudstream: ',
      'Ice: Leetmeme'
    ]
    expect(() => installPackages(packages)).toThrow(Error);
  });
});

