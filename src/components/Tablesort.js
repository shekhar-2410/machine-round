// filter Table
import React, { useState, useEffect } from "react";

const FilterTable = () => {
  const [product, setProduct] = useState([]);
  const [sortIcon, setshowIcon] = useState(true);
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState("");

  const productData = async () => {
    try {
      const fetchData = await fetch("https://dummyjson.com/products");
      const data = await fetchData.json();
      setProduct(
        data.products.sort((a, b) => {
          if (!a.brand) return 1;
          if (!b.brand) return -1;
          return a.brand.localeCompare(b.brand);
        })
      );
    } catch (err) {
      console.log(err);
    }
  };
  // sort-product
  const sortProduct = () => {
    setProduct((prev) =>
      [...prev].sort((a, b) => {
        if (!a.brand) return 1;
        if (!b.brand) return -1;
        return sortIcon
          ? b.brand.localeCompare(a.brand)
          : a.brand.localeCompare(b.brand);
      })
    );
    setshowIcon(!sortIcon);
  };
  // filter table
  const filterTable = product.filter((item) => {
    const Category = category ? item.category.includes(category) : true;
    const ratingMatch = rating ? item.rating >= rating : true;
    return Category && ratingMatch;
  });
  useEffect(() => {
    productData();
  }, []);

  return (
    <div>
      <h1>Table with Filter and Sort</h1>
      <div
        style={{
          display: "flex",
          gap: "30px",
          marginBottom: "30px",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "10px",
            height: "20px",

            alignItems: "center",
          }}
        >
          <h4>Category</h4>
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          >
            {product.map((item) => (
              <option key={item.id} value={item.category}>
                {item?.category}
              </option>
            ))}
          </select>
        </div>
        <div
          style={{
            display: "flex",
            gap: "10px",
            height: "20px",

            alignItems: "center",
          }}
        >
          <h4>Rating</h4>
          <select
            value={rating}
            onChange={(e) => {
              setRating(e.target.value);
            }}
          >
            {product.map((item) => (
              <option key={item.id} value={item.rating}>
                {item?.rating}
              </option>
            ))}
          </select>
        </div>
      </div>

      <table style={{ width: "100%", height: "100vh" }}>
        <thead style={{ background: "orange" }}>
          <th style={{ padding: "10px" }}>
            <span>
              Brand{" "}
              <button onClick={sortProduct}>{sortIcon ? "⬇" : "⬆"}</button>
            </span>
          </th>
          <th>Category</th>
          <th>Price</th>
          <th>Rating</th>
          <th>Discount</th>
        </thead>
        <tbody>
          {filterTable?.map((item) => (
            <tr
              style={{
                background: "gray",
                color: "#fff",
              }}
              key={item?.id}
            >
              <td style={{ padding: "10px", textAlign: "center" }}>
                {item?.category === "groceries" ? "Unkown" : item?.brand}
              </td>
              <td td style={{ padding: "10px", textAlign: "center" }}>
                {item?.category}
              </td>
              <td
                td
                style={{ padding: "10px", textAlign: "center" }}
              >{`${item?.price}$`}</td>
              <td
                td
                style={{ padding: "10px", textAlign: "center" }}
              >{`${item?.rating}`}</td>
              <td
                td
                style={{ padding: "10px", textAlign: "center" }}
              >{`${item?.discountPercentage}%`}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FilterTable;
