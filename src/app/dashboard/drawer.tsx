import {
  Box,
  Icon,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { ListItemButton, Drawer, DrawerHeader } from "./styled";
import theme from "../../theme";

type DrawerComponentProps = {
  open: boolean;
  onClose: () => void;
};

export default function DrawerComponent({
  open,
  onClose,
}: DrawerComponentProps) {
  const isDownSm = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Drawer
      variant={isDownSm ? "temporary" : "permanent"}
      open={open}
      onClose={onClose}
    >
      <DrawerHeader>
        <Typography variant="h5">XPTO</Typography>
      </DrawerHeader>
      <Box>
        <List>
          {[]
            .map((route: any) => (
              <ListItem
                key={route.path}
                disablePadding
                sx={{ display: "block" }}
              >
                <ListItemButton
                  open={open}
                >
                  <ListItemIcon
                    sx={{
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <Icon
                      baseClassName="material-icons-two-tone"
                      color="primary"
                    >
                      {route.icon}
                    </Icon>
                  </ListItemIcon>
                  <ListItemText primary={route.name} />
                </ListItemButton>
              </ListItem>
            ))}
        </List>
      </Box>
    </Drawer>
  );
}
