import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import styled from "styled-components";
import SearchCard from "./SearchCard";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/store";

const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const allUsers = useSelector((state: RootState) => state.allUsers.allUsers);

  const filteredUsers = useMemo(() => {
    return allUsers.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [allUsers, searchTerm]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // const handleClickOutside = useCallback((e: MouseEvent) => {
  //   if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
  //     setSearchTerm(""); 
  //   }
  // }, []);

  // useEffect(() => {
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => document.removeEventListener("mousedown", handleClickOutside);
  // }, [handleClickOutside]);

  return (
    <StyledWrapper>
      <div className="InputContainer">
        <input
          ref={inputRef}
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Search for friends..."
          className="input"
          type="text"
        />
        <label className="labelforsearch" htmlFor="input">
          <svg className="searchIcon" viewBox="0 0 512 512">
            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
          </svg>
        </label>
      </div>
      
      {searchTerm && (
        <div className="dropdown">
          {filteredUsers.map((user) => (
            <SearchCard
              key={user._id}
              userId={user._id}
              name={user.name}
              imgSrc="http://res.cloudinary.com/avhixorin/image/upload/v1726055586/uhx8qpqutwbyq2yqtsyj.jpg"
            />
          ))}
        </div>
      )}
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  position: relative;
  width: 60%;

  .InputContainer {
    height: 40px;
    display: flex;
    align-items: center;
    background-color: white;
    border-radius: 10px;
    padding-left: 15px;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.075);
    width: 100%;
  }

  .input {
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    font-size: 0.9em;
    caret-color: rgb(255, 81, 0);
  }

  .labelforsearch {
    cursor: text;
    padding: 0px 12px;
  }

  .searchIcon {
    width: 13px;
  }

  .dropdown {
    position: absolute;
    top: 50px;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.85);
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(5px);
    border-radius: 8px;
    z-index: 10;
  }
`;

export default SearchBar;
