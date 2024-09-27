class Mortgage_Calc{
    constructor(){
        this._amount = null;
        this._term = null;
        this._rate = null;
        this._type = null;
    }

    getAmount(){
        return this._amount
    }
    setAmount(amount){
        this._amount = amount
    }

    getTerm(){
        return this._term;
    }
    setTerm(term){
        this._term = term;
    }

    getRate(){
        return  this._rate;
    }
    setRate(rate){
        this._rate = rate;
    }

    getType(){
        return this._type;
    }
    setType(type){
        this._type =type;
    }

    calcRepayments(valueType){
        if(valueType == "repayment"){
            console.log("Repayment");
        }
        else if(valueType == "interest"){
            console.log("Interest");
        }
        else{
            console.log("Hmmm")
        }
    }
}

export {Mortgage_Calc};