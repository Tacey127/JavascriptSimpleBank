{
    //#region cookie


    function setCookie(cname,cvalue,exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = d.toGMTString();
        document.cookie = cname + "=" + cvalue + ";" +  "expires=" + expires + ";path=/";
      }

    function checkCookie() {
        var user=getCookie("jsBank");
        if (user != "") {

          alert("js Bank Cookie Exists");

        } else {
            /*
           user = prompt("Please enter your name:","");
           if (user != "" && user != null) {
             setCookie("username", user, 2);
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

      //#endregion

    //#region UserCreation
    {

        function AttemptCreateUser(event)
        {
            console.log("a");
            if(!CreateUser())
            {   
                console.log("b");
                document.getElementById("hiddenRetry").innerHTML = "Please enter username and password";
            }
            console.log("c");
            event.preventDefault();
        }


        function CreateUser() {
            //document.getElementById("passwordForm");
              
            var form = document.getElementById('passwordForm');
            let password = form.elements['password'];
            let username = form.elements['username'];
            let isCustomer = form.elements['admin'];

            if(VerifyStringInput(password) && VerifyStringInput(username))
            {
                if(isCustomer)
                {
                    Bank.CreateCustomer(username.value, password.value);
                }
                else
                {
                    Bank.CreateAdmin(username.value, password.value);
                }

                return true;
            }
            return false;
        }

        function VerifyStringInput(intput)//something basic
        {
            if(typeof(input) == 'string')
            {
                if(intput.length > 0)
                {
                    return true;
                }
            }
            return false;
        }

        var form = document.getElementById('passwordForm');
        form.addEventListener('submit', AttemptCreateUser);
        
    }

    //#endregion

    class Bank
    {
        static _users = [];

        static CreateCustomer(id, password)
        {
            this._users.push(new Customer(id, password));
        }

        static CreateAdmin(id, password)
        {
            this._users.push(new Admin(id, password));
        }

        static login(id, password)
        {
            this._users.forEach(element => {
                if(id == element.id && password == element.password)
                {
                    return true;
                }
            });
            return false;
        }
    }

    class User{

        _id = "";
        _password;

        constructor(id, password)
        {
            this._id = id;
            this._password = password;
        }

        getId()
        {
            return this._id;
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
        _isFrozen = false;
        _balance = 0;
        _overdraftLimit = 0;

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
                this._balance = balance;
            }
            else return null;
        }

        GetBalance(){
            return this._balance;
        }

        FreezeAccount(){
            this._isFrozen = true;
        }

        Withdraw(amount){
            if(amount < this._balance + this._overdraftLimit)
            {
                this._balance -= amount;
            }
            return false;
        }

        Deposit(amount){
            this._balance += amount;
        }
        
    }


}