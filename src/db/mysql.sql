CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Conversations (
    conversation_id INT AUTO_INCREMENT PRIMARY KEY,
    conversation_name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE User_Conversations (
    user_id INT,
    conversation_id INT,
    PRIMARY KEY (user_id, conversation_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (conversation_id) REFERENCES Conversations(conversation_id)
);


CREATE TABLE Messages (
    message_id INT AUTO_INCREMENT PRIMARY KEY,
    conversation_id INT,
    sender_id INT,
    message_text TEXT NOT NULL,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   
    FOREIGN KEY (conversation_id) REFERENCES Conversations(conversation_id),
    FOREIGN KEY (sender_id) REFERENCES Users(user_id)
);

CREATE TABLE Message_Read_Status (
    id INT AUTO_INCREMENT PRIMARY KEY,
    message_id INT,
    user_id INT,
    read_at TIMESTAMP NULL DEFAULT NULL,
    FOREIGN KEY (message_id) REFERENCES Messages(message_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);



