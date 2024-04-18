import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "@mui/material";
import VIPCheckoutBox from "../VIPCheckoutBox";
import { getCountryCodeFromIP } from '../service';
import "swiper/css";

import NavBar from "../components/NavBar";
import "./Store.css";
import StoreFoot from "./StoreFoot";

const Promotion = () => {
  const navigate = useNavigate();
  const [country, setCountry] = useState("");
  const [rechargeType] = useState([
    {
      product: "price_1OdRalLvs8YNyX8skej1FWVd",
      amount: 12,
      day: 7,
      word: "1 Week VIP",
      save: 25,
    },
    {
      product: "price_1P71KuLvs8YNyX8se56ZcXhY",
      amount: 23,
      day: 31,
      word: "1 Month VIP",
      save: 65,
    },
    {
      product: "price_1P71LcLvs8YNyX8s0cAeYyx8",
      amount: 45,
      day: 93,
      word: "3 Month VIP",
      save: 75,
    },
    {
      product: "price_1P71MHLvs8YNyX8s30SqRrIa",
      amount: 48,
      day: 186,
      word: "6 Month VIP",
      save: 88,
    }
  ]);

  useEffect(() => {
    const getCountry = async () => {
      try {
        const countryCode = await getCountryCodeFromIP() || "EN";
        setCountry(countryCode);
      } catch (error) {
        console.error('Error get country:', error);
      }
    };
    getCountry();
  }, []);

  const [visible, setVisible] = useState(false);
  const [buyInfo, setBuyInfo] = useState({
    product: "",
    amount: 0,
    day: 0,
    word: "",
  });

  const handleOnBack = () => {
    navigate('/home')
  };
  const handleOpen = (product, amount, day, word) => {
    setBuyInfo({
      product: product,
      amount: amount,
      day: day,
      word: word,
    });
    setVisible(true);
  };

  const handleClose = () => {
    setVisible(false);
  };
  return (
    <div className="store-page">
      <NavBar title="First Time Promotion" onBack={handleOnBack} />
      <main className="store-main">
        <div className="store-card recharge">
          <div className="card-title">Become VIP and watch all series!</div>
          <div className="card-content recharge-content">
            {rechargeType.map((item, index) => {
              return (
                <div
                  className={
                    index === 0 ? "recharge-item active" : "recharge-item"
                  }
                  key={item.product}
                  onClick={() =>
                    handleOpen(
                      item.product,
                      item.amount,
                      item.day,
                      item.word
                    )
                  }
                >
                  {item.save !== 0 && (
                    <span className="save-num">save {item.save}%</span>
                  )}
                  <div className="recharge-item-content">
                    <div className="recharge-coins">
                      <span className="recharge-coins-num">{item.word}</span>
                    </div>
                  </div>
                  <div className="recharge-item-bottom">
                    {country !== "ID" && country !== "MY" && country !== "TH" && `US $${item.amount}.00`}
                    {(country === "ID" || country === "MY" || country === "TH") && `US $${item.amount/2}`}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <Modal
          open={visible}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <VIPCheckoutBox {...buyInfo} />
        </Modal>

        <StoreFoot />
      </main>
    </div>
  );
};

export default Promotion;
