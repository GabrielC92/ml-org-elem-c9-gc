module.exports = (req,res,next) => {
    if (req.cookies.mLiebreAr) {
        req.session.userLogin = req.cookies.mLiebreAr;
    }
    next();
}