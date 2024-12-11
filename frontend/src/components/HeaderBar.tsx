import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

type HeaderBarProps = {
  goBackToFront: (back: boolean) => void;
  setAnyListClicked: (clicked: boolean) => void;
  resetListId: () => void;
};

export default function HeaderBar({
  goBackToFront,
  setAnyListClicked,
  resetListId,
}: HeaderBarProps) {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h6"
          fontWeight="500"
          component="div"
          sx={{ flexGrow: 1, cursor: "pointer" }}
          onClick={() => {
            goBackToFront(true);
            setAnyListClicked(false);
            resetListId();
          }}
        >
          WP Music
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
