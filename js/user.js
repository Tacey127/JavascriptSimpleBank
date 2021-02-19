{

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