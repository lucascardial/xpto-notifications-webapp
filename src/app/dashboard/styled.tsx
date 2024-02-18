import { styled } from "@mui/material/styles";

import {
  ListItemButton as MuiListItemButton,
  ListItemButtonBaseProps,
  CSSObject,
  Theme,
  Drawer as MuiDrawer,
} from "@mui/material";

type ListItemButtonProps = ListItemButtonBaseProps & {
  open?: boolean;
};

export const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  background: "#fff !important",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(12)} + 1px)`,
  },
});

export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  cursor: "pointer",
  padding: theme.spacing(4, 4),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export const ListItemButton = styled(MuiListItemButton)<ListItemButtonProps>(
  ({ theme, open }: any) => ({
    minHeight: 48,
    justifyContent: open ? "initial" : "center",
    px: 2.5,
    display: "flex",
    ...(!open && {
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    }),
  })
);

export const Drawer = styled(MuiDrawer)(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  background: "transparent !important",
  "& .MuiPaper-root": {
    borderRight: "1px dashed rgba(0, 0, 0, 0.12) !important",
  },
  zIndex: 1200,
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));
