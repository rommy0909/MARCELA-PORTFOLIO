#include <iostream>
using namespace std;

int main() {
    int size, arr[50], i, j, temp;
    cout << "Enter array size: ";
    cin >> size;

    
    if (size <= 0 || size > 50) {
        cout << "Invalid array size. Size must be between 1 and 50." << endl;
        return 1; 
    }

    cout << "Enter array elements: ";
    for (i = 0; i < size; i++) {
        cin >> arr[i];
    }

    cout << "Sorting array using selection sort...\n";

    for (i = 0; i < size; i++) {
        for (j = i + 1; j < size; j++) {
            if (arr[i] > arr[j]) {
                temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
    }

    cout << "The sorted array is:\n";
    for (i = 0; i < size; i++) {
        cout << arr[i] << " "; 
    }
    cout << endl; 

    return 0;
}
