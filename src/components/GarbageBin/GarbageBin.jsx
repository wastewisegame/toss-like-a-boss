import React from "react";
import { DropTarget } from "react-dnd";
import ItemTypes from "../ItemTypes/ItemTypes";
import GarbageSvg from "../../icons/GarbageFilled";


const style = {
  height: "auto",
  width: "12rem",
  marginRight: "1.5rem",
  marginBottom: "1.5rem",
  color: "white",
  padding: "1rem",
  textAlign: "center",
  fontSize: "1rem",
  lineHeight: "normal",
  float: "left",
  borderRadius: "20px",
  fontFamily: "truckin"
};

//sets attributes so garbage div is draggable
const GarbageBin = ({ canDrop, isOver, connectDropTarget }) => {
  const isActive = canDrop && isOver;
  let backgroundColor = "rgb(189,183,107,.6)";
  if (isActive) {
    //changes background color to darkgreen when being dragged
    backgroundColor = "darkgreen";
  } else if (canDrop) {
    backgroundColor = "darkkhaki";
  }
  return (
    <div ref={connectDropTarget} style={{ ...style, backgroundColor }}>
        <h2>Garbage</h2>
        <GarbageSvg />
    </div>
  );
};
export default DropTarget(
  ItemTypes.BOX,
  {
    drop: () => ({ name: 'garbage' })
  },
  (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  })
)(GarbageBin);
