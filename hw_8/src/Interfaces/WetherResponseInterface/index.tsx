
export default interface WetherResponseInterface {
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