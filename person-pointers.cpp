#include <iostream>
#include <string>
using namespace std;

class Person {
private:
    string name;
    int age;

public:
    void setName(string name) {
        this->name = name;
    }
    string getName() {
        return name;
    }
    void setAge(int presentAge) {
        age = presentAge;
    }
    int getAge() {
        return age;
    }
    void sing(string song) {
        cout << "You are singing " << song << "." << endl << endl;
    }
};

int main() {
    Person *p1 = new Person();
    Person *p2 = new Person();
    Person *p3 = new Person();

    p1->setName("Erika");
    p1->setAge(8);
    cout << "Hello " << p1->getName() << "." << endl;
    cout << "You are " << p1->getAge() << " years old." << endl;
    p1->sing("Malaya");

    p2->setName("Juan");
    p2->setAge(18);
    cout << "Hello " << p2->getName() << "." << endl;
    cout << "You are " << p2->getAge() << " years old." << endl;
    p2->sing("Buwan");

    p3->setName("Susan");
    p3->setAge(14);
    cout << "Hello " << p3->getName() << "." << endl;
    cout << "You are " << p3->getAge() << " years old." << endl;
    p3->sing("stone cold");

    delete p1;
    delete p2;
    delete p3;

    return 0;
}
