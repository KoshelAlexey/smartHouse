/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
"usestrict";

    function Lamp(name){
       OnOffDevices.call(this,name);
       this._lightTemp = "Neutral";
    }
    Lamp.prototype = Object.create(OnOffDevices.prototype);
    Lamp.prototype.constructor = Lamp;
    
    Lamp.prototype.setColdTemp = function(){
        this._lightTemp = "Cold";
    };
    Lamp.prototype.setNeutralTemp = function(){
        this._lightTemp = "Neutral";
    };
    Lamp.prototype.setWarmTemp = function(){
        this._lightTemp = "Warm";
    };
    Lamp.prototype.checkStatus = function(){
       return OnOffDevices.prototype.checkStatus.call(this) + "Light temperature: " + this.lightTemp + "  ";
    };
    
    function Tv(name, valobj){
        MultimediaDevices.call(this,name,valobj);
        this._brightness = "Normal";
    }
    Tv.prototype = Object.create(MultimediaDevices.prototype);
    Tv.prototype.constructor = Tv;
    
    Tv.prototype.setLowBrightness = function(){
        if(this._val.validOn){
            this._brightness = "Low";
        }
    };
    Tv.prototype.setNormalBrightness = function(){
        if(this._val.validOn){
            this._brightness = "Normal";
        }
    };
    Tv.prototype.setHighBrightness = function(){
        if(this._val.validOn){
            this._brightness = "High";
        }
    };
    Tv.prototype.checkStatus = function(){
       return MultimediaDevices.prototype.checkStatus.call(this) + "  " + "Brightness: " + this._brightness + "  ";
    };
    
    function TvPro(name,valobj){
        Tv.call(this,name,valobj);
    }
    TvPro.prototype = Object.create(Tv.prototype);
    TvPro.prototype.constructor = TvPro;
    
    TvPro.prototype.setTimer = function(a, b){
        if(this._val.validOn && this._val.validNumber(a, b) && a>=0 && b>=0){
            delay = a*60000 + b*1000;            
            setTimeout (this.onOff(),delay);           
        }
    };
    
    function Radio(name, valobj, list){
        MultimediaDevices.call(this,name,valobj);
        this.list = list;
        this.nameChanel = list[0].name;
        this.freqChanel = list[0].freq;
        this.currentChanel = 0;
    }
    Radio.prototype = Object.create(MultimediaDevices.prototype);
    Radio.prototype.constructor = Radio;
    
    Radio.prototype.nextChanel = function (){
        if(this._val.validOn){
     outer: for(var i = this.freqChanel+1;;i++){            
                for(var k = 0;k<this.list.length;k++){
                    if(i === this.list[k].freq){
                        this.nameChanel = this.list[k].name;
                        this.freqChanel = this.list[k].freq;
                        this.currentChanel = k;
                        break outer;
                    }
                    if (i > 120){i = 85;}
                };
            }
        }
    };
    Radio.prototype.prewChanel = function (){
        if(this._val.validOn){
     outer: for(var i = this.freqChanel-1;;i--){            
                for(var k = 0;k<this.list.length;k++){
                    if(i === this.list[k].freq){
                        this.nameChanel = this.list[k].name;
                        this.freqChanel = this.list[k].freq;
                        this.currentChanel = k;
                        break outer;
                    }
                    if (i <80 ){i = 120;}
                };
            }
        }
    };
    Radio.prototype.addChanel = function(station,frequency){
        if(this._val.validOn){
            this.list[this.list.length]={name:station,freq:frequency};
        }
    };
    Radio.prototype.setTimer = function(h, m, s){
        if(this._val.validOn && this._val.validNumber(h,m,s) && h>=0 && m>=0 && s>=0){
            delay = h*3600000 + m*60000 + s*1000;
            this.onOff();
            setTimeout (this.onOff(),delay);           
        }
    };