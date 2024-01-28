import { useNavigate } from "react-router-dom";
import { Typography, Link } from "@mui/material";
import "swiper/css";
import "./Store.css";

const StoreFoot = () => {
  const navigate = useNavigate();
  return (
    <footer className="store-footer">
      <Typography
        color="#9A9A9A"
        variant="subtitle2"
        gutterBottom
        component="div"
      >
        Related terms and conditions:
      </Typography>
      <Typography color="#676767" variant="caption" component="p">
        1.Coins can only be used within this application.
      </Typography>
      <Typography color="#676767" variant="caption" component="p">
        2.Payment: The purchase will be charged to your iTunes account.
      </Typography>
      <Typography color="#676767" variant="caption" component="p">
        3.Renewal: Your Apple iTunes account will be charged within 24hours
        before the expiration and the subscription period will beextended
        for another subscription cycle upon successfuldeduction.
      </Typography>
      <Typography color="#676767" variant="caption" component="p">
        4. Cancellation: To cancel the subscription renewal, please turn
        offthe automatic renewal function in the iTunes/Apple ID settings
        atleast 24 hours before the current subscription period
        expires.lfcanceled within the last 24 hours before expiration, a
        subscriptionfee will still be charged.
      </Typography>
      <Typography color="#676767" variant="caption" component="p">
        5.Payment successful but recharge not taking effect for anextended
        period? Click here to refresh or send an email
        to:moboreels@moboreader.com. 6. Manage your subscriptions: You can
        view, change, or cancelyoursubscriptions.
      </Typography>
      <Typography color="#676767" variant="caption" component="p">
        6. Manage your subscriptions: You can view, change, or
        cancelyoursubscriptions.
      </Typography>
      <div className="footer-links">
        <Link
          component="button"
          variant="body2"
          color="#676767"
          onClick={() => {
            navigate("/termsofService");
          }}
        >
          Terms of Service
        </Link>
        <span className="divider-line"></span>
        <Link
          component="button"
          variant="body2"
          color="#676767"
          onClick={() => {
            navigate("/privacyPolicy");
          }}
        >
          Privacy Policy
        </Link>
        <br />
        <Link
          component="button"
          variant="body2"
          color="#676767"
          onClick={() => {
            console.info("I'm a button.");
          }}
        >
          Renewal Agreement
        </Link>
      </div>
    </footer>
  );
};

export default StoreFoot;
