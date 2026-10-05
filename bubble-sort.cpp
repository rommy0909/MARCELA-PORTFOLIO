#include <iostream>
#include <vector>

using namespace std;

int main() {
    int n;

    cout << "Enter the number of elements to be sorted: ";
    cin >> n;

    if (n <= 0) {
        cout << "Please enter a positive number of elements." << endl;
        return 1; // Indicate an error
    }

    vector<int> arr(n); // Use a vector for dynamic sizing

    cout << "Enter the elements: ";
    for (int i = 0; i < n; ++i) {
        cin >> arr[i];
    }

    // Bubble Sort
    for (int i = 0; i < n - 1; ++i) {
        for (int j = 0; j < n - i - 1; ++j) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
            }
        }
    }

    cout << "The array elements after sorting are: ";
    for (int i = 0; i < n; ++i) {
        cout << arr[i] << (i == n - 1 ? "" : ", "); //Improved output formatting
    }
    cout << endl;

    return 0;
}
