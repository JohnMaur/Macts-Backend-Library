// const express = require('express');
// const bodyParser = require('body-parser');
// const http = require('http');
// const { Server } = require("socket.io");
// const Koa = require("koa");
// const Router = require("koa-router");

// const app = express();
// const port = process.env.PORT || 2929;

// // Create an HTTP server
// const server = http.createServer(app);

// // Pass the server instance to Socket.IO
// const io = new Server(server, {
//   cors: {
//     origin: "*",
//   }
// });

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// // Array to store RFID tag data
// const tagDataArray = [];

// // Route to handle POST requests to /tagData
// app.post('/tagData', (req, res) => {
//   const tagData = req.body.tagData;

//   console.log('Received tag data:', tagData);
//   tagDataArray.push(tagData);

//   io.emit('tagData', tagData);

//   res.send('Tag data received successfully');
// });

// // Koa setup
// const koaApp = new Koa();
// const router = new Router();

// router.get('/', async (ctx) => {
//   ctx.body = "Hello World from Railway this is Library";
// });

// koaApp.use(router.routes()).use(router.allowedMethods());

// // Middleware to handle Koa routes in Express
// app.use('/koa', (req, res) => {
//   koaApp.callback()(req, res);
// });

// // Start the HTTP server
// server.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });

// const express = require('express');
// const bodyParser = require('body-parser');
// const http = require('http');
// const { Server } = require("socket.io");
// const axios = require('axios');
// const Koa = require("koa");
// const Router = require("koa-router");
// const moment = require('moment-timezone');

// const app = express();
// const port = process.env.PORT || 2929;

// // Create an HTTP server
// const server = http.createServer(app);

// // Pass the server instance to Socket.IO
// const io = new Server(server, {
//   cors: {
//     origin: "*",
//   }
// });

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// io.on('connection', (socket) => {
//   console.log('New WebSocket connection');
  
//   socket.on('tagData', (data) => {
//     console.log('Received tag data via WebSocket:', data);
//   });

//   socket.on('disconnect', () => {
//     console.log('WebSocket disconnected');
//   });
// });

// // Object to store RFID tag data with timestamp
// const tagDataMap = {};

// // Route to handle POST requests to /tagData
// app.post('/tagData', async (req, res) => {
//   const tagData = req.body.tagData;

//   console.log('Received tag data via POST:', tagData);

//   const now = new Date().getTime();
//   const timeout = 1000; // 1 minute in milliseconds

//   if (tagDataMap[tagData] && now - tagDataMap[tagData] < timeout) {
//     console.log("You've already tapped your RFID card. Please wait for a minute before tapping again.");
//     io.emit('tagData', { tagData, excessiveTap: true });
//     return res.status(429).send({ message: "You've already tapped your RFID card. Please wait for a minute before tapping again." });
//   }

//   tagDataMap[tagData] = now;

//   // Fetch student information from the MySQL server
//   try {
//     const response = await axios.get('https://macts-backend-webapp-production-0bd2.up.railway.app/studentInfo');
//     const students = response.data;
//     const formattedDate = moment().tz('Asia/Manila').format('M/D/YYYY, h:mm:ss A'); // Format the date in Philippine Time

//     // Check for matching tagValue
//     const matchedStudent = students.find(student => student.tagValue === tagData);

//     if (matchedStudent) {
//       console.log('RFID tag matched:', matchedStudent);

//       // Insert matched student information into library_taphistory
//       const libraryHistory = {
//         firstName: matchedStudent.studentInfo_first_name,
//         middleName: matchedStudent.studentInfo_middle_name,
//         lastName: matchedStudent.studentInfo_last_name,
//         tuptId: matchedStudent.studentInfo_tuptId,
//         course: matchedStudent.studentInfo_course,
//         section: matchedStudent.studentInfo_section,
//         email: matchedStudent.user_email,
//         user_id: matchedStudent.user_id
//       };

//       // Format the date and time
//       const currentDateTime = formatDateTime(new Date());
//       const currentDate = formatDate(new Date());

//       // Perform the database insert or update
//       await axios.post('http://localhost:2525/library_history', libraryHistory);
//       console.log('Library history recorded successfully');

//       io.emit('tagData', { tagData, excessiveTap: false });
//     } else {
//       console.log('No matching RFID tag found');
//     }
//   } catch (error) {
//     console.error('Error fetching student information or recording library history:', error);
//   }

