<h1>Forkify App</h1>

<p>
  This project was realized during 
  <a href="https://www.udemy.com/course/the-complete-javascript-course/" target="_blank">
    Jonas Schmedtmann's JavaScript course
  </a> 
  as the final project.
</p>

<p>
  Both CSS and HTML were provided by the course. The goal of this project was to help users search for, bookmark, and manage recipes, 
  as well as upload their own.
</p>

<h2>Features Implemented</h2>

<ul>
  <li>Consuming Project API</li>
  <li>Implementation of Fractional API</li>
  <li>MVC</li>
  <li>Parcel</li>
  <li>Babel</li>
  <li>ES6 Classes</li>
  <li>Promises</li>
  <li>Publisher-Subscriber Pattern</li>
  <li>Pagination</li>
  <li>JSDoc</li>
  <li>Netlify Deploy</li>
  <li>Local Storage</li>
</ul>

<h2>Deployed Site</h2>
<p><a href="https://forkify-miguel-deli.netlify.app/" target="_blank">https://forkify-miguel-deli.netlify.app/</a></p>

<h2>OBS:</h2>
<ul>
  <li>Icons are not working on the deployed site; the issue is still under investigation.</li>
</ul>


  
  <h2>Prerequisites</h2>
  <p>Ensure you have the following installed on your system:</p>
  <ul>
    <li><a href="https://nodejs.org/" target="_blank">Node.js</a> (version 14 or higher recommended)</li>
    <li><a href="https://www.npmjs.com/" target="_blank">npm</a> (comes with Node.js)</li>
  </ul>
  
  <h2>Installation Steps</h2>
  <ol>
    <li>
      <strong>Clone the Repository</strong>  
      <pre><code>git clone https://github.com/MiguelGuimaraes37/Forkify.git</code></pre>
    </li>
    <li>
      <strong>Navigate to the Project Directory</strong>  
      <pre><code>cd forkify</code></pre>
    </li>
    <li>
      <strong>Install Dependencies</strong>  
      <pre><code>npm install</code></pre>
    </li>
  </ol>
  
  <h2>Running the Project</h2>
  <ol>
    <li>
      <strong>Start the Development Server</strong>  
      <p>To start the development server, use:</p>
      <pre><code>npm start</code></pre>
      <p>This will launch the application in development mode and automatically open it in your default browser.</p>
    </li>
    <li>
      <strong>Build for Production</strong>  
      <p>If you want to create a production build of the application, run:</p>
      <pre><code>npm run build</code></pre>
      <p>This will generate the optimized build in the <code>dist</code> directory.</p>
    </li>
  </ol>
  
  <h2>Additional Notes</h2>
  <ul>
    <li>The app uses Parcel for bundling and includes dependencies like <code>core-js</code> for polyfills and <code>fracty</code> for fractional API support.</li>
    <li>The <code>start</code> command uses Parcel to serve the app locally with hot-reloading.</li>
    <li>For detailed information about Parcel, visit <a href="https://parceljs.org/" target="_blank">Parcel Documentation</a>.</li>
  </ul>
  
  <p>
    Feel free to open an issue on the repository if you encounter any problems during setup or running the app!
  </p>
