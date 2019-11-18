import defaultTheme from "./default";

import { createMuiTheme } from "@material-ui/core";

const overrides = {
  typography: {
    h1: {
      fontSize: "3rem",
    },
    h2: {
      fontSize: "2rem",
    },
    h3: {
      fontSize: "1.64rem",
    },
    h4: {
      fontSize: "1.5rem",
    },
    h5: {
      fontSize: "1.75rem",
      fontFamily: "Helvetica",
      fontWeight: "700",
      color: "#002a76",
      textTransform: "uppercase",
    },
    h6: {
      fontSize: "1.142rem",
    },
  },
  body: {
    fontFamily: "Heebo, sans-serif",
  },
};

export default {
  default: createMuiTheme({ ...defaultTheme, ...overrides }),
};
