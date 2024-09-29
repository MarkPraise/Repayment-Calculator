import { Mortgage_Calc } from "./mortgage.js";

// Checked State

// Alternative to load event
document.onreadystatechange = () => {
    if (document.readyState === "complete") {
      
        let typeWrapper = Array.from(document.getElementsByName("type"));
        let clearButon = document.querySelector(".clearButton");

        let dummyImage = document.querySelector(".results-about .img-wrapper");
        let resultInfo = document.querySelector(".results-about");
        let resultsHeader =document.querySelector(".results-about h2");
        let resultsText =document.querySelector(".results-about p");
        let resultsDetails =document.querySelector(".results .container .results-details");

        clearButon.addEventListener("click",(e)=>{
            typeWrapper.forEach((item)=>{
                item.closest(".check-field").classList.remove("typeCheckedColor")
            })
            // Remove the Warning border signal that a field is Invalid
            Array.from(document.querySelectorAll(".field-wrapper .field.input-outline")).forEach((item)=>{
                item.classList.remove("error-border")
            });

            // Remove the Warning backgroundcolor signal that a field is Invalid
            Array.from(document.querySelectorAll(".field-wrapper .field-units")).forEach((item)=>{
                item.classList.remove("error-bg")
            });

             // Remove the Warning message signal that a field is Invalid
            Array.from(document.querySelectorAll(".error")).forEach((item)=>{
    
                item.textContent ="";
            });

            dummyImage.style.display="inline";
            resultsDetails.style.display = "none";
            resultsHeader.textContent ="Results shown here";
            resultsText.textContent =`Complete the form and click "calculate repayments" to see what your monthly repayments would be.`;

            resultsText.classList.add("text-center");
            resultInfo.style.alignItems ="center";
        })

        // This helps Choose the checked radio Button
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
        
        let form =document.getElementById("repaymentForm");

         
        let amount = document.getElementById("amount");
        let term = document.getElementById("term");
        let rate = document.getElementById("rate");
        let type = document.getElementById("repay");
        let interestRate =document.getElementById("interest")
        

        form.addEventListener("submit",(event)=>{
            event.preventDefault();
            showError(rate);
            showError(amount);
            showError(term);
            showError(type);

            console.log(amount.value)

            // FORMAT THE INPUTS (NUMBERS NICELY)
            if(form.reportValidity()){

                // This Chooses the checked radio Button
                Array.from(document.getElementsByName("type")).forEach((item) =>{
                    if(item.checked){
                        type =item
                    }
                });

                let mortgage = new  Mortgage_Calc();

                mortgage.setAmount(Number(amount.value));
                mortgage.setRate(Number.parseFloat(rate.value));
                mortgage.setType(type.value.trim());
                mortgage.setTerm(Number(term.value));

                prettyPrintAmount(type,"change",amount);
                prettyPrintAmount(rate,"focus",amount);
                prettyPrintAmount(interestRate,"focus",amount);
                prettyPrintAmount(amount,"focus",amount);
                prettyPrintAmount(term,"focus",amount);


                dummyImage.style.display = "none";
                resultsHeader.textContent = "Your results";
                resultsText.textContent = `Your results are shown below based on the information you provided. To adjust the results, edit the form and click " calculate repayments" again.`;
    
                resultsText.classList.remove("text-center");
                resultInfo.style.alignItems ="flex-start";

                resultsDetails.style.display="block";
                const overAllPay = (+mortgage.calcRepayments(mortgage.getType())).toLocaleString();
                resultsDetails.innerHTML=`
                                            <h3>Your monthly repayments</h3>
                                            <p class="lime-text">
                                                <i class="bi bi-currency-pound"></i>
                                                <span> ${(+mortgage.calcMonthlyPay()).toLocaleString()} </span>
                                            </p>
                                            <p>Total you'll repay over the term</p>
                                            <div class="white-text">
                                                <i class="bi bi-currency-pound"></i>
                                                <span>
                                                   ${overAllPay}                                          
                                                </span>
                                            </div>
                                        `

            } 
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
        else if(element.type=="number"){
            if( element.id =="term"){
                if(element.value.includes(".")){
                    message= " Enter an Integer Number";
                }
                else if(element.validity.rangeOverflow){
                    message ="Value is more than 999";
                }      
            }
            else if(element.validity.rangeOverflow){
                message = "Value is more than 100";
            }               
        }
        else if(element.validity.patternMismatch){
            message="Enter the Mortgage Amount";
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

function prettyPrintAmount(element,event,target){
    element.addEventListener(event,(e)=>{
        target.value = target.value.split(",").join(""); 
    })
    if(element == amount){
        target.value = (+amount.value).toLocaleString();
    }
   
}


function isAlphaNumeric(param){
    let pattern = /\D/;
    return pattern.test(param);
}

