const productModel=require('../models/products-model');

const getProductsStatic=async(req,res)=>{
    const productsList=await productModel.find({});
    res.status(200).json(productsList);

}

const getProducts=async(req,res)=>{
    const {featured,company,name,sort,select}=req.query;
    const queryObject={};

    if(featured){
        queryObject.featured=featured==='true'?true:false
    }

    if(company){
        queryObject.company=company;
    }

    if(name){
        queryObject.name={$regex:name,$options: 'i'};
    }

    const productsList= productModel.find(queryObject);
    if(sort){
        const sortList=sort.split(',').join(' ');
        productsList.sort(sortList);
    }

    else {
        productsList.sort('date');
    }
    if(select){
        const selectList=select.split(',').join(' ');
        productsList.select(selectList);
    }


    //pagination
    const page=Number(req.query.page)||1;

    const limit=Number(req.query.limit)||10;

    const skip=(page-1)*limit;

    productsList.skip(skip).limit(limit)

    const result=await productsList;


    res.json(result);
}



module.exports={
    getProductsStatic,getProducts
}