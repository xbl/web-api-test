const util = require('util');
const http = require('http');
const parse = require('url').parse;

const exec = util.promisify(require('child_process').exec);

const command = process.argv.slice(2).join(' ');

const webPrint = (res, code, message) => {
  res.statusCode = code;
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.end(message);
};

const port = 3000;
const prefix = '/sqlbear/';
const execute = async (req, res) => {
  const pathname = parse(req.url).pathname;
  if (!pathname.startsWith(prefix)) {
    webPrint(res, 200, '');
    return;
  }
  const placeholder = pathname.replace(prefix, '');
  try {
    const { stdout, stderr } = await exec(util.format(command, placeholder));
    console.log('stdout:', stdout);
    console.log('stderr:', stderr);
    webPrint(res, 200, stdout + stderr);
  }
  catch (error) {
    console.error(error.stdout);
    webPrint(res, 500, error.stdout);
  }
};

const server = http.createServer(execute);
server.listen(port, () => {
  console.log(`Server running at ${port}!`);
});
