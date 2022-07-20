import Typography from "typography"

const typography = new Typography({
  headerFontFamily: ["Noto Sans JP"],
  bodyFontFamily: ["Noto Sans JP"],
  googleFonts: [
    {
      name: "Noto+Sans+JP",
      styles: ["400"],
    },
  ],
})

if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
