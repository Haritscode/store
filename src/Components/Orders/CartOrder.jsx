import { useEffect, useState } from "react";
import "../../scss/CardOrder.scss";
import { BiPlus, BiMinus } from "react-icons/bi";
import blkimage from "../../assets/e-commerce-cart-shop-online-concept-vector-illustration-eps-80643946.jpg";
import { useDispatch, useSelector } from "react-redux";
import { cartData } from "../../actions";
import { useRef } from "react";
const CartOrder = ({
  id,
  img,
  itemQnty,
  Price = 0,
  productName,
  mrp = 0,
  storeFrontOfferDiscount,
}) => {
  const cartItem = useSelector((state) => state.rootReducer.userData.cartData);
  const dispatch = useDispatch();
  const imageref = useRef();
  const [discount, setDiscount] = useState(0);
  useEffect(() => {
    if (mrp != 0 && mrp >= Price && storeFrontOfferDiscount > 0) {
      setDiscount(
        parseInt(((mrp - (Price - storeFrontOfferDiscount)) / mrp) * 100)
      );
    } else if (mrp != 0 && Price <= mrp && storeFrontOfferDiscount === 0) {
      setDiscount(parseInt(((mrp - Price) / mrp) * 100));
    } else if (mrp === 0 && storeFrontOfferDiscount > 0) {
      setDiscount(
        parseInt(((Price - (Price - storeFrontOfferDiscount)) / Price) * 100)
      );
      console.log("hello");
    }
  });
  const subQnty = (id) => {
    let items = cartItem;
    let newData = [];
    items.map((item) => {
      if (item.id === id && item.orderQnty !== 1) {
        newData.push({ ...item, orderQnty: item.orderQnty - 1 });
      } else if (item.id === id && item.orderQnty === 1) {
        let newList = [];
        newData.map((itm) => {
          if (item.id !== itm.id) {
            newList.push(itm);
          }
        });
        newData = newList;
      } else {
        newData.push({ ...item });
      }
    });
    dispatch(cartData(newData));
  };
  const addQnty = (id) => {
    let items = cartItem;
    let newData = [];
    items.map((item) => {
      if (item.id == id) {
        newData.push({ ...item, orderQnty: item.orderQnty + 1 });
      } else {
        newData.push({ ...item });
      }
    });
    dispatch(cartData(newData));
  };
  const substituteImage = () => {
    imageref.current.src = blkimage;
  };
  return (
    <>
      {/* <div className='Cardorder'>
            <img src={img.length===0?blkimage:img} alt="none" className='order_img'/>
            <div className='order_item_desc'>
                <h5 className='order_item_name'>{productName}</h5>
                <p className='order_item_company'>{productBrand}</p>
                <h5>₹{Price}</h5>
            </div>
            <span className='order_item_quantity'>
                <button onClick={()=>subQnty(id)}><BiMinus/></button>
                <span>{itemQnty}</span>
                <button onClick={()=>addQnty(id)}><BiPlus/></button>
            </span>
          </div> */}
      <div className="cartOrder">
        <img
          src={img?.length === 0 ? blkimage : img}
          alt="none"
          className="order_img"
          onError={substituteImage}
          ref={imageref}
        />
        <div className="cartOrder_right">
          <div className="orderItem_detail">
            <p className="orderItem_name">
              {productName?.length < 20
                ? productName
                : productName?.slice(0, 15) + "..."}
            </p>
            <div className="cart_item_price">
              <p className="offer_price">
                ₹
                {storeFrontOfferDiscount > 0
                  ? (Price - storeFrontOfferDiscount)
                      .toLocaleString()
                      .split(".").length > 1
                    ? (Price - storeFrontOfferDiscount).toFixed(1)
                    : Price - storeFrontOfferDiscount
                  : Price}
              </p>
              <p className="orignal_price">
                {storeFrontOfferDiscount > 0
                  ? mrp != 0
                    ? "₹" + mrp
                    : "₹" + Price
                  : mrp != 0
                  ? mrp === Price
                    ? ""
                    : mrp
                  : ""}
              </p>
              <span className="Discount">
                {discount > 0
                  ? `${
                      discount?.toLocaleString()?.split(".")?.length > 1
                        ? discount.toFixed(1)
                        : discount
                    }% off`
                  : ""}
              </span>
            </div>
            <p className="cartOrder_saved_amount">
              {storeFrontOfferDiscount > 0
                ? mrp > 0
                  ? (mrp >= Price).toLocaleString().split(".").length > 1
                    ? `You Save ₹ ${(mrp >= Price).toFixed(1)}`
                    : `You Save ₹ ${(mrp >= Price)}`
                    ? (mrp - (Price - storeFrontOfferDiscount))
                        .toLocaleString()
                        .split(".").length > 1
                      ? `You Save ₹
                        ${(mrp - (Price - storeFrontOfferDiscount)).toFixed(1)}`
                      : `You Save ₹
                        ${(mrp - (Price - storeFrontOfferDiscount))}`
                    : (Price - storeFrontOfferDiscount)
                        .toLocaleString()
                        .slice(".").length > 1
                    ? `You Save ₹
                      ${(Price - storeFrontOfferDiscount).toFixed(1)}`
                    : `You Save ₹ ${(Price - storeFrontOfferDiscount)}`
                  : (Price - storeFrontOfferDiscount)
                      .toLocaleString()
                      .slice(".").length > 1
                  ? `You Save ₹ ${(Price - storeFrontOfferDiscount).toFixed(1)}`
                  : `You Save ₹ ${(Price - storeFrontOfferDiscount)}`
                : mrp != 0
                ? mrp > Price
                  ? `You Save ₹ ${mrp - Price}`
                  : ""
                : ""}
            </p>
          </div>
          <span className="order_item_quantity">
            <button onClick={() => subQnty(id)}>
              <BiMinus />
            </button>
            <span>{itemQnty}</span>
            <button onClick={() => addQnty(id)}>
              <BiPlus />
            </button>
          </span>
        </div>
      </div>
    </>
  );
};

export default CartOrder;
