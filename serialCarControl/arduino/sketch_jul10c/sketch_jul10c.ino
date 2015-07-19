int BACK = 6,
    FOWARD = 7,
    LEFT = 9,
    RIGHT = 10;
int beta,
    gamma;
void setup() {
  pinMode(BACK, OUTPUT);
  pinMode(FOWARD, OUTPUT);
  pinMode(LEFT, OUTPUT);
  pinMode(RIGHT, OUTPUT);
  Serial.begin(115200);
}

void loop() {
  digitalWrite(FOWARD,LOW);
  digitalWrite(BACK,LOW);
  digitalWrite(LEFT,LOW);
  digitalWrite(RIGHT,LOW);

  if(Serial.available() > 2){ 
    beta = Serial.read();
    gamma = Serial.read();
    Serial.write(beta); 
    if(beta > 20 )
      digitalWrite(BACK,HIGH);
    if(beta < -20)
      digitalWrite(FOWARD,HIGH);
    if(gamma > 20)
      digitalWrite(LEFT,HIGH);
    if(gamma < -20)
      digitalWrite(RIGHT,HIGH);
     Serial.flush();
  }
}

