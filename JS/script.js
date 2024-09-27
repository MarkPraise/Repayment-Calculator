import { Mortgage_Calc } from "./mortgage.js";

// Checked State

// Alternative to load event
document.onreadystatechange = () => {
    if (document.readyState === "complete") {
      
        let typeWrapper = Array.from(document.getElementsByName("type"));

        typeWrapper.forEach((item)=>{
            item.addEventListener("change",(e)=>{
                if(item.checked){
                    let checkedRatioIndex = typeWrapper.findIndex((x)=> x ==item);
                    let unCheckedRadioIndex =typeWrapper.findIndex((x) => x != item);

                    typeWrapper[checkedRatioIndex].closest(".check-field").classList.add("typeCheckedColor");

                    typeWrapper[unCheckedRadioIndex].closest(".check-field").classList.remove("typeCheckedColor");
                }
            })
        })
    }
  };
  








