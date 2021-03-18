{

    //#region startScreen

    {
        
        function showLoginScreen()
        {
            if(Bank._users.length > 0)
            {
                document.getElementById("startScreen").hidden = true;
                document.getElementById("loginScreen").hidden = false;
            }
            else
            {
                console.log("No users exist");
            }
        }

        function showNewUserScreen()
        {

            document.getElementById("startScreen").hidden = true;
            document.getElementById("newUserScreen").hidden = false;
        }

        function printUserList()
        {
            if(Bank._users.length == 0)
            {
                console.log("No users exist");
            }
            else
            {
                console.log("Users: " + Bank._users.length);

                Bank._users.forEach(element => {
                    console.log("ID: " + element._id);
                    console.log("Password: " + element._password);
                });
            }
        }

        var loginButton = document.getElementById('StartLoginButton');
        loginButton.addEventListener('click', showLoginScreen);

        var newUserButton = document.getElementById('StartUserButton');
        newUserButton.addEventListener('click', showNewUserScreen);

        var printUserListButton = document.getElementById('PrintUserListButton');
        printUserListButton.addEventListener('click', printUserList);
    }


    //#endregion

    //#region NewUserScreen
    {

        function AttemptCreateUser(event)
        {
            console.log("CreateUserAttemptStart");
            if(!CreateUser())
            {   
                document.getElementById("hiddenRetry").innerHTML = "Please enter username and password";
            }
            else
            {
                showStartScreen();
            }
            event.preventDefault();
        }


        function CreateUser() {
            //document.getElementById("passwordForm");
              
            var form = document.getElementById('newUserForm');
            let username = form.elements['username'];
            let password = form.elements['password'];
            let isCustomer = form.elements['admin'];

            console.log("password: " + password.innerHTML);

            if(VerifyStringInput(password) && VerifyStringInput(username))
            {
                if(isCustomer)
                {
                    console.log("Customer created");
                    Bank.CreateCustomer(username.value, password.value);
                }
                else
                {                    
                    console.log("Admin created");
                    Bank.CreateAdmin(username.value, password.value);
                }

                return true;
            }
            else
            {
                console.log("User password or username creation failed.");
            }
            console.log("User creation failed");
            return false;
        }

        function VerifyStringInput(intput)//something basic, non working
        {
            //if(typeof(input.value) == 'string')
            {
                //if(intput.length > 0)
                //{
                    return true;
                //}
            }
            return false;
        }

        function showStartScreen()
        {
            document.getElementById("newUserScreen").hidden = true;
            document.getElementById("startScreen").hidden = false;
        }
        
        var form = document.getElementById('newUserForm');
        form.addEventListener('submit', AttemptCreateUser);
        

        var userBack = document.getElementById('userBackButton');
        userBack.addEventListener('click', showStartScreen);
        
    }

    //#endregion

//#region loginScreen

{
    function AttemptLogin(event)
    {
        if(verifyLogin())
        {
            //logged in
        }
        else
        {
            //login failed
        }
        event.preventDefault();
    }
    
    function verifyLogin()
    {
        var form = document.getElementById('loginForm');
        let username = form.elements['username'];
        let password = form.elements['password'];
    
    
        Bank._users.forEach(element => {
            if(username.value === element._id && password.value === element.password)
            {
                return true;
            }
        });
        return false;
    }

    var form = document.getElementById('loginForm');
    form.addEventListener('submit', AttemptLogin);
}

//#endregion

//#region bank

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
//#endregion

}