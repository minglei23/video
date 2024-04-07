// import { Typography } from '@mui/material';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { Swiper, SwiperSlide } from "swiper/react";
import { Modal } from "@mui/material";
import CheckoutBox from "../CheckoutBox";
import { getCountryCodeFromIP } from '../service';
import "swiper/css";

import NavBar from "../components/NavBar";
// import money1 from "../assets/image/money1.png";
// import money2 from "../assets/image/money2.png";
// import freeAccess from "../assets/image/free-access.png";
// import vipImg from "../assets/image/vip.png";

import "./Store.css";
import StoreFoot from "./StoreFoot";
import { bonus, coins, recharge } from "../word";

const Store = () => {
  const navigate = useNavigate();
  const [country, setCountry] = useState("");
  const [rechargeType] = useState([
    {
      id: 1,
      amount: 5,
      coins: 250,
      bonus: 50,
      discount: 20,
    },
    {
      id: 2,
      amount: 2,
      coins: 100,
      bonus: 10,
      discount: 10,
    },
    {
      id: 3,
      amount: 10,
      coins: 500,
      bonus: 100,
      discount: 20,
    },
    {
      id: 4,
      amount: 15,
      coins: 750,
      bonus: 150,
      discount: 20,
    },
    {
      id: 5,
      amount: 20,
      coins: 1000,
      bonus: 300,
      discount: 30,
    },
    {
      id: 6,
      amount: 30,
      coins: 1500,
      bonus: 750,
      discount: 50,
    },
  ]);

  const [visible, setVisible] = useState(false);
  const [buyInfo, setBuyInfo] = useState({
    coins: 0,
    bonus: 0,
    price: 0,
  });

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

  const handleOnBack = () => {
    navigate('/profile')
  };
  const handleOpen = (coins, bonus, amount) => {
    setBuyInfo({
      coins: coins,
      bonus: bonus,
      price: amount,
    });
    setVisible(true);
  };

  const handleClose = () => {
    setVisible(false);
  };
  return (
    <div className="store-page">
      <NavBar title="Store" onBack={handleOnBack} />
      <main className="store-main">
        {/* <div className="store-card subscriptions">
          <div className="card-title">Subscriptions</div>
          <div className="card-content">
            <Swiper
              className="subs-swiper"
              spaceBetween={10}
              slidesPerView="auto"
              centeredSlides
            >
              <SwiperSlide className="subs-swiper-slide">
                <div
                  className="subscriptions-item purple"
                  onClick={() =>
                    handleOpen(1800, 1225, 14.99)
                  }
                >
                  <div className="subscript-discount">
                    +120<small>%</small>
                  </div>
                  <div className="absolute top-0 right-0 text-xs text-[#7C6A92] w-36 font-light leading-6 bg-[#2C1356] rounded-tr-lg rounded-bl-full">
                    Daily Rewards PacK
                  </div>
                  <div className="subscriptions-item-content flex px-4 py-5 justify-between items-center">
                    <div className="subscriptions-item-info">
                      <div className="subscriptions-item-total text-sm text-left ml-5 font-light">
                        <span className="text-xl text-[#F4B14A] font-semibold">
                          3025
                        </span>{" "}
                        in total/week
                      </div>
                      <div className="subscriptions-item-coins flex text-xs items-center font-light">
                        <img
                          className="money-icon mr-1"
                          src={money1}
                          alt="money"
                        />
                        Obtain
                        <span className="text-[#F4B14A] mx-1">1800 Coins</span>
                        (instantly)
                      </div>
                      <div className="subscriptions-item-bouns flex text-xs items-center font-light">
                        <img
                          className="money-icon mr-1"
                          src={money2}
                          alt="money"
                        />
                        Obtain
                        <span className="text-[#F4B14A] mx-1">1225 Bonus</span>
                        (daily check-in)
                      </div>
                    </div>
                    <div className="subscriptions-item-price w-28 font-semibold leading-8 text-sm text-[#280612] rounded-full bg-gradient-to-r from-[#F6C673] to-[#EFB556]">
                      US$14.99<small>/W</small>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide
                className="subs-swiper-slide"
                onClick={() =>
                  handleOpen(3600, 2700, 25.99)
                }
              >
                <div className="subscriptions-item bg-gradient-to-r from-[#7A2B58] to-[#610F3A]">
                  <div className="subscript-discount">
                    +142<small>%</small>
                  </div>
                  <div className="absolute top-0 right-0 text-xs text-[#955760] w-36 font-light leading-6 bg-[#3C0F28] rounded-tr-lg rounded-bl-full">
                    Daily Rewards PacK
                  </div>
                  <div className="subscriptions-item-content flex px-4 py-5 justify-between items-center">
                    <div className="subscriptions-item-info">
                      <div className="subscriptions-item-total text-sm text-left ml-5 font-light">
                        <span className="text-xl text-[#F4B14A] font-semibold">
                          6300
                        </span>{" "}
                        in total/month
                      </div>
                      <div className="subscriptions-item-coins flex text-xs items-center font-light">
                        <img
                          className="money-icon mr-1"
                          src={money1}
                          alt="money"
                        />
                        Obtain
                        <span className="text-[#F4B14A] mx-1">3600 Coins</span>
                        (instantly)
                      </div>
                      <div className="subscriptions-item-bouns flex text-xs items-center font-light">
                        <img
                          className="money-icon mr-1"
                          src={money2}
                          alt="money"
                        />
                        Obtain
                        <span className="text-[#F4B14A] mx-1">2700 Bonus</span>
                        (daily check-in)
                      </div>
                    </div>
                    <div className="subscriptions-item-price w-28 font-semibold leading-8 text-sm text-[#280612] rounded-full bg-gradient-to-r from-[#F6C673] to-[#EFB556]">
                      US$25.99<small>/M</small>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide className="subs-swiper-slide">
                <div
                  className="subscriptions-item bg-[#D9B385]"
                  onClick={() =>
                    handleOpen(
                      "All mini-series for free for",
                      " 1 month",
                      "$49.99"
                    )
                  }
                >
                  <div className="w-28 absolute -top-2 left-0">
                    <img src={freeAccess} alt="freeAccess" />
                  </div>

                  <div className="subscriptions-item-content flex px-4 py-5 justify-between items-center">
                    <div className="subscriptions-item-info flex">
                      <img
                        className="vip-icon mt-[4px] mr-[6px]"
                        src={vipImg}
                        alt="vip"
                      />
                      <div className="subscriptions-item-total text-sm text-left font-light">
                        <span className="text-lg text-[#5D360E] font-semibold">
                          All mini-series for free for 1 month(s)
                        </span>
                      </div>
                    </div>
                    <div className="subscriptions-item-right">
                      <div className="subscriptions-item-price shrink-0 w-28 font-semibold leading-8 text-sm text-white rounded-full bg-gradient-to-r from-[#4A3E36] to-[#322A24]">
                        US$49.99<small>/M</small>
                      </div>
                      <span className="text-sm text-[#7B6143] line-through">
                        US$109
                      </span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div> */}
        <div className="store-card recharge">
          <div className="card-title">{recharge()}</div>
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
                      item.coins,
                      item.bonus,
                      item.amount
                    )
                  }
                >
                  {item.discount !== 0 && (
                    <span className="discount-num">+{item.discount}%</span>
                  )}
                  <div className="recharge-item-content">
                    <div className="recharge-coins">
                      <span className="recharge-coins-num">{item.coins}</span>{" "}
                      {coins()}
                    </div>
                    {item.bonus !== 0 && (
                      <span className="recharge-bonus">
                        +{item.bonus} {bonus()}
                      </span>
                    )}
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
          <CheckoutBox {...buyInfo} />
        </Modal>

        <StoreFoot />
      </main>
    </div>
  );
};

export default Store;
