

exports.getIndex = (req, res, next) => {
  console.log('rendering static content for index.html');
  res.render('index.html');
}