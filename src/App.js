import React , {useState} from "react";
import "./App.css";
import explorer from "./data/folder_d";
import FolderData from "./components/FolderData";
import Pagination from "./components/Pagination";
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


function App() {
  const [explorers, setExplorer] = useState(explorer);
  return (
    <div className="App">
      {/* <GoogleSeach /> */}
      {/* <EmployeDatabase /> */}
      {/* <Coundountimer /> */}
      {/* <FaqComponent/> */}
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
      <Pagination/>
      
    </div>
  );
}

export default App;
