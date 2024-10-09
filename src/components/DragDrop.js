import react, { useState } from "react";

const items = ["List1", "List2", "List3"];
const DragDropComp = () => {
  const [dragItem, setDragItem] = useState(items);
  const [widget, setWidget] = useState([]);

  function handleOnDrag(e, widgetType) {
    e.dataTransfer.setData("widgetType", widgetType);
  }
  function handleOnDrop(e) {
    const widgetType = e.dataTransfer.getData("widgetType");
    setDragItem((prev) => prev.filter((item) => item !== widgetType));
    setWidget([...widget, widgetType]);
  }
  function handleDragOver(e) {
    e.preventDefault();
  }

  return (
    <div style={{ maxWidth: "1250px" }}>
      <div style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            width: "300px",
            padding: "8px",
            background: "yellow",
            marginTop: "10px",
          }}
        >
          <h2>Drag Box</h2>
          {dragItem.length > 0 &&
            dragItem.map((item, id) => (
              <div
                key={id}
                draggable
                onDragStart={(e) => {
                  handleOnDrag(e, item);
                }}
                style={{ background: "orange", border: "1px dotted white" }}
              >
                <p>{item}</p>
              </div>
            ))}
        </div>
        <div>
          <h2>Drop Box</h2>
          <div
            onDrop={handleOnDrop}
            onDragOver={handleDragOver}
            style={{
              background: "black",
              border: "1px dotted white",
              height: "300px",
              width: "600px",
              padding: "8px",
            }}
          >
            {widget.length &&
              widget.map((item, index) => (
                <div
                  key={index}
                  style={{
                    background: "orange",
                    border: "1px dotted white",
                    marginBottom: "5px",
                  }}
                >
                  <p>{item}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DragDropComp;
