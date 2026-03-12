import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../../redux/cartSlice";
import { useState } from "react";

const Checkout = ({ setShowCard, checkForm }) => {
  const stripe = useStripe();
  const elements = useElements();
  const cart = useSelector((state) => state.cart.cartItems);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    try {
      const totalAmount = cart.reduce((total, item) => total + item.price, 0);

      if (!checkForm()) {
        return;
      }

      // Backend call
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
        result.error.message;
        isValid = false;
      } else {
        toast.success("Payment Successful");
        dispatch(clearCart());
        setShowCard(false);
        console.log(result.paymentIntent);
      }
    } catch (err) {
      console.error(err);
      toast.error("Payment failed");
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
        className="w-full mt-2 py-2 bg-gray-600 hover:bg-gray-700 flex justify-center items-center font-semibold text-white rounded cursor-pointer"
      >
        Pay ₹{cart.reduce((total, item) => total + item.price, 0)}
      </button>
    </form>
  );
};

export default Checkout;
