const User = require("../models/User");
const Auth = require("../config/Auth");

const login = async(req, res) => {
	try {
		const user = await User.findOne({where: {email: req.body.email}});
		if(!user)
			return res.status(404).json({message: "Usuario não encontrado."});
		const {password} = req.body;
		if(Auth.checkPassword(password, user.hash, user.salt)){
			const token = Auth.generateJWT(user);
			return res.status(200).json({acess_token: token});
		} else{
			return res.status(401).json({msg: "Invalid password"});
		}
	} catch (error) {
		return res.status(500).json({err: error})
	}
}

const getDetails = async(req, res) => {
	try {
		const token = Auth.getToken(req);
		const payload = Auth.decodeJwt(token);
		const user = await User.findByPk(payload.sub);
		if(!user)
			return res.status(404).json({msg: "User not found."});
		return res.status(200).json({user:user});
	} catch (e) {
		return res.status(500).json({err: e})
	}
}



module.exports = {
    login, 
    getDetails
};