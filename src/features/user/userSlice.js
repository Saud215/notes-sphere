import { createSlice } from "@reduxjs/toolkit";
import { redirect } from "react-router-dom";
import { toast } from "react-toastify";

const themes = ["dracula", "retro"];
const getThemeFromLocalStorage = () => {
  const themeFromLocalStorage =
    JSON.parse(localStorage.getItem("theme")) || "retro";
  document.documentElement.setAttribute("data-theme", themeFromLocalStorage);

  return themeFromLocalStorage;
};

const getUserFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("user")) || null;
};

const initialState = {
  user: getUserFromLocalStorage(),
  theme: getThemeFromLocalStorage(),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      const newTheme = state.theme === "retro" ? "dracula" : "retro";
      state.theme = newTheme;
      document.documentElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", JSON.stringify(newTheme));
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
    login: (state, action) => {
      const user = {
        username: action.payload.username,
        userId: action.payload._id,
        email: action.payload.email,
        role: action.payload.role,
      };
      state.user = user;
      localStorage.setItem("user", JSON.stringify(user));
    },
  },
});

export const { toggleTheme, logout, login } = userSlice.actions;

export default userSlice.reducer;
