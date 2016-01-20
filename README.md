# Littlei
Littlei is a CMS for JavaScript without any database, just use markdown files to create content like posts and pages. Very simple to use only need create two folders [posts, pages] and next create markdown content in that folders. Support metadata and extensions.

  var cms = new Littlei.CMS(new Littlei.Config({
      siteTile: 'My Simple WebSite'
      siteNavItems: [{
              name: 'about.md'
          }]
  }));
  cms.build();


