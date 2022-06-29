const productModel=require('../models/products-model');

const getProductsStatic=async(req,res)=>{
    const productsList=await productModel.find({});
    res.status(200).json(productsList);
}

const getProducts=async(req,res)=>{
    const {featured,company,name,sort,select,numericFilters}=req.query;
    console.log(numericFilters);
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
    
    if(numericFilters){
        const operatorMap={
            '>': '$gt',
            '<': '$lt',
            '>=': '$gte',
            '=':  '$eq',
            '<=': '$lte',
        }
        const regex=/\b(>|>=|<|<=|=)\b/g;
        
        const numericFiltersEdited=numericFilters.replace(regex,(match)=>`-${operatorMap[match]}-`);

        console.log(numericFiltersEdited);

        const filterList=['price','rating'];
        
        numericFiltersEdited.split(',').forEach(filter=>{

            const [field,operator,value]=filter.split('-');

            if(filterList.includes(field)){

                if(!queryObject[field])

                    queryObject[field]={[operator]:Number(value)}
                
                queryObject[field][operator]=Number(value);

            }
            else {
                throw new Error("you can only apply numericFilters on price and rating")
            }

        })


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

    console.log(queryObject);


    //pagination
    const page=Number(req.query.page)||1;

    const limit=Number(req.query.limit)||10;

    const skip=(page-1)*limit;

    productsList.skip(skip).limit(limit)

    const result=await productsList;


    res.status(200).json(result);
}



module.exports={
    getProductsStatic,getProducts
}