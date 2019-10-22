function createField() {
    var members = new Array('required', 'regexp');
    for(var i = 0; i < arguments.length; i++) {
        this[members[i]] = arguments[i];
    }
}

createField.prototype.regexp = /^[A-z0-9-_+. ,@]{1,}$/ig;
createField.prototype.valid = false;
createField.prototype.required = true;
createField.prototype.nullify = function() {
    this.valid = false;
};

var single = new Array();
single['name'] = new createField();
single['email'] = new createField(true, /^[A-z0-9._-]+@[A-z0-9.-]+\.[A-z]{2,4}$/);
single['sex'] = new createField(true, /male$/ig);

var Singleton = {
    fields : single,
    regForm : false,
    nullify_values : function() {
        for(i in this.fields) {
            this.fields[i].nullify();
        }
    },
    submit : function() {
        if(this.regForm) {
            // set property valid to false for every form field
            this.nullify_values();
            var i = null;
            // walks through the form fields, pick and if required check their values
            for(i = 0; i < this.regForm.elements.length; i++) {
                // current field
                var oField = this.regForm.elements[i];
                switch (oField.type) {
                    case "button":
                    case "submit":
                    case "reset":
                        break;
                    case "checkbox":
                    case "radio":
                        if(!oField.checked) {
                            break;
                        }
                    default :
                        // javascript trim function analogue
                        oField.value = oField.value.replace(/^\s*/, '').replace(/\s*$/, '');
                        if(!oField.value) {
                            oField.value = '';
                        }

                        // if this field is out of interest
                        if(!this.fields[oField.name].required) {
                            this.fields[oField.name].valid = true;
                            
                        }
                        // if this field is required
                        else {
                            var match = this.fields[oField.name].regexp.test(oField.value);
                            // ...  and fits regular expression
                            if(match) {
                                this.fields[oField.name].valid = true;
                                t
                            }
                            this.fields[oField.name].regexp.test(oField.value);
                        }
                }
            }
            // now all we need is to check if the whole form is valid
            // we perform it by comparing number of form fields and number of valid fields
            // they should be equal
            var validForm = 0;
            var fieldsLength = 0;
            for(i in this.fields) {
                fieldsLength++;
                if(this.fields[i].valid) {
                    validForm++;
                }
                else {
                    this.regForm[i].style.border="1px solid #FF0000";
                    break;
                }                    
            }
            if(validForm == fieldsLength) {
                this.regForm.submit();
            }
            else {
                this.nullify_values();
                return false;
            }
            
        }
    }
};

single = null;

window.onload = function() {
    var regForm = document.forms[0];
    Singleton.regForm = regForm;
    Singleton.regForm.onsubmit = function() {
        return Singleton.submit();
    };
};