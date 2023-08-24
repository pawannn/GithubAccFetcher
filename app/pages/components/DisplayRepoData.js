import React, { useEffect, useState } from "react";
import DisplayGraph from "./DisplayGraph";
import DisplayStarChart from "./DisplayStarChart";
import DisplayForkChart from "./DisplayForkChart";
import Contributors from "./contributors";
import Image from "next/image";
import Star from "../../Assets/star.png";
import Calender from "../../Assets/calender.png";
import Fork from "../../Assets/fork.png";

const DisplayRepoData = ({ repoData }) => {
  const [openRepoIndex, setOpenRepoIndex] = useState(null);
  const [countPage, setCountPage] = useState(1);
  const [repoList, setRepoList] = useState();
  const [selectedAnalysis, setSelectedAnalysis] = useState('star');

  const totalPage = Math.ceil(repoData.length / 5);

  const toggleRepo = (index) => {
    if (openRepoIndex === index) {
      setOpenRepoIndex(null);
    } else {
      setOpenRepoIndex(index);
    }
  };

  useEffect(() => {
    if(repoData && repoData?.length > 0) { 
        setRepoList(repoData?.slice(0, 5));
    }
    else {
        setRepoList([]);
    }
    
  }, [repoData]);

  return (
    <div className="repo-data">
      <h2>Repositories</h2>
      { 
      repoList?.length === 0 ? ("No Data Found") : (
        repoList?.map((repo, index) => (
          <div key={index} className="repo">
            <div className="cover" onClick={() => toggleRepo(index)}>
              <h3>{repo?.name}</h3>
              <div className="repo-overview">
                <div className="item">
                  <Image
                    src={Calender}
                    alt="calender icon"
                    width={20}
                    height={20}
                  />
                  <p>{repo?.created_at?.slice(0, 10)}</p>
                </div>
                <div className="item">
                  <Image src={Star} alt="star icon" width={20} height={20} />
                  <p>{repo?.stargazers_count}</p>
                </div>
                <div className="item">
                  <Image src={Fork} alt="fork icon" width={20} height={20} />
                  <p>{repo?.forks}</p>
                </div>
              </div>
            </div>
            {openRepoIndex === index && (
              <div className="repo-details">
                <div className="description">
                  <p>{repo?.description}</p>
                  <a
                    href={repo?.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="github-re"
                  >
                    View on Github
                  </a>
                  <div className="contributors">
                    <h3> Contributors : </h3>
                    <Contributors contributor_url={repo?.contributors_url} />
                  </div>
                </div>
                <div className="graph-details">
                  <h3>Languages</h3>
                  <DisplayGraph
                    repo_name={repo?.name}
                    owner_name={repo?.owner.login}
                  />
                </div>
              </div>
            )}
          </div>
        ))
      )
      }
      

      <div className="pagination">
        <button
          disabled={countPage === 1}
          onClick={() => {
            if (countPage > 1) {
              setCountPage(countPage - 1);
              setRepoList(
                repoData?.slice((countPage - 2) * 5, (countPage - 1) * 5)
              );
            }
          }}
        >
          Prev
        </button>
        <h3>
          {countPage} of {totalPage}
        </h3>
        <button
          disabled={countPage === totalPage}
          onClick={() => {
            if (countPage < totalPage) {
              setCountPage(countPage + 1);
              setRepoList(repoData?.slice(countPage * 5, (countPage + 1) * 5));
            }
          }}
        >
          Next
        </button>
      </div>

      <div className="repo-analysis">

        <label>
        <select value={selectedAnalysis} onChange={() => {setSelectedAnalysis(event.target.value);}}>
            <option value="star">Star Repo Analysis</option>
            <option value="fork">Fork Repo Analysis</option>
          </select>
        </label>

        {selectedAnalysis === 'star' ? (
          <DisplayStarChart reposData={repoData} />
        ) : (
          <DisplayForkChart reposData={repoData} />
        )}
      </div>
    </div>
  );
};

export default DisplayRepoData;
