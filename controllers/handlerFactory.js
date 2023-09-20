exports.createOne = Model =>
  async (req, res, next) => {
   try{
    const doc = await Model.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        data: doc
      }
    });
}catch(err){
    console.log(err)
}
  };

  exports.getAll = Model =>
  async (req, res, next) => {
    try{
    const doc = await Model.find();
    res.status(200).json({
      status: 'success',
      results: doc.length,
      data: {
        data: doc
      }
    });
  }catch(err){
    console.log(err)
  }
  } 
exports.updateOne = Model =>
  async (req, res, next) => {
    try{
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!doc) {
      res.send('no document found');
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc
      }
    });
} catch(err){console.log(err)}
  };


exports.getOne = (Model) =>
 async (req, res, next) => {
 try{
    const doc = await Model.findById(req.params.id);
    if (!doc) {
      res.send('no document found');
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc
      }
    });
} catch(err){
    console.log(err)
}
  };
  exports.deleteOne = Model =>
  async (req, res, next) => {
 try{
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      res.send('no document found')
    }

    res.status(204).json({
      status: 'success',
      data: null
    });
}catch(err){console.log(err)}
  };
