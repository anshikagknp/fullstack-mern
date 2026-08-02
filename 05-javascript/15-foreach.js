let fruits = ["Apple", "Mango", "Banana"]

//forEach() callback
function myfun(ele)
{
    console.log(ele);
}
fruits.forEach(myfun)

fruits.forEach(function(ele){
    console.log(ele)
})

fruits.forEach((ele)=>{
    console.log(ele)
})

fruits.forEach((ele)=>console.log(ele))