import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import "./index.css";
const NavBar = (props) => {
  const { title, rightContent, color, backgroundColor, onBack } = props;
  return (
    <div
      className="nav-bar"
      style={{ color: color, backgroundColor: backgroundColor }}
    >
      <div className="nav-bar-left" onClick={onBack}>
        <ArrowBackIosIcon fontSize="small" />
      </div>
      <div className="nav-bar-content">{title}</div>
      <div className="nav-bar-right">{rightContent}</div>
    </div>
  );
};

export default NavBar;
