import type { IAlbum } from "~~/shared/types"

type State = {
  albumList: IAlbum[]
  activeAlbum: IAlbum | null
}
export const useAlbumStore = defineStore("auth", {
  state: (): State => ({
    albumList: [],
    activeAlbum: null
  }),

  getters: {
    getCurrAlbum: s => s.activeAlbum,
    getCurrAlbumList: s => s.albumList
  },

  actions: {
    async createAlbum(payload: any) {
      const body = objectToFormData(payload)
      await $fetch("/api/albums/create", { method: "POST", body })
      await this.fetchAlbums()
    },

    async fetchAlbums() {
      const res = await $fetch("/api/albums/all")
      this.albumList = res
      return res
    },

    async deleteAlbum(id: string) {
      const res = await $fetch("/api/albums/delete", { method: "DELETE", query: { id } })
      this.activeAlbum = null
      return res
    },

    async fetchSingleAlbum(query: any) {
      const res = await $fetch("/api/albums/single", { query })
      this.activeAlbum = res
      return res
    },

    setCurrAlbum(album: IAlbum) {
      this.activeAlbum = album
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAlbumStore, import.meta.hot))
}
