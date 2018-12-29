const aliyun = require('@qunhe/aliyun-coohom');
const {name, version} = require('../manifest.json');
const fs = require('fs-extra');

// 将配置文件一并发布到cdn，以供框架层反射式调用
fs.copySync('./manifest.json', './build/manifest.json');

// 写最终模板文件
const cdnhost = 'https://cdn.coohom.com';
const prefix = `/i18n/commercial-hive/${name}/${version}`;
const entryTemplate = fs.readFileSync('./scripts/entry.html').toString();
const entryDist = entryTemplate
    .replace(/<script src="/g, `<script src="${cdnhost}${prefix}`)
    .replace(/<link href="/g, `<link href="${cdnhost}${prefix}`);
fs.writeFileSync('./build/entry.html', entryDist);

aliyun.ossUtils.upload({
    dir: 'build',
    prefix,
});
