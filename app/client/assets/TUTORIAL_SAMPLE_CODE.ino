#include <Servo.h>
Servo servo1, servo2, servo3, servo4;
int result = 0, result2 = 0,  result3 = 0,  result4 = 0 ;
//Base
//arm 1
//arm 2
//gripper

void setup() 
{
    servo1.attach(13);
    servo2.attach(12);
    servo3.attach(11);
    servo4.attach(10);
}

void loop() 
{
   int val1 = analogRead(A0);
   delay(1);
   result = map(val1,0,1023,500,3000);
   servo1.writeMicroseconds(result);
   
    int val2 = analogRead(A1);
    delay(1);
    result2 = map(val2,0,1023,800,1800);
    servo2.writeMicroseconds(result2);
   
   int val3 = analogRead(A2);
   delay(1);
   result3 = map(val3,0,1023,500,1000);
   servo3.writeMicroseconds(result3);

   int val4 = analogRead(A3);
   delay(1);
   result4 = map(val4,0,1023,650,1800);
   servo4.writeMicroseconds(result4);
}
