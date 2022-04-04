import React from "react";

function Home() {
  return (
    <div className="homepage">
      <h1 className="home-page-title">Welcome to Zen Student-Mentor Portal</h1>
      <ul className="list">
        <li>
          This Web App can be used to view the overall data of Mentors and
          Students Information.
        </li>
        <li>A new mentor and a new student can be added to the database</li>
        <li>For a selected Student mentor can be changed</li>
        <li>For Students without mentors, mentors can be assigned easily.</li>
        <li>
          For a selected Mentor, list of students assigned can be displayed.
        </li>
      </ul>
    </div>
  );
}

export default Home;