//   res.send('Tag data received successfully');
// });

// // Koa setup
// const koaApp = new Koa();
// const router = new Router();

// router.get('/', async (ctx) => {
//   ctx.body = "Hello World from Railway this is Library";
// });

// koaApp.use(router.routes()).use(router.allowedMethods());

// // Middleware to handle Koa routes in Express
// app.use('/koa', (req, res) => {
//   koaApp.callback()(req, res);
// });

// // Start the HTTP server
// server.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });

// // Helper functions
// function formatDateTime(date) {
//   const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true };
//   return date.toLocaleString('en-US', options);
// }

// function formatDate(date) {
//   const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
//   return date.toLocaleDateString('en-US', options);
// }

// const express = require('express');
// const bodyParser = require('body-parser');
// const http = require('http');
// const { Server } = require("socket.io");
// const axios = require('axios');
// const Koa = require("koa");
// const Router = require("koa-router");
// const moment = require('moment-timezone');

// const app = express();
// const port = process.env.PORT || 2929;

// // Create an HTTP server
// const server = http.createServer(app);

// // Pass the server instance to Socket.IO
// const io = new Server(server, {
//   cors: {
//     origin: "*",
//   }
// });

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// io.on('connection', (socket) => {
//   console.log('New WebSocket connection');
  
//   socket.on('tagData', (data) => {
//     console.log('Received tag data via WebSocket:', data);
//   });

//   socket.on('disconnect', () => {
//     console.log('WebSocket disconnected');
//   });
// });

// // Object to store RFID tag data with timestamp
// const tagDataMap = {};

// // Route to handle POST requests to /tagData
// app.post('/tagData', async (req, res) => {
//   const tagData = req.body.tagData;

//   console.log('Received tag data via POST:', tagData);

//   const now = new Date().getTime();
//   const timeout = 1000; // 1 minute in milliseconds

//   if (tagDataMap[tagData] && now - tagDataMap[tagData] < timeout) {
//     console.log("You've already tapped your RFID card. Please wait for a minute before tapping again.");
//     io.emit('tagData', { tagData, excessiveTap: true });
//     return res.status(429).send({ message: "You've already tapped your RFID card. Please wait for a minute before tapping again." });
//   }

//   tagDataMap[tagData] = now;

//   // Fetch student information from the MySQL server
//   try {
//     const response = await axios.get('https://macts-backend-webapp-production-0bd2.up.railway.app/studentInfo');
//     const students = response.data;
//     const formattedDate = moment().tz('Asia/Manila').format('M/D/YYYY, h:mm:ss A'); // Format the date in Philippine Time

//     // Check for matching tagValue
//     const matchedStudent = students.find(student => student.tagValue === tagData);

//     if (matchedStudent) {
//       console.log('RFID tag matched:', matchedStudent);

//       // Insert matched student information into library_taphistory
//       const libraryHistory = {
//         firstName: matchedStudent.studentInfo_first_name,
//         middleName: matchedStudent.studentInfo_middle_name,
//         lastName: matchedStudent.studentInfo_last_name,
//         tuptId: matchedStudent.studentInfo_tuptId,
//         course: matchedStudent.studentInfo_course,
//         section: matchedStudent.studentInfo_section,
//         email: matchedStudent.user_email,
//         user_id: matchedStudent.user_id
//       };

//       // Perform the database insert or update
//       const historyResponse = await axios.post('http://localhost:2525/library_history', libraryHistory);
//       console.log(`Tap status: ${historyResponse.data.tapStatus}`); // Log the tap status ("In" or "Out")

//       io.emit('tagData', { tagData, excessiveTap: false });
//     } else {
//       console.log('No matching RFID tag found');
//     }
//   } catch (error) {
//     console.error('Error fetching student information or recording library history:', error);
//   }

//   res.send('Tag data received successfully');
// });

// // Koa setup
// const koaApp = new Koa();
// const router = new Router();

// router.get('/', async (ctx) => {
//   ctx.body = "Hello World from Railway this is Library";
// });

// koaApp.use(router.routes()).use(router.allowedMethods());

// // Middleware to handle Koa routes in Express
// app.use('/koa', (req, res) => {
//   koaApp.callback()(req, res);
// });

// // Start the HTTP server
// server.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });

// // Helper functions
// function formatDateTime(date) {
//   const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true };
//   return date.toLocaleString('en-US', options);
// }

