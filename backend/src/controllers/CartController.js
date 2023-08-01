const {Op} = require('sequelize')
const Cart = require('../models/Cart');

const index = async(req, res) =>{
    try{
        const cart = await Cart.findAll();
        return res.status(200).json({cart});
    } catch(err){
        console.log(err.message)
        return res.status(500).json({err});
    }
};

const show = async(req,res) => {
    const {id} = req.params;
    try {
        const cart = await Cart.findByPk(id);
        return res.status(200).json({cart});
    }catch(err){
        return res.status(500).json({err});
    }
};

const create = async(req,res) => {
    try{
          const cart = await Cart.create(req.body);
          console.log(req.body);
          return res.status(201).json({msg: "Cart successfully registered!", cart: cart});
      }catch(err){
          res.status(500).json({error: err});
      }
};

const update = async(req,res) => {
    const {id} = req.params;
    try {
        const [updated] = await Cart.update(req.body, {where: {id: id}});
        if(updated) {
            const cart = await Cart.findByPk(id);
            return res.status(200).send(cart);
        } 
        throw new Error();
    }catch(err){
        return res.status(500).json("Cart not found");
    }
};

const destroy = async(req,res) => {
    const {id} = req.params;
    try {
        const deleted = await Cart.destroy({where: {id: id}});
        if(deleted) {
            return res.status(200).json("Cart successfully deleted.");
        }
        throw new Error ();
    }catch(err){
        return res.status(500).json("Cart not found.");
    }
};

module.exports = {
    create,
    update,
    index,
    show,
    destroy
}