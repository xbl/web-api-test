exports.lockStore = (req, res, webApi) => {
  const productId = req.body.product_id;
  if (productId === 1) {
    res.json({code: 200});
    return ;
  }
  res.json({code: 500, message: '锁库存失败！'});
}
