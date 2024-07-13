import { Router } from 'express'
// const path = require('path');
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const createRRHHRouter = () => {
  const RRHHRouter = Router()

  RRHHRouter.get('/rrhh', (req, res) => {
    res.send('Hello World')
  })

  // show a html form
  // RRHHRouter.get('/create', (req, res) => {
  //   res.render('views/rrhh')
  // })
  RRHHRouter.get('/create', (req, res) => {
    const result = 2+2;
    // res.sendFile(path.join(__dirname, '../../../views/rrhh/rrhh.html'));
    res.sendFile(process.cwd() + '/views/rrhh/rrhh.html')
  });

  return RRHHRouter
}