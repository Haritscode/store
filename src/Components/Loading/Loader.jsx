import React from "react";
import { GridLoader } from "react-spinners";
export default function Loader() {
  return (
    <>
    <div style={{display:"flex", alignItems:"center", justifyContent:"center",height:"100%",width:"100%",position:'fixed',top:"0"}}>
      <GridLoader color="rgba(214, 169, 54, 1)"/>
      </div>
    </>
  );
}
