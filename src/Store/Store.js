// import { Typography } from '@mui/material';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Typography, Link } from "@mui/material";
import "swiper/css";

import NavBar from "../components/NavBar";
import money1 from '../assets/image/money1.png'
import money2 from '../assets/image/money2.png'
import "./Store.css";
const Store = () => {
  const navigate = useNavigate();
  const [rechargeType] = useState([
    {
      id: 1,
      amount: "17.99",
      coins: "1800",
      bonus: "540",
      discount: "30",
    },
    {
      id: 2,
      amount: "9.99",
      coins: "1000",
      bonus: "",
      discount: "",
    },
    {
      id: 3,
      amount: "14.99",
      coins: "1500",
      bonus: "225",
      discount: "15",
    },
    {
      id: 4,
      amount: "23.99",
      coins: "2400",
      bonus: "600",
      discount: "25",
    },
    {
      id: 5,
      amount: "29.99",
      coins: "3000",
      bonus: "1200",
      discount: "40",
    },
    {
      id: 6,
      amount: "49.99",
      coins: "5000",
      bonus: "2500",
      discount: "50",
    },
  ]);

  const handleClose = () => {
    navigate(-1);
  };
  return (
    <div className="store-page">
      <NavBar title="Store" onBack={handleClose} />
      <main className="store-main">
        <div className="store-card subscriptions">
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
                >
                  <div className="subscript-discount">
                      +120<small>%</small>
                  </div>
                  <div className="subscriptions-item-content flex">
                    <div className="subscriptions-item-info">
                      <div className="subscriptions-item-total">
                        <span className="">3025</span> in total/week
                      </div>
                      <div className="subscriptions-item-coins flex">
                        <img className="money-icon" src={money1} alt="money"/>
                        Obtain <span>1800 Coins</span> (instantly)
                      </div>
                      <div className="subscriptions-item-bouns flex">
                      <img className="money-icon" src={money2} alt="money"/>
                        Obtain <span>1225 Bonus</span> (daily check-in)
                      </div>
                    </div>
                    <div className="subscriptions-item-price"></div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide className="subs-swiper-slide">
                <div
                  className="subscriptions-item"
                  style={{ backgroundColor: "red" }}
                >
                  2
                </div>
              </SwiperSlide>
              <SwiperSlide className="subs-swiper-slide">
                <div
                  className="subscriptions-item"
                  style={{ backgroundColor: "blue" }}
                >
                  3
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
        <div className="store-card recharge">
          <div className="card-title">Recharge</div>
          <div className="card-content recharge-content">
            {rechargeType.map((item, index) => {
              return (
                <div
                  className={
                    index === 0 ? "recharge-item active" : "recharge-item"
                  }
                  key={item.id}
                >
                  {item.discount && (
                    <span className="discount-num">+{item.discount}%</span>
                  )}
                  <div className="recharge-item-content">
                    <div className="recharge-coins">
                      <span className="recharge-coins-num">{item.coins}</span>{" "}
                      Coins
                    </div>
                    {item.bonus && (
                      <span className="recharge-bonus">
                        +{item.bonus} Bonus
                      </span>
                    )}
                  </div>
                  <div className="recharge-item-bottom">
                    US<small>$</small>
                    {item.amount}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

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
                console.info("I'm a button.");
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
                console.info("I'm a button.");
              }}
            >
              Privacy Policy
            </Link>
            <br/>
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
      </main>
    </div>
  );
};

export default Store;
