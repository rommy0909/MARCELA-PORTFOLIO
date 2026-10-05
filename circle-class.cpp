#include <iostream>
using namespace std;

class Circle {
private:
    float radius;

public:
    // Constructor
    Circle(float _radius) {
        radius = _radius;
    }

    // Set radius
    void setRadius(float _radius) {
        radius = _radius;
    }

    // Get radius
    float getRadius() {
        return radius;
    }

    // Calculate area
    float getArea() {
        return 3.14159f * radius * radius;
    }

    // Calculate circumference
    float getCircumference() {
        return 2 * 3.14159f * radius;
    }
};

int main() {
    // Create two objects in stack memory
    Circle circle1(5.0f);
    Circle circle2(7.5f);

    // Test all functions
    cout << "Circle 1 - Radius: " << circle1.getRadius() << endl;
    cout << "Circle 1 - Area: " << circle1.getArea() << endl;
    cout << "Circle 1 - Circumference: " << circle1.getCircumference() << endl;

    cout << "Circle 2 - Radius: " << circle2.getRadius() << endl;
    cout << "Circle 2 - Area: " << circle2.getArea() << endl;
    cout << "Circle 2 - Circumference: " << circle2.getCircumference() << endl;

    return 0;
}
