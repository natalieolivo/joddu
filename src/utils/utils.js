export const setActiveTheme = theme => {
  const themes = {
    panAfrican: {
      main: "panAfrican",
      bg: "linear-gradient(10deg, #AA0F20, #769075)",
      headerBg: "#769075",
      border: "4px solid #AA0F20",
      borderRadius: "8px",
      primaryBtn: "transparent",
      primaryBtnHover: "#AA0F20",
      color: "#000"
    },
    neutral: {
      main: "neutral",
      bg: "#45311F",
      headerBg: "#45311F",
      primaryBtn: "#FF8E88"
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
