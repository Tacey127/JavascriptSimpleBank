{

    function setCookie(cname,cvalue,exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = "expires=" + d.toGMTString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
      }

    function checkCookie() {
        var user=getCookie("jsBank");
        if (user != "") {

          alert("js Bank Cookie Exists");

        } else {
            /*
           user = prompt("Please enter your name:","");
           if (user != "" && user != null) {
             setCookie("username", user, 30);
           }
           */
        }
    }

    function getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i < ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) == ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
          }
        }
        return "";
      }


    class Bank
    {
        static #users = [];

        static CreateCustomer(id, password)
        {
            this.#users.push(new Customer(id, password));
        }

        static CreateAdmin(id, password)
        {
            this.#users.push(new Admin(id, password));
        }

        static login(id, password)
        {
            this.#users.forEach(element => {
                if(id == element.id && password == element.password)
                {
                    return true;
                }
            });
            return false;
        }
    }

    class User{

        #id;
        #password;

        constructor(id, password)
        {
            this.#id = id;
            this.#password = password;
        }
    }

    class Customer extends User
    {
        accounts = [];

        createAccount(amount) {
            this.accounts.push(Account.createAccount(amount));
        }

    }

    class Admin extends User
    {
        AccessCustomerAccount(id)
        {
            
        }
    }

    class Account{
        #isFrozen = false;
        #balance = 0;
        #overdraftLimit = 0;

        static createAccount(balance)
        {
            if(balance < 0)
            {
                return null;
            }
            else
            {
                return new Account(balance);
            }
        }

        constructor(balance)
        {
            if(balance > 0)
            {
                this.#balance = balance;
            }
            else return null;
        }

        GetBalance(){
            return this.#balance;
        }

        FreezeAccount(){
            this.#isFrozen = true;
        }

        Withdraw(amount){
            if(amount < this.#balance + this.#overdraftLimit)
            {
                this.#balance -= amount;
            }
            return false;
        }

        Deposit(amount){
            this.#balance += amount;
        }
        
    }


}