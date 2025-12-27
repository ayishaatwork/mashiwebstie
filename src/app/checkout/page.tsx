import "./css/checkout.css";

export default function CheckoutPage() {
  return (
    <main className="checkout-page">
      <div className="checkout-layout">
        {/* LEFT COLUMN */}
        <div className="checkout-left">
          <h1 className="checkout-title">Checkout</h1>
        </div>

        {/* RIGHT COLUMN */}
        <div className="checkout-right">
          <form className="checkout-form">
            {/* CONTACT */}
            <section className="checkout-section">
              <h2>Contact</h2>
              <input type="email" placeholder="EMAIL" />
            </section>

            {/* DELIVERY */}
            <section className="checkout-section">
              <h2>Delivery</h2>

              <div className="row two">
                <input type="text" placeholder="FIRST NAME" />
                <input type="text" placeholder="LAST NAME" />
              </div>

              <input type="text" placeholder="ADDRESS" />

              <div className="row three">
                <input type="text" placeholder="CITY" />
                <input type="text" placeholder="STATE" />
                <input type="text" placeholder="PINCODE" />
              </div>

              <input type="text" placeholder="PHONENUMBER" />

              <label className="save-info">
                <input type="checkbox" />
                Save this information for next order
              </label>
            </section>

            {/* PAY */}
            <button type="submit" className="pay-button">
              Proceed to pay
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
