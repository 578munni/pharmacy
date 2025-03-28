import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [medicines, setMedicines] = useState([
    { id: 1, name: "Napa 500mg", price: 10, category: "Painkiller", stock: 100 },
    { id: 2, name: "Ace 250mg", price: 15, category: "Fever", stock: 80 },
    { id: 3, name: "Seclo 20mg", price: 8, category: "Acidity", stock: 120 },
    { id: 4, name: "Fexo 120mg", price: 12, category: "Allergy", stock: 60 },
    { id: 5, name: "Zimax 500mg", price: 25, category: "Antibiotic", stock: 45 }
  ]);

  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showPrescription, setShowPrescription] = useState(false);

  const categories = ["All", ...new Set(medicines.map(med => med.category))];

  const filteredMedicines = medicines.filter(med => {
    const matchesSearch = med.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || med.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (medicine) => {
    setCart([...cart, medicine]);
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="App">
      <header className="header">
        <h1>সোহাগ ফার্মেসি - হোলসেল ওষুধ বিক্রয়</h1>
        <div className="contact-info">
          <p>যোগাযোগ: ০১৭১২৩৪৫৬৭৮</p>
          <p>ঠিকানা: ১২৩, ফার্মেসি রোড, ঢাকা</p>
        </div>
      </header>

      <div className="search-filter">
        <input
          type="text"
          placeholder="ওষুধ খুঁজুন..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="prescription-upload">
        <button onClick={() => setShowPrescription(!showPrescription)}>
          প্রেসক্রিপশন আপলোড করুন
        </button>
        {showPrescription && (
          <div className="prescription-box">
            <input type="file" accept="image/*" />
            <p>আপনার প্রেসক্রিপশনের ছবি আপলোড করুন</p>
          </div>
        )}
      </div>

      <div className="container">
        <div className="medicine-list">
          <h2>ওষুধের তালিকা</h2>
          <div className="medicines">
            {filteredMedicines.map(medicine => (
              <div key={medicine.id} className="medicine-card">
                <h3>{medicine.name}</h3>
                <p>প্রকার: {medicine.category}</p>
                <p>দাম: ৳{medicine.price}</p>
                <p>স্টক: {medicine.stock} পিস</p>
                <button onClick={() => addToCart(medicine)}>কার্টে যোগ করুন</button>
              </div>
            ))}
          </div>
        </div>

        <div className="cart">
          <h2>আপনার অর্ডার</h2>
          {cart.length === 0 ? (
            <p>আপনার কার্ট খালি</p>
          ) : (
            <>
              <div className="cart-items">
                {cart.map(item => (
                  <div key={item.id} className="cart-item">
                    <span>{item.name}</span>
                    <span>৳{item.price}</span>
                    <button onClick={() => removeFromCart(item.id)}>X</button>
                  </div>
                ))}
              </div>
              <div className="cart-total">
                <h3>মোট: ৳{totalPrice}</h3>
                <p>ক্যাশ অন ডেলিভারি</p>
                <p>বিশেষ সুবিধা: ১০০০ টাকার উপর ৫% ডিসকাউন্ট</p>
                <button className="checkout-btn">অর্ডার কনফার্ম করুন</button>
              </div>
            </>
          )}
        </div>
      </div>

      <footer className="footer">
        <p>সোহাগ ফার্মেসি - সোহাগ আহমেদ</p>
        <p>সকাল ৯টা - রাত ১১টা, প্রতি দিন খোলা</p>
      </footer>
    </div>
  );
}

export default App;