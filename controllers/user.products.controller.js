const User = require('../models/user.model');

exports.findAll = async(req, res) => {
    console.log("Find all users' products");

    try {
        const result = await User.find({},{username: 1, products:1, _id:0})
        res.status(200).json({data: result});
        console.log("Reading all users' products")
    } catch(err) {
        res.status(400).json({data: err});
        console.log("Problem in reading users' products");
    }
}

exports.findOne = async (req, res) => {
    const username = req.params.username;
    console.log("Find products for user: ", username);

    try {
        const result = await User.findOne({username: username}, {username:1, products:1, _id:0});
        res.status(200).json({data: result});
        console.log("Success in finding products ", username);
    } catch(err) {
        res.status(400).json({data:err});
        console.log("Problem in finding products ", username);
    }
}

exports.create = async (req, res) => {
    const username = req.body.username;
    const products = req.body.products;

    console.log("Inserting products for user", username)

    try {
        const result = await User.updateOne(
            {username: username},
            {
                $push: {
                    products: products
                }
            }
        )
        res.status(200).json({data: result});
        console.log(`Product ${products.product} for user ${username} added`)
    } catch(err) {
        res.status(400).json({data: result})
        console.log("Failed insert")
    }
}

exports.update = async (req, res) => {
    const username = req.params.username;
    const _id = req.body.product._id;
    const quantity = req.body.product.quantity;

    try {
        const result = await User.updateOne(
            {username: username, "products._id": _id}, // returns the position $
            {
                $set: {
                    "products.$.quantity": quantity
                }
            }
        )
        res.status(200).json({data: result});
        console.log("Success in updating product", username);
    } catch (err) {
        res.status(400).json({data:err})
        console.log("Problem in updating product", username)
    }
}

exports.delete = async (req, res) => {
    const username = req.params.username;
    const _id = req.params.id;

    console.log("Delete product");

    try {
        const result = await User.updateOne(
            {username: username},
            {
                $pull: {
                    products: {_id: _id}
                }
            }
        )
        res.status(200).json = ({data: result});
        console.log("Product deleted for", username);
    } catch (err) {
        res.status(400).json = ({data: err});
        console.log("Problem in deleting product", username)
    }
}