// function formatDate(date) {
//   const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
//   return date.toLocaleDateString('en-US', options);
// }

// const express = require('express');
// const bodyParser = require('body-parser');
// const http = require('http');
// const { Server } = require("socket.io");
// const axios = require('axios');
// const Koa = require("koa");
// const Router = require("koa-router");
// const moment = require('moment-timezone');

// const app = express();
// const port = process.env.PORT || 2929;

// // Create an HTTP server
// const server = http.createServer(app);

// // Pass the server instance to Socket.IO
// const io = new Server(server, {
//   cors: {
//     origin: "*",
//   }
// });

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// io.on('connection', (socket) => {
//   console.log('New WebSocket connection');
  
//   socket.on('tagData', (data) => {
//     console.log('Received tag data via WebSocket:', data);
//   });

//   socket.on('disconnect', () => {
//     console.log('WebSocket disconnected');
//   });
// });

// // Object to store RFID tag data with timestamp
// const tagDataMap = {};

// // Route to handle POST requests to /tagData
// app.post('/tagData', async (req, res) => {
//   const tagData = req.body.tagData;

//   console.log('Received tag data via POST:', tagData);

//   const now = new Date().getTime();
//   const timeout = 1000; // 1 minute in milliseconds

//   if (tagDataMap[tagData] && now - tagDataMap[tagData] < timeout) {
//     console.log("You've already tapped your RFID card. Please wait for a minute before tapping again.");
//     io.emit('tagData', { tagData, excessiveTap: true });
//     return res.status(429).send({ message: "You've already tapped your RFID card. Please wait for a minute before tapping again." });
//   }

//   tagDataMap[tagData] = now;

//   // Fetch student information from the MySQL server
//   try {
//     const response = await axios.get('https://macts-backend-webapp-production-0bd2.up.railway.app/studentInfo');
//     const students = response.data;
//     const formattedDate = moment().tz('Asia/Manila').format('M/D/YYYY, h:mm:ss A'); // Format the date in Philippine Time

//     // Check for matching tagValue
//     const matchedStudent = students.find(student => student.tagValue === tagData);

//     if (matchedStudent) {
//       console.log('RFID tag matched:', matchedStudent);

//       // Insert matched student information into library_taphistory
//       const libraryHistory = {
//         firstName: matchedStudent.studentInfo_first_name,
//         middleName: matchedStudent.studentInfo_middle_name,
//         lastName: matchedStudent.studentInfo_last_name,
//         tuptId: matchedStudent.studentInfo_tuptId,
//         course: matchedStudent.studentInfo_course,
//         section: matchedStudent.studentInfo_section,
//         email: matchedStudent.user_email,
//         user_id: matchedStudent.user_id
//       };

//       // Perform the database insert or update
//       const historyResponse = await axios.post('http://localhost:2525/library_history', libraryHistory);
//       console.log(`Tap status: ${historyResponse.data.tapStatus}`); // Log the tap status ("In" or "Out")

//       io.emit('tagData', { tagData, tapStatus: historyResponse.data.tapStatus, excessiveTap: false });
//     } else {
//       console.log('No matching RFID tag found');
//     }
//   } catch (error) {
//     console.error('Error fetching student information or recording library history:', error);
//   }

//   res.send('Tag data received successfully');
// });

// // Koa setup
// const koaApp = new Koa();
// const router = new Router();

// router.get('/', async (ctx) => {
//   ctx.body = "Hello World from Railway this is Library";
// });

// koaApp.use(router.routes()).use(router.allowedMethods());

// // Middleware to handle Koa routes in Express
// app.use('/koa', (req, res) => {
//   koaApp.callback()(req, res);
// });

// // Start the HTTP server
// server.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });

// const express = require('express');
// const bodyParser = require('body-parser');
// const http = require('http');
// const { Server } = require("socket.io");
// const axios = require('axios');
// const Koa = require("koa");
// const Router = require("koa-router");
// const moment = require('moment-timezone');

// const app = express();
// const port = process.env.PORT || 2929;

// // Create an HTTP server
// const server = http.createServer(app);

// // Pass the server instance to Socket.IO
// const io = new Server(server, {
//   cors: {
//     origin: "*",
//   }
// });

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// io.on('connection', (socket) => {
//   console.log('New WebSocket connection');
  
