int BACK = 6,
    FOWARD = 7,
    LEFT = 9,
    RIGHT = 10;
char beta = '0',
    gamma = '0';
void setup() {
  pinMode(BACK, OUTPUT);
  pinMode(FOWARD, OUTPUT);
  pinMode(LEFT, OUTPUT);
  pinMode(RIGHT, OUTPUT);
  Serial.begin(115200);
}

void loop() {
  
  if(Serial.available() > 0){ 
    beta = Serial.read();
    gamma = Serial.read();
  }
    if(beta == '1'){
      digitalWrite(BACK,HIGH);
      digitalWrite(FOWARD,LOW);
    }else if(beta == '2'){
      digitalWrite(BACK,LOW);
      digitalWrite(FOWARD,HIGH);
    }else{
      digitalWrite(BACK,LOW);
      digitalWrite(FOWARD,LOW);
    }
    if(gamma == '1'){
      digitalWrite(LEFT,HIGH);
      digitalWrite(RIGHT,LOW);
    }else if(gamma == '2'){
      digitalWrite(LEFT,LOW);
      digitalWrite(RIGHT,HIGH);
    }else{
      digitalWrite(LEFT,LOW);
      digitalWrite(RIGHT,LOW);
    }
}

