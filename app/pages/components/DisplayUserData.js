import Image from "next/image";
import user from "../../Assets/user.png";
import twitter from "../../Assets/twitter.png";
import location from "../../Assets/location.png";
import work from "../../Assets/work.png";
import website from "../../Assets/website.png";
import Email from "../../Assets/email.png";
import Repo from "../../Assets/repo.png";
import Followers from "../../Assets/followers.png";
import Following from "../../Assets/following.png";

const DisplayUserData = ({ userData }) => {
  return (
    <div className="user-data">
      <div className="left">
        <div className="user-data__avatar">
          <img src={userData.avatar_url} alt="User Avatar" />
        </div>
        <div className="user-data__info">
          <a href={userData.html_url}>@{userData.login}</a>
        </div>
      </div>
      <div className="right">
        <h2>User Details</h2>
        <div className="grid-container">
          <div className="item">
            <Image src={user} alt="user icon" width={25} height={25} />
            <p>{userData?.name}</p>
          </div>
          <div className="item">
            <Image src={location} alt="location icon" width={25} height={25} />
            <p>{userData?.location}</p>
          </div>
          <div className="item">
            <Image src={work} alt="work icon" width={25} height={25} />
            <p>{userData?.company}</p>
          </div>
          <div className="item">
            <Image src={Email} alt="email" width={25} height={25} />
            <p>{userData?.email ?? "Not Found"}</p>
          </div>
          <div className="item">
            <Image src={website} alt="website icon" width={25} height={25} />
            <a href={userData?.blog} target="_blank">
              Click Here
            </a>
          </div>
          <div className="item">
            <Image src={twitter} alt="twitter icon" width={25} height={25} />
            <a
              href={`https://twitter.com/${userData?.twitter_username}/`}
              target="_blank"
            >
              {userData?.twitter_username}
            </a>
          </div>
          <div className="item">
            <Image src={Repo} alt="repo icon" width={25} height={25} />
            <p>{userData?.public_repos}</p>
          </div>
          <div className="item">
            <Image
              src={Followers}
              alt="followers icon"
              width={25}
              height={25}
            />
            <p>{userData?.followers}</p>
          </div>
          <div className="item">
            <Image
              src={Following}
              alt="following icon"
              width={25}
              height={25}
            />
            <p>{userData?.following}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayUserData;
