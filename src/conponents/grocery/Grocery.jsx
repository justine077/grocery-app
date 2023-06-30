import { useRef, useState } from "react";
import { v4 as uuid } from "uuid";
import GroceryItemComponent from "../groceryItem/GroceryItemComponent";
const Grocery = () => {
  const inputRef = useRef();
  const [item, setItem] = useState("");
  const [groceryItems, setGroceryItems] = useState([]);
  const [errors, setErrors] = useState("");

  const handleAddItem = () => {
    try {
      if (item) {
        setGroceryItems([...groceryItems, { id: uuid(), name: item }]);
        setItem("");
        setErrors("");
      } else {
        throw new Error("Grocery item cannot be empty.");
      }
    } catch (error) {
      setErrors(error.message);
    }
    inputRef.current.focus();
  };

  //EditItem
  const handleEditItem = (id, newItem) => {
    try {
      const updatedGroceryItems = groceryItems.map((item) => {
        if (item.id === id) {
          return { ...item, name: newItem };
        }
        return item;
      });
      setGroceryItems(updatedGroceryItems);
    } catch (error) {
      // Handle any potential errors here
      console.error(error);
    }
  };

  //deleteItem
  const handleDeleteItem = (removeId) => {
    try {
      const filteredItems = groceryItems.filter((item) => item.id !== removeId);
      setGroceryItems(filteredItems);
    } catch (error) {
      // Handle the error here
      console.error("An error occurred:", error);
      // Optionally, you can rethrow the error to propagate it further
      // throw error;
    }
  };

  //clearItem
  const handleClearItems = () => {
    try {
      setGroceryItems([]);
    } catch (error) {
      // Handle the error here, e.g., logging or displaying an error message
      console.error("Error occurred while clearing grocery items:", error);
    }
  };

  return (
    <div className="grocery-buddy flex flex-col items-center w-full max-w-[600px] p-[2rem] bg-[#ffffff] rounded-md shadow-md">
      <h1 className="mb-[2rem]">Grocery Buddy</h1>
      <div className="input-section flex flex-col justify-between w-full mb-[1rem]">
        <div className="input-container flex justify-between">
          <input
            ref={inputRef}
            className="flex-1 p-[.5rem] border border-[#cccccc] rounded-[4px]"
            type="text"
            placeholder="Enter an item..."
            value={item}
            onChange={(e) => setItem(e.target.value)}
          />
          <button
            className="btn-add ml-[1rem] py-[.5rem] px-[1.5rem] text-[#ffffff] rounded-md cursor-pointer border-none bg-blue-500 font-semibold"
            onClick={handleAddItem}
          >
            Add Item
          </button>
        </div>
        <div>
          {errors ? <p className="text-red-500 text-sm mt-1">{errors}</p> : null}
        </div>
      </div>
      <ul className="grocery-list w-full list-none p-0">
        {groceryItems.map((item) => (
          <GroceryItemComponent
            key={item.id}
            item={item}
            handleEditItem={handleEditItem}
            handleDeleteItem={handleDeleteItem}
          />
        ))}
      </ul>
      {groceryItems.length > 0 ? (
        <button
          className="border border-red-500 px-5 py-2 text-red-500 rounded-md text-[16px] cursor-pointer mt-7 font-medium"
          onClick={handleClearItems}
        >
          Clear Grocery Items
        </button>
      ) : null}
    </div>
  );
};

export default Grocery;
