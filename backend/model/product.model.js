const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let Product = new Schema({
    product_image: {
        type: String,default:""
    },
    product_name: {
        type: String,default:""
    },
    product_type: {
        type: String,default:""
    },
    product_has_discount: {
        type: Boolean,default:false
    },
    product_available_colors: {
        type: String,default:""
    },
    product_description: {
        type: String,default:""
    }
},{
    collection: 'product_tbl'
});
module.exports = mongoose.model('Product', Product);