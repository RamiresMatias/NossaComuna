export default defineSitemapEventHandler(() => {
  return [
    {
      loc: '/'
    },
    {
      loc: '/posts',
      priority: 1
    },
    {
      loc: '/:username/:code'
    },
  ];
});
