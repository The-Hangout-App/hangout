-- create database hangout
CREATE DATABASE hangout;

-- use newly create database
USE hangout;

-- create table in hangout
CREATE TABLE `hangout`.`users` (
    `user_id` INT NOT NULL AUTO_INCREMENT, 
    `username` VARCHAR(30), 
    `password` VARCHAR(30), 
    `first_name` VARCHAR(30), 
    `last_name` VARCHAR(30), 
    `pronoun` VARCHAR(20), 
    `age` INT, 
    `gender` VARCHAR(20), 
    `bio` VARCHAR(50), 
    PRIMARY KEY (`user_id`)
);

-- insert sample entry
INSERT INTO `hangout`.`users` 
(`username`, `password`, `first_name`, `last_name`, `pronoun`, `age`, `gender`, `bio`,) 
VALUES ('bpulins', 'soccerislife17', 'Brigitta', 'Pulins', 'She', 21, 'Female', 'I love soccer');

CREATE TABLE `hangout`.`user_likes` (
	`likes_id` INT NOT NULL AUTO_INCREMENT, -- primary key
    `user_id` INT, -- foreign key
    `likes` VARCHAR(30),
    PRIMARY KEY (`likes_id`),
    FOREIGN KEY (`user_id`) REFERENCES users(user_id)
);

CREATE TABLE `hangout`.`user_dislikes` (
	`dislikes_id` INT NOT NULL AUTO_INCREMENT, -- primary key
    `user_id` INT, -- foreign key
    `dislikes` VARCHAR(30),
    PRIMARY KEY (`dislikes_id`),
    FOREIGN KEY (`user_id`) REFERENCES users(user_id)
);

CREATE TABLE `hangout`.`activity_category` (
	`activity_category_id` INT NOT NULL AUTO_INCREMENT,  -- primary key
    `activity_category_name` VARCHAR(30),
    PRIMARY KEY (`activity_category_id`)
);

CREATE TABLE `hangout`.`cards` (
	`card_id` INT NOT NULL AUTO_INCREMENT, -- primary key
    `activity_category_id` INT, -- foreign key
    `activity_name` VARCHAR(30),
    `address` VARCHAR(30),
    `phone_number` VARCHAR(30),
    `photo_url` VARCHAR(30),
    `min_num_participants` INT,
    `max_num_participants` INT,
    `min_age` INT,
    `max_age` INT,
    PRIMARY KEY (`card_id`),
    FOREIGN KEY (`activity_category_id`) REFERENCES activity_category(`activity_category_id`)
);

CREATE TABLE `hangout`.`logs` (
	`log_id` INT NOT NULL AUTO_INCREMENT, -- primary key
    `card_id` INT, -- foreign key
    `user_id` INT, -- foreign key
    `swipe_direction` VARCHAR(10),
    `preferred_gender` VARCHAR(10),
    `preferred_num_participants` INT, 
    `preferred_age_min` INT, 
    `preferred_age_max` INT, 
    `preferred_timeframe` VARCHAR(20),
    `add_friend` VARCHAR(10),
    `num_added_friends` INT,
    PRIMARY KEY (log_id),
    FOREIGN KEY (`card_id`) REFERENCES cards(`card_id`),
    FOREIGN KEY (`user_id`) REFERENCES users(`user_id`)
);

CREATE TABLE `hangout`.`matches` ( -- still figuring this one out
	match_id INT NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (`match_id`)
);

CREATE TABLE `hangout`.`chat` (
	`chat_id` INT NOT NULL AUTO_INCREMENT, -- primary key
	`date_created` date, 
    `chat_name` VARCHAR(30),
    PRIMARY KEY (`chat_id`)
);

CREATE TABLE `hangout`.`chat_members` (
	`chat_members_id` INT NOT NULL AUTO_INCREMENT, -- primary key
	`chat_id` INT, -- foreign key 
    `user_id` INT, -- foreign key
    PRIMARY KEY (`chat_members_id`),
    FOREIGN KEY (`chat_id`) REFERENCES chat(`chat_id`),
    FOREIGN KEY (`user_id`) REFERENCES users(`user_id`)
);

CREATE TABLE `hangout`.`messages` (
	`message_id` INT NOT NULL AUTO_INCREMENT, -- primary key
	`chat_id` INT, -- foreign key
    `sender_id` INT, -- foreign key
    `message` VARCHAR(50),
    `date_sent` DATE,
    PRIMARY KEY (`message_id`),
    FOREIGN KEY (`chat_id`) REFERENCES chat(`chat_id`),
    FOREIGN KEY (`sender_id`) REFERENCES users(`user_id`)
);
