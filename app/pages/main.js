import { useEffect, useState } from "react";
import DisplayUserData from "./components/DisplayUserData";
import DisplayRepoData from "./components/DisplayRepoData";
import Image from "next/image";
import githublogo from "../Assets/github.png";
import axios from 'axios';

const Main = () => {

  //State variables for managing user and repository data
  const [username, setUsername] = useState("pawannn");
  const [userData, setUserData] = useState();
  const [repoData, setRepoData] = useState();

  //Function to handle the submit button
  const handleSubmit = async () => {
    try {
      localStorage.setItem("username", username);

      const userResponse = await axios.get(`https://api.github.com/users/${username}`);
      setUserData(userResponse.data);

      const repoResponse = await axios.get(`https://api.github.com/users/${username}/repos`);
      setRepoData(repoResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const username = localStorage.getItem("username") || "pawannn";

    axios.get(`https://api.github.com/users/${username}`)
      .then((response) => setUserData(response.data))
      .catch((error) => console.error("Error fetching user data:", error));

    axios.get(`https://api.github.com/users/${username}/repos`)
      .then((response) => setRepoData(response.data))
      .catch((error) => console.error("Error fetching repo data:", error));
    }, []);

  return (
    <div className="main">
      <div className="search">
        <Image
          style={{ cursor: "pointer" }}
          src={githublogo}
          onClick={() => {
            window.location.href = "https://github.com/";
          }}
          alt="github logo"
          width={80}
          height={45}
        />
        <input
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit();
            }
          }}
          type="text"
          placeholder="Enter Github Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <button onClick={handleSubmit}>Search</button>
      </div>
      <div className="displayUserData">
        {userData && <DisplayUserData userData={userData} />}
      </div>
      <div className="displayRepoData">
        {repoData && <DisplayRepoData repoData={repoData} />}
      </div>
    </div>
  );
};

export default Main;
