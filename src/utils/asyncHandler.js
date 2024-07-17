// 1. async handler function creation using try catch block

// const asyncHandler = (fn)=> async (req,res,next)=>{
//     try {
//         await fn(req,res,next)
        
//     } catch (error) {
//         res.status(err.code || 500).json({
//             success:false,
//             message: "Error Encountered "+err.message
//         })
        
//     }
// }



// 2. async handler function creation using promise

const asyncHandler = (requestHandler)=>{
  return  (req,res,next)=>{
        Promise.resolve(requestHandler(req,res,next)).
        catch((err)=>next(err))
    }
}


export {asyncHandler}



















// Higher Order Functions
/*  const fn1 = (fn2)=>{()=>{}}
    const fn1 = (fn2)=>()=>{}

        for making them async ---->
    const fn1 = (fn2)=> {async()=>{}}
    const fn1 = (fn2)=> async()=>{}


*/