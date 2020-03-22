export const setActiveTheme = theme => {
  const themes = {
    panAfrican: {
      main: "panAfrican",
      bg: "linear-gradient(1deg, #AA0F20, #769075)",
      transform: "scale(0.45) translate(0, -60%)",
      headerBg: "#769075",
      headerBorder: "#979797",
      border: "4px solid #AA0F20",
      borderRadius: "8px",
      primaryBtn: "transparent",
      primaryBtnHover: "#AA0F20",
      color: "#000",
      navScrollBg: "#5f735e",
      inputBg: "#000",
      boxbg: "#910717"
    },
    neutral: {
      main: "neutral",
      bg: "#99836f",
      transform: "scale(0.45) translate(-50%, -60%)",
      headerBg: "#99836f",
      headerBorder: "#FF8E88",
      primaryBtn: "#FF8E88",
      navScrollBg: "#df615a",
      inputBg: "#fff",
      boxbg: "#df615a"
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
