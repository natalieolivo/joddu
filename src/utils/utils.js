export const setActiveTheme = theme => {
  const themes = {
    panAfrican: {
      main: "panafrican",
      bg: "#AA0F20",
      primaryBtn: "#000",
      active: false
    },
    neutral: {
      main: "neutral",
      bg: "#45311F",
      primaryBtn: "#FF8E88",
      active: false
    }
  };

  localStorage.setItem("theme", JSON.stringify(themes[theme]));
};

export const getActiveTheme = () => {
  if (typeof localStorage.getItem("theme") === "string") {
    return JSON.parse(localStorage.getItem("theme"));
  } else {
    return {};
  }
};
