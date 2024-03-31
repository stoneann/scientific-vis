import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
          <header className="App-header">
              <h1>Scientific Visualization</h1>
              <h4>By Ann Stone</h4>
          </header>
          <div>
              <div className="App-section-header">
                  <h2>Background</h2>
                  <div className="App-original-vis">
                      <img className="App-image" src={require("./Scientific_Vis_Original.png")} alt="Original Photo"/>
                      <p><i>Figure 5: The Original Visualization</i></p>
                  </div>
                  <div className="App-section-body">
                      <p>Featured above is the visualization I chose the recreate. It was from the article
                          <a href="https://www.pnas.org/doi/10.1073/pnas.2313925121">
                              "A Turing test of whether AI chatbots are behaviorally similar to humans"
                          </a>.
                          The visualization encodes several different types of data, described below.
                      </p>
                      <h3>Ordinal</h3>
                      <ul>
                          <li>First round number of boxes bought by decision maker</li>
                          <li>Second round number of boxes bought by decision maker</li>
                          <li>third round number of boxes bought by decision maker</li>
                      </ul>
                      <h3>Nominal</h3>
                      <ul>
                          <li>Decision Maker (ChatGPT-4, ChatGPT-3, and Human)</li>
                          <li>Previous Decision in the game (Bomb or no Bomb)</li>
                      </ul>
                      <h3>Quantitative</h3>
                      <ul>
                          <li>Percentage of decision makers that made the same decision</li>
                      </ul>
                      <p>By encoding the mentioned data, the visualizations were able to successfully communicate three
                          main tasks. One of which is how does the previous rounds outcome impact the current round
                          decisions? They accomplished this by utilizing a tree structure that broke each round down
                          into bomb or no bomb. Readers can then see how the distribution changes for a decision maker
                          for every outcome. I also appreciated how they encoded color to the outcome of the previous round
                          as it made the visualization easier to digest because I immediately knew what I was looking at.
                          The visualization also successfully communicated the task: when faced with the same risk outcome, does
                          most ChatGPTs follow what most humans do? In their distributions, there was generally one
                          bar that was clearly greater than the others and it depicted which decision most of the specified
                          decision maker made. It was very easy to compare the location of this bar between decision
                          makers as well as between rounds. By asking these tasks, the visualization was trying to communicate
                          that most ChatGPT-4 has similar risk aversity when compared to humans, whereas ChatGPT-3 is more
                          risk averse. This can be seen by the greatest bar in the distribution for all three decision makers
                          to be around the same in round 1. As more bombs are hit, though, ChatGPT-3's greatest bar in
                          the distribution falls to lower numbers, meaning it starts opening less boxes. This is not seen
                          in the human and GhatGPT-4 bar. This fits into the context of the paper because the paper is
                          discussing if AI can actually adopt human like characteristics. This graph shows that as AI
                          continues to grow and improve, it does act more like a human.</p>
                  </div>
              </div>
              <div className="App-section-header">
                  <h2>Tasks</h2>
                  <div className="App-section-body">
                      <p>My redesign of the visualization is going to focus more on the distributions and how they change
                      rather than the distribution at every single possible outcome. In order to do this, I am going to focus on
                      the task: How does the number of bombs received impact the decision makers decision for a round? Instead
                      of focusing on each specific path of outcomes, which is exponential, a potentially better
                      metric to look at is how much negative impacts of risk were faced. It would tell us that when the risk
                      came true X% of the time, this is how the decision maker reacted. I would also like to focus on the task:
                      When does the ChatGPT population act similarly to the human population? If ChatGPT acts like a human,
                      there should be a degree of variance in their answers because not all humans have the same risk aversity.
                      Therefore, I want the visualization to allow for easy comparisons between distributions to see which
                      most line up. Finally, I want to focus on the task: How does the number of rounds impact the decision
                      makers risk aversity? Not only should my graph be able to display data for rounds 1-3, but it should
                      also be scalable so that if we obtained data for more than rounds, it wouldn't impact the usability
                      and readability of the visualization</p>
                  </div>
              </div>
          </div>
      </div>
    // <div className="continer">
    //   <div className="dropdown">
    //     Select a Round:
    //     <select
    //       onChange={(e) => setRound(e.target.value)}
    //       defaultValue={round}
    //     >
    //       {rounds.map(it => <option key={it}>{it}</option>)}
    //     </select>
    //   </div>
    //   <div className="graph">
    //     <div>
    //       <Density height={500} width={500} data={data[round]?data[round]:[]} round={round + 1} />
    //     </div>
    //   </div>
    // </div>
  );
}

export default App;
