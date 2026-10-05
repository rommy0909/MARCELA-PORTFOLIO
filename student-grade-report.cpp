#include <iostream>
#include <string>
#include <vector>
using namespace std;

int main() {
    int numStudents;

    cout << "Enter number of students: ";
    cin >> numStudents;

    vector<string> names(numStudents);
    vector<double> grades(numStudents);

    for (int i = 0; i < numStudents; i++) {
        cout << "\nEnter name of student " << i + 1 << ": ";
        cin >> names[i];
        cout << "Enter grade of " << names[i] << ": ";
        cin >> grades[i];
    }

    cout << "\n--- Student Grade Report ---\n";
    for (int i = 0; i < numStudents; i++) {
        cout << names[i] << " - Grade: " << grades[i];

        if (grades[i] >= 90)
            cout << " (A)";
        else if (grades[i] >= 80)
            cout << " (B)";
        else if (grades[i] >= 70)
            cout << " (C)";
        else if (grades[i] >= 60)
            cout << " (D)";
        else
            cout << " (F)";

        cout << endl;
    }

    return 0;
}
