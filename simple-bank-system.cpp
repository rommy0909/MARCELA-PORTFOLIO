#include <iostream>
using namespace std;

int main() {
    double balance = 1000.00;
    int choice;
    double amount;

    cout << "Welcome to Simple Bank System\n";
    cout << "Initial Balance: " << balance << endl;

    do {
        cout << "\nChoose transaction:\n";
        cout << "1. Deposit\n";
        cout << "2. Withdraw\n";
        cout << "3. Exit\n";
        cout << "Enter choice: ";
        cin >> choice;

        if (choice == 1) {
            cout << "Enter amount to deposit: ";
            cin >> amount;
            balance += amount;
            cout << "You deposited " << amount << endl;
            cout << "New Balance: " << balance << endl;
        } else if (choice == 2) {
            cout << "Enter amount to withdraw: ";
            cin >> amount;
            if (amount <= balance) {
                balance -= amount;
                cout << "You withdrew " << amount << endl;
                cout << "Remaining Balance: " << balance << endl;
            } else {
                cout << "Insufficient funds! Current Balance: " << balance << endl;
            }
        } else if (choice != 3) {
            cout << "Invalid choice! Please choose 1, 2, or 3." << endl;
        } else {
            cout << "Thank you for using Simple Bank System!" << endl;
        }
    } while (choice != 3);

    return 0;
}