//   socket.on('tagData', (data) => {
//     console.log('Received tag data via WebSocket:', data);
//   });

//   socket.on('disconnect', () => {
//     console.log('WebSocket disconnected');
//   });
// });

// // Object to store RFID tag data with timestamp
// const tagDataMap = {};

// // Route to handle POST requests to /tagData
// app.post('/tagData', async (req, res) => {
//   const tagData = req.body.tagData;

//   console.log('Received tag data via POST:', tagData);

//   const now = new Date().getTime();
//   const timeout = 1000; // 1 minute in milliseconds

//   if (tagDataMap[tagData] && now - tagDataMap[tagData] < timeout) {
//     console.log("You've already tapped your RFID card. Please wait for a minute before tapping again.");
//     io.emit('tagData', { tagData, excessiveTap: true });
//     return res.status(429).send({ message: "You've already tapped your RFID card. Please wait for a minute before tapping again." });
//   }

//   tagDataMap[tagData] = now;

//   // Fetch student information from the MySQL server
//   try {
//     const response = await axios.get('https://macts-backend-webapp-production-0bd2.up.railway.app/studentInfo');
//     const students = response.data;
//     const formattedDate = moment().tz('Asia/Manila').format('M/D/YYYY, h:mm:ss A'); // Format the date in Philippine Time

//     // Check for matching tagValue
//     const matchedStudent = students.find(student => student.tagValue === tagData);

//     if (matchedStudent) {
//       console.log('RFID tag matched:', matchedStudent);

//       // Insert matched student information into library_taphistory
//       const libraryHistory = {
//         firstName: matchedStudent.studentInfo_first_name,
//         middleName: matchedStudent.studentInfo_middle_name,
//         lastName: matchedStudent.studentInfo_last_name,
//         tuptId: matchedStudent.studentInfo_tuptId,
//         course: matchedStudent.studentInfo_course,
//         section: matchedStudent.studentInfo_section,
//         email: matchedStudent.user_email,
//         user_id: matchedStudent.user_id
//       };

//       // Perform the database insert or update
//       const historyResponse = await axios.post('http://localhost:2525/library_history', libraryHistory);
//       console.log(`Tap status: ${historyResponse.data.tapStatus}`); // Log the tap status ("In" or "Out")

//       io.emit('tagData', { tagData, tapStatus: historyResponse.data.tapStatus, excessiveTap: false });
//     } else {
//       console.log('No matching RFID tag found');
//     }
//   } catch (error) {
//     console.error('Error fetching student information or recording library history:', error);
//   }

//   res.send('Tag data received successfully');
// });

// // Koa setup
// const koaApp = new Koa();
// const router = new Router();

// router.get('/', async (ctx) => {
//   ctx.body = "Hello World from Railway this is Library";
// });

// koaApp.use(router.routes()).use(router.allowedMethods());

// // Middleware to handle Koa routes in Express
// app.use('/koa', (req, res) => {
//   koaApp.callback()(req, res);
// });

// // Start the HTTP server
// server.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });

// const express = require('express');
// const bodyParser = require('body-parser');
// const http = require('http');
// const { Server } = require("socket.io");
// const axios = require('axios');
// const Koa = require("koa");
// const Router = require("koa-router");
// const moment = require('moment-timezone');

// const app = express();
// const port = process.env.PORT || 2929;

// // Create an HTTP server
// const server = http.createServer(app);

// // Pass the server instance to Socket.IO
// const io = new Server(server, {
//   cors: {
//     origin: "*",
//   }
// });

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// io.on('connection', (socket) => {
//   console.log('New WebSocket connection');
  
//   socket.on('tagData', (data) => {
//     console.log('Received tag data via WebSocket:', data);
//   });

//   socket.on('disconnect', () => {
//     console.log('WebSocket disconnected');
//   });
// });

// // Object to store RFID tag data with timestamp
// const tagDataMap = {};

// // Route to handle POST requests to /tagData
// app.post('/tagData', async (req, res) => {
//   const tagData = req.body.tagData;

//   console.log('Received tag data via POST:', tagData);

//   const now = new Date().getTime();
//   const timeout = 60000; // 1 minute in milliseconds

//   if (tagDataMap[tagData] && now - tagDataMap[tagData] < timeout) {
//     console.log("You've already tapped your RFID card. Please wait for a minute before tapping again.");
//     io.emit('tagData', { tagData, excessiveTap: true });
//     return res.status(429).send({ message: "You've already tapped your RFID card. Please wait for a minute before tapping again." });
//   }

