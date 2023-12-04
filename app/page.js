"use client";
import React, { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDoc,
  onSnapshot,
  QuerySnapshot,
  query,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "./firebase";

export default function Home() {
  const [items, setItems] = useState([
    // { name: "Coffe", price: 4.0 },
    // { name: "Beard", price: 6.5 },
    // { name: "Milk", price: 8.0 },
    // { name: "Milk", price: 8.0 },
  ]);

  const [total, setTotal] = useState(0);

  const [newItem, setNewItem] = useState({ name: "", price: "" });
  // add item to database
  const addItem = async (e) => {
    e.preventDefault();
    if (newItem.name !== " " && newItem.price !== " ") {
      // setItesms([...items, newItem]);
      await addDoc(collection(db, "items"), {
        name: newItem.name.trim(),
        price: newItem.price,
      });
      setNewItem({ name: " ", price: " " });
    }
  };

  // read item form database
  useEffect(() => {
    const q = query(collection(db, "items"));
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      let itemArr = [];

      QuerySnapshot.forEach((doc) => {
        itemArr.push({ ...doc.data(), id: doc.id });
      });
      setItems(itemArr);

      // Read total form database
      const calculateTotal = () => {
        const totalPrice = itemArr.reduce(
          (sum, item) => sum + parseFloat(item.price),
          0
        );
        setTotal(totalPrice);
      };
      calculateTotal();
      return () => unsubscribe();
    });
  }, []);

  // delete item from database
  const deleteItem = async (id) => {
    await deleteDoc(doc(db, "items", id));
  };

  return (
    <>
      <main className="w-full h-screen flex flex-col items-center justify-center">
        <div className="w-full md:max-w-lg justify-between font-mono text-sm ">
          <h1 className="text-4xl text-center font-bold">myCurrent</h1>

          <div className="bg-slate-800 p-4 rounded-lg my-3 w-full">
            <form className="grid grid-cols-6 items-center text-black w-full">
              <input
                value={newItem.name}
                onChange={(e) =>
                  setNewItem({ ...newItem, name: e.target.value })
                }
                type="text"
                autoFocus
                className="col-span-3 p-3 border"
                placeholder="Items"
              ></input>
              <input
                value={newItem.price}
                onChange={(e) =>
                  setNewItem({ ...newItem, price: e.target.value })
                }
                type="number"
                min={0}
                maxLength={12}
                className="col-span-2 p-3 border"
                placeholder="current - Rp."
              ></input>
              <button
                onClick={addItem}
                type="submit"
                className="text-white bg-slate-900 p-3 text-xl"
              >
                +
              </button>
            </form>
            <ul>
              {items.map((item, id) => (
                <li
                  key={item.id}
                  className="my-4 flex justify-between w-full bg-slate-950 text-white"
                >
                  <div className="p-4 flex justify-between w-full">
                    <span className="capitalize">{item.name}</span>
                    <span>Rp.{item.price}</span>
                  </div>
                  <button
                    onClick={() => deleteItem(item.id)}
                    className="ml-8 p-4 border-l-2 border-slate-900 hover:bg-slate-900"
                  >
                    X
                  </button>
                </li>
              ))}
            </ul>
            {items.length < 1 ? (
              " "
            ) : (
              <div className="flex justify-between">
                <span>Total</span>
                <span>Rp.{total}</span>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
