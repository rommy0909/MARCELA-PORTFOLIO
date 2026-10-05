#include <iostream>
using namespace std;

class BankAccount {
private:
    double balance;

public:
    // Constructor
    BankAccount(double initDeposit) {
        balance = initDeposit;
    }

    // Deposit function
    void deposit(double amount) {
        balance += amount;
    }

    // Withdraw function
    bool withdraw(double amount) {
        if (amount > balance) {
            return false; // insufficient funds
        }
        balance -= amount;
        return true;
    }

    // Get balance
    double getBalance() {
        return balance;
    }
};

int main() {
    // Creating two objects on the heap
    BankAccount* acc1 = new BankAccount(1000.0);
    BankAccount* acc2 = new BankAccount(700.0);

    // Testing acc1
    acc1->deposit(250.0);
    acc1->withdraw(100.0);
    cout << "Account 1 balance: " << acc1->getBalance() << endl;

    // Testing acc2
    acc2->deposit(300.0);
    acc2->withdraw(1100.0);  // should fail
    cout << "Account 2 balance: " << acc2->getBalance() << endl;

    // Deallocate memory
    delete acc1;
    delete acc2;

    return 0;
}
