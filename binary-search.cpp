#include <iostream>
#include <vector>

using namespace std;

int main() {
    vector<int> arr = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10}; //Example sorted array
    int left = 0;
    int right = arr.size() - 1;
    int number;
    bool search = false;

    cout << "Enter the number to search for: ";
    cin >> number;


    while (!search && left <= right) {
        int middle = left + (right - left) / 2; //Avoid potential overflow

        if (number == arr[middle]) {
            search = true;
            cout << "Number Found" << endl;
        } else if (number < arr[middle]) {
            right = middle - 1;
        } else {
            left = middle + 1;
        }
    }

    if (!search) {
        cout << "Number Not found" << endl;
    }

    return 0;
}
