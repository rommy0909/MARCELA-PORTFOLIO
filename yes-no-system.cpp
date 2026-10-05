#include <iostream>
using namespace std;

int main() {
    char ans;
    do {
        cout << "Do you want to continue (Y/N)?\n";
        cout << "You must type a 'Y' or an 'N'.\n";
        cin >> ans;

        // Input validation loop (simplified)
        while (ans != 'Y' && ans != 'N' && ans != 'y' && ans != 'n') {
            cout << "Invalid input. Please type a 'Y' or an 'N'.\n";
            cin >> ans;
        }
    } while (ans == 'Y' || ans == 'y');

    cout << "The program has ended." << endl;
    return 0;
}
