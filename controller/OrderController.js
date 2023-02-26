const Order = require('../models/OrderModel');
const ObjectId = require('mongodb').ObjectId;

const totalSaleQty = async(req,res,next)=>{
    try {        

        const { year } = req.query;
        const jan = [],feb=[],mar=[],apr=[],may=[],jun=[],july=[],aug=[],sept=[],oct=[],nov=[],dec=[];
        let tsale = 0;
        let trevenue = 0;
        const t_order = await Order.find()
                                   .populate('product')
                                   .select('orderQuantity orderDate')
                                   .orFail();

       const orderYear = t_order.filter(e => e.orderDate.split('-')[2] === year);
        /*
        1. collect the same month together, month = { january :[{price,quantity},{price,quantity}], february : [...]}
        */
        orderYear.forEach(x =>{
            switch (x.orderDate.split('-')[1]) {
                case '01':
                    jan.push({price : x.product.price, quantity : x.orderQuantity})
                    break;
                case '02':
                    feb.push({price : x.product.price, quantity : x.orderQuantity})
                    break;
                case '03':
                    mar.push({price : x.product.price, quantity : x.orderQuantity})
                    break;
                case '04':
                    apr.push({price : x.product.price, quantity : x.orderQuantity})
                    break;
                case '05':
                    may.push({price : x.product.price, quantity : x.orderQuantity})
                    break;
                case '06':
                    jun.push({price : x.product.price, quantity : x.orderQuantity})
                    break;
                case '07':
                    july.push({price : x.product.price, quantity : x.orderQuantity})
                    break;
                case '08':
                    aug.push({price : x.product.price, quantity : x.orderQuantity})
                    break;
                case '09':
                    sept.push({price : x.product.price, quantity : x.orderQuantity})
                    break;
                case '10':
                    oct.push({price : x.product.price, quantity : x.orderQuantity})
                    break;
                case '11':
                    nov.push({price : x.product.price, quantity : x.orderQuantity})
                    break;
                case '12':
                    dec.push({price : x.product.price, quantity : x.orderQuantity})
                    break;
                default:
                    break;
            }            
        });

        trevenue = t_order.reduce((acc, cur) => {
            let t = cur.product.price * cur.orderQuantity;
           return acc + t;
        },0);

        for (let i = 0; i < t_order.length; i++) {
            tsale += t_order[i].orderQuantity;
        };

        let trevenueByMonth = 0;
      
        return res.status(200).json({
            status : true,
            totalSales : tsale,
            totalRevenue : trevenue,
            monthly_revenue : {jan,feb,mar,apr,may,jun,july,aug,sept,oct,nov,dec}   
        })
    } catch (error) {
        next(error)
    }
};

const totalOrder = async(req,res,next)=>{
    try {
        const t_order = await Order.countDocuments();
        
        res.status(200).json({
            status : true,
            total_order : t_order
        })
    } catch (error) {
        next(error)
    }
};

const getAllOrder = async(req,res,next)=>{
    try {
        //to do:
        const { orderdate } = req.query;

        let queryCondition = false;
        let dateQuery = {};
        let query ={};

        if(orderdate !== 'all'){
            queryCondition = true;
            dateQuery = { orderDate :{ $in : [orderdate]}};
        } else{
            queryCondition = false;
        };
        
        if(queryCondition){
            query = {
                $and : [dateQuery]
            }
        }
        
        const orders = await Order.find(query).populate('user product','-password');
 
        let allOrder =[];
        if(orders){
        for (let i = 0; i < orders.length; i++) {
            const element = {
                _id : orders[i]._id ,
                productName : orders[i].product.productName,
                customerName : orders[i].user.name,
                quantity : orders[i].orderQuantity,
                date : orders[i].orderDate,
                price : orders[i].product.price,
                payment : orders[i].payment, isPaid:orders[i].isPaid,delivered:orders[i].isDeliver,
                address : orders[i].user.email,
            };;
            allOrder.push(element)
        }
    }
      return  res.status(200).json(allOrder)
    } catch (error) {
        next(error)
    }

};

const getSingleOrder = async(req,res,next)=>{
    try {
        const { id } = req.params;

        const order =await Order.findById(id).populate('user product', '-password').orFail();

        res.status(200).json({
            status : true,
            order
        })
    } catch (error) {
        next(error)
    }
}

const updateOrder = async(req,res,next) =>{
    try {
        const { id } = req.params;
        const { isPaid, isDeliver } = req.body;

        const order = await Order.findById(id).populate('product').orFail();

        order.isPaid = isPaid === 'true' ? true:false;
        order.paidAt = Date.now();
        // order.isDeliver = isDeliver === 'true' ? true:false;

        await order.save()

        res.status(201).json({
            status : true,
            message : `${order._id} updated`
        })

    } catch (error) {
        next(error)
    }
};

const makeDeliver = async (req,res,next)=>{
    try {
        const { id } = req.params;
        const { isDeliver } = req.body;

        const order = await Order.findById(id).populate('product').orFail();

        order.deliveredAt = Date.now();
        order.isDeliver = isDeliver || false;

        await order.save()

        res.status(201).json({
            status : true,
            message : `product delivered`
        })

    } catch (error) {
        next(error)
    }
}

const newOrder = async(req,res,next)=>{
    try {
        console.log(req)
        // const { cardItems, payment } = req.body;

        // if(!(cardItems || payment )) {
        //     return res.status(400).json({
        //         status : false,
        //         message : 'please fill all fields'
        //     })
        // };

        //get the 
        return res.send('order created')
    } catch (error) {
        next(error)
    }
};

const Years = async (req,res,next)=>{
    try {
        const orders = await Order.find().select('orderDate').orFail();
        const years = [...new Set(orders.map(e => e.orderDate.split('-')[2]))];
        res.json({
            success : true,
            years
        })
    } catch (error) {
        next(error)
    }
}

module.exports ={ getAllOrder,getSingleOrder ,updateOrder,newOrder,totalOrder,totalSaleQty, makeDeliver,Years };