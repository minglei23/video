// import { Typography } from '@mui/material';
import NavBar from '../components/NavBar';
import "./Store.css";
const Store = () => {
  return (
    <div className="store-page">
     {/* <Typography id="store-page-title" variant="h6" component="h2" align="center" margin={"10px"}>
        Store
      </Typography> */}
      <NavBar title="Store"/>
      <main className="store-main">
        <div className="store-card subscriptions">
          <div className="card-title">Subscriptions</div>
        </div>
        <div className="store-card recharge">
          <div className="card-title">Recharge</div>
        </div>
      </main>
      <footer className="store-footer"></footer>
    </div>
  );
};

export default Store;
