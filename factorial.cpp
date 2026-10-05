#include <iostream>

using namespace std;

int main() {
  int n, fact = 1;

  cout << "Enter a positive integer: ";
  cin >> n;

  if (n < 0) {
    cout << "Factorial is not defined for negative numbers." << endl;
  } else {
    for (int i = 1; i <= n; i++) {
      fact = fact * i;
    }
    cout << "The factorial of " << n << " is: " << fact << endl;
  }
  return 0;
}
