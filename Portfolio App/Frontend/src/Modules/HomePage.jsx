function HomePage() {
  return (
      <>
          <h2>Welcome to my Computer Science Portfolio</h2>
          <article id="home">
              <h3>Career Goals</h3>
              <p>
                  My current career goals are to break into the data science field within the biological sciences sector. I decided to 
                  pursue computer science after my BS in Biology to close knowledge gaps that are essential to bioinformatics and
                  computational biology. I would also say that one of my secondary goals is to become a software engineer for medical devices
                  or applications.
              </p>
              
              <h3>Web Development Portfolio Implementations</h3>
              <h4>HTML</h4>
              <dl>
                  <ul>
                      <li>Utilized HTML tags such as <code>&lt;header&gt;</code>, <code>&lt;nav&gt;</code>, <code>&lt;main&gt;</code>, <code>&lt;section&gt;</code>, <code>&lt;article&gt;</code>, and <code>&lt;footer&gt;</code>. Used the various heading tags (<code>&lt;H1&gt;</code>, <code>&lt;H2&gt;</code>, <code>&lt;H3&gt;</code>, & <code>&lt;H4&gt;</code>) to help create a separation in areas of the webapp.</li>
                      <li>Also setting up the boiler plate  in the <code>&lt;head&gt;</code> to include various files such as stylesheets, and required links for favicons.</li>
                      <li>Using form elements such as <code>&lt;input&gt;</code>, <code>&lt;textarea&gt;</code>, to gather information from a user.</li>
                      <li>Ensuring proper use of meta tags, title attributes, and semantic tags for search engine optimization (SEO).</li>
                  </ul>
              </dl>

              <h4>CSS</h4>
              <dl>
                  <ul>
                      <li>Utilized Flexbox to create a responsive web designs as screen sizes change.</li>
                      <li>Used a stylesheet to edit the design of my app, by changing the background, font-style, 
                        and specifiying the padding, margin, and borders of webapps, and functionality componenets.</li>
                  </ul>
              </dl>

              <h4>JavaScript</h4>
              <dl>
                  <ul>
                      <li>Utilized arrow functions, destructuring, and template literals.</li>
                      <li>Used event listeners, to managing user interactions with the web app.</li>
                  </ul>
              </dl>
              <h4>Express</h4>
              <dl>
                  <ul>
                      <li>Created <strong>Representational State Transfer (REST APIs)</strong> with Express.js routing the data from the server to the web app.</li>
                      <li>Utilized the HTTP <strong>Post</strong>, <strong>PUT</strong>, and <strong>Patch</strong> methods to send data,
                      replace, and update data across the server.</li>
                      <li>Used <strong>CRUD</strong> methods to create, read, update, and delete resources.</li>
                      <li>Integrated databases from MongoDB into this Node.js application.</li>

                  </ul>
              </dl>
              <h4>React</h4>
              <dl>
                  <ul>
                      <li>This application was created using <strong>React</strong>, where the pages are built with a <strong>set of nested components</strong>
                       rather than an HTML file.</li> 
                       <li>The components within a <strong>single page application (SPA)</strong> consist of all the pages that are to be loaded only once.
                       This allows the user to navigate to each page without having to load every html file. This is done by using JavaScript to make changes to the DOM
                       to give the user this sort of experience.</li>
                      
                  </ul>
                </dl>
              <h4>Asynchronous Programming</h4>
              <dl>
                  <ul>
                      <li>Using <strong>promises</strong> and <strong>async/await/fetch</strong> methods, to allow 
                      the web app to catch error responses and send data across the server.</li>
                      
                  </ul>
              </dl>
          </article>
      </>
  );
}

export default HomePage;
