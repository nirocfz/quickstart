import '../styles/style.css';
import '../styles/style.less';

if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line global-require
  require('../../index.hbs');
}


setTimeout(() => {
  const a = { x: 101, y: 20 };
  const b = { ...a };
  console.log(b);
  console.log(process.env.NODE_ENV);
}, 100);
