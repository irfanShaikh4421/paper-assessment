const Bless = fn => (req,res,next) => Promise
                                            .resolve(req,res,next)
                                            .catch(next)