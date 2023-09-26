import { useState } from "react";
import Form from "./components/Form";
const groceryItems = [
  {
    id: 1,
    name: "Kopi Bubuk",
    quantity: 2,
    checked: true,
  },
  {
    id: 2,
    name: "Gula Pasir",
    quantity: 5,
    checked: false,
  },
  {
    id: 3,
    name: "Air Mineral",
    quantity: 3,
    checked: false,
  },
];

function Header() {
  return <h1>Catatan Belanjaku 📝</h1>;
}

function GroceryList({ item, onDeleteItem, onToogleItem }) {
  return (
    <>
      <li key={item.id}>
        <input
          type="checkbox"
          onChange={() => onToogleItem(item.id)}
          checked={item.checked}
        />
        <span style={item.checked ? { textDecoration: "line-through" } : {}}>
          {item.quantity} {item.name}
        </span>
        <button onClick={() => onDeleteItem(item.id)}>&times;</button>
      </li>
    </>
  );
}

function Grocery({ items, onDeleteItem, onToogleItem, onClearItems }) {
  const [sortBy, setSortBy] = useState("input");
  let sortedItems;

  switch (sortBy) {
    case "name":
      sortedItems = items.slice().sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "checked":
      sortedItems = items.slice().sort((a, b) => a.checked - b.checked);
    default:
      sortedItems = items;
  }
  return (
    <>
      <div className="list">
        <ul>
          {sortedItems.map((item) => (
            <GroceryList
              item={item}
              key={item.key}
              onDeleteItem={onDeleteItem}
              onToogleItem={onToogleItem}
            />
          ))}
        </ul>
      </div>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Urutkan berdasarkan urutan input</option>
          <option value="name">Urutkan berdasarkan nama barang</option>
          <option value="checked">Urutkan berdasarkan ceklis</option>
        </select>
        <button onClick={onClearItems}>Bersihkan Daftar</button>
      </div>
    </>
  );
}

function Footer({ items }) {
  const totalItem = items.length;
  const checkedItems = items.filter((item) => item.checked).length;
  const percentage = Math.round((checkedItems / totalItem) * 100);
  return (
    <footer className="stats">
      Ada {totalItem} barang di daftar belanjaan, {checkedItems} barang sudah
      dibeli ({percentage}%)
    </footer>
  );
}

export default function App() {
  const [items, setItems] = useState(groceryItems);

  function handleItem(item) {
    setItems([...items, item]);
  }

  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleToogleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  }

  function handClearItems() {
    setItems([]);
  }

  return (
    <>
      <div className="app">
        <Header />
        <Form onAddItem={handleItem} />
        <Grocery
          items={items}
          onDeleteItem={handleDeleteItem}
          onToogleItem={handleToogleItem}
          onClearItems={handClearItems}
        />
        <Footer items={items} />
      </div>
    </>
  );
}