//   tagDataMap[tagData] = now;

//   // Fetch student information from the MySQL server
//   try {
//     const response = await axios.get('https://macts-backend-webapp-production-0bd2.up.railway.app/studentInfo');
//     const students = response.data;
//     const formattedDate = moment().tz('Asia/Manila').format('M/D/YYYY, h:mm:ss A'); // Format the date in Philippine Time

//     // Check for matching tagValue
//     const matchedStudent = students.find(student => student.tagValue === tagData);

//     if (matchedStudent) {
//       console.log('RFID tag matched:', matchedStudent);

//       // Insert matched student information into library_taphistory
//       const libraryHistory = {
//         firstName: matchedStudent.studentInfo_first_name,
//         middleName: matchedStudent.studentInfo_middle_name,
//         lastName: matchedStudent.studentInfo_last_name,
//         tuptId: matchedStudent.studentInfo_tuptId,
//         course: matchedStudent.studentInfo_course,
//         section: matchedStudent.studentInfo_section,
//         email: matchedStudent.user_email,
//         user_id: matchedStudent.user_id
//       };

//       // Perform the database insert or update
//       const historyResponse = await axios.post('http://localhost:2525/library_history', libraryHistory);
//       console.log(`Tap status: ${historyResponse.data.tapStatus}`); // Log the tap status ("In" or "Out")

//       io.emit('tagData', { user_id: matchedStudent.user_id, tagData, tapStatus: historyResponse.data.tapStatus, excessiveTap: false });
//     } else {
//       console.log('No matching RFID tag found');
//     }
//   } catch (error) {
//     console.error('Error fetching student information or recording library history:', error);
//   }

//   res.send('Tag data received successfully');
// });

// // Koa setup
// const koaApp = new Koa();
// const router = new Router();

// router.get('/', async (ctx) => {
//   ctx.body = "Hello World from Railway this is Library";
// });

// koaApp.use(router.routes()).use(router.allowedMethods());

// // Middleware to handle Koa routes in Express
// app.use('/koa', (req, res) => {
//   koaApp.callback()(req, res);
// });

// // Start the HTTP server
// server.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });

const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const { Server } = require("socket.io");
const axios = require('axios');
const Koa = require("koa");
const Router = require("koa-router");
const moment = require('moment-timezone');

const app = express();
const port = process.env.PORT || 2929;

// Create an HTTP server
const server = http.createServer(app);

