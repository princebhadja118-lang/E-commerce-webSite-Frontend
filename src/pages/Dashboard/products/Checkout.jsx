import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../../redux/cartSlice";
import { useContext, useState } from "react";
import { AuthContext } from "../../../auth/AuthContext";

const Checkout = ({ setShowCard, checkForm, formData }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const cart = useSelector((state) => state.cart.cartItems);
  const { user } = useContext(AuthContext);

  const dispatch = useDispatch();

  const totalAmount = cart.reduce((total, item) => total + item.price, 0);

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
        const paymentId = result.paymentIntent?.id;

        //store order details
        await fetch("http://localhost:5000/api/orders/create-order", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user.id,
            products: cart,
            totalAmount: totalAmount,
            shippingAddress: formData,
            paymentId: paymentId,
          }),
        });

        dispatch(clearCart());

        setShowCard(false);
        setLoading(false);
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
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin "></div>
        ) : (
          `Pay ₹${cart.reduce((total, item) => total + item.price, 0)}`
        )}
      </button>
    </form>
  );
};

export default Checkout;
