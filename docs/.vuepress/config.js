const fs = require("fs");

module.exports = {
  themeConfig: {
    nav: [
      { text: "Home", link: "/" },
      { text: 'Guide', link: '/guide/' },
      { text: "About", link: "/about" },
      { text: "Volunteers", link: "/volunteers" },
      { text: "Contact", link: "/contact" },
    ],
    sidebar: getSidebar({
      excludes: [
        "README.md",
        "contact.md",
        ".DS_Store",
        "about.md",
        "volunteers.md",
      ],
    }),
    repo: "zeue/coronavirus-toolkit",
    repoLabel: "Contribute!",
    editLinks: true,
    editLinkText: "Help us improve this page!",
    smoothScroll: true,
    lastUpdated: "Last Updated",
    head: [["link", { rel: "icon", href: "/icon.png" }]],
    sidebarDepth: 1,
    logo: "/icon.png",
  },
  title: "Coronavirus Toolkit",
  markdown: {
    extendMarkdown: (md) => {
      md.use(require("markdown-it-include"));
    },
  },
  plugins: [
    [
      "@vuepress/google-analytics",
      {
        ga: "UA-162939938-1",
      },
    ],
  ],
};

function getSidebar(settings) {
  let _fileScan = fs
    .readdirSync(__dirname + "/../", { withFileTypes: true })
    .filter((_x) => _x.isFile())
    .map((_x) => _x.name);

  let _children = _fileScan
    // TODO: ignore all files/directories that start with a .
    .filter((_x) => {
      if (settings.excludes.includes(_x)) {
        return false;
      } else {
        return true;
      }
    })
    .map((_x) => {
      let returned = "/" + _x.replace(".md", "");

      if (returned.includes("README")) {
        returned = returned.replace("README", "");
      }

      return returned;
    });

  let sidebar = [
    {
      title: "",
      collapsable: false,
      children: _children,
    },
  ];

  console.log(sidebar);

  return sidebar;
}
