import { useState } from "react";

/* eslint-disable react/prop-types */
const GroceryItem = ({ item, handleEditItem, handleDeleteItem }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newItem, setNewItem] = useState(item.name);
  const [errors, setErrors] = useState("");

  const onEdit = () => {
    if (newItem) {
      handleEditItem(item.id, newItem);
      setIsEditing(false);
      setErrors("");
    } else {
      setErrors("Grocery item must not be empty.");
    }
  };
  return (
    <>
      <li className="p-[.5rem] border-b last:border-b-0 border-[#cccccc] flex items-center font-semibold justify-between">
        {isEditing ? (
          <input
            className="flex-1 p-2 border border-[#cccccc rounded-md]"
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
          />
        ) : (
          <span>{item.name}</span>
        )}

        <div className="flex gap-2">
          <button
            className="bg-yellow-500 text-[$ffffff] px-3 py-2 rounded-md text-[#ffffff]"
            onClick={() => {
              isEditing ? onEdit() : setIsEditing(true);
            }}
          >
            {isEditing ? "Save" : "Edit"}
          </button>
          <button
            className="bg-red-500 py-2 px-3 rounded-md text-[#ffffff]"
            onClick={() => handleDeleteItem(item.id)}
          >
            Delete
          </button>
        </div>
      </li>
      {errors ? <p className="text-red-500 text-sm mt-1">{errors}</p> : null}
    </>
  );
};

export default GroceryItem;
