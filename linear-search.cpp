#include <iostream>

// Linear Search function
int linearSearch(int a[], int first, int last, int key) {
    // Searches a[first] - a[last] for key.
    // Returns: index of the matching element if it finds key,
    // otherwise -1.
    for (int i = first; i <= last; i++) {
        if (key == a[i]) {
            return i; // Found at index i
        }
    }
    return -1; // Key not found
}

int main() {
    int arr[] = {23, 45, 12, 67, 34, 89, 56};
    int n = sizeof(arr) / sizeof(arr[0]); // Get array size
    int key;

    std::cout << "Enter the value to search for: ";
    std::cin >> key;

    int index = linearSearch(arr, 0, n - 1, key); // Search from index 0 to n-1

    if (index != -1) {
        std::cout << "Value " << key << " found at index " << index << std::endl;
    } else {
        std::cout << "Value " << key << " not found in the array." << std::endl;
    }

    return 0;
}
