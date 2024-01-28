import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "@mui/material";
import VIPCheckoutBox from "../VIPCheckoutBox";
import "swiper/css";

import NavBar from "../components/NavBar";
import "./Store.css";
import StoreFoot from "./StoreFoot";

const Vip = () => {
  const navigate = useNavigate();
  const [rechargeType] = useState([
    {
      id: 1,
      amount: 12,
      word: "1 Week VIP",
      save: 25,
    },
    {
      id: 2,
      amount: 32,
      word: "1 Month VIP",
      save: 50,
    },
    {
      id: 3,
      amount: 75,
      word: "3 Month VIP",
      save: 60,
    },
    {
      id: 4,
      amount: 96,
      word: "6 Month VIP",
      save: 75,
    }
  ]);

  const [visible, setVisible] = useState(false);
  const [buyInfo, setBuyInfo] = useState({
    coins: 0,
    bonus: 0,
    price: 0,
  });

  const handleOnBack = () => {
    navigate('/profile')
  };
  const handleOpen = (id, amount, word) => {
    setBuyInfo({
      id: id,
      amount: amount,
      word: word,
    });
    setVisible(true);
  };

  const handleClose = () => {
    setVisible(false);
  };
  return (
    <div className="store-page">
      <NavBar title="Become VIP" onBack={handleOnBack} />
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
                  key={item.id}
                  onClick={() =>
                    handleOpen(
                      item.id,
                      item.amount,
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
                    {`US $${item.amount}.00`}
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

export default Vip;
