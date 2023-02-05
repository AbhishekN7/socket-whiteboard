import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const Board = () => {
  const [canvas, setCanvas] = useState(null);
  const [context, setContext] = useState(null);
  const [color, setColor] = useState("purple");
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPoint, setLastPoint] = useState({ x: 0, y: 0 });
  const socket = io("http://localhost:3000");

  useEffect(() => {
    setCanvas(document.getElementById("whiteboard"));
    if (canvas) {
      setContext(canvas.getContext("2d"));
      console.log("hey");
    }

    socket.on("draw", (start, end, color) => {
      context.beginPath();
      context.strokeStyle = color;
      context.moveTo(start.x, start.y);
      context.lineTo(end.x, end.y);
      context.stroke();
    });
  }, [canvas]);

  const handleColorChange = (color) => {
    setColor(color);
  };

  const draw = (start, end) => {
    context.beginPath();
    context.strokeStyle = color;
    context.moveTo(start.x, start.y);
    context.lineTo(end.x, end.y);
    context.stroke();
    socket.emit("draw", start, end, color, (val) => {
      console.warn("recieved" + val);
    });
  };

  const handleMouseDown = () => {
    setIsDrawing(true);
    console.log("wdasd");
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
    console.log("up");
  };

  const handleDraw = ({ nativeEvent }) => {
    const x = nativeEvent.offsetX;
    const y = nativeEvent.offsetY;
    draw({ x, y }, { x, y });
  };

  const handleMouseMove = ({ nativeEvent }) => {
    if (!isDrawing) return;
    const x = nativeEvent.offsetX;
    const y = nativeEvent.offsetY;
    draw({ x, y }, lastPoint);
    setLastPoint({ x, y });
  };

  return (
    <div>
      <h3>Online Tutoring whiteboard</h3>
      <div>
        <button onClick={() => handleColorChange("black")}>Black</button>
        <button onClick={() => handleColorChange("red")}>Red</button>
        <button onClick={() => handleColorChange("green")}>Green</button>
        <button onClick={() => handleColorChange("blue")}>Blue</button>
      </div>
      <canvas
        id="whiteboard"
        width={1500}
        height={1000}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseOut={handleMouseUp}
        onClick={handleDraw}
      />
    </div>
  );
};

export default Board;
