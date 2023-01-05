const Sauce = require('../models/sauce');
const Like = require('../models/like');
const fs = require ('fs');

exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject.userId;
  const sauce = new Sauce({
    ...sauceObject,
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    likes: 0,
    dislikes: 0
  });

  sauce.save()
  .then(() => res.status(201).json({message: 'Objet enregistré !'}))
  .catch(error => res.status(400).json({error}));
};

exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({_id: req.params.id})
  .then(sauce => res.status(200).json(sauce))
  .catch(error => res.status(404).json({error}));
};

exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file ? {
    ...JSON.parse(req.body.sauce),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : {...req.body};

  Sauce.findOne({_id: req.params.id})
  .then(sauce => {
    if (sauce.userId != req.auth.userId) {
      res.status(401).json({message: 'Non-autorisé'});
    } else {
      Sauce.updateOne({_id: req.params.id}, {...sauceObject, _id: req.params.id})
      .then(() => res.status(200).json({message: 'Sauce mise à jour !'}))
      .catch(error => res.status(401).json({error}));
    }
  })
  .catch(error => res.status(400).json({error}));
};

exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({_id: req.params.id})
  .then(sauce => {
    if (sauce.userId != req.auth.userId) {
      res.status(401).json({message: 'Non-autorisé'});
    } else {
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink(`image/${filename}`, () => {
        sauce.deleteOne({_id: req.params.id})
        .then(() => res.status(200).json({message: 'Objet supprimé !'}))
        .catch(error => res.status(400).json({error}));
      })
    }
  })
  .catch(error => res.status(500).json({error}));
};

exports.getAllSauces = (req, res, next) => {
  Sauce.find()
  .then(sauces => res.status(200).json(sauces))
  .catch(error => res.status(500).json({error}));
};

exports.likeSauce = (req, res, next) => {
  Sauce.findOne({_id: req.params.id})
    .then(sauce => {
      //Testing while user like the sauce
      if (req.body.like === 1 && !sauce.usersLiked.includes(req.auth.userId)) {
        sauce.likes += 1;
        sauce.usersLiked.push(req.auth.userId);
        Sauce.updateOne({_id: req.params.id}, sauce)
          .then(() => res.status(200).json({message: 'Sauce liked !'}))
          .catch(error => res.status(500).json({error}));
      };
      //Testing while user remove his like or dislike from the sauce
      if (req.body.like === 0) {
        if (sauce.usersLiked.includes(req.auth.userId)) { 
          Sauce.updateOne({_id: req.params.id},{$set:{likes:sauce.likes-1},$pull:{usersLiked:req.auth.userId}})   
          .then(() => res.status(200).json({message: 'Sauce Unliked !'}))
          .catch(error => res.status(500).json({error}));     
        } else if (sauce.usersDisliked.includes(req.auth.userId)) {
          Sauce.updateOne({_id: req.params.id},{$set:{dislikes:sauce.dislikes-1},$pull:{usersDisliked:req.auth.userId}})   
          .then(() => res.status(200).json({message: 'Sauce Undisliked !'}))
          .catch(error => res.status(500).json({error})); 
        };
      };
      //Testing while user dislike the sauce
      if (req.body.like === -1 && !sauce.usersDisliked.includes(req.auth.userId)) {
        Sauce.updateOne({_id: req.params.id},{$set:{dislikes:sauce.dislikes+1},$push:{usersDisliked:req.auth.userId}})
          .then(() => res.status(200).json({message: 'Sauce disliked !'}))
          .catch(error => res.status(500).json({error}));
      };
    })
    .catch(error => res.status(500).json({error}));
};