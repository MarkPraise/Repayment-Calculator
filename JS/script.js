import { Mortgage_Calc } from "./mortgage.js";

// Checked State

// Alternative to load event
document.onreadystatechange = () => {
    if (document.readyState === "complete") {
      
        let typeWrapper = Array.from(document.getElementsByName("type"));
        let clearButon = document.querySelector(".clearButton");

        clearButon.addEventListener("click",(e)=>{
            typeWrapper.forEach((item)=>{
                item.closest(".check-field").classList.remove("typeCheckedColor")
            })
        })

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


        // VALIDATING THE FORM
        let amount = document.getElementById("amount");
        let term = document.getElementById("term");
        let rate = document.getElementById("rate");
        let type = document.getElementById("repay");

        


        let form =document.getElementById("repaymentForm")

        form.addEventListener("submit",(event)=>{
            event.preventDefault();
            showError(rate);
            showError(amount);
            showError(term);
            showError(type); 
        })

        
    }
  };
  
function showError(element){

    let parentElement = element.closest(".input-outline");
    let units = parentElement.querySelector(".field-units");
    let validationMessage = element.closest(".field-wrapper").querySelector(".error");

    let message = "";

    if(!element.validity.valid){
        
        if(element.type != "radio"){
            parentElement.classList.add("error-border");
            units.classList.add("error-bg");
        }
        
        if(element.validity.valueMissing){
            message ="This field is required";
        }
        else if(element.validity.rangeOverflow){
            message = "Value is more than 100";
        }

        validationMessage.textContent = message;
    }
    else{
        parentElement.classList.remove("error-border");
        if(element.type != "radio"){
            units.classList.remove("error-bg");
        }

        validationMessage.textContent = message;
    }
}







