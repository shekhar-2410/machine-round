import React, { useState, useEffect } from "react";
import "./App.css";
import "ka-table/style.scss";
import explorer from "./data/folder_d";
import FolderData from "./components/FolderData";
import Pagination from "./components/Pagination";
import ProgressBar from "./components/ProgressBar";
// import Calculator from "./components/Calculator";
// import StarRating from "./components/StarRating";
// import AddressForm from "./components/UserLocation";
// import MultitepForm from "./components/MultitepForm";
// import ShoppingList from "./components/ShoppingList";
// import Slider from "./components/Slider";
// import Two_StepVerification from "./components/Two_StepVerification";
// import Emical from "./components/Emical";
// import ModalComponet from "./components/ModalComponet";
// import GoogleSeach from "./components/GoogleSeach";
// import EmployeDatabase from "./components/EmployeDatabase";
// import Coundountimer from "./components/Coundountimer";
// import FaqComponent from "./components/FaqComponent";
// import Timer from "./components/Timer";
// import Undoablecounter from "./components/Undoablecounter";
// import GridComponent from "./components/Grid";
import SortableTableWithGraphs from "./components/ReactTable";

function App() {
  const [explorers, setExplorer] = useState(explorer);
  const [value, setValue] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setValue((prevValue) => {
        if (prevValue < 100) {
          return prevValue + 1;
        } else {
          clearInterval(interval);
          return prevValue;
        }
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="App">
      {/* <GoogleSeach /> */}
      {/* <EmployeDatabase /> */}
      {/* <Coundountimer /> */}
      {/* <FaqComponent /> */}
      {/* <Timer /> */}
      {/* <Emical /> */}
      {/* <ModalComponet /> */}
      {/* <Undoablecounter /> */}
      {/* <ShoppingList /> */}
      {/* <MultitepForm/> */}
      {/* <Slider/> */}
      {/* <Two_StepVerification /> */}
      {/* <Calculator/> */}
      {/* <StarRating/> */}
      {/* <FolderData explorer={explorers}/> */}
      {/* <Pagination/> */}
      {/* <ProgressBar value={value} />
       */}
      {/* <GridComponent />
       */}
      <SortableTableWithGraphs />
    </div>
  );
}

export default App;
