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
        this._type = type;
    }

    calcRepayments(valueType){
        if(valueType == "repayment"){
            return (this.getAmount() + (this.getAmount() * this.getRate() * this.getTerm())).toFixed(2);
        }
        else if(valueType == "interest"){
            return (this.getAmount() *  this.getRate() * this.getTerm()).toFixed(2);
        }
    }
    calcMonthlyPay(){
        return (this.calcRepayments("repayment")/(12*this.getTerm())).toFixed(2);
    }
}

export { Mortgage_Calc };