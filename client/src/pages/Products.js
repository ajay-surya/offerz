import React, { useEffect, useState } from "react";
import "../App.css";

function Products() {
  const [image, setImage] = useState("");
  const [allImage, setAllImage] = useState([]);

  function convertToBase64(e) {
    console.log(e);
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      console.log(reader.result);
      setImage(reader.result);
    };
    reader.onerror = (error) => {
      console.log("Error: ", error);
    };
  }

  useEffect(() => {
    getImage();
  }, [image]);

  function uploadImage() {
    console.log("asas");
    fetch("http://localhost:8080/api/fetch/upload-image", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        base64: image,
        
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }

  function getImage() {
    fetch("http://localhost:8080/api/fetch/get-image", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setAllImage(data.data);
      });
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-inner" styles={{ width: "auto" }}></div>
      Let's Upload Image
      <br />
      <input accepts="image/*" type="file" onChange={convertToBase64}></input>
      {image == "" || image == null ? (
        ""
      ) : (
        <img width={100} height={100} src={image}></img>
      )}
      <button onClick={uploadImage}>Upload</button>
      {allImage.map((data) => {
        return <img width={100} height={100} src={data.image} />;
      })}
    </div>
  );
}
export default Products;
