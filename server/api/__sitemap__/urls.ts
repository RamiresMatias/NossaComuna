export default defineSitemapEventHandler(() => {
  return [
    {
      loc: '/',
      priority: 1
    },
    {
      loc: '/:username/:code'
    },
  ];
});
