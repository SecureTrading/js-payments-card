module.exports = function(api) {
  api.cache(false);

  const presets = [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        corejs: 2
      }
    ]
  ];
  const plugins = [
    '@babel/plugin-transform-typescript',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-transform-runtime',
    '@babel/plugin-transform-classes'
  ];

  return {
    sourceType: 'unambiguous',
    presets,
    plugins
  };
};
