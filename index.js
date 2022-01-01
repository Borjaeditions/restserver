const express = require('express');
const colors = require('colors');
require('dotenv').config();
const Server = require('./models/server.js');


const initServer = new Server();
initServer.listen();
