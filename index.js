const child_process = require('child_process');
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');

module.exports = function(source) {
  const callback = this.async();
  const tmp = path.join(__dirname, 'tmp');
  const fname = path.basename(this.resourcePath, '.go');
  const files = fs.readdirSync(this.context).filter(f => /[^(_test)]\.go$/.test(f)).map(f => `"${this.context}${path.sep}${f}"`);
  const cmd = `gopherjs build ${files.join(' ')} -o "${path.join(tmp, `${fname}.js`)}"`;
  child_process.execSync(`rm -rf "${tmp}"`);
  mkdirp.sync(tmp);

  child_process.exec(cmd, function(error, stdout, stderr) {
    if (error) { return callback(error, null); }
    const out = fs.readFileSync(path.join(tmp, `${fname}.js`), 'utf8');
    callback(null, out);
  });
};
