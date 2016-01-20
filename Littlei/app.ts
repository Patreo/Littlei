(function() {
    let cms = new Littlei.CMS(new Littlei.Config({
        siteNavItems: [{
            name: 'about.md'
        }]
    }));
    cms.build();
} ());