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
  
  if(Serial.available() > 1){ 
    beta = Serial.read();
    gamma = Serial.read();
  }
    if(beta == '1'){
      digitalWrite(BACK,HIGH);
      digitalWrite(BACK,LOW);
    }
    if(beta == '2'){
      digitalWrite(BACK,LOW);
      digitalWrite(FOWARD,HIGH);
    }
    if(beta == '0'){
      digitalWrite(BACK,LOW);
      digitalWrite(FOWARD,LOW);
    }
    if(gamma == '1'){
      digitalWrite(LEFT,HIGH);
      digitalWrite(RIGHT,LOW);
    }
    if(gamma == '2'){
      digitalWrite(LEFT,LOW);
      digitalWrite(RIGHT,HIGH);
    }
    if(gamma == '0'){
      digitalWrite(LEFT,LOW);
      digitalWrite(RIGHT,LOW);
    }
}

