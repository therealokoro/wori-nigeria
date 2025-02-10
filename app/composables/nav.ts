export type NavLink = {
  label: string
  link: string
  icon?: string
  subLinks?: Omit<NavLink, "subLinks">[] // Made subLinks mandatory with a default empty array
  isActive?: boolean // Added to reflect the return type
}

export const useActivePageLink = (links: NavLink[], homeRoute = "/") => {
  const route = useRoute()

  const normalizePath = (path: string) =>
    path.replace(/\/+$|^\/+/, "").toLowerCase()

  const markActiveLinks = (
    links: NavLink[]
  ): (NavLink & { isActive: boolean })[] => {
    return links.map((currLink) => {
      const isActive
        = normalizePath(currLink.link) === normalizePath(homeRoute)
          ? normalizePath(route.path) === normalizePath(homeRoute)
          : normalizePath(route.path).startsWith(normalizePath(currLink.link))

      return {
        ...currLink,
        isActive,
        ...(currLink.subLinks && {
          subLinks: Array.isArray(currLink.subLinks)
            ? markActiveLinks(currLink.subLinks)
            : []
        })
      }
    })
  }

  const cachedResult = computed(() => markActiveLinks(links))

  return cachedResult
}
