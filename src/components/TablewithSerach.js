import React, { useState, useEffect } from "react";


export default function TableWithSearch() {
  const [user, setUser] = useState([]);
  const [filterUser, setfilterUser] = useState("");
  const [currentPage, setcurrentPage] = useState(1);
  const [itemPerpage, setitemPerpage] = useState(10);

  const fetchUser = async () => {
    try {
      const apidata = await fetch("https://jsonplaceholder.typicode.com/users");
      const data = await apidata.json();

      setUser(data);
    } catch (err) {
      console.log(err);
    }
  };
  const searchHandler = (e) => {
    setfilterUser(e.target.value);
  };
  const filtersearchUser = user.filter((item) =>
    item?.name.toLowerCase().includes(filterUser.toLowerCase())
  );
  const startIndex = (currentPage - 1) * itemPerpage;
  const lastIndex = startIndex + itemPerpage;
  const dataPage = filtersearchUser.slice(startIndex, lastIndex);
  
  const next = () => {
    setcurrentPage((prev) => prev + 1);
  };
  const prev = () => {
    setcurrentPage((prev) => prev - 1);
  };

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <div className="App">
      <h1 style={{ textTransform: "capitalize", textDecoration: "underline" }}>
        Table with search Filter
      </h1>
      <div>
        <input
          onChange={searchHandler}
          type="search"
          placeholder="search..."
          style={{
            width: "70%",
            height: "40px",
            border: "2px solid gray",
            borderRadius: "5px",
            paddingInline: "5px",
          }}
        />
        <table style={{ marginTop: "30px", width: "100%" }}>
          <thead style={{ background: "yellow", height: "50px" }}>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Website</th>

            <th>Company</th>
          </thead>
          <tbody>
            {dataPage?.length > 0 &&
              dataPage?.map((item) => (
                <tr
                  key={item.id}
                  style={{
                    background: "skyblue",
                    height: "40px",
                    marginTop: "-20px",
                  }}
                >
                  <td>{item?.name}</td>
                  <td>{item?.email}</td>
                  <td>{item?.address.city}</td>
                  <td>{item?.phone}</td>
                  <td>{item?.website}</td>
                  <td>{item?.company.name}</td>
                </tr>
              ))}
          </tbody>
        </table>
        <div>
          <button onClick={prev}>previous</button>
          <button onClick={next}>next</button>
        </div>
      </div>
    </div>
  );
}
