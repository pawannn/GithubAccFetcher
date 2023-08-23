import { useEffect, useState } from "react";
import DisplayUserData from "./components/DisplayUserData";
import DisplayRepoData from "./components/DisplayRepoData";
import Image from "next/image";
import githublogo from "../Assets/github.png";

const Main = () => {
  const [username, setUsername] = useState("iamshaunjp");
  const [userData, setUserData] = useState();
  const [repoData, setRepoData] = useState();

  const handleSubmit = () => {
    localStorage.setItem("username", username);
    fetch(`https://api.github.com/users/${username}`)
      .then((response) => response.json())
      .then((userResponse) => setUserData(userResponse));

    fetch(`https://api.github.com/users/${username}/repos`)
      .then((response) => response.json())
      .then((repoResponse) => setRepoData(repoResponse));
  };

  useEffect(() => {
    const username = localStorage.getItem("username");

    fetch(`https://api.github.com/users/${username ?? "iamshaunjp"}`)
      .then((response) => response.json())
      .then((userResponse) => setUserData(userResponse));

    fetch(`https://api.github.com/users/${username ?? "iamshaunjp"}/repos`)
      .then((response) => response.json())
      .then((repoResponse) => setRepoData(repoResponse));
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
              console.log("Enter key pressed");
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
