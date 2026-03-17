import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../../redux/cartSlice";
import { useContext, useState } from "react";
import { AuthContext } from "../../../auth/AuthContext";

const Checkout = ({ setShowCard, checkForm, formData }) => {
  const [OrderTime] = useState(() => Math.floor(Math.random() * 30) + 10);
  const stripe = useStripe();
  const elements = useElements();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const cart = useSelector((state) => state.cart.cartItems);
  const { user } = useContext(AuthContext);
  const [OrderTimePopup, setOrderTimePopup] = useState(false);

  const dispatch = useDispatch();

  const totalAmount = cart.reduce((total, item) => total + item.price, 0);
  const confirBtn = () => {
    toast.success(`Estimated Delivery Time: ${OrderTime} minutes`);
    setOrderTimePopup(false);
    dispatch(clearCart());
    setShowCard(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setLoading(true);

    try {
      if (!checkForm()) {
        setLoading(false);
        return;
      }

      const res = await fetch("http://localhost:5000/api/payment/method", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: totalAmount }),
      });

      const data = await res.json();

      const clientSecret = data.clientSecret;

      const cardElement = elements.getElement(CardElement);

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (result.error) {
        setError(result.error.message);
        setLoading(false);
        isValid = false;
      } else {
        setLoading(false);
        toast.success("Payment Successful");
        const paymentIntentId = result.paymentIntent.id;

        const current = new Date();
        await fetch("http://localhost:5000/api/orders/create-order", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user.id,
            img: cart.img,
            products: cart,
            totalAmount: totalAmount,
            shippingAddress: formData,
            paymentID: paymentIntentId,
            date: current,
            time: OrderTime,
          }),
        });

        setLoading(false);
        setOrderTimePopup(true);
      }
    } catch (err) {
      console.error(err);
      toast.error("Payment failed");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="w-full pt-3">
        <CardElement className="border border-gray-300 p-2 py-3 rounded focus-within:ring-1 focus-within:ring-black" />
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full mt-2 py-2 bg-gray-600 hover:bg-gray-700 flex justify-center items-center font-semibold text-white rounded cursor-pointer"
      >
        {loading ? (
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        ) : (
          `Pay ₹${totalAmount}`
        )}
      </button>

      {OrderTimePopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-6 rounded shadow-lg text-center">
            <p className="text-lg font-semibold mb-4">
              Your order has been placed! 🎉
            </p>
            <p className="text-gray-600 mb-4">
              Estimated Delivery Time: <strong>{OrderTime} minutes</strong>
            </p>
            <button
              onClick={confirBtn}
              className="px-6 py-2 bg-gray-700 text-white rounded hover:bg-gray-800 cursor-pointer"
            >
              Confirm
            </button>
          </div>
        </div>
      )}
    </form>
  );
};

export default Checkout;
