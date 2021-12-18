const auth = async (req, res, next) => {
    console.log("req  = ", req)
    try {
        if (!req.user) {
          res.status(401).send({error: 'Please authenticate'})
        } else {
          next()
        }
    } catch(e) {
      res.status(401).send({error: 'Please authenticate'})
    }
}

module.exports = auth