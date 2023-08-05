const drugServices = require('../services/drug.services');

const search = (req, res,next)=>{
            res.json({
                data: drugServices.getDrugByFilter(req.query.q),
                success:true,
                error: ''
            });
}

module.exports = {
    search
}