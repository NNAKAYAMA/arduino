void setup(){
  pinMode(6, OUTPUT);
  pinMode(7, OUTPUT);
  pinMode(9, OUTPUT);
  pinMode(10, OUTPUT);
  Serial.begin(115200);
  }

void loop() {
 if(Serial.available() > 0){
  int pinNum = Serial.read();
  if(pinNum & 16)
    digitalWrite(pinNum - 16,HIGH);
  else
    digitalWrite(pinNum,LOW); 
  }     
}   