// Pass the server instance to Socket.IO
const io = new Server(server, {
  cors: {
    origin: "*",
  }
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

io.on('connection', (socket) => {
  console.log('New WebSocket connection');
  
  socket.on('tagData', (data) => {
    console.log('Received tag data via WebSocket:', data);
  });

  socket.on('disconnect', () => {
    console.log('WebSocket disconnected');
  });
});

// Object to store RFID tag data with timestamp
const tagDataMap = {};

// Route to handle POST requests to /tagData
app.post('/tagData', async (req, res) => {
  const tagData = req.body.tagData;

  console.log('Received tag data via POST:', tagData);

  const now = new Date().getTime();
  const timeout = 60000; // 1 minute in milliseconds

  if (tagDataMap[tagData] && now - tagDataMap[tagData] < timeout) {
    console.log("You've already tapped your RFID card. Please wait for a minute before tapping again.");
    io.emit('tagData', { tagData, excessiveTap: true });
    return res.status(429).send({ message: "You've already tapped your RFID card. Please wait for a minute before tapping again." });
  }

  tagDataMap[tagData] = now;

  // Fetch student information from the MySQL server
  try {
    const response = await axios.get('https://macts-backend-webapp-production-0bd2.up.railway.app/studentInfo');
    const students = response.data;
    const formattedDate = moment().tz('Asia/Manila').format('M/D/YYYY, h:mm:ss A'); // Format the date in Philippine Time

    // Check for matching tagValue
    const matchedStudent = students.find(student => student.tagValue === tagData);

    if (matchedStudent) {
      console.log('RFID tag matched:', matchedStudent);

      // Insert matched student information into library_taphistory
      const libraryHistory = {
        firstName: matchedStudent.studentInfo_first_name,
        middleName: matchedStudent.studentInfo_middle_name,
        lastName: matchedStudent.studentInfo_last_name,
        tuptId: matchedStudent.studentInfo_tuptId,
        course: matchedStudent.studentInfo_course,
        section: matchedStudent.studentInfo_section,
        email: matchedStudent.user_email,
        user_id: matchedStudent.user_id
      };

      // Perform the database insert or update
      const historyResponse = await axios.post('https://macts-backend-mobile-app-production.up.railway.app/library_history', libraryHistory);
      console.log(`Tap status: ${historyResponse.data.tapStatus}`); // Log the tap status ("In" or "Out")

      io.emit('tagData', { user_id: matchedStudent.user_id, tagData, tapStatus: historyResponse.data.tapStatus, excessiveTap: false });
    } else {
      console.log('No matching RFID tag found');
    }
  } catch (error) {
    console.error('Error fetching student information or recording library history:', error);
  }

  res.send('Tag data received successfully');
});

// Koa setup
const koaApp = new Koa();
const router = new Router();

router.get('/', async (ctx) => {
  ctx.body = "Hello World from Railway this is Library";
});

koaApp.use(router.routes()).use(router.allowedMethods());

// Middleware to handle Koa routes in Express
app.use('/koa', (req, res) => {
  koaApp.callback()(req, res);
});

// Start the HTTP server
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// const express = require('express');
// const bodyParser = require('body-parser');
// const http = require('http');
// const { Server } = require("socket.io");
// const axios = require('axios');
// const Koa = require("koa");
// const Router = require("koa-router");
// const moment = require('moment-timezone');

// const app = express();
// const port = process.env.PORT || 2929;

// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: "*",
//   }
// });

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// io.on('connection', (socket) => {
//   console.log('New WebSocket connection');
  
//   socket.on('tagData', (data) => {
//     console.log('Received tag data via WebSocket:', data);
//   });

//   socket.on('disconnect', () => {
//     console.log('WebSocket disconnected');
//   });
// });

// const tagDataMap = {};

// app.post('/tagData', async (req, res) => {
//   const tagData = req.body.tagData;

//   console.log('Received tag data via POST:', tagData);

//   const now = new Date().getTime();
//   const timeout = 60000;

//   if (tagDataMap[tagData] && now - tagDataMap[tagData] < timeout) {
//     console.log("You've already tapped your RFID card. Please wait for a minute before tapping again.");
//     io.emit('tagData', { tagData, excessiveTap: true });
//     return res.status(429).send({ message: "You've already tapped your RFID card. Please wait for a minute before tapping again." });
//   }

//   tagDataMap[tagData] = now;

//   try {
//     const response = await axios.get('https://macts-backend-webapp-production-0bd2.up.railway.app/studentInfo');
//     const students = response.data;
//     const formattedDate = moment().tz('Asia/Manila').format('M/D/YYYY, h:mm:ss A'); // Format the date in Philippine Time

//     const matchedStudent = students.find(student => student.tagValue === tagData);

//     if (matchedStudent) {
//       console.log('RFID tag matched:', matchedStudent);

//       const libraryHistory = {
//         firstName: matchedStudent.studentInfo_first_name,
//         middleName: matchedStudent.studentInfo_middle_name,
//         lastName: matchedStudent.studentInfo_last_name,
//         tuptId: matchedStudent.studentInfo_tuptId,
//         course: matchedStudent.studentInfo_course,
//         section: matchedStudent.studentInfo_section,
//         email: matchedStudent.user_email,
//         user_id: matchedStudent.user_id,
//         date: formattedDate // Use the formatted date
//       };

//       const historyResponse = await axios.post('http://localhost:2525/library_history', libraryHistory);
//       console.log(`Tap status: ${historyResponse.data.tapStatus}`);

//       io.emit('tagData', { user_id: matchedStudent.user_id, tagData, tapStatus: historyResponse.data.tapStatus, excessiveTap: false });
//     } else {
//       console.log('No matching RFID tag found');
//     }
//   } catch (error) {
//     console.error('Error fetching student information or recording library history:', error);
//   }

//   res.send('Tag data received successfully');
// });

// const koaApp = new Koa();
// const router = new Router();

// router.get('/', async (ctx) => {
//   ctx.body = "Hello World from Railway this is Library";
// });

// koaApp.use(router.routes()).use(router.allowedMethods());

// app.use('/koa', (req, res) => {
//   koaApp.callback()(req, res);
// });

// server.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });
