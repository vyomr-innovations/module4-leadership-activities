import './page.css'

import Mystery from './components/Mystery'

export default function Home() {
  return (
    <div className="mainConatiner">
      <center>
        <h1 className="headingContaienr">See It from Both Sides</h1>
      </center>
      <hr />
      <Mystery />
    </div>
  );
}
