
export default interface Interface {
  current: {
    temp_c: string,
    condition: {
      icon: string
    }
  },
  location: {
    name: string
  }
}