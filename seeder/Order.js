const ObjectId = require("mongodb").ObjectId;

const Order = [
   {
     user : ObjectId('637381ef9483630d4d9dbf15'),
     product :ObjectId('63df234cf27ebbbc63f1b325'),
     payment : 0,
     orderQuantity : 2,
     isPaid :false,
     isDeliver : 1,
     orderDate :'02-01-23'
    },
   {
     user : ObjectId('637381ef9483630d4d9dbf15'),
     product :ObjectId('63df234cf27ebbbc63f1b325'),
     payment : 0,
     orderQuantity : 3,
     isPaid :false,
     isDeliver : 1,
     orderDate :'02-01-23'
    },
];

module.exports = Order;