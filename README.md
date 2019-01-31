# Littlei
Littlei is a CMS for JavaScript without any database, just use markdown files to create content like posts and pages. Very simple to use only need create two folders [posts, pages] and next create markdown content in that folders. Support metadata and extensions.

    var cms = new Littlei.CMS(new Littlei.Config({
        siteTile: 'My Simple WebSite',
        siteNavItems: [{
                name: 'about.md'
            }]
    }));
    cms.build();

This framework is like a Static Site generator without a tool!!!

### Suported Content Types

   - Pages
   - Posts

Note: We want support custom types in future.

### Dependencies

We included some dependencies to make you life better.

   - jQuery
   - Bootstrap 4.2+
   - Angular JS 1.x
   - Angular Sanitize
   - Angular Router
   - Angular Cookies
   - Handlebars
   - Marked
   - jQuery Timeago   

### Todo

   - Integrate jQuery and AngularJS in framework [for now its just libraries]
   - Support custom types
   - Support custom templates

