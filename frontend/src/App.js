import * as d3 from "d3"; // we will need d3.js
import { useState } from 'react';
import './App.css';
import { Density } from './DensityChart';
import data from './data.json';
import Dropdown from 'react-dropdown';


function App() {
  const [round, setRound] = useState(1);
  const rounds = Array.from(Array(data.length).keys())

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
                      <p>When I originally started designing my visualization I set out to support the same domain tasks as the 
                        original design. However, as I sketched I decided to change mine as follows. My redesign of the visualization 
                        is going to focus more on the distributions and how they change
                      rather than the distribution at every single possible outcome. In order to do this, I am going to focus on
                      the task: How does the number of bombs received impact the decision makers decision for a round? This will be referred to as task #1 this reflection. Instead
                      of focusing on each specific path of outcomes, which is exponential, a potentially better
                      metric to look at is how much negative impacts of risk were faced. It would tell us that when the risk
                      came true X% of the time, this is how the decision maker reacted. I would also like to focus on the task:
                      When does the ChatGPT population act similarly to the human population? This will be referred to as task #2 in this reflection. If ChatGPT acts like a human,
                      there should be a degree of variance in their answers because not all humans have the same risk aversity.
                      Therefore, I want the visualization to allow for easy comparisons between distributions to see which
                      most line up. </p>
                  </div>
              </div>
              <div className="App-section-header">
                  <h2>Redesign Process</h2>
                  <div className="App-section-body">
                      <p>My redesign process had 4 phases, which I will discuss in detail below.</p>
                      <h3>Redesign #1</h3>
                      <img className="App-image" src={require('./scientific-vis-photos/IMG_0059.jpg')} alt='Step #1' />
                      <p>When I first tried redesigning the visualization, I wanted to make it easier to compare the bomb vs no bomb
                        distribution. At first,
                        I kept the bar chart because it felt like the best way to portray a distribution that has buckets. In order to 
                        make the comparison easier then, I added the bar charts onto the same axis but mirroring each other. This would 
                        attempt to encode the difference in distribution using length, which is easy to estimate. A reader could see that 
                        one bar is greater than the one above / below it. Similar to the first visualization, it used color to encode 
                        both the decision maker and bomb/no bomb. I attempted to do something similar because that encoding worked 
                        well in the original visualization. A lighter shade of a color would indicate no bomb and a darker shade or a 
                        color would indicate bomb. After creating this visualization, though, there were a few aspects that 
                        weren't as succesful at portraying the data and tasks as I would have hoped. The stacked bar charts didn't 
                        actually encode the difference in the distributions in length. A more similar distribution didn't necessarily have 
                        a larger / smaller length. For example, one bar in the distribution could be 5 times longer than the other lines 
                        but its opposing line could be very short. The length of the 2 bars together would then be very long, but the
                        distribution wasn't very similar. I also felt like this visualization didn't address the other tasks I wanted to 
                        support. There is no easy way to compare humans and chatGPT because each graph is completely separate.
                      </p>
                      <h3>Redesign #2</h3>
                      <img className="App-image" src={require('./scientific-vis-photos/IMG_0058.jpg')} alt='Step #2' />
                      <p>My goal when starting this second redesign was to support more tasks, specifically "When does the ChatGPT 
                        population act similarly to the human population?". One way to allow for more comparisons was to have the 
                        decision makers share the same axis. I actually had the idea for the structure of this visualization when 
                        reading our weekly reading on utilizing tree data structures. During the reading, I was curious if adding 
                        a filter interaction to choose what level of the tree to display could help reduce the space a tree structure 
                        takes up. For large layers, you could scroll to the left and right. Each 'node' that was in the tree could 
                        have a divider. Using this structure allowed me to decrease the amount of space that the tree took up while 
                        also allowing side by side comparisons of humans vs chatGPT via a length encoding. While I am glad I sketched out the idea, there were a few aspects that 
                        weren't as succesful at portraying the data and tasks as I would have hoped. The stacked bar charts didn't 
                        actually encode the difference in the distributions in length. A more similar distribution didn't necessarily have 
                        a larger / smaller length. For example, one bar in the distribution could be 5 times longer than the other lines 
                        but its opposing line could be very short. The length of the 2 bars together would then be very long, but the
                        distribution wasn't very similar. The human vs chatGPT encoding also wasn't very efficient because it didn't 
                        make it easy to compare the distribution at specific intervals of the domain (aka the number of boxes).
                      </p>
                      <h3>Redesign #3</h3>
                      <img className="App-image" src={require('./scientific-vis-photos/IMG_0057.jpg')} alt='Step #3' />
                      <p>Starting this visualization, I wanted to change the data encodings so that it would be easier to compare the 
                        distributions between bombs and no bombs as well as between human and chatgpt. One of the best ways to compare 
                        distributions is sharing the same x and y axis and having the data overlap. This is very hard with a bar chart, 
                        though so I decided to switch to a line graph which will allow me to layer data. I decided to encode the decision 
                        maker in the texture of the line (solid, dotted, etc) because there is 3 finite decision makers. The more 
                        textures you add to a graph, as we learned in class, the more confusing the visualization will be. I felt that 
                        having 3 total textures would keep the chaos to a minimum. I then decided to encode the bomb ordering (no bomb 
                        then bomb, etc) using color each case is distinct, like a color, and a graph can have more colors than textures 
                        without being distracting. Though in concept I thought the encodings would work, I thought the combination of 
                        textures and colors were distracting. It was hard to see line and trends in all the junk. It did better support 
                        my task of "When does the ChatGPT population act similarly to the human population?" because one could use the 
                        distance between one point on a line and another to compare distributions.
                      </p>
                      <h3>Redesign #4</h3>
                      <img className="App-image" src={require('./scientific-vis-photos/IMG_0061.jpg')} alt='Step #3' />
                      <p>Going into the final visualization I sketched, I knew that I wanted to keep the line graph structure because 
                        it was the best at supporting task #2. I also knew that I needed to change the encodings. It was at this point 
                        where I came up with task #1 and decided that I wanted my visualization to support it. Encoding the specific 
                        bomb ordering added a lot of complexity. By changing the bomb ordering to the number of bombs hit, I could use 
                        color to encode both the decision maker and the number of bombs, reducing the complexity of the graph to an 
                        interpretable amount. I didn't want to completely drop the bomb ordering data, though, as that could be a data 
                        point a user might use to compare lines that both had 1 bomb but have different distributions. To make this 
                        information available, I added a select interaction that highlights the line on hover and shows the bomb ordering 
                        as a tool tip. This sketch answered the two main tasks I wanted to support, thus I moved on to creating the 
                        visualization.
                      </p>
                  </div>
              </div>
              <div className="App-section-header">
                  <h2>My Final Visualization</h2>
                  <div className="continer">
                    <div className="round-select">
                      Select a Round: 
                      <select className="dropdown"
                        onChange={(e) => setRound(e.target.value - 1)}
                        defaultValue={round}
                      >
                        {rounds.map(it => <option key={it}>{it + 1}</option>)}
                      </select>
                    </div>
                    <div className="graph">
                        <Density height={300} width={700} data={data[round]?data[round]:[]} />
                    </div>
                </div>
              </div>
              <div className="App-section-header">
                  <h2>Challenges</h2>
                  <div className="App-section-body">
                    <p>
                      Most of the challenges I faced with this visualization were technical as I 
                      wanted to use react D3 to create my visualization. This is because I see myself 
                      using react D3 in my career. I have a few personal project ideas that center around 
                      having a descriptive and interactive data analytics dashboard integrated into 
                      the website. Because I knew I was going to be learning a new package, I didn't want 
                      to spend my time debugging code for a non-thought out visualization, causing me to 
                      spend time thinking about the original visualization, exploring the data available 
                      to me, and sketching out visualization ideas. Creating 3 different color schemes that 
                      had different shades was harder that I thought it would be. Though for much of the code I was 
                      able to get starter code to build off of, having multiple color schemes was no where on
                      the internet. I couldn't find any documentation or other people asking about it online. 
                      This left me with the strategy of trial and error of piecing together code that may or 
                      may not work. This stemmed another key challenge. In order for coloring on two values, 
                      the decision maker and the number of bombs, I had to pass react a multi layer dictionary of 
                      lists. One of my strategies to help me was to create a small data structure to test the 
                      frontend on before I went to change the data transformation in the backend. While this 
                      helped, react's dynamically typed-ness did not. I am use to programming in C++, where we 
                      declare types everywhere. React is not like that so it became quite confusing what parts 
                      of the data, which already had a complex strcuture was being passed. The one part about 
                      coloring that I was unable to figure out was how to have the color scale for each decision 
                      maker change per round and have the legend change accordingly. This means when there are only
                      1 total bomb possible, only having 2 colors (0 or 1 bomb). I would have also liked to 
                      have the numeric scale for what each color represents in the legend. The other part I didn't 
                      figure out was highlighting every single path. Since the paths are stacked on top of each other, 
                      if a path is completely below others (even the empty space) it won't be able to be highlighted. 
                      I have not been able to figure out how to fix this problem.
                    </p>
                  </div>
              </div>
              <div className="App-section-header">
                  <h2>Self Evaluation</h2>
                  <div className="App-section-body">
                    <p>
                      Judging my own design, I would give myself a 90%. At the beginning of 
                      the semester and even for the first project, I would have iterated 
                      through a visualization maybe 2 times before deciding it was good. However,
                      I wouldn't have put in the thought of why I am chosing that visualization, why 
                      the encoding is the most suitable, and why it is effective. I really pushed myself 
                      during this project to think more deeply about what I am trying to 
                      accomplish and I am proud of the design process that I had for this 
                      project. That being said, my design skills can always be improved. I wish 
                      I would have spent more time coming up with potential tasks to support. In 
                      our design workshop professional solutions, they all asked a variety of 
                      who, what, where when, and why questions so that they could fully understand 
                      their audience and what a visualization could support. I didn't do that and 
                      instead orginally started off with the same tasks as the original visualization. 
                      I wonder what else I could have supported in my visualization had I asked 
                      those crucial quesions. This could have prevented my from changing my task 
                      in the last redesign of my visualization so I could have spent more time evaluating 
                      different visualizations for the same set of tasks. As for my creation, my 
                      creation is honestly not up to my standards. I wish I had started early in learning 
                      react d3 because I didn't have enough time to get the visualization looking 
                      professional, even though it has most of the key features I originally set out to 
                      build. I overestimated how well I am able to debug react code because react d3 
                      operates very differently than a normal react package.  
                    </p>
                  </div>
              </div>
          </div>
      </div>
  );
}

export default App;
