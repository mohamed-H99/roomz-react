const colors = require("tailwindcss/colors");

const colorsLevels = {
  lightest: 100,
  light: 300,
  DEFAULT: 600,
  dark: 700,
  darkest: 900,
};

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "media", // or 'media' or 'class' , disable:false
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#ffffff",
      black: "#000000",
      primary: {
        lightest: colors.lime[colorsLevels.lightest],
        light: colors.lime[colorsLevels.light],
        DEFAULT: colors.lime[colorsLevels.DEFAULT],
        dark: colors.lime[colorsLevels.dark],
        darkest: colors.lime[colorsLevels.darkest],
      },
      success: {
        lightest: colors.green[colorsLevels.lightest],
        light: colors.green[colorsLevels.light],
        DEFAULT: colors.green[colorsLevels.DEFAULT],
        dark: colors.green[colorsLevels.dark],
        darkest: colors.green[colorsLevels.darkest],
      },
      danger: {
        lightest: colors.red[colorsLevels.lightest],
        light: colors.red[colorsLevels.light],
        DEFAULT: colors.red[colorsLevels.DEFAULT],
        dark: colors.red[colorsLevels.dark],
        darkest: colors.red[colorsLevels.darkest],
      },
      warning: {
        lightest: colors.yellow[colorsLevels.lightest],
        light: colors.yellow[colorsLevels.light],
        DEFAULT: colors.yellow[colorsLevels.DEFAULT],
        dark: colors.yellow[colorsLevels.dark],
        darkest: colors.yellow[colorsLevels.darkest],
      },
      gray: {
        lightest: colors.gray[colorsLevels.lightest],
        light: colors.gray[colorsLevels.light],
        DEFAULT: colors.gray[colorsLevels.DEFAULT],
        dark: colors.gray[colorsLevels.dark],
        darkest: colors.gray[colorsLevels.darkest],
      },
    },
  },
  variants: {},
  plugins: [require("tailwindcss-rtl")],
};
