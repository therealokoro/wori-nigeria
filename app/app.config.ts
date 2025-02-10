// @unocss-include
export default defineAppConfig({
  navigation: [
    { label: "Home", link: "/" },
    { label: "Blog", link: "/blog" },
    { label: "Our Services", link: "/services" },
    { label: "Gallery", link: "/#gallery" },
    { label: "Contacts", link: "/contact-us" },
    {
      label: "About Us",
      link: "/#about-us",
      subLinks: [
        { label: "WORI Overview", link: "/about/overview" },
        { label: "Our History", link: "/about/history" },
        { label: "Meet the Team", link: "/about/team" }
      ]
    }
  ],
  info: {
    contacts: ["+234 803 549 9541", "+234 703 330 7354", "+234 805 238 6516"],
    address: "Sokoto Road, GRA Birnin Kebbi, Kebbi State",
    email: "info@woringieria.org",
    socialLinks: [
      { label: "Twitter", link: "/#", icon: "tabler:brand-x" },
      { label: "Facebook", link: "/#", icon: "tabler:brand-facebook" },
      { label: "Instagram", link: "/#", icon: "tabler:brand-instagram" }
    ]
  }
})
