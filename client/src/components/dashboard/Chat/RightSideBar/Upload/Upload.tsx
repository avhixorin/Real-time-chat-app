import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/Redux/store";
import { setLoginUser } from "@/Redux/features/userSlice";

interface UploadProps {
  cancelUpload: () => void;
  setUploadClicked:(value: boolean) => void;
}

const Upload: React.FC<UploadProps> = ({ cancelUpload, setUploadClicked }) => {
  const loggedInUser = useSelector((state: RootState) => state.loggedInUser);
  const [isUploading, setIsUploading] = useState(false);
  const dispatch = useDispatch();

  const handleUpload = async () => {
    setIsUploading(true);
    const fileInput = document.getElementById("file-input") as HTMLInputElement;
    const file = fileInput.files?.item(0);

    if (file) {
      try {
        // Use FormData to send file in the body of the request
        const formData = new FormData();
        formData.append("avatar", file); 
        formData.append("userId", loggedInUser._id);


        const response = await fetch("http://localhost:3000/api/v1/users/upload", {
          method: "POST",
          credentials: "include", // Send cookies if needed
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        dispatch(setLoginUser(data.user));
        console.log(data);
        setUploadClicked(false);
        fileInput.value = "";

      } catch (error) {
        console.log("Error during file upload:", error);
        
      } finally {
        setIsUploading(false); // Ensure uploading state is reset
      }
    } else {
      alert("No file selected");
      setIsUploading(false); // Reset if no file is selected
    }
  };

  return (
    <StyledWrapper>
      <div className="overlay">
        <form className="form">
          <span className="form-title">Upload your file</span>
          <p className="form-paragraph">File should be an image</p>
          <label htmlFor="file-input" className="drop-container">
            <span className="drop-title">Drop files here</span>
            or
            <input type="file" accept="image/*" required id="file-input" />
          </label>

          {/* Button Section */}
          <div className="button-container">
            <button
              type="button"
              className="upload-button"
              onClick={handleUpload}
              disabled={isUploading}
            >
              {isUploading ? "Uploading..." : "Upload"}
            </button>
            <button
              type="button"
              className="cancel-button"
              onClick={cancelUpload}
              disabled={isUploading}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.4); /* Semi-transparent background */
  z-index: 9999; /* Ensure it's on top of everything */
  
  .overlay {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    backdrop-filter: blur(10px); /* Blur the background */
  }

  .form {
    background-color: #fff;
    box-shadow: 0 10px 60px rgb(218, 229, 255);
    border: 1px solid rgb(159, 159, 160);
    border-radius: 20px;
    padding: 2rem 1rem; /* Adjusted padding for a more spacious layout */
    text-align: center;
    font-size: 1.125rem;
    max-width: 400px; /* Increased width */
    z-index: 10000; /* Ensure form is above the blur */
  }

  .form-title {
    color: #000000;
    font-size: 1.8rem;
    font-weight: 500;
  }

  .form-paragraph {
    margin-top: 10px;
    font-size: 0.9375rem;
    color: rgb(105, 105, 105);
  }

  .drop-container {
    background-color: #fff;
    position: relative;
    display: flex;
    gap: 10px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px;
    margin-top: 2.1875rem;
    border-radius: 10px;
    border: 2px dashed rgb(171, 202, 255);
    color: #444;
    cursor: pointer;
    transition: background 0.2s ease-in-out, border 0.2s ease-in-out;
  }

  .drop-container:hover {
    background: rgba(0, 140, 255, 0.164);
    border-color: rgba(17, 17, 17, 0.616);
  }

  .drop-container:hover .drop-title {
    color: #222;
  }

  .drop-title {
    color: #444;
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    transition: color 0.2s ease-in-out;
  }

  #file-input {
    width: 350px;
    max-width: 100%;
    color: #444;
    padding: 2px;
    background: #fff;
    border-radius: 10px;
    border: 1px solid rgba(8, 8, 8, 0.288);
  }

  #file-input::file-selector-button {
    margin-right: 20px;
    border: none;
    background: #084cdf;
    padding: 10px 20px;
    border-radius: 10px;
    color: #fff;
    cursor: pointer;
    transition: background 0.2s ease-in-out;
  }

  #file-input::file-selector-button:hover {
    background: #0d45a5;
  }

  .button-container {
    display: flex;
    justify-content: space-between;
    margin-top: 1.5rem; /* Space between drop container and buttons */
  }

  .upload-button,
  .cancel-button {
    padding: 10px 20px;
    border-radius: 10px;
    border: none;
    cursor: pointer;
    transition: background 0.2s ease-in-out;
  }

  .upload-button {
    background-color: #4caf50; /* Green */
    color: white;
  }

  .upload-button:hover {
    background-color: #45a049; /* Darker green */
  }

  .cancel-button {
    background-color: #f44336; /* Red */
    color: white;
  }

  .cancel-button:hover {
    background-color: #e53935; /* Darker red */
  }
`;

export default Upload;
