import React from "react";
import ItemTypes from "../ItemTypes/ItemTypes";
import { DragSource } from "react-dnd";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const style = {
  border: "2px solid black",
  padding: "0.5rem 1rem",
  marginRight: "1.5rem",
  marginBottom: "1.5rem",
  cursor: "move",
  float: "left",
  width: 180,
  height: 180,
  backgroundSize: "contain",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  backgroundColor: "white",
  borderRadius: 50
};

//value that determines if score is awarded.  If true and the player is correct a point is awarded, if false no points are awarded.
let firstTry = true;

const DraggableItem = ({
  name,
  isDragging,
  connectDragSource,
  label,
  backgroundImageURL
}) => {
  const opacity = isDragging ? 0 : 1;
  return (
    //disposable item draggable div that is displayed on screen
    <div
      ref={connectDragSource}
      style={{
        ...style,
        opacity,
        backgroundImage: `url("${backgroundImageURL}")`
      }}>
      {label}
    </div>
  );
};

let mapStateToProps = state => {
  return {
    items: state.gameItemsReducer,
    currentGameValue: state.currentGameValueReducer,
    gameItems: state.gameItemsReducer
  };
};

let DragNDrop = withRouter(
  connect(mapStateToProps)(
    DragSource(
      ItemTypes.BOX,
      {
        beginDrag: props => ({ name: props.name }),
        endDrag(props, monitor) {
          const item = monitor.getItem();
          const dropResult = monitor.getDropResult();
          //check to see if game is over, if so, push to results
          if (
            props.currentGameValue === props.items.length - 1 &&
            dropResult &&
            dropResult.name === item.name
          ) {
            //records how long it took player to finish game
            props.dispatch({
              type: "SET_GAME_END_TIME",
              payload: props.gameTime
            });
            if (
              firstTry === true
            ) {
              props.dispatch({
                type: "FIRST_TRY_CORRECT",
                payload: { id: props.items[props.currentGameValue].id}
              });
              firstTry = true;
            }
            //check to see if playing contest game, if so, push to results page
            //with contest ID in URL
            if (props.history.location.search) {
              props.history.push(`/results${props.history.location.search}`);
            } else {
              props.history.push("/results");
            }
          } else {
            //if correct on the first try
            if (
              dropResult &&
              dropResult.name == item.name &&
              firstTry === true
            ) {
              //increments score up by one on first attempt correct
              props.dispatch({
                type: "FIRST_TRY_CORRECT",
                payload: { id: props.items[props.currentGameValue].id }
              });
              //increments game value so the next item in the reducer is displayed
              props.dispatch({
                type: "INCREMENT_CURRENT_GAME_VALUE"
              });
              firstTry = true;
            }
            // if incorrect first try, will increment count for piece of trash up one, and will make you repeat until correct
            else if (
              dropResult &&
              dropResult.name !== item.name &&
              firstTry === true
            ) {
              firstTry = false;
              props.dispatch({
                type: "FIRST_TRY_INCORRECT",
                payload: { id: props.items[props.currentGameValue].id }
              });
              //puts item into the wrong answer reducer to be displayed on results screen after game is over
              props.dispatch({
                type: "ADD_WRONG_ANSWER",
                payload: props.items[props.currentGameValue]
              });
              //will tell you to keep trying until you get it correct to move onto the next item
            } else if (
              dropResult &&
              dropResult.name !== item.name &&
              firstTry === false
            ) {
              props.dispatch({
                type: "INCORRECT_ANSWER"
              });
            } else if (
              dropResult &&
              dropResult.name == item.name &&
              firstTry === false
            ) {
              //increments game value so the next item in the reducer is displayed
              props.dispatch({
                type: "INCREMENT_CURRENT_GAME_VALUE"
              });
              firstTry = true;
            }
          }
          //if block for receptacle animations

          //animates garbage can if the player is correct
          if (
            dropResult &&
            dropResult.name == item.name &&
            dropResult.name === "garbage"
          ) {
            props.dispatch({ type: "ANIMATE_GARBAGE_CORRECT" });
            setTimeout(() => {
              //resets animation value after 2 seconds
              props.dispatch({ type: "DEANIMATE_GARBAGE" });
            }, 2000);
            //animates garbage if player is wrong
          } else if (
            dropResult &&
            dropResult.name !== item.name &&
            dropResult.name === "garbage"
          ) {
            props.dispatch({ type: "ANIMATE_GARBAGE_INCORRECT" });
            setTimeout(() => {
              //resets animation value after 2 seconds
              props.dispatch({ type: "DEANIMATE_GARBAGE" });
            }, 2000);
            //animates recycling if player is correct
          } else if (
            dropResult &&
            dropResult.name == item.name &&
            dropResult.name === "recycle"
          ) {
            props.dispatch({ type: "ANIMATE_RECYCLE_CORRECT" });
            setTimeout(() => {
              //resets animation value after 2 seconds
              props.dispatch({ type: "DEANIMATE_RECYCLE" });
            }, 2000);
            //animates recycling if player is incorrect
          } else if (
            dropResult &&
            dropResult.name !== item.name &&
            dropResult.name === "recycle"
          ) {
            props.dispatch({ type: "ANIMATE_RECYCLE_INCORRECT" });
            setTimeout(() => {
              //resets animation value after 2 seconds
              props.dispatch({ type: "DEANIMATE_RECYCLE" });
            }, 2000);
            //animates compost if player is correct
          } else if (
            dropResult &&
            dropResult.name == item.name &&
            dropResult.name === "compost"
          ) {
            props.dispatch({ type: "ANIMATE_COMPOST_CORRECT" });
            setTimeout(() => {
              //resets animation value after 2 seconds
              props.dispatch({ type: "DEANIMATE_COMPOST" });
            }, 2000);
            //animates compost if player is incorrect
          } else if (
            dropResult &&
            dropResult.name !== item.name &&
            dropResult.name === "compost"
          ) {
            props.dispatch({ type: "ANIMATE_COMPOST_INCORRECT" });
            setTimeout(() => {
              //resets animation value after 2 seconds
              props.dispatch({ type: "DEANIMATE_COMPOST" });
            }, 2000);
          } else {
            return;
          }
        }
      },
      (connect, monitor) => ({
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
      })
    )(DraggableItem)
  )
);

export default DragNDrop;
