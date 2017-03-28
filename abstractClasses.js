/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
"usestrict";

    function Valid(){
        
    }
    Valid.prototype.validNumber = function(){
        arguments.every = [].every;
        function f(a){
            return !isNaN(parseFloat(a)) && isFinite(a);
        }
        return arguments.every(f);          
    };
    Valid.prototype.validOn = function(){
        if(this._currentOnOff === true){
        return true;
        }
        else{
            return false;
        }
    };
    


    function OnOffDevices(name){
        this._name = name;
        this._currentOnOff = false;
    }
    OnOffDevices.prototype.onOff = function(){
        if(this._currentOnOff === false){
            this._currentOnOff = true;                    
        }
        else{
            this._currentOnOff = false;                    
        }
    };
    OnOffDevices.prototype.checkStatus = function(){
        return "Name: " + this._name + "  " + "Status: " + this._currentOnOff + "  ";
    };
    
    
    function MultimediaDevices(name, valobj){
        OnOffDevices.call(this,name);
        this._val = valobj;
        this._currentChanel = 1;
        this._currentVol = 10;
    }
    MultimediaDevices.prototype = Object.create(OnOffDevices.prototype);
    MultimediaDevices.prototype.constructor = MultimediaDevices;
    
    MultimediaDevices.prototype.nextChanel = function (){
        if(this._val.validOn){
            if (this._currentChanel < 99){
                this._currentChanel ++;
            }
            else{
                this._currentChanel = 0;
            }
        }
    };
    MultimediaDevices.prototype.prewChanel = function (){
        if(this._val.validOn){
            if (this._currentChanel > 0){
                this._currentChanel --;
            }
            else{
                this._currentChanel = 99;
            }
        }
    };
    MultimediaDevices.prototype.getSetChanel = function (a){
        if(arguments){
            if(this._val.validOn && this._val.validNumber(a)){
                if(a + this._currentChanel <= 100 && a + this._currentChanel >= 0){
                    this._currentChanel = a;
                }                
            }
        }
        else{
            return this._currentChanel;
        }
    };
    MultimediaDevices.prototype.decriaseVol = function (){
        if(this._val.validOn && this._currentVol > 0){
            this._currentVol --;
        }
    };
    MultimediaDevices.prototype.increaseVol = function (){
        if(this._val.validOn && this._currentVol < 32){
            this._currentVol ++;
        }
    };
    MultimediaDevices.prototype.checkStatus = function(){
       return OnOffDevices.prototype.checkStatus.call(this) + "Chanel: " + this._currentChanel + "  " + "Volume: " + this._currentVol;
    };
    
    var radioList=[
        {name:"Retro",freq:87},
        {name:"Rock",freq:91},
        {name:"Hit-FM",freq:102},
        {name:"Auto-FM",freq:105}
    ];